import { LanguageProvider } from "@/lib/i18n";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Blog } from "@/components/sections/Blog";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Blog />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
