import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://portfolio-evans-abah.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    template: "%s | Abah Prince Evans",
  },
  description:
    "Portfolio de Abah Prince Evans, développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun. React, Next.js, Python, Pentesting, OSINT.",
  keywords: [
    "développeur full-stack", "cybersécurité", "React", "Next.js", "Python",
    "Cameroun", "Yaoundé", "pentesting", "OSINT", "portfolio", "freelance",
    "développeur web Cameroun", "sécurité informatique Afrique",
  ],
  authors: [{ name: "Abah Prince Evans", url: siteUrl }],
  creator: "Abah Prince Evans",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Portfolio — Abah Prince Evans",
    title: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    description: "Développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
    images: [{
      url: "/opengraph-image",
      width: 1200, height: 630,
      alt: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    description: "Développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: siteUrl },
  verification: { google: "" },
};

export const viewport: Viewport = {
  themeColor: "#00ffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abah Prince Evans",
  url: siteUrl,
  image: `${siteUrl}/images/profile.jpg`,
  jobTitle: "Développeur Full-Stack & Expert Cybersécurité",
  description: "Développeur Full-Stack passionné de cybersécurité, pentesting et OSINT, basé à Yaoundé, Cameroun.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  sameAs: [
    "https://github.com/AbakoDolla",
    "https://www.linkedin.com/in/prince-evans-abah-0000b935a",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "Python", "Node.js",
    "Cybersécurité", "Pentesting", "OSINT", "Développement Web",
  ],
  email: "evansabah2006@gmail.com",
  telephone: "+237691439534",
  offers: {
    "@type": "Offer",
    description: "Services de développement web Full-Stack et audit de cybersécurité",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="bottom-right" theme="dark" />
        <SpeedInsights />
      </body>
    </html>
  );
}
