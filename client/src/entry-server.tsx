import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { headTagsHtml, ssrHead, type SEOProps } from "./components/SEO";

/** Renders one route to HTML for scripts/prerender.ts. */
export function render(url: string) {
  const [path, search = ""] = url.split("?");
  ssrHead.current = null;
  const html = renderToString(
    <Router ssrPath={path} ssrSearch={search}>
      <App />
    </Router>
  );
  // Set as a side effect of rendering <SEO>, so TS cannot see the assignment
  const seo = ssrHead.current as SEOProps | null;
  return {
    html,
    title: seo?.title,
    description: seo?.description,
    head: seo ? headTagsHtml(seo) : "",
  };
}
