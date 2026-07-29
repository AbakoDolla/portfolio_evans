"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/lib/i18n";

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  const NAV_LINKS = [
    { href: "#hero",           label: t.nav.home },
    { href: "#about",          label: t.nav.about },
    { href: "#skills",         label: t.nav.skills },
    { href: "#projects",       label: t.nav.projects },
    { href: "#certifications", label: t.nav.certifications },
    { href: "#blog",           label: t.nav.blog },
    { href: "#services",       label: t.nav.services },
    { href: "#contact",        label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-primary/10 shadow-lg shadow-primary/5" : ""
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a href="#hero" className="flex items-center gap-2 font-mono" whileHover={{ scale: 1.05 }}>
          <Terminal className="w-5 h-5 text-primary" />
          <span className="text-primary font-bold">AbahDev<span className="text-secondary">_</span></span>
        </motion.a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1.5 rounded-lg font-mono text-sm transition-all ${
                active === link.href.slice(1)
                  ? "text-primary bg-primary/10 border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {link.label}
            </motion.a>
          ))}
          <div className="w-px h-6 mx-2 bg-border/60" aria-hidden />
          <LanguageToggle />
        </div>

        {/* Mobile: toggle langue + burger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            className="p-2 rounded-lg glass"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 glass"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-lg font-mono text-sm transition-all ${
                    active === link.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
