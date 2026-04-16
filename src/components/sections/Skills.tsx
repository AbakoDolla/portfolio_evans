import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Globe,
  Code,
  Terminal,
  Server,
  Lock,
  Search,
  Smartphone,
} from "lucide-react";
import {
  SiPython,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiKalilinux,
  SiUbuntu,
  SiAndroid,
  SiWireguard,
  SiMetasploit,
  SiTryhackme,
  SiOpenvpn,
  SiScrapy,
  SiStreamlit,
  SiMlflow,
  SiOpenai,
  SiCyberdefenders,
  SiCisco,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaTools } from "react-icons/fa";

interface Skill {
  name: string;
  level: number;
  icon?: React.ElementType;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: "primary" | "secondary";
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Cybersécurité / Ethical Hacking",
    icon: SiCyberdefenders,
    color: "primary",
    skills: [
      { name: "Pentesting (Metasploitable2)", level: 75, icon: SiMetasploit },
      { name: "OWASP Top 10", level: 80, icon: SiTryhackme },
      { name: "Kali Linux", level: 85, icon: SiKalilinux },
      { name: "Exploitation & Hardening", level: 70, icon: SiTryhackme },
      { name: "Reconnaissance", level: 75, icon: Search },
      { name: "Techniques OSINT", level: 80, icon: SiScrapy },
    ],
  },
  {
    title: "Réseaux & VPN",
    icon: SiCisco,
    color: "secondary",
    skills: [
      { name: "Configuration VPS Ubuntu", level: 85, icon: SiUbuntu },
      { name: "WireGuard", level: 90, icon: SiWireguard },
      { name: "V2Ray/TCP", level: 70, icon: SiOpenvpn },
      { name: "Client VPN Android", level: 80, icon: SiAndroid },
    ],
  },
  {
    title: "Dev Web & Frontend",
    icon: SiHtml5,
    color: "primary",
    skills: [
      { name: "HTML/CSS", level: 90, icon: SiHtml5 },
      { name: "JavaScript", level: 85, icon: SiJavascript },
      { name: "React", level: 80, icon: SiReact },
      { name: "Tailwind CSS", level: 85, icon: SiTailwindcss },
      { name: "Animations (GSAP/Framer)", level: 75 },
    ],
  },
  {
    title: "Python",
    icon: SiPython,
    color: "secondary",
    skills: [
      { name: "Scripts d'automatisation", level: 85, icon: SiPython },
      { name: "OSINT Scraping", level: 80, icon: SiScrapy },
      { name: "Outils d'analyse", level: 75, icon: SiPython },
      { name: "GUI (CustomTkinter)", level: 70, icon: SiStreamlit },
      { name: "IA/ML Vision", level: 60, icon: SiOpenai },
    ],
  },
];

const tools = [
  { name: "Kali Linux", icon: SiKalilinux },
  { name: "Metasploit", icon: FaTools },
  { name: "VS Code", icon: VscVscode },
  { name: "VPS Ubuntu", icon: SiUbuntu },
  { name: "Metasploitable2", icon: FaTools },
  { name: "OSINT Tools", icon: Search },
  { name: "Android Dev", icon: SiAndroid },
  { name: "WireGuard", icon: SiWireguard },
];

export function Skills() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent"
      />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
            style={{ left: `${10 + i * 10}%` }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4" ref={ref}>
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
            // Compétences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Mon <motion.span
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-gradient"
            >arsenal</motion.span> technique
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Un mélange de cybersécurité, développement et outils d'automatisation
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: catIndex * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="glass-strong rounded-2xl p-6 group"
            >
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + catIndex * 0.1 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className={`p-2 rounded-lg ${
                    category.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </motion.div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        {skill.icon && (
                          <skill.icon className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-foreground">{skill.name}</span>
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{
                          delay: 0.8 + catIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className={
                          category.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={
                          isInView
                            ? { width: `${skill.level}%`, opacity: 1 }
                            : {}
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.5 + catIndex * 0.1 + skillIndex * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className={`h-full rounded-full relative ${
                          category.color === "primary"
                            ? "bg-gradient-to-r from-primary to-primary-glow"
                            : "bg-gradient-to-r from-secondary to-primary"
                        }`}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: skillIndex * 0.2,
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-xl font-bold text-center mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-primary inline-block"
            >
              &lt;
            </motion.span>
            Outils & Environnements
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="font-mono text-primary inline-block"
            >
              /&gt;
            </motion.span>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.08,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-xl glass hover:border-primary/50 transition-all flex items-center gap-2 cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <tool.icon className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
