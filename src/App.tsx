import { Toaster } from "sonner";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { Blog } from "./components/sections/Blog";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Blog />
        <Services />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
}
