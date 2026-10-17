import { Link } from "wouter";
import { Phone, ChevronRight, ArrowRight, Check } from "lucide-react";
import { SITE, PRACTICE_AREAS, type PracticeArea } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import FAQAccordion from "@/components/FAQAccordion";
import SEO from "@/components/SEO";

export default function PracticeAreaPage({ slug }: { slug: string }) {
  const area = PRACTICE_AREAS.find((a) => a.slug === slug);
  if (!area) return null;

  const siblings = PRACTICE_AREAS.filter((a) => a.slug !== slug);

  return (
    <>
    <SEO
      title={`${area.title} Attorney in Phoenix | Lorona Mead, PLC`}
      description={`${area.blurb} Free consultation. Call (602) 385-6818.`}
      canonical={`https://www.loronameadpllc.com/criminal-defense/${area.slug}`}
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": area.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }}
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={area.image} alt={area.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                {area.title} Attorney in Phoenix
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
              <p className="text-lg text-white/70 max-w-2xl text-balance">
                {area.blurb}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Criminal Defense", href: "/criminal-defense" },
          { label: area.title },
        ]}
      />

      {/* Intro */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <p className="text-white/70 leading-relaxed text-lg">{area.intro}</p>
          </FadeIn>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container max-w-4xl">
          <FadeIn>
            <SectionLabel>What We Handle</SectionLabel>
            <GoldUnderlineHeading className="mb-8">
              {area.title} Cases We Defend
            </GoldUnderlineHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {area.whatWeHandle.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3-step process */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <SectionLabel>The Process</SectionLabel>
            <GoldUnderlineHeading center>
              How We Approach Your Case
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { num: "01", title: "Consultation & Review", desc: "We review the charges, the evidence, and the circumstances. We explain your rights and your options in plain language." },
              { num: "02", title: "Investigation & Defense", desc: "We investigate every detail, challenge evidence, file motions, and build a defense strategy tailored to your case." },
              { num: "03", title: "Resolution & Beyond", desc: "We fight for the best outcome, whether dismissal, reduced charges, or trial. We also help with set-asides and rights restoration." },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                  <div className="font-serif text-5xl font-bold text-[#C9A84C]/20 mb-4">{step.num}</div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container max-w-3xl">
          <FadeIn className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <GoldUnderlineHeading center>
              Common Questions About {area.title}
            </GoldUnderlineHeading>
          </FadeIn>
          <FadeIn>
            <FAQAccordion faqs={area.faqs} />
          </FadeIn>
        </div>
      </section>

      {/* Internal links to siblings */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="text-center mb-10">
            <SectionLabel>Related Practice Areas</SectionLabel>
            <GoldUnderlineHeading center>
              Other Criminal Defense Services
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/criminal-defense/${sib.slug}`}
                className="flex items-center gap-2 bg-[#111418] border border-white/5 rounded-md px-4 py-3 text-sm text-white/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-[#C9A84C] shrink-0" />
                {sib.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Facing ${area.title} Charges?`}
        subtitle="Call Jess A. Lorona today for a free, confidential consultation. We will explain your rights and your options."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
