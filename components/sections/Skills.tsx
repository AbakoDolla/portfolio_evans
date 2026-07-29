"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiDjango,
         SiPostgresql, SiSupabase, SiGit, SiLinux, SiKalilinux, SiDocker,
         SiFramer, SiNodedotjs, SiMongodb } from "react-icons/si";
import { Shield, Brain } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const SKILL_GROUPS = [
  {
    id: "frontend" as const,
    color: "primary" as const,
    skills: [
      { name: "React",       icon: SiReact,       level: 85 },
      { name: "Next.js",     icon: SiNextdotjs,   level: 80 },
      { name: "TypeScript",  icon: SiTypescript,  level: 75 },
      { name: "Tailwind",    icon: SiTailwindcss, level: 90 },
      { name: "Framer",      icon: SiFramer,      level: 70 },
    ],
  },
  {
    id: "backend" as const,
    color: "secondary" as const,
    skills: [
      { name: "Python",      icon: SiPython,     level: 80 },
      { name: "Django",      icon: SiDjango,     level: 70 },
      { name: "Node.js",     icon: SiNodedotjs,  level: 65 },
      { name: "PostgreSQL",  icon: SiPostgresql, level: 70 },
      { name: "Supabase",    icon: SiSupabase,   level: 75 },
      { name: "MongoDB",     icon: SiMongodb,    level: 60 },
    ],
  },
  {
    id: "cyber" as const,
    color: "accent" as const,
    skills: [
      { name: "Kali Linux",  icon: SiKalilinux,  level: 75 },
      { name: "Pentesting",  icon: Shield,        level: 70 },
      { name: "OSINT",       icon: Brain,         level: 80 },
      { name: "Linux",       icon: SiLinux,       level: 75 },
      { name: "Docker",      icon: SiDocker,      level: 60 },
      { name: "Git",         icon: SiGit,         level: 85 },
    ],
  },
];

export function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">{t.skills.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.skills.titlePre}<span className="text-gradient">{t.skills.titleHighlight}</span>{t.skills.titlePost}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div key={group.id}
              initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.2 }}
              className="glass-strong rounded-2xl p-6">
              <h3 className={`font-bold text-lg mb-6 font-mono ${
                group.color === "primary" ? "text-primary" : group.color === "secondary" ? "text-secondary" : "text-accent"}`}>
                {t.skills.groups[group.id]}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <skill.icon className={`w-4 h-4 ${
                          group.color === "primary" ? "text-primary" : group.color === "secondary" ? "text-secondary" : "text-accent"}`} />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: gi * 0.2 + si * 0.08, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          group.color === "primary" ? "bg-primary" : group.color === "secondary" ? "bg-secondary" : "bg-accent"}`} />
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
