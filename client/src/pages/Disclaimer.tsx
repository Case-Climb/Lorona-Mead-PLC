import { SITE } from "@/lib/siteData";
import { FadeIn, SectionLabel, Breadcrumbs } from "@/components/Shared";
import SEO from "@/components/SEO";

export default function Disclaimer() {
  return (
    <>
    <SEO
      title="Disclaimer | Lorona Mead, PLC"
      description="Legal disclaimer for the Lorona Mead, PLC website. Attorney advertising. Prior results do not guarantee a similar outcome."
      canonical="https://www.loronameadpllc.com/disclaimer"
    />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111418] to-[#0a0a0a]" />
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Disclaimer
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Disclaimer" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                The information provided on this website by {SITE.legalName} ("the Firm") is for general informational purposes only. Nothing on this website should be construed as legal advice or as creating an attorney-client relationship.
              </p>
              <p>
                No attorney-client relationship is formed by your use of this website, by submitting information through any form on this website, or by contacting the Firm through email or telephone. An attorney-client relationship is established only after a formal engagement letter has been signed by both the client and the Firm.
              </p>
              <p>
                The content on this website is not intended to be a substitute for professional legal advice. You should consult with a qualified attorney regarding your specific legal situation before taking any action or refraining from taking any action based on information found on this website.
              </p>
              <p>
                While the Firm strives to keep the information on this website accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Any reliance you place on such information is strictly at your own risk.
              </p>
              <p>
                The case results and testimonials on this website do not guarantee a similar outcome in your case. Every case is unique and the outcome depends on the specific facts and circumstances involved.
              </p>
              <p>
                This website may contain links to external websites that are not provided or maintained by the Firm. We do not guarantee the accuracy or completeness of information on external websites.
              </p>
              <p>
                The Firm is licensed to practice law in the State of Arizona. The information on this website is intended for residents of Arizona. If you are not an Arizona resident, please consult with an attorney licensed in your jurisdiction.
              </p>
              <p>
                Prior results do not guarantee a similar outcome. This website constitutes attorney advertising in accordance with the Arizona Rules of Professional Conduct.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
