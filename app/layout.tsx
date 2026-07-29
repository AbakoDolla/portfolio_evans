import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://portfolio-evans-abah.vercel.app";

// Fetch live theme from Supabase (ISR 60s) — falls back to defaults if not configured
async function getTheme(): Promise<{ primary: string; secondary: string; accent: string }> {
  const defaults = { primary: "180 100% 50%", secondary: "150 100% 50%", accent: "30 100% 60%" };
  try {
    const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return defaults;
    const res = await fetch(`${url}/rest/v1/theme_config?select=primary_color,secondary_color,accent_color&id=eq.1&limit=1`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return defaults;
    const data = await res.json();
    const row = data?.[0];
    if (!row) return defaults;
    return {
      primary:   hexToHsl(row.primary_color)   ?? defaults.primary,
      secondary: hexToHsl(row.secondary_color) ?? defaults.secondary,
      accent:    hexToHsl(row.accent_color)    ?? defaults.accent,
    };
  } catch { return defaults; }
}

function hexToHsl(hex: string): string | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return null;
  const r = parseInt(m[1].slice(0,2),16)/255, g = parseInt(m[1].slice(2,4),16)/255, b = parseInt(m[1].slice(4,6),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0;
  const l = (max+min)/2;
  if (max !== min) {
    const d = max-min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){ case r: h=((g-b)/d+(g<b?6:0))/6; break; case g: h=((b-r)/d+2)/6; break; case b: h=((r-g)/d+4)/6; break; }
  }
  return `${Math.round(h*360)} ${Math.round(s*100)}% ${Math.round(l*100)}%`;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abah Prince Evans — SOC Analyst | Blue Team | Dev Full-Stack & Cybersécurité",
    template: "%s | Abah Prince Evans — SOC Analyst & Dev Full-Stack",
  },
  description:
    "Portfolio professionnel d'Abah Prince Evans, SOC Analyst orienté Blue Team et Développeur Full-Stack basé à Yaoundé, Cameroun. Spécialisé en surveillance des environnements informatiques, détection des menaces, SIEM (Splunk, Wireshark), pentesting et développement web moderne (Next.js, Python).",
  keywords: [
    "SOC Analyst",
    "Analyste SOC",
    "Blue Team",
    "SIEM",
    "Wireshark",
    "Splunk",
    "détection de menaces",
    "Threat Hunting",
    "Incident Response",
    "cybersécurité",
    "Cameroun",
    "Yaoundé",
    "sécurité informatique",
    "pentest",
    "audit sécurité",
    "développeur full-stack",
    "React 19",
    "Next.js 15",
    "TypeScript",
    "Python",
    "OSINT",
    "Abah Prince Evans",
    "AbakoDolla",
    "AbahSec",
  ],
  authors: [{ name: "Abah Prince Evans", url: siteUrl }],
  creator: "Abah Prince Evans",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "AbahSec — Portfolio SOC Analyst & Dev Full-Stack",
    title: "Abah Prince Evans — SOC Analyst | Blue Team | Dev Full-Stack & Cybersécurité",
    description:
      "SOC Analyst orienté Blue Team et Développeur Full-Stack basé à Yaoundé, Cameroun. Surveillance SIEM, détection des menaces et applications web sécurisées.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abah Prince Evans — SOC Analyst & Dev Full-Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abah Prince Evans — SOC Analyst | Blue Team | Dev Full-Stack",
    description:
      "SOC Analyst orienté Blue Team & Dev Full-Stack à Yaoundé, Cameroun. Surveillance, détection des menaces, SIEM, Wireshark, Splunk.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = { themeColor: "#00ffff", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abah Prince Evans",
      alternateName: ["AbakoDolla", "AbahSec"],
      jobTitle: "SOC Analyst — Blue Team & Développeur Full-Stack",
      description:
        "Analyste SOC (Security Operations Center) orienté Blue Team et Développeur Full-Stack basé à Yaoundé, Cameroun. Spécialisé en surveillance des environnements informatiques, détection des menaces, SIEM, pentesting et développement web moderne.",
      url: siteUrl,
      image: `${siteUrl}/images/profile.jpg`,
      email: "evansabah2006@gmail.com",
      telephone: "+237691439534",
      address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
      sameAs: ["https://github.com/AbakoDolla", "https://www.linkedin.com/in/prince-evans-abah-0000b935a"],
      knowsAbout: [
        "SOC Analysis",
        "Blue Team Operations",
        "SIEM",
        "Threat Detection",
        "Wireshark",
        "Splunk",
        "Linux Security",
        "Network Analysis",
        "Incident Response",
        "OSINT",
        "Python Scripting",
        "Cybersecurity",
        "React",
        "Next.js",
        "TypeScript",
        "Pentesting",
        "OWASP Top 10",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Introduction à la Cybersécurité",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "Cisco" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Linux Unhatched",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "Cisco" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Fortinet Certified Professional — NSE",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "Fortinet" },
        },
      ],
      offers: [
        { "@type": "Offer", name: "Audit de sécurité / Pentest", price: "80000", priceCurrency: "XAF" },
        {
          "@type": "Offer",
          name: "Consultation Cybersécurité & SOC",
          price: "25000",
          priceCurrency: "XAF",
          priceSpecification: { "@type": "UnitPriceSpecification", unitText: "heure" },
        },
        { "@type": "Offer", name: "Application web complète Next.js", price: "150000", priceCurrency: "XAF" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AbahSec — Portfolio SOC Analyst & Dev Full-Stack",
      description:
        "Portfolio professionnel de Abah Prince Evans, SOC Analyst Blue Team et Développeur Full-Stack basé à Yaoundé, Cameroun.",
      author: { "@id": `${siteUrl}/#person` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/#projects`,
      },
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme();
  const themeVars = `
    :root {
      --primary: ${theme.primary};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
    }
  `;
  return (
    <html lang="fr" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <Script id="json-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="bottom-right" theme="dark" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
