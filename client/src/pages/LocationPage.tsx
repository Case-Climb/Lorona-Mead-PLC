import { Link } from "wouter";
import { Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import { SITE, LOCATIONS, PRACTICE_AREAS, type Location } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
  CTASection,
} from "@/components/Shared";
import SEO from "@/components/SEO";
import { breadcrumbSchema, firmSchema } from "@/lib/schema";

export default function LocationPage({ slug }: { slug: string }) {
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return null;

  const otherLocs = LOCATIONS.filter((l) => l.slug !== slug);

  return (
    <>
    <SEO
      title={`Criminal Defense Attorney ${loc.city} AZ | Lorona Mead, PLC`}
      description={`Aggressive, experienced criminal defense in ${loc.city}, ${loc.county}. Free consultation. Available 24/7. Call (602) 385-6818.`}
      canonical={`https://www.loronameadpllc.com/${loc.slug}`}
      schema={{
        "@context": "https://schema.org",
        "@graph": [
          firmSchema(),
          breadcrumbSchema([{ name: `${loc.city} Criminal Defense Attorney`, path: `/${loc.slug}` }]),
        ],
      }}
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/hero-phoenix-skyline_96c7b9a0.jpg" alt={`${loc.city} skyline`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Criminal Defense Attorney {loc.city}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <p className="text-lg text-white/70 max-w-2xl text-balance">
              Aggressive, experienced criminal defense in {loc.city}, {loc.county}. Free consultation. Available 24/7.
            </p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Service Areas" }, { label: loc.city }]} />

      {/* Intro */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          <FadeIn>
            <p className="text-white/70 leading-relaxed text-lg">{loc.blurb}</p>
          </FadeIn>
        </div>
      </section>

      {/* Practice areas served */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="mb-10">
            <SectionLabel>Practice Areas</SectionLabel>
            <GoldUnderlineHeading>
              Criminal Defense Services in {loc.city}
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/criminal-defense/${area.slug}`}
                className="flex items-center gap-2 bg-[#111418] border border-white/5 rounded-md px-4 py-3 text-sm text-white/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all"
              >
                <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                {area.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courthouse info */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-8">
                <SectionLabel>Local Courthouse</SectionLabel>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  {loc.courthouse}
                </h3>
                <div className="flex items-start gap-3 text-white/60 mb-4">
                  <MapPin className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-sm">{loc.courthouseAddress}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {loc.city} criminal cases are heard at the {loc.courthouse}. Misdemeanor cases are typically handled at the municipal court level, while felony cases are transferred to the {loc.county} Superior Court.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-8">
                <SectionLabel>Contact</SectionLabel>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Get Help Today
                </h3>
                <div className="space-y-3">
                  <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-3 text-white/60 hover:text-[#C9A84C] transition-colors">
                    <Phone className="w-5 h-5 text-[#C9A84C]" />
                    {SITE.phone}
                  </a>
                  <div className="flex items-start gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                    <span className="text-sm">{SITE.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-white/60">
                    <Clock className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                    <span className="text-sm">Mon-Fri 8AM-6PM · Sat by Appt</span>
                  </div>
                </div>
                <a href={`tel:${SITE.phoneRaw}`} className="btn-gold mt-6">
                  <Phone className="w-4 h-4" /> Free Consultation
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn>
            <div className="rounded-lg overflow-hidden border border-white/5 h-[400px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-112.0736!3d33.4535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzEyLjYiTi0xMTLCsDA0JzI1LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${loc.city} criminal defense attorney office location`}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Other locations */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="mb-8">
            <SectionLabel>Other Service Areas</SectionLabel>
            <GoldUnderlineHeading>
              Also Serving
            </GoldUnderlineHeading>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherLocs.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="flex items-center justify-between bg-[#111418] border border-white/5 rounded-md px-4 py-3 text-sm text-white/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all"
              >
                {l.city}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Facing Charges in ${loc.city}?`}
        subtitle={`Call Jess A. Lorona today. We know the ${loc.city} courts and we know how to win.`}
        bgImage="/manus-storage/final-cta-bg_26217376.jpg"
      />
    </>
  );
}
