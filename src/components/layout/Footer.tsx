import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 mt-16" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <Terminal className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
            <span style={{ color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)", fontWeight: 700 }}>
              AbahSec<span style={{ color: "hsl(var(--secondary))" }}>_</span>
            </span>
          </motion.div>
          <p className="text-sm text-center" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>
            © {new Date().getFullYear()} Abah Prince Evans · Yaoundé, Cameroun · SOC Blue Team
          </p>
          <div className="flex gap-3">
            {[
              { icon: Github, href: "https://github.com/AbakoDolla", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
              { icon: Mail, href: "mailto:evansabah2006@gmail.com", label: "Email" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.icon !== Mail ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass transition-all"
                style={{ color: "hsl(var(--muted-foreground))" }}
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
