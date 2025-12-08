import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Shield,
  Globe,
  Search,
  Bot,
  ChevronRight,
  Lock,
  Server,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  icon: React.ElementType;
  color: "primary" | "secondary" | "accent";
  status: "completed" | "in-progress" | "concept";
  links?: {
    demo?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    title: "Pentest Metasploitable2",
    description: "Walkthrough complet d'exploitation éthique sur environnement vulnérable",
    longDescription:
      "Projet de pentesting complet sur Metasploitable2, documentant les vulnérabilités découvertes, les techniques d'exploitation utilisées et les recommandations de sécurisation. Inclut reconnaissance, exploitation et post-exploitation.",
    techStack: ["Kali Linux", "Metasploit", "Nmap", "Nikto", "SQLMap"],
    icon: Shield,
    color: "primary",
    status: "completed",
  },
  {
    title: "VPN WireGuard Personnel",
    description: "Serveur VPN sécurisé sur VPS Ubuntu + client Android",
    longDescription:
      "Configuration complète d'un serveur VPN WireGuard sur un VPS Ubuntu, avec création d'une application client Android personnalisée. Assure une connexion sécurisée et chiffrée depuis n'importe où.",
    techStack: ["Ubuntu", "WireGuard", "V2Ray", "Android", "Shell"],
    icon: Globe,
    color: "secondary",
    status: "completed",
  },
  {
    title: "Outils OSINT Python",
    description: "Suite d'outils de reconnaissance et collecte d'informations",
    longDescription:
      "Collection de scripts Python pour l'Open Source Intelligence : scraping automatisé, analyse de données publiques, extraction d'emails et métadonnées, et génération de rapports.",
    techStack: ["Python", "BeautifulSoup", "Requests", "Shodan API", "CustomTkinter"],
    icon: Search,
    color: "primary",
    status: "completed",
  },
  {
    title: "LYNX - Assistant IA",
    description: "Assistant vocal intelligent orienté cybersécurité",
    longDescription:
      "Projet ambitieux d'assistant IA vocale spécialisée en cybersécurité. LYNX analyse les menaces, suggère des solutions, et aide à l'automatisation des tâches de sécurité grâce au machine learning.",
    techStack: ["Python", "TensorFlow", "Speech Recognition", "NLP", "React"],
    icon: Bot,
    color: "accent",
    status: "concept",
  },
  {
    title: "Site e-commerce Alimentaire",
    description: "Création d'un site de vente en ligne pour produits alimentaires locaux",
    longDescription:
      "Conception et développement d'une plateforme e-commerce responsive pour une entreprise de vente de nourriture. Comprend gestion des produits, panier, paiement sécurisé, et tableau d'administration pour la gestion des commandes et du stock.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe", "Sanity CMS"],
    icon: ExternalLink,
    color: "secondary",
    status: "completed",
  },
  {
    title: "Site Entreprise Minière",
    description: "Site vitrine et intranet pour une société d'exploitation minière",
    longDescription:
      "Développement d'un site corporate présentant les activités d'exploitation des ressources minières, la conformité environnementale, et un intranet sécurisé pour la gestion des opérateurs et des rapports d'activité.",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Auth0"],
    icon: Server,
    color: "primary",
    status: "in-progress",
  },
  {
    title: "Agence Voyages Europe",
    description: "Plateforme de réservation et présentation d'offres de voyages en Europe",
    longDescription:
      "Création d'un site pour une agence de voyages spécialisée en circuits européens, incluant recherche d'itinéraires, réservation en ligne, gestion des disponibilités et intégration d'avis clients.",
    techStack: ["React", "Vite", "GraphQL", "Stripe", "Mapbox"],
    icon: Globe,
    color: "accent",
    status: "completed",
  },
];

const statusLabels = {
  completed: { label: "Terminé", class: "bg-secondary/20 text-secondary" },
  "in-progress": { label: "En cours", class: "bg-primary/20 text-primary" },
  concept: { label: "Concept", class: "bg-accent/20 text-accent" },
};

export function Projects() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const leftCardsX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const rightCardsX = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"
      />

      {/* Floating Background Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -100]) }}
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${30 + i * 20}%` }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

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
            // Projets
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Ce que je{" "}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px hsl(var(--primary))",
                  "0 0 40px hsl(var(--primary))",
                  "0 0 20px hsl(var(--primary))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gradient"
            >
              construis
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Des outils pratiques pour la sécurité, l'automatisation et l'innovation
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              style={{ x: index % 2 === 0 ? leftCardsX : rightCardsX }}
              initial={{ opacity: 0, y: 80, rotateY: index % 2 === 0 ? -15 : 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: "spring",
                stiffness: 80,
              }}
              className="group perspective-1000"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                className={`glass-strong rounded-2xl p-6 h-full transition-all duration-300 cursor-pointer ${
                  activeProject === index ? "border-primary/50 shadow-lg shadow-primary/10" : ""
                }`}
                onClick={() => setActiveProject(activeProject === index ? null : index)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 rounded-xl ${
                        project.color === "primary"
                          ? "bg-primary/20"
                          : project.color === "secondary"
                          ? "bg-secondary/20"
                          : "bg-accent/20"
                      }`}
                    >
                      <project.icon
                        className={`w-6 h-6 ${
                          project.color === "primary"
                            ? "text-primary"
                            : project.color === "secondary"
                            ? "text-secondary"
                            : "text-accent"
                        }`}
                      />
                    </motion.div>
                    <div>
                      <motion.h3
                        whileHover={{ x: 5 }}
                        className="font-bold text-lg group-hover:text-primary transition-colors"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          statusLabels[project.status].class
                        }`}
                      >
                        {statusLabels[project.status].label}
                      </motion.span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeProject === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  layout
                  className="text-muted-foreground mb-4"
                >
                  {activeProject === index ? project.longDescription : project.description}
                </motion.p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                {project.links && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex gap-3 pt-4 border-t border-border"
                  >
                    {project.links.github && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    {project.links.demo && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Future Projects Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass cursor-default"
          >
            <div className="flex -space-x-2">
              {[Lock, Server, Terminal].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-background ${
                    i === 0
                      ? "bg-primary/20"
                      : i === 1
                      ? "bg-secondary/20"
                      : "bg-accent/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      i === 0 ? "text-primary" : i === 1 ? "text-secondary" : "text-accent"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-semibold text-sm"
              >
                Projets à venir
              </motion.p>
              <p className="text-xs text-muted-foreground">
                Plateforme de sondage, Marketplace e-commerce
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
