import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/siteData";
import {
  FadeIn,
  SectionLabel,
  GoldUnderlineHeading,
  Breadcrumbs,
} from "@/components/Shared";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";

export default function Contact() {
  return (
    <>
    <SEO
      title="Contact Us | Free Consultation | Lorona Mead, PLC | Phoenix, AZ"
      description="Contact Lorona Mead, PLC for a free criminal defense consultation in Phoenix, AZ. Call (602) 385-6818 or fill out our confidential form. Available 24/7."
      canonical="https://www.loronameadpllc.com/contact"
    />
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/office-renaissance-tower_38924f20.jpg" alt="Renaissance Tower Phoenix" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Free Consultation
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent mb-6" />
            <p className="text-lg text-white/70 max-w-2xl text-balance">
              Phoenix Criminal Defense. Call us or fill out the form below. All communications are confidential.
            </p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <FadeIn>
              <SectionLabel>Send a Message</SectionLabel>
              <GoldUnderlineHeading className="mb-8">
                Tell Us About Your Case
              </GoldUnderlineHeading>
              <ContactForm />
            </FadeIn>

            {/* Contact info */}
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                  <Phone className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">Call Us</h3>
                  <a href={`tel:${SITE.phoneRaw}`} className="text-white/60 hover:text-[#C9A84C] transition-colors block text-lg">
                    {SITE.phone}
                  </a>
                  <p className="text-sm text-white/40 mt-2">Available 24/7 for urgent matters</p>
                </div>

                <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                  <Mail className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">Email Us</h3>
                  <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-[#C9A84C] transition-colors block">
                    {SITE.email}
                  </a>
                </div>

                <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                  <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">Visit Us</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {SITE.address}
                  </p>
                </div>

                <div className="bg-[#111418] border border-white/5 rounded-lg p-6">
                  <Clock className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">Office Hours</h3>
                  <ul className="space-y-2">
                    {SITE.hours.map((h) => (
                      <li key={h.day} className="flex justify-between text-sm text-white/50">
                        <span>{h.day}</span>
                        <span className="text-white/70">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-112.0736!3d33.4535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzEyLjYiTi0xMTLCsDA0JzI1LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lorona Mead PLC office location map"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
