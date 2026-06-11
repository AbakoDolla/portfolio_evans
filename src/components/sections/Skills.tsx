import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython,
  SiPostgresql, SiGit, SiLinux, SiKalilinux, SiDocker, SiWireshark,
  SiNodedotjs, SiSplunk,
} from "react-icons/si";
import { Shield, Eye, Network } from "lucide-react";

const SKILL_GROUPS = [
  {
    category: "Cybersécurité / SOC",
    color: "primary" as const,
    skills: [
      { name: "Kali Linux", icon: SiKalilinux, level: 75 },
      { name: "Wireshark", icon: SiWireshark, level: 70 },
      { name: "SIEM / Splunk", icon: SiSplunk, level: 65 },
      { name: "Threat Intel", icon: Eye, level: 72 },
      { name: "Pentesting", icon: Shield, level: 70 },
      { name: "OSINT", icon: Network, level: 78 },
    ],
  },
  {
    category: "Réseaux & Systèmes",
    color: "secondary" as const,
    skills: [
      { name: "Linux", icon: SiLinux, level: 80 },
      { name: "TCP/IP", icon: Network, level: 78 },
      { name: "Docker", icon: SiDocker, level: 60 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 65 },
      { name: "Git", icon: SiGit, level: 85 },
      { name: "Python", icon: SiPython, level: 78 },
    ],
  },
  {
    category: "Dev Web (Bonus)",
    color: "accent" as const,
    skills: [
      { name: "React", icon: SiReact, level: 82 },
      { name: "Next.js", icon: SiNextdotjs, level: 78 },
      { name: "TypeScript", icon: SiTypescript, level: 72 },
      { name: "Tailwind", icon: SiTailwindcss, level: 88 },
      { name: "Node.js", icon: SiNodedotjs, level: 65 },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 md:py-24 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--secondary) / 0.03), transparent)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mon <span className="text-gradient">arsenal</span> technique
          </h2>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            Cybersécurité en priorité · Dev Web en complément
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.2 }}
              className="glass-strong rounded-2xl p-6"
            >
              <h3
                className="font-bold text-lg mb-6"
                style={{
                  fontFamily: "var(--app-font-mono)",
                  color:
                    group.color === "primary"
                      ? "hsl(var(--primary))"
                      : group.color === "secondary"
                      ? "hsl(var(--secondary))"
                      : "hsl(var(--accent))",
                }}
              >
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <skill.icon
                          className="w-4 h-4"
                          style={{
                            color:
                              group.color === "primary"
                                ? "hsl(var(--primary))"
                                : group.color === "secondary"
                                ? "hsl(var(--secondary))"
                                : "hsl(var(--accent))",
                          }}
                        />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "hsl(var(--muted))" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: gi * 0.2 + si * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            group.color === "primary"
                              ? "hsl(var(--primary))"
                              : group.color === "secondary"
                              ? "hsl(var(--secondary))"
                              : "hsl(var(--accent))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
