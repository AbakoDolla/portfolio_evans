"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * Pill FR/EN — bascule la langue du portfolio au clic.
 * Le curseur animé glisse sur la langue active.
 */
export function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.ariaLabel}
      title={t.langToggle.title}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-1.5 rounded-full glass border border-primary/25 p-1 pr-1 font-mono text-[11px] font-bold select-none hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 transition-colors"
    >
      <Languages className="w-3.5 h-3.5 ml-1 text-muted-foreground" aria-hidden />
      <span className="relative flex">
        {(["fr", "en"] as const).map((l) => (
          <span
            key={l}
            className={`relative z-10 w-8 py-1 text-center uppercase transition-colors duration-300 ${
              lang === l ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </span>
        ))}
        {/* Sliding cursor */}
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-8 rounded-full bg-primary shadow-md shadow-primary/40"
          animate={{ x: lang === "fr" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      </span>
    </motion.button>
  );
}
