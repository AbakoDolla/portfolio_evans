"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Code2, Brain, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const CARD_META = [
  { icon: Shield, color: "primary" },
  { icon: Code2,  color: "secondary" },
  { icon: Brain,  color: "accent" },
  { icon: Rocket, color: "primary" },
];

const STAT_VALUES = ["8+", "6+", "3+", "∞"];

export function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = CARD_META.map((m, i) => ({ ...m, ...t.about.cards[i] }));

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">{t.about.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.about.titlePre}<span className="text-gradient">{t.about.titleHighlight}</span>{t.about.titlePost}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl group cursor-default">
              <div className={`p-3 rounded-xl inline-flex mb-4 ${
                c.color === "primary" ? "bg-primary/15" : c.color === "secondary" ? "bg-secondary/15" : "bg-accent/15"}`}>
                <c.icon className={`w-6 h-6 ${
                  c.color === "primary" ? "text-primary" : c.color === "secondary" ? "text-secondary" : "text-accent"}`} />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          {STAT_VALUES.map((value, i) => ({ value, label: t.about.stats[i] })).map((s) => (
            <div key={s.label} className="text-center p-4 glass rounded-xl">
              <div className="text-3xl font-black text-gradient mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
