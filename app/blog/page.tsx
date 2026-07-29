import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

const siteUrl = "https://portfolio-evans-abah.vercel.app";

export const metadata: Metadata = {
  title: "Blog Tech, Cybersécurité, SOC Analyst & IA | Abah Prince Evans",
  description:
    "Veille technologique, articles et actualités en direct sur la cybersécurité, la surveillance SIEM (SOC Analyst), l'intelligence artificielle et le développement web moderne.",
  keywords: [
    "blog cybersécurité",
    "actualités SOC Analyst",
    "SIEM Splunk Wireshark",
    "intelligence artificielle",
    "développement web Next.js",
    "veille technologique",
    "Blue Team",
    "Abah Prince Evans",
    "AbahSec",
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog Tech & Cybersécurité — Abah Prince Evans",
    description:
      "Veille tech en direct : sécurité informatique, détection de menaces (SOC), IA et développement web.",
    url: `${siteUrl}/blog`,
    type: "website",
    locale: "fr_FR",
    siteName: "AbahSec — Portfolio SOC Analyst & Dev Full-Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Tech, Cybersécurité & SOC — Abah Prince Evans",
    description:
      "Actualités et veille cybersécurité, SOC Analyst, IA et dev web.",
  },
};

export default function BlogPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="pt-20">
        <Blog />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
