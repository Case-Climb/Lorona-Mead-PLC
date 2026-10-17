import { Phone, Check, Award, Scale, Briefcase, GraduationCap } from "lucide-react";
import { SITE } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";
import { FIRM_ID, breadcrumbSchema, firmSchema } from "@/lib/schema";

export default function Attorney() {
  return (
    <>
    <SEO
      title="Jess A. Lorona | Phoenix Criminal Defense Attorney | Lorona Mead, PLC"
      description="Meet Jess A. Lorona, Phoenix criminal defense attorney with 43+ years of experience and former prosecutor insight. Free consultation. Call (602) 385-6818."
      canonical="https://www.loronameadpllc.com/attorney"
      schema={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Attorney",
            name: SITE.attorney,
            url: "https://www.loronameadpllc.com/attorney",
            image: "https://www.loronameadpllc.com/manus-storage/jess-lorona-headshot_6f6cddca.jpg",
            telephone: SITE.phone,
            address: firmSchema().address,
            worksFor: { "@id": FIRM_ID },
          },
          firmSchema(),
          breadcrumbSchema([{ name: SITE.attorney, path: "/attorney" }]),
        ],
      }}
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/law-library-dark_61c38fa6.jpg" alt="Law library" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Jess A. Lorona
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <p className="text-lg text-white/70 max-w-2xl text-balance">
              Phoenix Criminal Defense Attorney · Former Prosecutor · 43+ Years of Courtroom Experience
            </p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "About", href: "/attorney" }, { label: "Jess A. Lorona" }]} />

      {/* Bio with headshot */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FadeIn>
              <div className="lg:sticky lg:top-28">
                <img
                  src="/manus-storage/jess-lorona-headshot_6f6cddca.jpg"
                  alt="Jess A. Lorona, Phoenix criminal defense attorney"
                  className="w-full rounded-lg"
                />
                <div className="mt-6 bg-[#111418] border border-white/5 rounded-lg p-6 space-y-3">
                  <a href={`tel:${SITE.phoneRaw}`} className="btn-gold w-full justify-center">
                    <Phone className="w-4 h-4" /> {SITE.phone}
                  </a>
                  <div className="text-center text-sm text-white/40">
                    Free Consultation · Available 24/7
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="lg:col-span-2">
              <SectionLabel>Meet Your Attorney</SectionLabel>
              <GoldUnderlineHeading className="mb-6">
                A Fighter in the Courtroom
              </GoldUnderlineHeading>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Jess A. Lorona is the founding attorney of Lorona Mead, PLC. With over four decades of criminal defense experience and a background as a former prosecutor, he brings a rare dual perspective to every case. He knows how the state builds cases because he used to build them. And he knows how to dismantle them.
                </p>
                <p>
                  After beginning his legal career as a prosecutor, Jess transitioned to criminal defense because he believed that everyone deserves a fierce advocate, regardless of the charges they face. That belief has guided his practice for over 43 years. He has defended thousands of clients across Arizona, from first-offense DUI to complex federal drug trafficking trials.
                </p>
                <p>
                  Jess is known for his meticulous preparation, his aggressive courtroom style, and his unwavering commitment to his clients. He treats every case as if it were his own, and he does not back down from a fight. Whether negotiating a favorable plea or taking a case to trial, Jess pursues the best possible outcome with determination and skill.
                </p>
                <p>
                  When you hire Jess A. Lorona, you get direct access to your attorney. No associates, no paralegals screening your calls. Jess personally handles every case from intake to resolution. That is the level of dedication that has earned him a reputation as one of Phoenix's premier criminal defense attorneys.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Credentials</SectionLabel>
            <GoldUnderlineHeading center>
              Qualifications & Experience
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FadeIn>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                <GraduationCap className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Education</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>Juris Doctor, Arizona State University Sandra Day O'Connor College of Law</li>
                  <li>Bachelor of Science, University of Arizona</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                <Scale className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Bar Admissions</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>Arizona State Bar</li>
                  <li>U.S. District Court, District of Arizona</li>
                  <li>U.S. Court of Appeals, Ninth Circuit</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                <Briefcase className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Professional Experience</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>Former Prosecutor, Maricopa County Attorney's Office</li>
                  <li>43+ years criminal defense practice</li>
                  <li>Thousands of cases defended</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={240}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                <Award className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Case Experience</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>DUI and vehicular crimes</li>
                  <li>Drug offenses (state and federal)</li>
                  <li>Violent crimes and assault</li>
                  <li>White collar and fraud cases</li>
                  <li>Weapons charges</li>
                  <li>Post-conviction relief and set-asides</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection
        title="Work With Jess A. Lorona"
        subtitle="Get direct, personal representation from an attorney with 43+ years of courtroom experience. Call for a free consultation."
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
