import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    template: "%s | Abah Prince Evans",
  },
  description:
    "Portfolio de Abah Prince Evans, développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun. React, Next.js, Python, Pentesting, OSINT.",
  keywords: [
    "développeur", "full-stack", "cybersécurité", "React", "Next.js", "Python",
    "Cameroun", "Yaoundé", "pentesting", "OSINT", "portfolio", "freelance",
  ],
  authors: [{ name: "Abah Prince Evans", url: "https://github.com/AbakoDolla" }],
  creator: "Abah Prince Evans",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-evans-abah.vercel.app",
    siteName: "Portfolio — Abah Prince Evans",
    title: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    description: "Développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
    images: [{ url: "/preview.png", width: 1200, height: 630, alt: "Abah Prince Evans Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    description: "Développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://portfolio-evans-abah.vercel.app" },
};

export const viewport: Viewport = {
  themeColor: "#00ffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
