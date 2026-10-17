import { useEffect } from "react";
import { SITE } from "@/lib/siteData";

export type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: string; // site path or absolute URL
  noindex?: boolean;
};

const DEFAULT_IMAGE = "/manus-storage/hero-phoenix-skyline_96c7b9a0.jpg";

/**
 * During prerendering (scripts/prerender.ts) the page's SEO props are captured
 * here so the build can write them into the static HTML <head>.
 */
export const ssrHead: { current: SEOProps | null } = { current: null };

const escapeAttr = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** The <head> tags for a page, as HTML. Used by the prerender build. */
export function headTagsHtml(p: SEOProps): string {
  const type = p.type ?? "website";
  const imageUrl = new URL(p.image ?? DEFAULT_IMAGE, `https://${SITE.domain}`)
    .href;
  const tags = [
    `<meta property="og:title" content="${escapeAttr(p.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(p.description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (p.canonical) {
    tags.unshift(`<link rel="canonical" href="${p.canonical}" />`);
    tags.push(`<meta property="og:url" content="${p.canonical}" />`);
  }
  if (p.noindex) tags.push(`<meta name="robots" content="noindex" />`);
  if (type === "article" && p.publishedTime) {
    tags.push(
      `<meta property="article:published_time" content="${p.publishedTime}" />`
    );
    tags.push(
      `<meta property="article:modified_time" content="${p.modifiedTime ?? p.publishedTime}" />`
    );
  }
  if (p.schema) {
    const json = JSON.stringify(p.schema).replace(/</g, "\\u003c");
    tags.push(
      `<script type="application/ld+json" id="page-schema">${json}</script>`
    );
  }
  return tags.join("\n    ");
}

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    canonical,
    schema,
    type = "website",
    publishedTime,
    modifiedTime,
    image,
    noindex,
  } = props;

  if (typeof window === "undefined") ssrHead.current = props;

  useEffect(() => {
    document.title = title;

    const setMeta = (
      name: string,
      content: string,
      attr: "name" | "property" = "name"
    ) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const removeMeta = (name: string, attr: "name" | "property" = "name") =>
      document.querySelector(`meta[${attr}="${name}"]`)?.remove();

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", SITE.name, "property");
    setMeta(
      "og:image",
      new URL(image ?? DEFAULT_IMAGE, `https://${SITE.domain}`).href,
      "property"
    );
    setMeta("twitter:card", "summary_large_image");
    if (noindex) setMeta("robots", "noindex");
    else removeMeta("robots");

    removeMeta("article:published_time", "property");
    removeMeta("article:modified_time", "property");
    if (type === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, "property");
      setMeta(
        "article:modified_time",
        modifiedTime ?? publishedTime,
        "property"
      );
    }

    // Never leave a previous page's canonical behind after client-side navigation
    const link = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      setMeta("og:url", canonical, "property");
      const el =
        link ?? document.head.appendChild(document.createElement("link"));
      el.setAttribute("rel", "canonical");
      el.setAttribute("href", canonical);
    } else {
      link?.remove();
      removeMeta("og:url", "property");
    }

    // Schema markup
    document.getElementById("page-schema")?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-schema";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("page-schema")?.remove();
    };
  }, [
    title,
    description,
    canonical,
    schema,
    type,
    publishedTime,
    modifiedTime,
    image,
    noindex,
  ]);

  return null;
}
