import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Code2, Brain, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Cybersécurité",
    description: "Pentesting, OWASP, exploitation éthique",
  },
  {
    icon: Code2,
    title: "Développement",
    description: "React, Python, automatisation",
  },
  {
    icon: Brain,
    title: "IA & Machine Learning",
    description: "Vision par ordinateur, OSINT",
  },
  {
    icon: Rocket,
    title: "Autodidacte",
    description: "Apprentissage rapide et constant",
  },
];

const timeline = [
  { year: "2023", event: "Début de l'apprentissage en cybersécurité" },
  { year: "2024", event: "Premier pentest sur Metasploitable2" },
  { year: "2024", event: "Création du VPN personnel avec WireGuard" },
  { year: "2024", event: "Développement d'outils OSINT en Python" },
  { year: "2025", event: "Projet LYNX - Assistant IA Cybersécurité" },
];

export function About() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      />

      {/* Floating Background Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="font-mono text-primary text-sm mb-4 block"
          >
            // À propos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Qui suis-je<motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gradient inline-block"
            >?</motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            style={{ x: leftX, opacity }}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-strong rounded-2xl p-8"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Étudiant passionné en <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-primary font-medium inline-block"
                >cybersécurité</motion.span> à Yaoundé, Cameroun.
                J'assemble outils, scripts Python et applications pour comprendre et protéger les systèmes.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Spécialisé en <motion.span whileHover={{ scale: 1.1 }} className="text-secondary font-medium inline-block">pentesting</motion.span>,
                <motion.span whileHover={{ scale: 1.1 }} className="text-primary font-medium inline-block"> VPN</motion.span> et
                <motion.span whileHover={{ scale: 1.1 }} className="text-secondary font-medium inline-block"> OSINT</motion.span>,
                je développe aussi des interfaces modernes avec React et des outils d'automatisation en Python.
              </motion.p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors group cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-8 h-8 text-primary mb-2" />
                    </motion.div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            style={{ x: rightX, opacity }}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                Parcours
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: "100%" } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute left-[7px] top-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30"
                />

                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.15,
                      type: "spring",
                    }}
                    whileHover={{ x: 10 }}
                    className="relative pl-8 pb-6 last:pb-0 cursor-default"
                  >
                    {/* Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.15, type: "spring" }}
                      whileHover={{ scale: 1.5 }}
                      className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary"
                    />

                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="font-mono text-primary text-sm inline-block"
                    >
                      {item.year}
                    </motion.span>
                    <p className="text-foreground mt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              className="mt-6 glass-strong rounded-2xl p-6"
            >
              <h4 className="font-semibold mb-4">Langues</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Français</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.5 }}
                      className="text-primary"
                    >
                      Expert
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={isInView ? { width: "90%", opacity: 1 } : {}}
                      transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>English</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.6 }}
                      className="text-secondary"
                    >
                      Intermediate
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={isInView ? { width: "50%", opacity: 1 } : {}}
                      transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-secondary to-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
