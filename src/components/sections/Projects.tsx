import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  Loader2,
  MapPin,
  Utensils,
  Truck,
  Vote,
  RadioTower,
  User,
  Zap,
} from "lucide-react";
import {
  SiMetasploit,
  SiWireguard,
  SiPython,
  SiOpenai,
  SiShopify,
  SiRubymine,
  SiPlanet,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiKalilinux,
  SiUbuntu,
  SiAndroid,
  SiSupabase,
  SiFramer,
} from "react-icons/si";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  icon: React.ElementType;
  image?: string; // URL de l'image personnalisée (logo)
  color: "primary" | "secondary" | "accent";
  status: "completed" | "in-progress" | "concept";
  type?: "restaurant" | "delivery" | "voting" | "portfolio" | "streaming" | "security" | "tool";
  links?: {
    demo?: string;
    github?: string;
    website?: string;
  };
}

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string;
  topics: string[];
  updated_at: string;
  stargazers_count: number;
  fork: boolean;
}

// Fonction pour récupérer les repositories GitHub
const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

// Fonction pour mapper un repo GitHub vers un projet
const mapGitHubRepoToProject = (repo: GitHubRepo): Project => {
  const getTechStack = (language: string, topics: string[]): string[] => {
    const stack = [];
    if (language) stack.push(language);
    if (topics.length > 0) {
      stack.push(...topics.slice(0, 3)); // Prendre max 3 topics
    }
    return stack.length > 0 ? stack : ['Project'];
  };

  // Mapping spécifique pour les projects du portfolio
  const getProjectType = (name: string): Project["type"] => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('grill')) return 'restaurant';
    if (lowerName.includes('colis') || lowerName.includes('express')) return 'delivery';
    if (lowerName.includes('vote')) return 'voting';
    if (lowerName.includes('portfolio')) return 'portfolio';
    if (lowerName.includes('studio') || lowerName.includes('live')) return 'streaming';
    if (lowerName.includes('pentest') || lowerName.includes('metasploit')) return 'security';
    return 'tool';
  };

  const getIcon = (repositoryType: Project["type"]): React.ElementType => {
    switch (repositoryType) {
      case 'restaurant':
        return Utensils;
      case 'delivery':
        return Truck;
      case 'voting':
        return Vote;
      case 'portfolio':
        return User;
      case 'streaming':
        return RadioTower;
      case 'security':
        return SiMetasploit;
      default:
        return SiReact;
    }
  };

  const getColor = (repositoryType: Project["type"]): "primary" | "secondary" | "accent" => {
    switch (repositoryType) {
      case 'restaurant':
        return 'accent'; // Orange/Fire
      case 'delivery':
        return 'secondary'; // Blue
      case 'voting':
        return 'primary'; // Cyan
      case 'portfolio':
        return 'primary'; // Cyan
      case 'streaming':
        return 'accent'; // Fire
      case 'security':
        return 'secondary'; // Green
      default:
        return 'primary';
    }
  };

  const getWebsiteUrl = (name: string): string | undefined => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('grill')) return 'https://brazafish.netlify.app/';
    if (lowerName.includes('studio') || lowerName.includes('live')) return 'https://star-live-co.vercel.app';
    return undefined;
  };

  const getProjectImage = (name: string): string | undefined => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('grill')) return '/images/ember-grill-logo.png';
    if (lowerName.includes('studio') || lowerName.includes('live')) return '/images/starlive-logo.png';
    return undefined;
  };

  const projectType = getProjectType(repo.name);

  return {
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'Projet GitHub',
    longDescription: repo.description || 'Projet développé et hébergé sur GitHub',
    techStack: getTechStack(repo.language, repo.topics),
    icon: getIcon(projectType),
    image: getProjectImage(repo.name),
    color: getColor(projectType),
    status: "completed",
    type: projectType,
    links: {
      github: repo.html_url,
      demo: repo.homepage || undefined,
      website: getWebsiteUrl(repo.name),
    },
  };
};

