import { useEffect } from "react";
import { SITE } from "@/lib/siteData";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export default function SEO({
  title,
  description,
  canonical,
  schema,
  type = "website",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", SITE.name, "property");
    if (canonical) setMeta("og:url", canonical, "property");

    for (const prop of ["article:published_time", "article:modified_time"]) {
      document.querySelector(`meta[property="${prop}"]`)?.remove();
    }
    if (type === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, "property");
      setMeta("article:modified_time", modifiedTime ?? publishedTime, "property");
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Schema markup
    const existingSchema = document.getElementById("page-schema");
    if (existingSchema) existingSchema.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-schema";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, [title, description, canonical, schema, type, publishedTime, modifiedTime]);

  return null;
}
