import { Link } from "wouter";
import { Phone, ChevronRight, ArrowRight, Check } from "lucide-react";
import { SITE, PRACTICE_AREAS, PROCESS_STEPS } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";

export default function CriminalDefense() {
  return (
    <>
    <SEO
      title="Criminal Defense Attorney in Phoenix | Lorona Mead, PLC"
      description="Comprehensive criminal defense in Phoenix, AZ. Every type of criminal case, from DUI to federal charges. Former prosecutor, 43+ years experience. Free consultation."
      canonical="https://www.loronameadpllc.com/criminal-defense"
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/courthouse-phoenix_26bd7067.jpg" alt="Maricopa County courthouse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                Criminal Defense Attorney in Phoenix
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
              <p className="text-lg text-white/70 max-w-2xl text-balance">
                Every form of criminal case. From misdemeanors to federal felonies. Jess A. Lorona has the experience, the courtroom skill, and the determination to fight for you.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Criminal Defense" }]} />

      {/* Intro */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 leading-relaxed text-lg">
                When you are facing criminal charges in Arizona, the stakes could not be higher. Your freedom, your reputation, your career, and your family's future are all on the line. The criminal justice system is complex and unforgiving, and prosecutors have significant resources at their disposal. You need an attorney who has been on both sides of the courtroom, who knows how cases are built, and who knows how to break them down.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                Jess A. Lorona is a former prosecutor with over 43 years of criminal defense experience. He has handled thousands of cases across Arizona, from first-offense DUI to complex federal drug trafficking trials. At Lorona Mead, PLC, we provide aggressive, strategic defense for every type of criminal charge. We examine every piece of evidence, challenge every procedural error, and fight for the best possible outcome at every stage of your case.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sub-practice cards */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Practice Areas</SectionLabel>
            <GoldUnderlineHeading center>
              What We Defend
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 60}>
                <Link
                  href={`/criminal-defense/${area.slug}`}
                  className="group block bg-[#111418] border border-white/5 rounded-lg overflow-hidden hover:border-[#C9A84C]/30 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={area.image} alt={area.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111418] to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2 mb-4">{area.blurb}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#C9A84C] group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <SectionLabel>What We Handle</SectionLabel>
            <GoldUnderlineHeading className="mb-8">
              Every Type of Criminal Case
            </GoldUnderlineHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "DUI and extreme DUI",
                "Drug possession and trafficking",
                "Assault and domestic violence",
                "Theft and white collar crimes",
                "Weapons charges",
                "Expungements and set-asides",
                "Federal criminal defense",
                "Juvenile crimes",
                "Probation violations",
                "Post-conviction relief",
                "Misdemeanor offenses",
                "Felony offenses of all classes",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <SectionLabel>The Process</SectionLabel>
            <GoldUnderlineHeading center>
              How We Defend You
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 80}>
                <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                  <div className="font-serif text-5xl font-bold text-[#C9A84C]/20 mb-4">{step.number}</div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why hire a private attorney */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <SectionLabel>Why Choose Us</SectionLabel>
            <GoldUnderlineHeading className="mb-6">
              Why Hire a Private Criminal Defense Attorney?
            </GoldUnderlineHeading>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Public defenders are often overworked, handling hundreds of cases at a time. They rarely have the bandwidth to give your case the individual attention it deserves. When you hire Lorona Mead, PLC, you get an attorney who has the time, resources, and dedication to thoroughly investigate your case, challenge the prosecution's evidence, and fight for your rights.
              </p>
              <p>
                Jess A. Lorona brings a unique advantage: he was a prosecutor. He knows how the state builds cases, what weaknesses to look for, and how to negotiate from a position of strength. That insider knowledge, combined with decades of defense experience, gives you a powerful advocate in your corner.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Facing Criminal Charges in Arizona?"
        subtitle="Do not face the justice system alone. Call Jess A. Lorona today for a free, confidential consultation."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
