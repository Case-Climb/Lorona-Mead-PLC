/**
 * Writes new SEO blog posts with Claude and saves them as Markdown in
 * client/src/content/blog/. Run by .github/workflows/publish-blog.yml on a
 * schedule (12 posts a month), or locally:
 *
 *   pnpm blog:generate              # one post
 *   pnpm blog:generate --count 3    # several
 *   pnpm blog:generate --dry-run    # show the next topic + prompt only
 *
 * By default it runs Claude Code headless, so it works with a Claude Pro/Max
 * subscription: locally after `claude` login, in CI with CLAUDE_CODE_OAUTH_TOKEN
 * (from `claude setup-token`). If ANTHROPIC_API_KEY is set, it calls the
 * Claude API instead. BLOG_MODEL optionally picks the model.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  BLOG_CONTENT_DIR,
  BLOG_TOPICS_FILE,
  DEFAULT_BLOG_IMAGE,
  countWords,
  parseFrontmatter,
  serializePost,
  todayInArizona,
  type BlogFrontmatter,
} from "../shared/blog";
import { LOCATIONS, PRACTICE_AREAS, SITE } from "../client/src/lib/siteData";

const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS_DIR = path.join(ROOT, BLOG_CONTENT_DIR);
const API_MODEL = process.env.BLOG_MODEL || "claude-opus-5-5";
const MIN_WORDS = 900;
const MAX_ATTEMPTS = 2;

const CATEGORIES = [...PRACTICE_AREAS.map(a => a.slug), "general"] as const;
const LOCATION_SLUGS = [...LOCATIONS.map(l => l.slug), "arizona"] as const;

type Topic = {
  id: string;
  workingTitle: string;
  primaryKeyword: string;
  category: string;
  location: string;
  notes?: string;
  image?: string;
  imageAlt?: string;
};

type ExistingPost = {
  slug: string;
  title: string;
  topicId?: string;
  category: string;
};

// ---------------------------------------------------------------------------
// Inputs

function readExistingPosts(): ExistingPost[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const { data } = parseFrontmatter(
        fs.readFileSync(path.join(POSTS_DIR, f), "utf8")
      );
      return {
        slug: f.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        topicId: data.topicId as string | undefined,
        category: String(data.category ?? "general"),
      };
    });
}

function nextTopic(existing: ExistingPost[], skip: Set<string>): Topic | null {
  const { topics } = JSON.parse(
    fs.readFileSync(path.join(ROOT, BLOG_TOPICS_FILE), "utf8")
  ) as {
    topics: Topic[];
  };
  const used = new Set(existing.map(p => p.topicId).filter(Boolean));
  return topics.find(t => !used.has(t.id) && !skip.has(t.id)) ?? null;
}

function internalLinks(
  existing: ExistingPost[]
): { href: string; label: string }[] {
  return [
    { href: "/contact", label: "Contact / free consultation" },
    { href: "/attorney", label: `About ${SITE.attorney}` },
    { href: "/criminal-defense", label: "Criminal defense overview" },
    ...PRACTICE_AREAS.map(a => ({
      href: `/criminal-defense/${a.slug}`,
      label: a.title,
    })),
    ...LOCATIONS.map(l => ({
      href: `/${l.slug}`,
      label: `${l.city} criminal defense attorney`,
    })),
    ...existing.map(p => ({
      href: `/blog/${p.slug}`,
      label: `Blog: ${p.title}`,
    })),
  ];
}

// ---------------------------------------------------------------------------
// Prompt

const SYSTEM_PROMPT = `You write blog articles for ${SITE.name}, a criminal defense law firm in Phoenix, Arizona (website: ${SITE.domain}). The firm's attorney is ${SITE.attorney}, who has over four decades (43 years) of criminal defense experience and is a former prosecutor. Office: ${SITE.address}. Phone: ${SITE.phone}. The firm offers free consultations and is available 24/7.

Practice areas: ${PRACTICE_AREAS.map(a => a.title).join(", ")}. Service areas: ${LOCATIONS.map(l => l.city).join(", ")} and all of Arizona.

Each article has two jobs: genuinely help someone in Arizona who is facing (or worried about) a criminal matter, and rank in search for the assigned keyword. Helpfulness comes first; search engines reward people-first content, not keyword stuffing.

Writing guidelines:
- Audience: ordinary people under stress, often the accused or a family member. Plain English, short paragraphs, calm and reassuring but direct. Explain legal terms when you use them.
- Length: about 1,200 to 1,700 words of body text.
- Structure: open with 2-3 paragraphs that answer the core question quickly, then 4-7 sections with "## " headings (use "### " for sub-points where useful). Use bulleted or numbered lists where they aid scanning. End with a short section on next steps that invites a free consultation by phone at ${SITE.phone} or via the contact page.
- Do not include an H1 ("# ") - the page renders the title. Do not include a FAQ section in the body; put FAQs in the separate faqs field.
- SEO: use the primary keyword naturally in the title, in the first paragraph, and in at least one heading. Use related phrases naturally. Title at most 65 characters. Meta description 140-160 characters, written to earn the click. Slug: short, lowercase, hyphenated, keyword-focused.
- Internal links: include 3-5 Markdown links in the body, using ONLY URLs from the allowed list in the request. Link descriptive anchor text, never "click here". No external links, no raw HTML, no images.
- FAQs: 3-5 questions people actually search for, each answered in 2-4 sentences.

Accuracy and legal-ethics rules (these override everything above):
- Be accurate about Arizona law as you understand it. Prefer general explanations of how things usually work over precise figures you are not sure of. When penalties, fees, or deadlines can vary or change, say so and encourage readers to get advice about their specific situation.
- Cite an Arizona statute (e.g., "A.R.S. § 28-1381") only when you are confident the citation is correct. Never invent statutes, cases, statistics, quotes, client stories, or case results.
- Never promise or imply guaranteed outcomes, never claim the firm is "the best" or a "specialist"/"expert" (Arizona ethics rules restrict those claims), and do not disparage prosecutors, police, judges, or other lawyers.
- State only the firm facts given above. Do not invent credentials, awards, ratings, or years of experience.
- Present this as general information, not legal advice. The site adds a disclaimer automatically, so a single brief reminder in the body is enough.`;

function userPrompt(
  topic: Topic | null,
  existing: ExistingPost[],
  issues: string[]
): string {
  const links = internalLinks(existing)
    .map(l => `- ${l.href} (${l.label})`)
    .join("\n");
  const titles = existing.map(p => `- ${p.title}`).join("\n");
  const assignment = topic
    ? `Write an article on this assigned topic:
- Working title: ${topic.workingTitle}
- Primary keyword: ${topic.primaryKeyword}
- Category: ${topic.category}
- Location focus: ${topic.location}${topic.notes ? `\n- Notes: ${topic.notes}` : ""}`
    : `The topic queue is empty. Choose a fresh, specific topic that people in the Phoenix area actually search for, within the firm's practice areas, that does not duplicate any existing article below. Pick a realistic long-tail primary keyword.`;

  return `${assignment}

Existing articles (do not duplicate them; you may link to them where relevant):
${titles}

Allowed internal link URLs:
${links}
${
  issues.length
    ? `\nA previous draft was rejected for these reasons. Fix all of them:\n${issues.map(i => `- ${i}`).join("\n")}\n`
    : ""
}`;
}

// ---------------------------------------------------------------------------
// Output

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    metaDescription: { type: "string" },
    excerpt: {
      type: "string",
      description: "1-2 sentence teaser for the blog index",
    },
    primaryKeyword: { type: "string" },
    secondaryKeywords: { type: "array", items: { type: "string" } },
    category: { type: "string", enum: [...CATEGORIES] },
    location: { type: "string", enum: [...LOCATION_SLUGS] },
    bodyMarkdown: { type: "string" },
    faqs: {
      type: "array",
      items: {
        type: "object",
        properties: { q: { type: "string" }, a: { type: "string" } },
        required: ["q", "a"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "title",
    "slug",
    "metaDescription",
    "excerpt",
    "primaryKeyword",
    "secondaryKeywords",
    "category",
    "location",
    "bodyMarkdown",
    "faqs",
  ],
  additionalProperties: false,
} as const;

const Draft = z.object({
  title: z.string(),
  slug: z.string(),
  metaDescription: z.string(),
  excerpt: z.string(),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  category: z.enum(CATEGORIES),
  location: z.enum(LOCATION_SLUGS),
  bodyMarkdown: z.string(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
});
type Draft = z.infer<typeof Draft>;

function checkDraft(draft: Draft, existing: ExistingPost[]): string[] {
  const issues: string[] = [];
  const body = draft.bodyMarkdown;
  const allowed = new Set(internalLinks(existing).map(l => l.href));
  const links = Array.from(body.matchAll(/\]\(([^)\s]+)/g), m => m[1]);
  const words = countWords(body);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(draft.slug) || draft.slug.length > 80)
    issues.push(
      `Slug "${draft.slug}" must be lowercase words joined by hyphens, max 80 characters.`
    );
  if (existing.some(p => p.slug === draft.slug))
    issues.push(`Slug "${draft.slug}" is already used.`);
  if (existing.some(p => p.title.toLowerCase() === draft.title.toLowerCase()))
    issues.push(`Title "${draft.title}" duplicates an existing article.`);
  if (draft.title.length > 75)
    issues.push(
      `Title is ${draft.title.length} characters; keep it at most 65.`
    );
  if (draft.metaDescription.length < 100 || draft.metaDescription.length > 170)
    issues.push(
      `Meta description is ${draft.metaDescription.length} characters; aim for 140-160.`
    );
  if (words < MIN_WORDS)
    issues.push(
      `Body is ${words} words; it must be at least ${MIN_WORDS} (aim for 1,200-1,700).`
    );
  if (/^#\s/m.test(body))
    issues.push("Body contains an H1 (# heading); use ## and ### only.");
  if ((body.match(/^##\s/gm) ?? []).length < 4)
    issues.push("Body needs at least 4 ## section headings.");
  if (/<\/?[a-z][^>]*>/i.test(body))
    issues.push("Body contains raw HTML; use Markdown only.");
  const bad = links.filter(l => !allowed.has(l));
  if (bad.length)
    issues.push(
      `Links not on the allowed list: ${bad.join(", ")}. Use only the allowed internal URLs.`
    );
  if (links.length < 2)
    issues.push(`Body has ${links.length} internal links; include 3-5.`);
  if (draft.faqs.length < 3 || draft.faqs.length > 6)
    issues.push(`Provide 3-5 FAQs (got ${draft.faqs.length}).`);
  return issues;
}

// ---------------------------------------------------------------------------
// Claude

/** Claude Code CLI in headless mode, signed in with a Claude Pro/Max subscription. */
function requestDraftClaudeCode(prompt: string): Promise<Draft> {
  const args = [
    "-p",
    "--output-format",
    "json",
    "--json-schema",
    JSON.stringify(OUTPUT_SCHEMA),
    "--system-prompt",
    SYSTEM_PROMPT,
    "--tools",
    "",
    "--no-session-persistence",
  ];
  if (process.env.BLOG_MODEL) args.push("--model", process.env.BLOG_MODEL);

  return new Promise((resolve, reject) => {
    // An empty ANTHROPIC_API_KEY (unset CI secret) would shadow the subscription login
    const env = { ...process.env };
    if (!env.ANTHROPIC_API_KEY) delete env.ANTHROPIC_API_KEY;
    const child = spawn("claude", args, {
      env,
      stdio: ["pipe", "pipe", "inherit"],
    });
    const timer = setTimeout(() => child.kill(), 20 * 60 * 1000);
    let stdout = "";
    child.stdout.on("data", chunk => (stdout += chunk));
    child.on("error", err =>
      reject(
        new Error(
          `Could not run Claude Code (${err.message}). Install it with: npm install -g @anthropic-ai/claude-code`
        )
      )
    );
    child.on("close", code => {
      clearTimeout(timer);
      try {
        const result = JSON.parse(stdout);
        if (result.is_error || result.subtype !== "success") {
          throw new Error(
            `Claude Code finished with ${result.subtype ?? `exit code ${code}`}: ${String(result.result ?? "").slice(0, 500)}`
          );
        }
        const usage = Object.keys(result.modelUsage ?? {}).join(", ");
        console.log(`  model=${usage || "default"} (Claude Code)`);
        resolve(Draft.parse(result.structured_output));
      } catch (err) {
        reject(
          err instanceof SyntaxError
            ? new Error(
                `Unexpected Claude Code output (exit ${code}): ${stdout.slice(0, 500)}`
              )
            : err
        );
      }
    });
    child.stdin.end(prompt);
  });
}

