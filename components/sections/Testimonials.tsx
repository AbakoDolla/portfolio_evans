"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.testimonials.items;

  return (
    <section id="testimonials" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">{t.testimonials.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.testimonials.titlePre}
            <span className="text-gradient">{t.testimonials.titleHighlight}</span>
            {t.testimonials.titlePost}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.testimonials.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-strong rounded-2xl p-6 relative flex flex-col justify-between group hover:border-primary/40 transition-all"
            >
              <div>
                {/* Quote icon & Star rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1" aria-label={`${item.rating} stars`}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Review content */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20">
                    <CheckCircle2 className="w-3 h-3" /> Vérifié
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Building2 className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                  <span className="truncate">
                    {item.role} • <strong className="text-foreground">{item.company}</strong>
                  </span>
                </div>
                {item.service && (
                  <div className="mt-2 text-[10px] text-primary/80 font-mono bg-primary/5 px-2 py-1 rounded-md border border-primary/15 inline-block">
                    {item.service}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