// Projets statiques (fallback si GitHub ne fonctionne pas)
const fallbackProjects: Project[] = [
  {
    title: "Pentest Metasploitable2",
    description: "Walkthrough complet d'exploitation éthique sur environnement vulnérable",
    longDescription:
      "Projet de pentesting complet sur Metasploitable2, documentant les vulnérabilités découvertes, les techniques d'exploitation utilisées et les recommandations de sécurisation. Inclut reconnaissance, exploitation et post-exploitation.",
    techStack: ["Kali Linux", "Metasploit", "Nmap", "Nikto", "SQLMap"],
    icon: SiMetasploit,
    color: "primary",
    status: "completed",
  },
  {
    title: "VPN WireGuard Personnel",
    description: "Serveur VPN sécurisé sur VPS Ubuntu + client Android",
    longDescription:
      "Configuration complète d'un serveur VPN WireGuard sur un VPS Ubuntu, avec création d'une application client Android personnalisée. Assure une connexion sécurisée et chiffrée depuis n'importe où.",
    techStack: ["Ubuntu", "WireGuard", "V2Ray", "Android", "Shell"],
    icon: SiWireguard,
    color: "secondary",
    status: "completed",
  },
  {
    title: "Outils OSINT Python",
    description: "Suite d'outils de reconnaissance et collecte d'informations",
    longDescription:
      "Collection de scripts Python pour l'Open Source Intelligence : scraping automatisé, analyse de données publiques, extraction d'emails et métadonnées, et génération de rapports.",
    techStack: ["Python", "BeautifulSoup", "Requests", "Shodan API", "CustomTkinter"],
    icon: SiPython,
    color: "primary",
    status: "completed",
  },
  {
    title: "LYNX - Assistant IA",
    description: "Assistant vocal intelligent orienté cybersécurité",
    longDescription:
      "Projet ambitieux d'assistant IA vocale spécialisée en cybersécurité. LYNX analyse les menaces, suggère des solutions, et aide à l'automatisation des tâches de sécurité grâce au machine learning.",
    techStack: ["Python", "TensorFlow", "Speech Recognition", "NLP", "React"],
    icon: SiOpenai,
    color: "accent",
    status: "concept",
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
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupération des repositories GitHub au montage du composant
  useEffect(() => {
    const loadGitHubProjects = async () => {
      try {
        setLoading(true);
        // Remplacez 'votre-username-github' par votre nom d'utilisateur GitHub
        const githubUsername = 'AbakoDolla'; // À remplacer par votre username GitHub
        const repos = await fetchGitHubRepos(githubUsername);

        if (repos.length > 0) {
          // Convertir les repos GitHub en projets et les combiner avec les projets statiques
          const githubProjects = repos
            .filter(repo => !repo.fork) // Exclure les forks
            .slice(0, 6) // Prendre max 6 projets
            .map(mapGitHubRepoToProject);

          // Combiner les projets statiques et GitHub (priorité aux statiques)
          setProjects([...fallbackProjects, ...githubProjects]);
        } else {
          // Si pas de repos GitHub, garder les projets statiques
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des projets GitHub:', err);
        setError('Impossible de charger les projets GitHub');
        // Garder les projets statiques en cas d'erreur
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubProjects();
  }, []);

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
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des projets depuis GitHub...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">
              Affichage des projets statiques à la place
            </p>
          </motion.div>
        ) : (
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
                {/* Header avec type badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`p-2 rounded-xl flex items-center justify-center ${
                        project.color === "primary"
                          ? "bg-primary/20"
                          : project.color === "secondary"
                          ? "bg-secondary/20"
                          : "bg-accent/20"
                      }`}
                    >
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-8 h-8 object-contain" />
                      ) : (
                        <project.icon
                          className={`w-6 h-6 ${
                            project.color === "primary"
                              ? "text-primary"
                              : project.color === "secondary"
                              ? "text-secondary"
                              : "text-accent"
                          }`}
                        />
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        whileHover={{ x: 5 }}
                        className="font-bold text-lg group-hover:text-primary transition-colors"
                      >
                        {project.title}
                      </motion.h3>
                      <div className="flex gap-2 items-center mt-1">
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
                        {project.type && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.55 + index * 0.1 }}
                            className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground font-mono"
                          >
                          </motion.span>
                        )}
                      </div>
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

                {/* Links Section - Amélioré */}
                {project.links && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex flex-col gap-3 pt-4 border-t border-border/50"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {project.links.github && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild 
                            className="w-full text-xs gap-1 hover:bg-primary/10 hover:border-primary transition-all"
                          >
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Code</span>
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      {project.links.demo && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild 
                            className="w-full text-xs gap-1 hover:bg-secondary/10 hover:border-secondary transition-all"
                          >
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Demo</span>
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      {project.links.website && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild 
                            className="w-full text-xs gap-1 hover:bg-accent/10 hover:border-accent transition-all"
                          >
                            <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Site</span>
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        )}

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
                Plateforme de sondage, Marketplace e-commerce, plateforme de livraison de colis local(ColisGo)...
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
