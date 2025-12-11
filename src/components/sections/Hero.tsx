import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const floatingAnimation = {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Effects */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 cyber-grid opacity-30" />
      
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content */}
          <motion.div
            style={{ y: textY }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 font-mono text-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-secondary"
              />
              <span className="text-muted-foreground">available_for_work</span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-primary"
              >
                = true
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-foreground inline-block"
              >
                Abah Prince
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gradient neon-text inline-block"
              >
                Evans
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-6 font-light"
            >
              {["Cybersécurité", "•", "Dev", "•", "IA"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto lg:mx-0"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                J'apprends, je bâtis, je rends le web plus sûr.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-4 h-4 text-primary" />
              </motion.div>
              <span>Yaoundé, Cameroun</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="xl" asChild>
                  <a href="#projects">Voir mes projets</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="glass" size="xl" asChild>
                  <a href="#contact">Me contacter</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: "https://https://github.com/AbakoDolla.com" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:evansabah2006@gmail.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.icon !== Mail ? "_blank" : undefined}
                  rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-lg glass hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="flex-shrink-0 relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow Effect */}
              <motion.div
                animate={floatingAnimation}
                className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
              />

              {/* Orbiting Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2"
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6"
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
              </motion.div>

              {/* Border Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-primary/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-secondary/20"
              />

              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute inset-6 rounded-full overflow-hidden neon-border"
              >
                <img
                  src={profileImage}
                  alt="Abah Prince Evans"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  rotate: [-5, 5, -5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg glass font-mono text-xs text-primary"
              >
                &lt;hacker/&gt;
              </motion.div>
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  rotate: [5, -5, 5],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg glass font-mono text-xs text-secondary"
              >
                pentester
              </motion.div>
              <motion.div
                animate={{
                  y: [-15, 15, -15],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 -right-8 px-2 py-1 rounded glass font-mono text-[10px] text-accent"
              >
                OSINT
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-mono"
            >
              scroll
            </motion.span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
