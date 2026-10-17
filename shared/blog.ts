import { marked } from "marked";

/**
 * Blog posts live as Markdown files in client/src/content/blog/<slug>.md with a
 * small frontmatter block. Every frontmatter value is a JSON literal (quoted
 * string, number, or array) so it round-trips safely through the generator.
 *
 * This module has no Node or browser dependencies so the site, the Vite build
 * plugin, and scripts/generate-blog-post.ts all share one parser.
 */

export const BLOG_CONTENT_DIR = "client/src/content/blog";
export const BLOG_TOPICS_FILE = "client/src/content/blog-topics.json";
export const BLOG_TIMEZONE = "America/Phoenix";
export const BLOG_IMAGES_DIR = "client/public/blog-images";
export const DEFAULT_BLOG_IMAGE = "/manus-storage/law-library-dark_61c38fa6.jpg";

export type BlogFAQ = { q: string; a: string };

export type BlogFrontmatter = {
  title: string;
  description: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD
  category: string; // practice area slug or "general"
  location?: string; // location slug or "arizona"
  keywords: string[];
  topicId?: string;
  image?: string; // site path, e.g. /blog-images/<id>.jpg
  imageAlt?: string;
  faqs?: BlogFAQ[];
};

export type BlogPost = BlogFrontmatter & {
  image: string;
  imageAlt: string;
  slug: string;
  body: string;
  html: string;
  wordCount: number;
  readTime: string;
  displayDate: string;
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(source: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = source.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: source };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = raw;
    }
  }
  return { data, body: match[2] };
}

export function serializePost(fm: BlogFrontmatter, body: string): string {
  const lines = Object.entries(fm)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join("\n")}\n---\n\n${body.trim()}\n`;
}

export function countWords(markdown: string): number {
  return markdown
    .replace(/[#>*_`[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Today's date (YYYY-MM-DD) in Arizona time. */
export function todayInArizona(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: BLOG_TIMEZONE });
}

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true });
}

export function buildPost(slug: string, source: string): BlogPost {
  const { data, body } = parseFrontmatter(source);
  const fm = data as Partial<BlogFrontmatter>;
  if (!fm.title || !fm.date || !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) {
    throw new Error(
      `Blog post "${slug}" is missing a title or a YYYY-MM-DD date`
    );
  }
  const wordCount = countWords(body);
  return {
    title: fm.title,
    description: fm.description ?? fm.excerpt ?? "",
    excerpt: fm.excerpt ?? fm.description ?? "",
    date: fm.date,
    updated: fm.updated,
    category: fm.category ?? "general",
    location: fm.location,
    keywords: Array.isArray(fm.keywords) ? fm.keywords : [],
    topicId: fm.topicId,
    image: fm.image || DEFAULT_BLOG_IMAGE,
    imageAlt: fm.imageAlt ?? "",
    faqs: Array.isArray(fm.faqs) ? fm.faqs : [],
    slug,
    body,
    html: renderMarkdown(body),
    wordCount,
    readTime: `${Math.max(1, Math.round(wordCount / 225))} min read`,
    displayDate: formatDisplayDate(fm.date),
  };
}

/**
 * Turns a { path: source } map (from import.meta.glob or fs) into posts that are
 * published as of `today`, newest first. Future-dated posts stay hidden until
 * their date, so a post can be scheduled by committing it with a later date.
 */
export function loadPosts(
  files: Record<string, string>,
  today = todayInArizona()
): BlogPost[] {
  return Object.entries(files)
    .map(([file, source]) => {
      const slug = file.split("/").pop()!.replace(/\.md$/, "");
      return buildPost(slug, source);
    })
    .filter(p => p.date <= today)
    .sort((a, b) =>
      a.date === b.date
        ? a.title.localeCompare(b.title)
        : b.date.localeCompare(a.date)
    );
}

export const SITE_URL = "https://www.loronameadpllc.com";

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

type SchemaSite = { name: string; attorney: string; phone: string };

/** JSON-LD for a post: BlogPosting + BreadcrumbList (+ FAQPage when the post has FAQs). */
export function postSchema(post: BlogPost, site: SchemaSite): object {
  const url = postUrl(post.slug);
  const graph: object[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      wordCount: post.wordCount,
      keywords: post.keywords.join(", "),
      mainEntityOfPage: url,
      url,
      image: `${SITE_URL}${post.image}`,
      author: {
        "@type": "Person",
        name: site.attorney,
        url: `${SITE_URL}/attorney`,
      },
      publisher: {
        "@type": "LegalService",
        name: site.name,
        telephone: site.phone,
        url: SITE_URL,
        logo: `${SITE_URL}/manus-storage/logo-lm-gold_73de6277.png`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs && post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
