"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Accueil" },
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projets" },
  { href: "#certifications", label: "Certifs" },
  { href: "#blog", label: "Blog" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b shadow-lg" : ""
      }`}
      style={scrolled ? { borderColor: "hsl(var(--primary) / 0.1)", boxShadow: "0 4px 30px hsl(var(--primary) / 0.05)" } : {}}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a href="#hero" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <Terminal className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
          <span style={{ color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)", fontWeight: 700 }}>
            AbahSec<span style={{ color: "hsl(var(--secondary))" }}>_</span>
          </span>
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{
                fontFamily: "var(--app-font-mono)",
                color:
                  active === link.href.slice(1)
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                background:
                  active === link.href.slice(1)
                    ? "hsl(var(--primary) / 0.1)"
                    : undefined,
                border:
                  active === link.href.slice(1)
                    ? "1px solid hsl(var(--primary) / 0.2)"
                    : "1px solid transparent",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg glass"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}
            className="md:hidden glass"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    fontFamily: "var(--app-font-mono)",
                    color:
                      active === link.href.slice(1)
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground))",
                    background:
                      active === link.href.slice(1)
                        ? "hsl(var(--primary) / 0.1)"
                        : undefined,
                  }}
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
