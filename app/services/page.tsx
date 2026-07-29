import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

const siteUrl = "https://portfolio-evans-abah.vercel.app";

export const metadata: Metadata = {
  title: "Services & Tarifs Dev Web, Pentest & SOC Analyst | Abah Prince Evans",
  description:
    "Prestations freelance d'Abah Prince Evans : développement web moderne (Next.js, React, Python), audit de sécurité / pentest éthique, consultation en cybersécurité et analyse de sécurité SOC à Yaoundé, Cameroun.",
  keywords: [
    "services développeur full-stack",
    "consulting SOC Analyst",
    "pentest Cameroun",
    "audit sécurité Yaoundé",
    "développement web Next.js",
    "automatisation Python",
    "freelance cybersécurité",
    "Abah Prince Evans",
    "AbakoDolla",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Services & Tarifs — Abah Prince Evans (Dev Full-Stack & SOC)",
    description:
      "Découvrez mes prestations web et cybersécurité à Yaoundé, Cameroun : création d'applications, audits OWASP, pentesting et consulting.",
    url: `${siteUrl}/services`,
    type: "website",
    locale: "fr_FR",
    siteName: "AbahSec — Portfolio SOC Analyst & Dev Full-Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Tarifs — Abah Prince Evans",
    description:
      "Prestations web & cybersécurité : Next.js, audit sécurité, pentest et consulting SOC à Yaoundé.",
  },
};

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="pt-20">
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
