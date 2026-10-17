import { Link } from "wouter";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SITE, PRACTICE_AREAS } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";

export default function PracticeAreas() {
  return (
    <>
    <SEO
      title="Criminal Defense Practice Areas | Phoenix, AZ | Lorona Mead, PLC"
      description="Complete criminal defense practice areas in Phoenix, AZ. DUI, drug charges, assault, theft, weapons, expungements. Free consultation. Call (602) 385-6818."
      canonical="https://www.loronameadpllc.com/practice-areas"
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/law-library-dark_61c38fa6.jpg" alt="Law library" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Criminal Defense Practice Areas
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <p className="text-lg text-white/70 max-w-2xl text-balance">
              Comprehensive criminal defense across every type of charge in Arizona. Explore our practice areas to learn how we can help.
            </p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Practice Areas" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <p className="text-white/70 leading-relaxed text-lg">
              At Lorona Mead, PLC, we handle every form of criminal case. From first-offense misdemeanors to complex federal trials, Jess A. Lorona brings over 43 years of courtroom experience and a former prosecutor's insight to every defense. Below is a complete list of our practice areas. Click any area to learn more about the charges we defend, the process, and common questions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
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
                    <h3 className="font-serif text-xl font-semibold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{area.blurb}</p>
                    <ul className="space-y-1.5 mb-4">
                      {area.subAreas.slice(0, 4).map((sub) => (
                        <li key={sub} className="flex items-center gap-2 text-xs text-white/40">
                          <Check className="w-3 h-3 text-[#C9A84C] shrink-0" />
                          {sub}
                        </li>
                      ))}
                    </ul>
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

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <SectionLabel>What We Handle</SectionLabel>
            <GoldUnderlineHeading className="mb-8">
              Complete Criminal Defense Coverage
            </GoldUnderlineHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "DUI, extreme DUI, and aggravated DUI",
                "Drug possession, distribution, and trafficking",
                "Assault, aggravated assault, and domestic violence",
                "Theft, burglary, robbery, and fraud",
                "Embezzlement and white collar crimes",
                "Weapons charges and prohibited possessor",
                "Expungements and set-aside judgments",
                "Federal criminal defense",
                "Juvenile crimes",
                "Probation violations",
                "Post-conviction relief",
                "Rights restoration",
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

      <CTASection
        title="Need Help With a Criminal Charge?"
        subtitle="Whatever you are facing, we can help. Call for a free, confidential consultation today."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
