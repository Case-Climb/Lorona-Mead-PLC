import { Link, useSearch } from "wouter";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, BLOG_PAGE_SIZE, categoryLabel } from "@/lib/blog";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";

export default function Blog() {
  const search = useSearch();
  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE));
  const requested = Number(new URLSearchParams(search).get("page")) || 1;
  const page = Math.min(Math.max(1, Math.floor(requested)), totalPages);
  const posts = BLOG_POSTS.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  const pageHref = (n: number) => (n === 1 ? "/blog" : `/blog?page=${n}`);

  return (
    <>
    <SEO
      title={`Criminal Defense Blog${page > 1 ? ` (Page ${page})` : ""} | Lorona Mead, PLC | Phoenix, AZ`}
      description="Legal insights and articles on Arizona criminal defense law from Jess A. Lorona. DUI, drug charges, expungements, and more. Free consultation."
      canonical={`https://arizonatrialattorneys.com${pageHref(page)}`}
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/law-library-dark_61c38fa6.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Legal Insights & Blog
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <p className="text-lg text-white/70 max-w-2xl text-balance">
              Articles and insights on Arizona criminal defense law from Jess A. Lorona.
            </p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="mb-12">
            <SectionLabel>{page === 1 ? "Recent Posts" : `Page ${page} of ${totalPages}`}</SectionLabel>
            <GoldUnderlineHeading>
              Latest Articles
            </GoldUnderlineHeading>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-[#111418] border border-white/5 rounded-lg overflow-hidden hover:border-[#C9A84C]/30 transition-all h-full"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                      <span className="text-[#C9A84C]/80">{categoryLabel(post.category)}</span>
                      <span>{post.displayDate}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-[#C9A84C] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#C9A84C] group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="flex items-center justify-between mt-12" aria-label="Blog pagination">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="inline-flex items-center gap-1 text-sm font-medium text-[#C9A84C] hover:gap-2 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Newer Articles
                </Link>
              ) : <span />}
              <span className="text-xs text-white/40">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1)} className="inline-flex items-center gap-1 text-sm font-medium text-[#C9A84C] hover:gap-2 transition-all">
                  Older Articles <ArrowRight className="w-4 h-4" />
                </Link>
              ) : <span />}
            </nav>
          )}
        </div>
      </section>

      <CTASection
        title="Have Questions About Your Case?"
        subtitle="The blog is informational, not legal advice. For specific guidance on your situation, call for a free consultation."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
