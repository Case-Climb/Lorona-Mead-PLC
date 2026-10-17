import { Link } from "wouter";
import { SITE, PRACTICE_AREAS, LOCATIONS } from "@/lib/siteData";
import { BLOG_POSTS } from "@/lib/blog";
import { FadeIn, Breadcrumbs } from "@/components/Shared";
import SEO from "@/components/SEO";

export default function Sitemap() {
  return (
    <>
    <SEO
      title="Sitemap | Lorona Mead, PLC"
      description="Complete sitemap for Lorona Mead, PLC. Find all pages on our website including practice areas, service areas, blog, and legal pages."
      canonical="https://arizonatrialattorneys.com/sitemap"
    />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111418] to-[#0a0a0a]" />
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Sitemap
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Sitemap" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Core pages */}
            <FadeIn>
              <h2 className="font-serif text-lg font-semibold text-[#C9A84C] mb-4">Core Pages</h2>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Homepage</Link></li>
                <li><Link href="/attorney" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Attorney Bio</Link></li>
                <li><Link href="/practice-areas" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Practice Areas Hub</Link></li>
                <li><Link href="/criminal-defense" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Criminal Defense Overview</Link></li>
                <li><Link href="/testimonials" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Testimonials</Link></li>
                <li><Link href="/blog" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Contact</Link></li>
              </ul>
            </FadeIn>

            {/* Practice areas */}
            <FadeIn delay={80}>
              <h2 className="font-serif text-lg font-semibold text-[#C9A84C] mb-4">Practice Areas</h2>
              <ul className="space-y-2">
                {PRACTICE_AREAS.map((area) => (
                  <li key={area.slug}>
                    <Link href={`/criminal-defense/${area.slug}`} className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">
                      {area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Locations */}
            <FadeIn delay={160}>
              <h2 className="font-serif text-lg font-semibold text-[#C9A84C] mb-4">Service Areas</h2>
              <ul className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <li key={loc.slug}>
                    <Link href={`/${loc.slug}`} className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">
                      {loc.city} Criminal Defense Attorney
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="font-serif text-lg font-semibold text-[#C9A84C] mb-4 mt-8">Blog Posts</h2>
              <ul className="space-y-2">
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="font-serif text-lg font-semibold text-[#C9A84C] mb-4 mt-8">Legal</h2>
              <ul className="space-y-2">
                <li><Link href="/disclaimer" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Disclaimer</Link></li>
                <li><Link href="/privacy-policy" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">Privacy Policy</Link></li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
