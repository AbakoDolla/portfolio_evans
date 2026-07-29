"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div className="flex items-center gap-2 font-mono" whileHover={{ scale: 1.05 }}>
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">AbahDev<span className="text-secondary">_</span></span>
          </motion.div>
          <p className="text-sm text-muted-foreground text-center font-mono">
            © {new Date().getFullYear()} Abah Prince Evans • {t.footer.location}
          </p>
          <div className="flex gap-3">
            {[
              { icon: Github,   href: "https://github.com/AbakoDolla",           label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
              { icon: Mail,     href: "mailto:evansabah2006@gmail.com",           label: "Email" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.icon !== Mail ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:border-primary/40 transition-all"
                whileHover={{ scale: 1.15, y: -3 }}
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
