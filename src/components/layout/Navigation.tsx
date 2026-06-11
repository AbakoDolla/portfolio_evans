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

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

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

  const handleMobileLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.slice(1);
    setTimeout(() => scrollToSection(id), 200);
  };

  const handleDesktopLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href.slice(1));
  };

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "rgba(5, 10, 24, 0.85)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid hsl(var(--primary) / 0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }
            : {}
        }
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => handleDesktopLink(e, "#hero")}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
            <span
              style={{
                color: "hsl(var(--primary))",
                fontFamily: "var(--app-font-mono)",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              AbahSec<span style={{ color: "hsl(var(--secondary))" }}>_</span>
            </span>
          </motion.a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleDesktopLink(e, link.href)}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-lg text-sm transition-all"
                  style={{
                    fontFamily: "var(--app-font-mono)",
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    background: isActive ? "hsl(var(--primary) / 0.08)" : "transparent",
                    border: isActive
                      ? "1px solid hsl(var(--primary) / 0.2)"
                      : "1px solid transparent",
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 p-2 rounded-xl transition-all"
            style={{
              background: mobileOpen
                ? "hsl(var(--primary) / 0.15)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" style={{ color: "hsl(var(--foreground))" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu — slides down from the nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden relative z-50"
              style={{
                background: "rgba(5, 10, 24, 0.97)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid hsl(var(--primary) / 0.12)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={(e) => handleMobileLink(e, link.href)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
                      style={{
                        fontFamily: "var(--app-font-mono)",
                        color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        background: isActive
                          ? "hsl(var(--primary) / 0.1)"
                          : "rgba(255,255,255,0.02)",
                        border: isActive
                          ? "1px solid hsl(var(--primary) / 0.2)"
                          : "1px solid transparent",
                      }}
                    >
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary))" }}
                        />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
