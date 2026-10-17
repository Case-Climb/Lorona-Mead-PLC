import { loadPosts, type BlogPost } from "@shared/blog";
import { LOCATIONS, PRACTICE_AREAS } from "@/lib/siteData";

export type { BlogPost };

const files = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** Published posts, newest first. Future-dated posts appear on their date. */
export const BLOG_POSTS: BlogPost[] = loadPosts(files);

export const BLOG_PAGE_SIZE = 12;

export function categoryLabel(category: string): string {
  return (
    PRACTICE_AREAS.find(a => a.slug === category)?.title ?? "Criminal Defense"
  );
}

export function categoryHref(category: string): string {
  return PRACTICE_AREAS.some(a => a.slug === category)
    ? `/criminal-defense/${category}`
    : "/criminal-defense";
}

export function locationFor(slug?: string) {
  return LOCATIONS.find(l => l.slug === slug);
}

/** Same-category posts first, then the most recent others. */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = BLOG_POSTS.filter(p => p.slug !== post.slug);
  const same = others.filter(p => p.category === post.category);
  const rest = others.filter(p => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}