/** Claude API, used instead when ANTHROPIC_API_KEY is set. */
async function requestDraftApi(prompt: string): Promise<Draft> {
  const client = new Anthropic();
  const message = await client.beta.messages
    .stream({
      model: API_MODEL,
      max_tokens: 32000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: {
        effort: "high",
        format: { type: "json_schema", schema: OUTPUT_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    })
    .finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error(
      `Model declined the request (${message.stop_details?.category ?? "no category"})`
    );
  }
  if (message.stop_reason === "max_tokens") {
    throw new Error("Response hit max_tokens before the article was complete");
  }
  const text = message.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map(b => b.text)
    .join("");
  console.log(
    `  model=${message.model} input_tokens=${message.usage.input_tokens} output_tokens=${message.usage.output_tokens}`
  );
  return Draft.parse(JSON.parse(text));
}

const requestDraft = (prompt: string) =>
  process.env.ANTHROPIC_API_KEY
    ? requestDraftApi(prompt)
    : requestDraftClaudeCode(prompt);

/** The topic's pre-made image, else the practice area's photo, else the default. */
function imageFor(topic: Topic | null, category: string): string {
  if (
    topic?.image &&
    fs.existsSync(path.join(ROOT, "client/public", topic.image))
  ) {
    return topic.image;
  }
  return (
    PRACTICE_AREAS.find(a => a.slug === category)?.image ?? DEFAULT_BLOG_IMAGE
  );
}

async function writePost(
  topic: Topic | null,
  existing: ExistingPost[],
  date: string
) {
  let issues: string[] = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`  attempt ${attempt}/${MAX_ATTEMPTS}`);
    const draft = await requestDraft(userPrompt(topic, existing, issues));
    issues = checkDraft(draft, existing);
    if (issues.length === 0) {
      const fm: BlogFrontmatter = {
        title: draft.title,
        description: draft.metaDescription,
        excerpt: draft.excerpt,
        date,
        category: draft.category,
        location: draft.location,
        keywords: [draft.primaryKeyword, ...draft.secondaryKeywords].slice(
          0,
          8
        ),
        topicId: topic?.id ?? draft.slug,
        image: imageFor(topic, draft.category),
        imageAlt: topic?.imageAlt ?? draft.title,
        faqs: draft.faqs,
      };
      const file = path.join(POSTS_DIR, `${draft.slug}.md`);
      fs.writeFileSync(file, serializePost(fm, draft.bodyMarkdown));
      return {
        slug: draft.slug,
        title: draft.title,
        words: countWords(draft.bodyMarkdown),
        file,
      };
    }
    console.warn(`  draft rejected:\n    - ${issues.join("\n    - ")}`);
  }
  throw new Error(
    `Could not produce an acceptable draft:\n- ${issues.join("\n- ")}`
  );
}

// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const countArg = args.indexOf("--count");
  const count =
    countArg >= 0
      ? Math.min(12, Math.max(1, Number(args[countArg + 1]) || 1))
      : 1;
  const dryRun = args.includes("--dry-run");
  const date = todayInArizona();

  if (dryRun) {
    const existing = readExistingPosts();
    const topic = nextTopic(existing, new Set());
    console.log(
      `Next topic: ${topic ? `${topic.id} - ${topic.workingTitle}` : "(queue empty - Claude will choose)"}\n`
    );
    console.log(
      `--- system ---\n${SYSTEM_PROMPT}\n\n--- user ---\n${userPrompt(topic, existing, [])}`
    );
    return;
  }

  console.log(
    process.env.ANTHROPIC_API_KEY
      ? `Using the Claude API (${API_MODEL})`
      : "Using Claude Code (Claude Pro/Max subscription)"
  );
  const published: { slug: string; title: string; words: number }[] = [];
  const skipped = new Set<string>();
  let failures = 0;

  while (published.length < count && failures < count + 1) {
    const existing = readExistingPosts();
    const topic = nextTopic(existing, skipped);
    console.log(
      `Writing: ${topic ? topic.workingTitle : "(Claude-chosen topic)"}`
    );
    try {
      const post = await writePost(topic, existing, date);
      published.push(post);
      console.log(
        `  saved ${path.relative(ROOT, post.file)} (${post.words} words)`
      );
    } catch (err) {
      failures++;
      if (topic) skipped.add(topic.id);
      console.error(
        `  failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = published.map(
      p =>
        `- [${p.title}](https://${SITE.domain}/blog/${p.slug}) (${p.words} words)`
    );
    fs.appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### Blog posts generated\n${lines.join("\n") || "_none_"}\n`
    );
  }
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `count=${published.length}\ntitles=${published.map(p => p.title).join("; ")}\n`
    );
  }
  if (published.length === 0) {
    console.error("No posts were generated.");
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
