"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y        = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY      = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY   = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Grid BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 cyber-grid opacity-30" />
      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-pulse-glow" />
      <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* Scan lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0,1,2,3,4].map((i) => (
          <motion.div key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ["-100%","100%"], opacity:[0,1,0] }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 0.7, ease:"linear" }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text */}
          <motion.div className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 font-mono text-sm"
            >
              <motion.span animate={{ scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-muted-foreground">{t.hero.badge}</span>
              <span className="text-primary">{t.hero.badgeValue}</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="text-foreground">Abah Prince</span>
              <br />
              <span className="text-gradient neon-text">Evans</span>
            </motion.h1>

            <motion.p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-light"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              {t.hero.tagline}
            </motion.p>

            <motion.p className="text-lg text-muted-foreground mb-3 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {t.hero.subtitle}
            </motion.p>

            <motion.div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t.hero.location}</span>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 neon-border">
                {t.hero.viewProjects}
              </motion.a>
              <motion.a href="#services" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl glass border border-secondary/30 font-bold text-secondary hover:bg-secondary/10 transition-all">
                {t.hero.myServices}
              </motion.a>
              <motion.a href={`https://wa.me/+237691439534?text=${encodeURIComponent(t.hero.whatsappMsg)}`} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl glass font-bold text-accent hover:bg-accent/10 transition-all flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />WhatsApp
              </motion.a>
            </motion.div>

            <motion.div className="flex items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              {[
                { icon: Github,   href: "https://github.com/AbakoDolla",                       label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
                { icon: Mail,     href: "mailto:evansabah2006@gmail.com",                      label: "Email" },
              ].map((s, i) => (
                <motion.a key={i} href={s.href}
                  target={s.icon !== Mail ? "_blank" : undefined}
                  rel={s.icon !== Mail ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-lg glass hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <motion.div animate={{ opacity: [0.4,0.7,0.4] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2">
                <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-primary/20" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-5 rounded-full border border-secondary/15" />
              <div className="absolute inset-6 rounded-full overflow-hidden neon-border">
                <Image src="/images/profile.jpg" alt="Abah Prince Evans" fill priority
                  className="object-cover object-top" sizes="(max-width:768px) 256px, 384px" />
              </div>
              {[{ text: "SOC Analyst", pos: "absolute -top-4 -right-4", color: "text-primary" },
                { text: "Blue Team", pos: "absolute -bottom-4 -left-4", color: "text-secondary" },
                { text: "SIEM / Splunk", pos: "absolute top-1/3 -right-8", color: "text-accent" },
                { text: "<hacker/>", pos: "absolute bottom-1/4 -right-6", color: "text-primary" }].map((f, i) => (
                <motion.div key={i} animate={{ y: [i%2===0?-10:10, i%2===0?10:-10, i%2===0?-10:10] }}
                  transition={{ duration: 4+i, repeat: Infinity }}
                  className={`${f.pos} px-3 py-1.5 rounded-lg glass font-mono text-xs ${f.color}`}>
                  {f.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.a href="#about" animate={{ y: [0,10,0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs font-mono">{t.hero.scroll}</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
