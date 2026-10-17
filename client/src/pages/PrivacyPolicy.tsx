import { SITE } from "@/lib/siteData";
import { FadeIn, SectionLabel, Breadcrumbs } from "@/components/Shared";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
    <SEO
      title="Privacy Policy | Lorona Mead, PLC"
      description="Privacy policy for the Lorona Mead, PLC website. How we collect, use, and protect your personal information."
      canonical="https://www.loronameadpllc.com/privacy-policy"
    />
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111418] to-[#0a0a0a]" />
        <div className="container relative z-10">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </FadeIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Information We Collect</h2>
                <p>
                  {SITE.legalName} respects your privacy. We collect information that you voluntarily provide when you contact us through our website, including your name, phone number, email address, and any information you include in your message. We also collect anonymous analytics data about website usage to improve our services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
                <p>
                  We use the information you provide to respond to your inquiry, evaluate whether we can assist you with your legal matter, and communicate with you about your case. We do not sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Confidentiality</h2>
                <p>
                  Please be aware that submitting information through our website does not create an attorney-client relationship. Until an attorney-client relationship is formally established, the information you share is not protected by attorney-client privilege. Please do not share confidential or sensitive information through our contact form.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Cookies and Analytics</h2>
                <p>
                  This website may use cookies and analytics tools to understand how visitors use the site. This data is anonymous and is used solely to improve the website's functionality and user experience. You can disable cookies in your browser settings.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Data Security</h2>
                <p>
                  We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Third-Party Links</h2>
                <p>
                  This website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any websites you visit.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Your Rights</h2>
                <p>
                  You have the right to request access to, correction of, or deletion of your personal information. To exercise any of these rights, please contact us at {SITE.email} or {SITE.phone}.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-3">Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, please contact us at {SITE.email} or {SITE.phone}.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
