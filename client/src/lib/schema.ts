import { LOCATIONS, OTHER_CITIES, SITE } from "@/lib/siteData";

const BASE = `https://${SITE.domain}`;
export const FIRM_ID = `${BASE}/#firm`;

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/** schema.org description of the firm, shared by every page that marks it up. */
export function firmSchema(): Record<string, unknown> {
  return {
    "@type": "LegalService",
    "@id": FIRM_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${BASE}/`,
    logo: `${BASE}/manus-storage/logo-lm-gold_73de6277.png`,
    image: `${BASE}/manus-storage/office-renaissance-tower_38924f20.jpg`,
    description:
      "Phoenix criminal defense law firm serving clients across Arizona.",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "One Renaissance Tower, 2 N. Central Ave., Suite 1800",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      postalCode: "85004",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "State", name: "Arizona" },
      ...[...LOCATIONS.map(l => l.city), ...OTHER_CITIES].map(name => ({
        "@type": "City",
        name,
      })),
    ],
    founder: {
      "@type": "Person",
      name: SITE.attorney,
      url: `${BASE}/attorney`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}
