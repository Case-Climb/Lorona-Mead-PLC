import { Link } from "wouter";
import { Star, Phone, ExternalLink } from "lucide-react";
import { SITE, REVIEWS } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";

export default function Testimonials() {
  return (
    <>
    <SEO
      title="Client Reviews | Lorona Mead, PLC | Phoenix Criminal Defense"
      description="Read what clients say about Jess A. Lorona and Lorona Mead, PLC. 5.0 star rated Phoenix criminal defense attorney. Free consultation. Call (602) 385-6818."
      canonical="https://www.loronameadpllc.com/testimonials"
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/courthouse-phoenix_26bd7067.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Client Reviews
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <span className="text-white/70 text-lg">
                {SITE.rating} · {SITE.reviewCount} Google reviews
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Reviews" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <SectionLabel>What Clients Say</SectionLabel>
            <GoldUnderlineHeading center>
              Real Results for Real People
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              We measure our success by the outcomes we achieve for our clients. Here is what they have to say.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#B8973E] flex items-center justify-center text-[#0a0a0a] font-bold text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{review.author}</div>
                      <div className="text-xs text-white/40">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <a
              href="https://www.google.com/search?q=Lorona+Mead+PLC+Phoenix+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <ExternalLink className="w-4 h-4" /> Leave a Review
            </a>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Ready to Become Our Next Success Story?"
        subtitle="Join the clients who trusted Lorona Mead, PLC with their defense. Call for a free consultation today."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
