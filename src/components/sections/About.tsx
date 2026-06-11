import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Brain, Network } from "lucide-react";

const CARDS = [
  {
    icon: Shield,
    title: "Blue Team / SOC",
    desc: "Surveillance des environnements informatiques, analyse des événements de sécurité (SIEM), détection et réponse aux incidents.",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Threat Detection",
    desc: "Analyse des indicateurs de compromission (IOC), corrélation d'événements, investigation forensique et threat hunting.",
    color: "secondary",
  },
  {
    icon: Network,
    title: "Réseaux & Infrastructure",
    desc: "TCP/IP, analyse de trafic réseau (Wireshark), configuration Cisco, pare-feux Fortinet et segmentation réseau.",
    color: "accent",
  },
  {
    icon: Brain,
    title: "Dev Web (Bonus)",
    desc: "Compétence complémentaire — React, Next.js, Python. Utile pour automatiser des outils SOC et générer des revenus additionnels.",
    color: "primary",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// À propos</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Qui suis-<span className="text-gradient">je</span> ?
          </h2>
          <p
            className="max-w-3xl mx-auto text-lg leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Futur SOC Analyst orienté Blue Team, je me consacre à la surveillance des
            environnements informatiques, à l'analyse des événements de sécurité et à la
            détection des menaces. Curieux, méthodique et animé par une forte culture de
            l'apprentissage, je développe continuellement mes compétences afin de contribuer
            efficacement à la protection des organisations face aux risques cyber. Chaque projet
            est pour moi une opportunité de renforcer ma compréhension des mécanismes de défense
            et des opérations de sécurité modernes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl group cursor-default"
            >
              <div
                className="p-3 rounded-xl inline-flex mb-4"
                style={{
                  background:
                    c.color === "primary"
                      ? "hsl(var(--primary) / 0.15)"
                      : c.color === "secondary"
                      ? "hsl(var(--secondary) / 0.15)"
                      : "hsl(var(--accent) / 0.15)",
                }}
              >
                <c.icon
                  className="w-6 h-6"
                  style={{
                    color:
                      c.color === "primary"
                        ? "hsl(var(--primary))"
                        : c.color === "secondary"
                        ? "hsl(var(--secondary))"
                        : "hsl(var(--accent))",
                  }}
                />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ transition: "color 0.2s" }}>
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: "6+", label: "Certifications" },
            { value: "8+", label: "Projets réels" },
            { value: "3+", label: "Outils SOC" },
            { value: "∞", label: "Passion" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 glass rounded-xl">
              <div className="text-3xl font-black text-gradient mb-1">{s.value}</div>
              <div
                className="text-xs"
                style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
