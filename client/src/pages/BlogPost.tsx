import { useMemo, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { Clock, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/siteData";
import {
  BLOG_POSTS,
  categoryHref,
  categoryLabel,
  locationFor,
  relatedPosts,
} from "@/lib/blog";
import { postSchema, postUrl } from "@shared/blog";
import {
  FadeIn,
  SectionLabel,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import FAQAccordion from "@/components/FAQAccordion";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";

export default function BlogPost({ slug }: { slug: string }) {
  const [, navigate] = useLocation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const schema = useMemo(() => (post ? postSchema(post, SITE) : undefined), [post]);
  if (!post) return <NotFound />;

  const otherPosts = relatedPosts(post);
  const location = locationFor(post.location);

  // Keep internal links inside the article on the client-side router.
  const handleArticleClick = (e: MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <>
    <SEO
      title={`${post.title} | Lorona Mead, PLC Blog`}
      description={post.description}
      canonical={postUrl(post.slug)}
      schema={schema}
      type="article"
      publishedTime={post.date}
      modifiedTime={post.updated}
      image={post.image}
    />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-[#0a0a0a]/35" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs text-white/40 mb-4 flex-wrap">
                <Link href={categoryHref(post.category)} className="text-[#C9A84C]/80 hover:text-[#C9A84C] transition-colors">
                  {categoryLabel(post.category)}
                </Link>
                <time dateTime={post.date}>{post.displayDate}</time>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
                <span>By {SITE.attorney}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
                {post.title}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-3xl">
          <FadeIn>
            <article
              className="blog-content"
              onClick={handleArticleClick}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </FadeIn>

          {post.faqs && post.faqs.length > 0 && (
            <FadeIn className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={post.faqs} />
            </FadeIn>
          )}

          <FadeIn className="mt-12">
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={categoryHref(post.category)} className="inline-flex items-center gap-1 text-[#C9A84C] hover:gap-2 transition-all">
                {categoryLabel(post.category)} Defense <ArrowRight className="w-4 h-4" />
              </Link>
              {location && (
                <Link href={`/${location.slug}`} className="inline-flex items-center gap-1 text-[#C9A84C] hover:gap-2 transition-all">
                  {location.city} Criminal Defense Attorney <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </FadeIn>

          {/* CTA within post */}
          <FadeIn className="mt-12">
            <div className="bg-[#111418] border border-[#C9A84C]/20 rounded-lg p-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-white mb-3">
                Need Help With Your Case?
              </h3>
              <p className="text-sm text-white/60 mb-6">
                This article is for informational purposes only and is not legal advice. Call us for a free consultation about your specific situation.
              </p>
              <a href={`tel:${SITE.phoneRaw}`} className="btn-gold">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-[#0d0d0d]">
          <div className="container">
            <FadeIn className="mb-8">
              <SectionLabel>Keep Reading</SectionLabel>
              <h2 className="font-serif text-2xl font-bold text-white">
                More Articles
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 60}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block bg-[#111418] border border-white/5 rounded-lg overflow-hidden hover:border-[#C9A84C]/30 transition-all h-full"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                    <div className="text-xs text-white/40 mb-3">{p.displayDate}</div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2">{p.excerpt}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Facing Criminal Charges?"
        subtitle="Do not wait. The sooner you call, the sooner we can start building your defense."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
