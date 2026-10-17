import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  BLOG_CONTENT_DIR,
  SITE_URL,
  loadPosts,
  postSchema,
  postUrl,
  type BlogPost,
} from "../shared/blog";
import { LOCATIONS, PRACTICE_AREAS, SITE } from "../client/src/lib/siteData";

/**
 * Build-time SEO for the SPA. After Vite writes dist/public it adds:
 *  - sitemap.xml (all pages + published posts; referenced by robots.txt)
 *  - blog/rss.xml
 *  - blog.html and blog/<slug>.html: index.html with the post's title, meta,
 *    canonical, Open Graph tags, JSON-LD and article text baked in, so crawlers
 *    and link previews get real content without running JavaScript. React
 *    replaces the #root contents on load.
 * Vercel serves these via "cleanUrls"; the Express server via extensions: ["html"].
 */

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

const jsonLd = (data: object) =>
  `<script type="application/ld+json" id="page-schema">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

function readPosts(root: string): BlogPost[] {
  const dir = path.join(root, BLOG_CONTENT_DIR);
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
      loc: `${SITE_URL}${route === "/" ? "" : route}`,
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

type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  type: "website" | "article";
  publishedTime?: string;
  schema?: object;
  body: string;
};

function renderPage(template: string, meta: PageMeta): string {
  const head = [
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    ...(meta.publishedTime
      ? [
          `<meta property="article:published_time" content="${meta.publishedTime}" />`,
        ]
      : []),
    ...(meta.schema ? [jsonLd(meta.schema)] : []),
  ].join("\n    ");

  return template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(meta.title)}</title>`
    )
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    )
    .replace("</head>", `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${meta.body}</div>`);
}

const shell = (inner: string) =>
  `<main style="max-width:48rem;margin:0 auto;padding:10rem 1rem 4rem">${inner}</main>`;

export function blogSeoPlugin(): Plugin {
  let outDir = "";
  let root = "";
  return {
    name: "blog-seo",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
      root = path.resolve(config.root, "..");
    },
    writeBundle() {
      const posts = readPosts(root);
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      fs.mkdirSync(path.join(outDir, "blog"), { recursive: true });

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml(posts));
      fs.writeFileSync(path.join(outDir, "blog", "rss.xml"), rssXml(posts));

      fs.writeFileSync(
        path.join(outDir, "blog.html"),
        renderPage(template, {
          title: "Criminal Defense Blog | Lorona Mead, PLC | Phoenix, AZ",
          description:
            "Legal insights and articles on Arizona criminal defense law from Jess A. Lorona. DUI, drug charges, expungements, and more. Free consultation.",
          canonical: `${SITE_URL}/blog`,
          type: "website",
          body: shell(
            `<h1>Legal Insights &amp; Blog</h1><ul>${posts
              .map(
                p =>
                  `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> <time datetime="${p.date}">${p.displayDate}</time><p>${escapeHtml(p.excerpt)}</p></li>`
              )
              .join("")}</ul>`
          ),
        })
      );

      for (const post of posts) {
        const faqs = (post.faqs ?? [])
          .map(f => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
          .join("");
        fs.writeFileSync(
          path.join(outDir, "blog", `${post.slug}.html`),
          renderPage(template, {
            title: `${post.title} | Lorona Mead, PLC Blog`,
            description: post.description,
            canonical: postUrl(post.slug),
            type: "article",
            publishedTime: post.date,
            schema: postSchema(post, SITE),
            body: shell(
              `<article><h1>${escapeHtml(post.title)}</h1><p>By ${escapeHtml(SITE.attorney)} &middot; <time datetime="${post.date}">${post.displayDate}</time></p>${post.html}${
                faqs ? `<h2>Frequently Asked Questions</h2>${faqs}` : ""
              }</article>`
            ),
          })
        );
      }

      this.info(
        `blog-seo: sitemap.xml (${STATIC_ROUTES.length + posts.length} URLs), rss.xml, ${posts.length} prerendered posts`
      );
    },
  };
}
