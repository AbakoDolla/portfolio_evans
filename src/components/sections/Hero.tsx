import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Grid BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 cyber-grid opacity-30" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
        style={{ background: "hsl(var(--primary) / 0.08)" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
        style={{ background: "hsl(var(--secondary) / 0.08)", animationDelay: "1s" }}
      />

      {/* Scan lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.15), transparent)",
            }}
            animate={{ x: ["-100%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 0.7, ease: "linear" }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm"
              style={{ fontFamily: "var(--app-font-mono)" }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: "hsl(var(--secondary))" }}
              />
              <span style={{ color: "hsl(var(--muted-foreground))" }}>status</span>
              <span style={{ color: "hsl(var(--primary))" }}>= "disponible"</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>Abah Prince</span>
              <br />
              <span className="text-gradient neon-text">Evans</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl mb-3 font-light"
              style={{ color: "hsl(var(--muted-foreground))" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              SOC Analyst · Blue Team · Cybersécurité
            </motion.p>

            <motion.p
              className="text-sm sm:text-base mb-3 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Futur SOC Analyst orienté Blue Team, je me consacre à la surveillance des
              environnements informatiques, à l'analyse des événements de sécurité et à la
              détection des menaces. Curieux, méthodique et animé par une forte culture de
              l'apprentissage, je développe continuellement mes compétences afin de contribuer
              à la protection des organisations face aux risques cyber.
            </motion.p>

            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-sm mb-8"
              style={{ color: "hsl(var(--muted-foreground))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <MapPin className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
              <span>Yaoundé, Cameroun</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-all neon-border text-center"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                }}
              >
                Voir mes projets
              </motion.a>
              <motion.a
                href="#certifications"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl glass font-bold transition-all text-center"
                style={{
                  color: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--secondary) / 0.3)",
                }}
              >
                Mes certifications
              </motion.a>
              <motion.a
                href="https://wa.me/+237691439534?text=Bonjour%20Evans!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
                }}
              >
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { icon: Github, href: "https://github.com/AbakoDolla", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:evansabah2006@gmail.com", label: "Email" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.icon !== Mail ? "_blank" : undefined}
                  rel={s.icon !== Mail ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-lg glass transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="flex-shrink-0"
          >
            <div
              className="relative"
              style={{ width: "clamp(12rem, 35vw, 22rem)", height: "clamp(12rem, 35vw, 22rem)" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full"
                style={{ border: "2px solid hsl(var(--primary) / 0.2)" }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-5 rounded-full"
                style={{ border: "1px solid hsl(var(--secondary) / 0.15)" }}
              />
              <div className="absolute inset-6 rounded-full overflow-hidden neon-border">
                <img
                  src="/images/profile.jpg"
                  alt="Abah Prince Evans"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badges — hidden on xs, visible from sm */}
              {[
                { text: "SOC Analyst", pos: { top: "-0.75rem", right: "-0.75rem" }, color: "hsl(var(--primary))" },
                { text: "Blue Team", pos: { bottom: "-0.75rem", left: "-0.75rem" }, color: "hsl(var(--secondary))" },
                { text: "SIEM", pos: { top: "50%", right: "-1.5rem" }, color: "hsl(var(--accent))" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [i % 2 === 0 ? -8 : 8, i % 2 === 0 ? 8 : -8, i % 2 === 0 ? -8 : 8] }}
                  transition={{ duration: 4 + i, repeat: Infinity }}
                  className="absolute px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg glass text-[10px] sm:text-xs font-bold"
                  style={{ ...f.pos, color: f.color, fontFamily: "var(--app-font-mono)", zIndex: 10 }}
                >
                  {f.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <span className="text-xs" style={{ fontFamily: "var(--app-font-mono)" }}>scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
