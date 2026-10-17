import { Link } from "wouter";
import { Phone, ChevronRight, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import {
  SITE,
  PRACTICE_AREAS,
  LOCATIONS,
  OTHER_CITIES,
  REVIEWS,
  HOME_FAQS,
  PROCESS_STEPS,
  TRUST_BADGES,
} from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  GoogleBadge,
  CTASection,
  TrustBadges,
} from "@/components/Shared";
import FAQAccordion from "@/components/FAQAccordion";
import SEO from "@/components/SEO";
import { firmSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
    <SEO
      title="Criminal Defense Attorney Phoenix AZ | Lorona Mead, PLC"
      description="Phoenix criminal defense attorney Jess A. Lorona. Aggressive, experienced criminal defense across all of Arizona. Free consultation. Available 24/7. Call (602) 385-6818."
      canonical="https://www.loronameadpllc.com/"
      schema={{
        "@context": "https://schema.org",
        ...firmSchema(),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: SITE.rating,
          reviewCount: SITE.reviewCount,
        },
      }}
    />
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/manus-storage/hero-phoenix-skyline_96c7b9a0.jpg"
            alt="Phoenix skyline at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
        </div>
        <div className="container relative z-10 pt-32 pb-20">
          <FadeIn>
            <div className="max-w-2xl">
              <div className="section-label mb-4">Phoenix Criminal Defense Attorney</div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6 text-balance">
                Phoenix Criminal Defense Attorney
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl text-balance">
                Aggressive, experienced criminal defense across all of Arizona. Every charge. Every case. Every step of the way.
              </p>
              <div className="mb-8">
                <GoogleBadge />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a href={`tel:${SITE.phoneRaw}`} className="btn-gold">
                  <Phone className="w-4 h-4" /> Free Consultation
                </a>
                <a href={`tel:${SITE.phoneRaw}`} className="btn-outline-gold">
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRACTICE AREAS GRID */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="text-center mb-14">
            <SectionLabel>What We Do</SectionLabel>
            <GoldUnderlineHeading center>
              Criminal Defense Practice Areas
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              From DUI to federal drug trafficking, we defend every type of criminal case in Arizona. Explore our practice areas to learn more.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 60}>
                <Link
                  href={`/criminal-defense/${area.slug}`}
                  className="group block bg-[#111418] border border-white/5 rounded-lg overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A84C]/5"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111418] to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">
                      {area.blurb}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {area.subAreas.slice(0, 4).map((sub) => (
                        <li key={sub} className="flex items-center gap-2 text-xs text-white/40">
                          <ChevronRight className="w-3 h-3 text-[#C9A84C] shrink-0" />
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

      {/* SPLIT CTA BAND */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/cta-band-bg_080f7c73.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="container relative z-10">
          <FadeIn className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 text-balance">
                Charged with a crime?
              </h2>
              <p className="text-lg text-white/60">
                Get a free, confidential case review. No pressure, no judgment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href={`tel:${SITE.phoneRaw}`} className="btn-gold">
                <Phone className="w-4 h-4" /> Call {SITE.phone}
              </a>
              <Link href="/contact" className="btn-outline-gold">
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src="/manus-storage/story-bg_36d115a6.jpg"
                  alt="Downtown Phoenix at night"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#C9A84C]/20 rounded-lg p-6">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-[#C9A84C]">
                    43+
                   </div>
                   <div className="text-sm text-white/60 mt-1">
                     Years Defending Arizonans
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div>
                <SectionLabel>Our Story</SectionLabel>
                <GoldUnderlineHeading className="mb-6">
                  Decades Defending Arizonans
                </GoldUnderlineHeading>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>
                    Jess A. Lorona has been practicing criminal defense in Arizona for over four decades. As a former prosecutor, he understands how the state builds cases and how to dismantle them.
                  </p>
                  <p>
                    Lorona Mead, PLC was founded on a simple principle: every person accused of a crime deserves an aggressive, experienced defense. From first-offense misdemeanors to complex federal trials, we have handled thousands of cases and earned a reputation for relentless advocacy.
                  </p>
                  <p>
                    We know that behind every case file is a person whose life, family, and future are on the line. That is why we treat every client with respect, every case with urgency, and every charge with the seriousness it deserves.
                  </p>
                </div>
                <Link
                  href="/attorney"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#C9A84C] hover:gap-3 transition-all"
                >
                  Meet Jess Lorona <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-14">
            <SectionLabel>How We Work</SectionLabel>
            <GoldUnderlineHeading center>
              Our Process
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              We keep the process clear and straightforward. From your first call to final resolution, we handle every detail.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 80}>
                <div className="relative bg-[#111418] border border-white/5 rounded-lg p-6 h-full hover:border-[#C9A84C]/20 transition-colors">
                  <div className="font-serif text-5xl font-bold text-[#C9A84C]/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE WE WORK */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Where We Work</SectionLabel>
            <GoldUnderlineHeading center>
              Serving All of Arizona
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              Based in Phoenix, serving every corner of Arizona. Find your city below.
            </p>
          </FadeIn>

          {/* Primary city */}
          <FadeIn className="mb-10">
            <div className="bg-[#111418] border border-[#C9A84C]/20 rounded-lg p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="section-label mb-2">Primary Service Area</div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-4">
                    Phoenix, AZ
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-4">
                    {LOCATIONS[0].blurb}
                  </p>
                  <Link
                    href="/phoenix"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] hover:gap-3 transition-all"
                  >
                    Phoenix Criminal Defense Attorney <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {LOCATIONS.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}`}
                      className="flex items-center gap-2 bg-[#0a0a0a] border border-white/5 rounded-md px-4 py-3 text-sm text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all"
                    >
                      <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      {loc.city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Other cities */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 justify-center">
              {OTHER_CITIES.map((city) => (
                <span
                  key={city}
                  className="text-sm text-white/40 px-3 py-1.5 rounded-full border border-white/5"
                >
                  {city}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Client Reviews</SectionLabel>
            <GoldUnderlineHeading center>
              What Our Clients Say
            </GoldUnderlineHeading>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <span className="text-white/60 text-sm">
                {SITE.rating} · {SITE.reviewCount} Google reviews
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#B8973E] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
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

          <FadeIn className="text-center mt-10">
            <Link href="/testimonials" className="btn-outline-gold">
              Read More Reviews
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container max-w-3xl">
          <FadeIn className="text-center mb-14">
            <SectionLabel>FAQ</SectionLabel>
            <GoldUnderlineHeading center>
              Common Questions
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              Answers to the questions clients ask most before hiring a criminal defense attorney. Not seeing yours? Call us.
            </p>
          </FadeIn>
          <FadeIn>
            <FAQAccordion faqs={HOME_FAQS} />
          </FadeIn>
        </div>
      </section>

      {/* FIND US */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Find Us</SectionLabel>
            <GoldUnderlineHeading center>
              Proudly Based in Phoenix, AZ
            </GoldUnderlineHeading>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">
              Stop by, call, or book online. We are always nearby when you need us.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeIn>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                <Phone className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Phone</h3>
                <a href={`tel:${SITE.phoneRaw}`} className="text-white/60 hover:text-[#C9A84C] transition-colors block">
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-[#C9A84C] transition-colors block mt-2">
                  {SITE.email}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Address</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {SITE.address}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="bg-[#111418] border border-white/5 rounded-lg p-6 h-full">
                <Clock className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-white mb-3">Hours</h3>
                <ul className="space-y-1.5">
                  {SITE.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-xs text-white/50">
                      <span>{h.day}</span>
                      <span className="text-white/70">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-6">
            <div className="rounded-lg overflow-hidden border border-white/5 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-112.0736!3d33.4535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzEyLjYiTi0xMTLCsDA0JzI1LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lorona Mead PLC office location"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/final-cta-bg_26217376.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/85 to-[#0a0a0a]/95" />
        </div>
        <div className="container relative z-10 text-center">
          <FadeIn>
            <SectionLabel>Get Started Today</SectionLabel>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 text-balance max-w-3xl mx-auto">
              Your Defense Starts With One Call
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 text-balance">
              Lorona Mead, PLC serves Phoenix and all of Arizona with aggressive criminal defense. Free consultation, clear options, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href={`tel:${SITE.phoneRaw}`} className="btn-gold">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
              <Link href="/contact" className="btn-outline-gold">
                Free Consultation
              </Link>
            </div>
            <TrustBadges badges={TRUST_BADGES} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
