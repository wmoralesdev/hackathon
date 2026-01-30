import type { Metadata } from "next";

const SITE_URL = "https://hack.cursor-sv.com";

export type Language = "en" | "es";

interface LandingMetadataConfig {
  lang: Language;
  path?: string;
}

export function generateLandingMetadata({
  lang,
  path = "",
}: LandingMetadataConfig): Metadata {
  const isSpanish = lang === "es";
  const locale = isSpanish ? "es_SV" : "en_US";
  const canonicalPath = path || `/${lang}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const title = isSpanish
    ? "Cursor Hackathon San Salvador | La Primera Plataforma de Builders en Centroamérica"
    : "Cursor Hackathon San Salvador | Central America's First Builder Platform";

  const description = isSpanish
    ? "Únete a la primera hackatón de builders en Centroamérica el 31 de enero de 2026. Construye, lanza y despliega productos SaaS usando Cursor. ¡Cupo limitado a 150 builders!"
    : "Join Central America's first builder platform hackathon on January 31, 2026. Build, ship, and deploy SaaS products using Cursor. Limited to 150 builders!";

  const keywords = isSpanish
    ? "cursor hackathon, san salvador, centroamérica, plataforma builders, saas, desarrollo ia, hackathon 2026"
    : "cursor hackathon, san salvador, central america, builder platform, saas, ai development, hackathon 2026";

  return {
    title: {
      template: "%s | Cursor Hackathon",
      default: title,
    },
    description,
    keywords,
    authors: [{ name: "Walter Morales" }],
    creator: "Walter Morales",
    publisher: "Cursor Hackathon San Salvador",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en${path}`,
        es: `${SITE_URL}/es${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: canonicalUrl,
      siteName: "Cursor Hackathon San Salvador",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Cursor Hackathon San Salvador",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@cursorsv",
      site: "@cursorsv",
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateEventStructuredData(lang: Language): object {
  const isSpanish = lang === "es";
  const eventName = "Cursor Hackathon San Salvador";

  const eventDescription = isSpanish
    ? "La primera hackatón de builders en Centroamérica. Construye, lanza y despliega productos SaaS usando Cursor."
    : "Central America's first builder platform hackathon. Build, ship, and deploy SaaS products using Cursor.";

  const locationName = isSpanish
    ? "Universidad Centroamericana José Simeón Cañas - Aulas D24, D35 y D37"
    : "Universidad Centroamericana José Simeón Cañas - Classrooms D24, D35 and D37";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: eventDescription,
    startDate: "2026-01-31T09:00:00-06:00",
    endDate: "2026-01-31T17:00:00-06:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Salvador",
        addressCountry: "SV",
      },
    },
    organizer: {
      "@type": "Person",
      name: "Walter Morales",
      jobTitle: isSpanish
        ? "Ing. de Software en SOUTHWORKS | Cursor Ambassador for El Salvador"
        : "Software Engineer at SOUTHWORKS | Cursor Ambassador for El Salvador",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/LimitedAvailability",
      price: "0",
      priceCurrency: "USD",
      validFrom: "2025-01-01T00:00:00-06:00",
    },
    maximumAttendeeCapacity: 150,
    audience: {
      "@type": "Audience",
      audienceType: isSpanish
        ? "Builders, Desarrolladores, Diseñadores, Emprendedores"
        : "Builders, Developers, Designers, Entrepreneurs",
    },
  };
}
