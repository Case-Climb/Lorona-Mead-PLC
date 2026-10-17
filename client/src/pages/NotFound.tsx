import { Link } from "wouter";
import { Home as HomeIcon, Phone } from "lucide-react";
import { SITE } from "@/lib/siteData";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20">
      <SEO
        title="Page Not Found | Lorona Mead, PLC"
        description="The page you are looking for does not exist. Call Lorona Mead, PLC at (602) 385-6818 for a free consultation."
        noindex
      />
      <div className="container text-center">
        <div className="font-serif text-8xl md:text-9xl font-bold text-[#C9A84C]/20 mb-4">
          404
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/50 max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-gold">
            <HomeIcon className="w-4 h-4" /> Back to Home
          </Link>
          <a href={`tel:${SITE.phoneRaw}`} className="btn-outline-gold">
            <Phone className="w-4 h-4" /> {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
