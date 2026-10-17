# Lorona Mead, PLC — Phoenix Criminal Defense Attorney Website

A multi-page criminal defense law firm website built with React 19, Vite, and Tailwind CSS 4.

## Tech Stack

- **React 19** + **Vite 7** — frontend framework and build tool
- **Tailwind CSS 4** — styling
- **Wouter** — lightweight client-side routing
- **Playfair Display + Inter** — typography (Google Fonts)

## Local Development

```bash
pnpm install
pnpm dev
```

The site runs on `http://localhost:3000`.

## Build

```bash
pnpm build
```

Output is written to `dist/public/`.

## Deploy to Vercel

1. Import this repository into [Vercel](https://vercel.com/new)
2. Framework preset: **Vite**
3. Build command: `npx vite build`
4. Output directory: `dist/public`
5. Deploy — no environment variables required for the static build

The `vercel.json` file in the root handles SPA routing rewrites automatically.

## Project Structure

```
client/
  public/
    manus-storage/    ← Site images (served statically)
    blog-images/      ← Blog featured images (Higgsfield)
    robots.txt
  src/
    components/       ← Navbar, Footer, Layout, ContactForm, SEO, etc.
    pages/            ← Home, Attorney, PracticeAreas, Blog, Contact, etc.
    lib/
      siteData.ts     ← Central data file (practice areas, locations, reviews)
      blog.ts         ← Loads blog posts from content/blog
    content/
      blog/           ← One Markdown file per blog post
      blog-topics.json← Queue of upcoming blog topics (with image paths)
    App.tsx           ← Routes
    main.tsx          ← Entry point
    index.css         ← Global styles and design tokens
shared/blog.ts         ← Post format, Markdown rendering, schema markup
scripts/
  generate-blog-post.ts      ← Writes new posts with Claude
  vite-plugin-blog-seo.ts    ← Build step: sitemap.xml, RSS, prerendered post pages
.github/workflows/publish-blog.yml ← Manual "publish now" button
.github/workflows/daily-rebuild.yml ← Optional daily Vercel rebuild (backup for Grok)
docs/blog-automation.md            ← Grok prompts + Claude Code monthly runbook
vercel.json            ← Vercel deployment config
```

## Features

- 15+ pages including homepage, attorney bio, 6 practice area pages, 4 location pages, blog, testimonials, contact
- SEO meta tags and JSON-LD schema markup on every page
- Caseclimb form embed on contact page
- LeadConnector chat widget site-wide
- Dark theme with gold accent (#C9A84C)
- Fully responsive
- Automated blog: 12 new SEO articles a month written with Claude Pro, Higgsfield featured images, plus `sitemap.xml`, RSS, and prerendered post pages

## Automated Blog

**How posts get scheduled:** once a month, a Grok scheduled task plans the next month's 12 posts (topics plus publish dates on the 1st, 3rd, 6th, 8th, 11th, 13th, 16th, 18th, 21st, 23rd, 26th and 28th) and sends the plan to Claude Code. Claude Code writes all 12 posts in one session, reviews them, and pushes them with future dates. Each post stays hidden until its date; on each publish date a second Grok task redeploys the site on Vercel so the post is added to the sitemap and RSS. The Grok prompts and Claude Code's step-by-step instructions are in [`docs/blog-automation.md`](docs/blog-automation.md).

For each post, the generator (`pnpm blog:generate`):

1. Takes the next topic from `client/src/content/blog-topics.json` (`--scheduled` limits it to topics with a `publishDate`).
2. Runs **Claude Code** headless, signed in with the firm's **Claude Pro** subscription (no paid API needed), to write a 1,200–1,700 word article with a title, meta description, FAQs and links to the firm's own practice-area, city, and blog pages.
3. Checks the draft (length, headings, only valid internal links, no raw HTML, no duplicate slug/title) and asks for a rewrite once if it fails.
4. Saves it as `client/src/content/blog/<slug>.md`, dated with the topic's `publishDate` and using its featured image.

### One-time setup

1. **Grok tasks:** set up the two Grok scheduled tasks in [`docs/blog-automation.md`](docs/blog-automation.md) (monthly plan, publish-day Vercel redeploy). Optional backup for the redeploy: a `VERCEL_DEPLOY_HOOK` secret, used by `.github/workflows/daily-rebuild.yml`.
1. **Claude Pro token (only for the manual GitHub workflow):** on any computer with Claude Code installed (`npm install -g @anthropic-ai/claude-code`), run `claude setup-token` and sign in with the Claude Pro account. Copy the token it prints, then add it in GitHub → *Settings → Secrets and variables → Actions → New repository secret* as `CLAUDE_CODE_OAUTH_TOKEN`. The token lasts about a year; repeat this step when it expires (the workflow run will fail and GitHub emails you).
2. **Branch permissions:** the workflow pushes to `main` with the built-in `GITHUB_TOKEN`. If `main` is protected, either allow GitHub Actions to push or use review mode (below).
3. **Optional repository variables** (same settings page, *Variables* tab):
   - `BLOG_PUBLISH_MODE` = `pull-request` to have each post opened as a pull request for an attorney to review and merge, instead of publishing directly. This also requires *Settings → Actions → General → Allow GitHub Actions to create and approve pull requests*.
   - `BLOG_MODEL` to pick a specific Claude model (by default Claude Code uses the plan's default model).

Each post uses a small share of the Pro plan's usage limits (a run takes about a minute). If you later get a Claude API key, add it as the `ANTHROPIC_API_KEY` secret and the generator will use the API instead.

### Featured images (Higgsfield)

Every queued topic has a featured image in `client/public/blog-images/<topic-id>.jpg`, generated with Higgsfield (GPT Image 2.5, 16:9, dark editorial style matching the site) and compressed to 1600px JPEGs. They're used for the post header, blog cards, and social-share previews (`og:image`). Higgsfield isn't reachable from GitHub Actions, so images are made ahead of time: when you add topics, ask Claude (with the Higgsfield connector) to generate images for the new topic ids in the same style, then set `image`/`imageAlt` on those topics. A topic without an image falls back to its practice area's photo.

### Day-to-day

- **Run it now / backfill:** *Actions → Publish blog post → Run workflow* publishes the next queued topic immediately (set how many posts, 1–12, and the mode).
- **Steer topics:** edit, reorder, or add entries in `client/src/content/blog-topics.json`. Each post records the `topicId` it was written from.
- **Edit or remove a post:** edit or delete its Markdown file. Add `"updated": "YYYY-MM-DD"` to the frontmatter after a significant revision.
- **Write a post by hand:** add a Markdown file with the same frontmatter fields. A post with a future `date` stays hidden until that day.
- **Run locally:** after signing in to Claude Code (`claude`), `pnpm blog:generate` writes the next post; `pnpm blog:generate --dry-run` shows the next topic and the exact prompt without generating anything.

### SEO output

`pnpm build` also writes `sitemap.xml` (already referenced by `robots.txt`), `blog/rss.xml`, and a prerendered HTML file for the blog index and every post. Each has the right title, meta description, canonical URL, Open Graph tags, and `BlogPosting` / `BreadcrumbList` / `FAQPage` structured data, so search engines see the full article without running JavaScript. After the first deploy, submit `https://arizonatrialattorneys.com/sitemap.xml` in Google Search Console.
