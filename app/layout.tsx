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
  title: { default: "Abah Prince Evans — Dev Full-Stack & Cybersécurité", template: "%s | Abah Prince Evans" },
  description: "Portfolio de Abah Prince Evans, développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
  keywords: ["développeur full-stack","cybersécurité","React","Next.js","Python","Cameroun","Yaoundé","pentesting","OSINT","portfolio","freelance"],
  authors: [{ name: "Abah Prince Evans", url: siteUrl }],
  creator: "Abah Prince Evans",
  openGraph: {
    type: "website", locale: "fr_FR", url: siteUrl, siteName: "Portfolio — Abah Prince Evans",
    title: "Abah Prince Evans — Dev Full-Stack & Cybersécurité",
    description: "Développeur Full-Stack et passionné de cybersécurité basé à Yaoundé, Cameroun.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abah Prince Evans" }],
  },
  twitter: { card: "summary_large_image", title: "Abah Prince Evans", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index:true, follow:true, "max-image-preview":"large","max-snippet":-1 } },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = { themeColor: "#00ffff", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abah Prince Evans",
  url: siteUrl,
  image: `${siteUrl}/images/profile.jpg`,
  jobTitle: "Développeur Full-Stack & Expert Cybersécurité",
  description: "Développeur Full-Stack passionné de cybersécurité, pentesting et OSINT, basé à Yaoundé, Cameroun.",
  address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
  sameAs: ["https://github.com/AbakoDolla","https://www.linkedin.com/in/prince-evans-abah-0000b935a"],
  knowsAbout: ["React","Next.js","TypeScript","Python","Cybersécurité","Pentesting","OSINT"],
  email: "evansabah2006@gmail.com",
  telephone: "+237691439534",
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
