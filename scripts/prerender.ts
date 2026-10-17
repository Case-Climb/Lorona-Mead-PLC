/**
 * Static prerender for SEO. Runs after `vite build` (see the build:static
 * script) and turns the SPA into real HTML pages:
 *
 *  - Renders every route (pages, practice areas, cities, blog index, each
 *    published post) with React on the server and writes <route>.html with
 *    the page's content, title, meta description, canonical URL, Open Graph
 *    tags and JSON-LD. The browser still loads the app, which takes over.
 *  - Writes 404.html (noindex) so unknown URLs return a real 404.
 *  - Writes sitemap.xml (referenced by robots.txt) and blog/rss.xml.
 *
 * Vercel serves /attorney from attorney.html via "cleanUrls"; the Express
 * server does the same. Posts dated in the future are skipped until a build
 * on or after their date.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import react from "@vitejs/plugin-react";
import { build } from "vite";
import {
  BLOG_CONTENT_DIR,
  SITE_URL,
  loadPosts,
  postUrl,
  type BlogPost,
} from "../shared/blog";
import { LOCATIONS, PRACTICE_AREAS, SITE } from "../client/src/lib/siteData";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "dist/public");
const SSR_DIR = path.join(ROOT, "dist/ssr");

const STATIC_ROUTES = [
  "/",
  "/attorney",
  "/practice-areas",
  "/criminal-defense",
  ...PRACTICE_AREAS.map(a => `/criminal-defense/${a.slug}`),
  ...LOCATIONS.map(l => `/${l.slug}`),
  "/testimonials",
  "/blog",
  "/contact",
  "/disclaimer",
  "/privacy-policy",
  "/sitemap",
];

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absolute = (route: string) => `${SITE_URL}${route}`;

function readPosts(): BlogPost[] {
  const dir = path.join(ROOT, BLOG_CONTENT_DIR);
  const files: Record<string, string> = {};
  for (const name of fs.readdirSync(dir).filter(f => f.endsWith(".md"))) {
    files[name] = fs.readFileSync(path.join(dir, name), "utf8");
  }
  return loadPosts(files);
}

function sitemapXml(posts: BlogPost[]): string {
  // Only dated content gets a lastmod; a build date on static pages would be noise.
  const urls: { loc: string; lastmod?: string }[] = [
    ...STATIC_ROUTES.map(route => ({
      loc: absolute(route),
      lastmod: route === "/blog" ? posts[0]?.date : undefined,
    })),
    ...posts.map(p => ({ loc: postUrl(p.slug), lastmod: p.updated ?? p.date })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;
}

function rssXml(posts: BlogPost[]): string {
  const items = posts.slice(0, 50).map(
    p => `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${postUrl(p.slug)}</link>
      <guid isPermaLink="true">${postUrl(p.slug)}</guid>
      <pubDate>${new Date(`${p.date}T15:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(p.excerpt)}</description>
    </item>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(SITE.name)} Criminal Defense Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Arizona criminal defense insights from ${escapeHtml(SITE.attorney)}.</description>
    <language>en-us</language>
${items.join("\n")}
  </channel>
</rss>
`;
}

type Rendered = {
  html: string;
  title?: string;
  description?: string;
  head: string;
};

function fillTemplate(template: string, page: Rendered): string {
  let out = template.replace(
    '<html lang="en">',
    '<html lang="en" class="dark">'
  );
  if (page.title) {
    out = out.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`
    );
  }
  if (page.description) {
    out = out.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`
    );
  }
  return out
    .replace("</head>", `  ${page.head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
}

function outFile(route: string): string {
  if (route === "/") return path.join(OUT_DIR, "index.html");
  return path.join(OUT_DIR, `${route.slice(1)}.html`);
}

async function main() {
  // 1. Server build of the app (no dev-only plugins)
  await build({
    configFile: false,
    root: path.join(ROOT, "client"),
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.join(ROOT, "client/src"),
        "@shared": path.join(ROOT, "shared"),
      },
    },
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: SSR_DIR,
      emptyOutDir: true,
    },
  });
  const { render } = (await import(
    pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href
  )) as { render: (url: string) => Rendered };

  // 2. Render every route into its own HTML file
  const template = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf8");
  const posts = readPosts();
  const routes = [...STATIC_ROUTES, ...posts.map(p => `/blog/${p.slug}`)];
  const notFoundTitle = render("/404").title;

  for (const route of routes) {
    const page = render(route);
    if (!page.title || page.title === notFoundTitle) {
      throw new Error(
        `Route ${route} did not render a page (got "${page.title ?? "no title"}")`
      );
    }
    const file = outFile(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, fillTemplate(template, page));
  }
  fs.writeFileSync(
    path.join(OUT_DIR, "404.html"),
    fillTemplate(template, render("/404"))
  );

  // 3. Sitemap and RSS
  fs.mkdirSync(path.join(OUT_DIR, "blog"), { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemapXml(posts));
  fs.writeFileSync(path.join(OUT_DIR, "blog", "rss.xml"), rssXml(posts));

  fs.rmSync(SSR_DIR, { recursive: true, force: true });
  console.log(
    `prerender: ${routes.length} pages + 404.html, sitemap.xml (${routes.length} URLs), blog/rss.xml (${posts.length} posts)`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
