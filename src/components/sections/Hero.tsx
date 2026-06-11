import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid — very light */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Single ambient glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.06)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "hsl(var(--secondary) / 0.04)" }}
      />

      {/* Single slow scan line — subtle */}
      <motion.div
        className="absolute h-px w-full pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.1), transparent)" }}
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 sm:px-8 py-24 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ── Text Column ── */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 text-xs"
              style={{
                fontFamily: "var(--app-font-mono)",
                background: "hsl(var(--secondary) / 0.08)",
                border: "1px solid hsl(var(--secondary) / 0.2)",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(var(--secondary))" }}
              />
              <span style={{ color: "hsl(var(--muted-foreground))" }}>status</span>
              <span style={{ color: "hsl(var(--secondary))" }}>= "disponible"</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mb-6"
            >
              <h1 className="font-extrabold leading-[1.05]" style={{ letterSpacing: "-0.03em" }}>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-1">
                  Abah Prince
                </span>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gradient"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Evans
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.p
              className="text-lg sm:text-xl font-light mb-4"
              style={{ color: "hsl(var(--muted-foreground))", letterSpacing: "0.02em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              SOC Analyst&nbsp;&nbsp;·&nbsp;&nbsp;Blue Team&nbsp;&nbsp;·&nbsp;&nbsp;Cybersécurité
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-loose mb-6"
              style={{ color: "hsl(var(--muted-foreground) / 0.8)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Futur SOC Analyst orienté Blue Team — surveillance des environnements informatiques,
              détection des menaces et protection des organisations face aux risques cyber.
              Développement web en complément.
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-sm mb-10"
              style={{ color: "hsl(var(--muted-foreground) / 0.65)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
              <span>Yaoundé, Cameroun</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="#certifications"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px hsl(var(--primary) / 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm transition-all text-center"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                }}
              >
                Mes certifications
              </motion.a>
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm transition-all text-center"
                style={{
                  color: "hsl(var(--foreground))",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Voir mes projets
              </motion.a>
              <motion.a
                href="https://wa.me/+237691439534?text=Bonjour%20Evans!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(37, 211, 102, 0.25)",
                }}
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              {[
                { icon: Github, href: "https://github.com/AbakoDolla", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:evansabah2006@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  aria-label={label}
                  className="p-2.5 rounded-xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Profile Image Column ── */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div
              className="relative"
              style={{ width: "clamp(13rem, 35vw, 22rem)", height: "clamp(13rem, 35vw, 22rem)" }}
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "hsl(var(--primary) / 0.12)" }}
              />
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full"
                style={{ border: "1.5px solid hsl(var(--primary) / 0.2)" }}
              />
              {/* Photo frame */}
              <div className="absolute inset-7 rounded-full overflow-hidden neon-border">
                <img
                  src="/images/profile.jpg"
                  alt="Abah Prince Evans — SOC Analyst"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Floating badge: SOC Analyst */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute px-2.5 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  top: "-0.5rem",
                  right: "-0.5rem",
                  background: "hsl(var(--primary) / 0.12)",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                  color: "hsl(var(--primary))",
                  fontFamily: "var(--app-font-mono)",
                  backdropFilter: "blur(12px)",
                }}
              >
                SOC Analyst
              </motion.div>

              {/* Floating badge: Blue Team */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute px-2.5 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  bottom: "-0.5rem",
                  left: "-0.5rem",
                  background: "hsl(var(--secondary) / 0.12)",
                  border: "1px solid hsl(var(--secondary) / 0.3)",
                  color: "hsl(var(--secondary))",
                  fontFamily: "var(--app-font-mono)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Blue Team
              </motion.div>

              {/* Floating badge: SIEM — hidden on small screens */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute px-2 py-1 rounded-lg text-[10px] font-bold hidden sm:block"
                style={{
                  top: "50%",
                  right: "-1.25rem",
                  transform: "translateY(-50%)",
                  background: "hsl(var(--accent) / 0.12)",
                  border: "1px solid hsl(var(--accent) / 0.3)",
                  color: "hsl(var(--accent))",
                  fontFamily: "var(--app-font-mono)",
                  backdropFilter: "blur(12px)",
                }}
              >
                SIEM
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "hsl(var(--muted-foreground) / 0.5)", fontFamily: "var(--app-font-mono)" }}
          >
            scroll
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4" style={{ color: "hsl(var(--primary) / 0.5)" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
