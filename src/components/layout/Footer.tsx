import { motion } from "framer-motion";
import { Terminal, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-gradient font-bold">APE</span>
            <span className="text-muted-foreground text-sm">.dev</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Abah Prince Evans. Créé avec
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            à Yaoundé
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">
              À propos
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projets
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
