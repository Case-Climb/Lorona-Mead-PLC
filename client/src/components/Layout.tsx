import { type ReactNode, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const search = useSearch();

  // Start each new page (including blog pagination) at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, search]);

  useEffect(() => {
    // Load LeadConnector chat widget
    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "6a649ee5c4dda61f3fa2befb");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script and widget elements on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Remove any widget elements that may have been injected
      const widgetElements = document.querySelectorAll('[data-widget-id="6a649ee5c4dda61f3fa2befb"]');
      widgetElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
