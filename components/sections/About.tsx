"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Code2, Brain, Rocket } from "lucide-react";

const CARDS = [
  { icon: Shield, title: "Cybersécurité", desc: "Pentesting éthique, OSINT, analyse de vulnérabilités et renforcement des systèmes.", color: "primary" },
  { icon: Code2,  title: "Dev Full-Stack", desc: "React, Next.js, TypeScript, Python côté backend — des apps modernes et performantes.", color: "secondary" },
  { icon: Brain,  title: "IA & Automatisation", desc: "Intégration de modèles LLM, scripts d'automatisation intelligents et outils OSINT avancés.", color: "accent" },
  { icon: Rocket, title: "Projets Réels", desc: "Chaque projet est une opportunité d'apprendre, de résoudre et de livrer de la valeur réelle.", color: "primary" },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">// À propos</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Qui suis-<span className="text-gradient">je</span> ?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Développeur Full-Stack passionné de cybersécurité basé à Yaoundé, Cameroun. Je conçois des applications web
            robustes tout en assurant leur sécurité dès la conception. Mon objectif : bâtir des solutions numériques
            qui servent les communautés locales et africaines.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((c, i) => (
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
          {[
            { value: "8+", label: "Projets réalisés" },
            { value: "6+", label: "Certifications" },
            { value: "3+", label: "Langages maîtrisés" },
            { value: "∞", label: "Passion" },
          ].map((s) => (
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
