"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "fr" | "en";

const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Skills",
    projects: "Projets",
    certifications: "Certifs",
    blog: "Blog",
    services: "Services",
    testimonials: "Avis",
    contact: "Contact",
  },
  langToggle: {
    ariaLabel: "Switch to English",
    title: "Switch to English",
  },
  hero: {
    badge: "available_for_work",
    badgeValue: "= true",
    tagline: "Analyste SOC • Dev Full-Stack • Cybersécurité • IA",
    subtitle: "J'analyse les menaces, je bâtis des applications, je rends le web plus sûr.",
    location: "Yaoundé, Cameroun",
    viewProjects: "Voir mes projets",
    myServices: "Mes services",
    scroll: "scroll",
    whatsappMsg: "Bonjour Evans!",
  },
  about: {
    tag: "// À propos",
    titlePre: "Qui suis-",
    titleHighlight: "je",
    titlePost: " ?",
    description:
      "Analyste SOC (Security Operations Center) orienté Blue Team & Développeur Full-Stack basé à Yaoundé, Cameroun. Je détecte et neutralise les cybermenaces (SIEM, Splunk, Wireshark) tout en concevant des applications web robustes et sécurisées dès la conception. Mon objectif : bâtir des infrastructures numériques résilientes qui servent les communautés locales et africaines.",
    cards: [
      {
        title: "Analyste SOC & Blue Team",
        desc: "Surveillance SIEM (Splunk, Wireshark), Threat Hunting, détection d'incidents, pentesting éthique et réponse rapide.",
      },
      {
        title: "Dev Full-Stack",
        desc: "React, Next.js, TypeScript, Python côté backend — des apps modernes et performantes.",
      },
      {
        title: "IA & Automatisation",
        desc: "Intégration de modèles LLM, scripts d'automatisation intelligents et outils OSINT avancés.",
      },
      {
        title: "Projets Réels",
        desc: "Chaque projet est une opportunité d'apprendre, de résoudre et de livrer de la valeur réelle.",
      },
    ],
    stats: ["Projets réalisés", "Certifications", "Langages maîtrisés", "Passion"],
  },
  skills: {
    tag: "// Skills",
    titlePre: "Mon ",
    titleHighlight: "stack",
    titlePost: " technique",
    groups: { frontend: "Frontend", backend: "Backend & DB", cyber: "Cybersécurité" },
  },
  projects: {
    tag: "// Projets",
    titlePre: "Ce que je ",
    titleHighlight: "construis",
    titlePost: "",
    description: "Des projets concrets — de la sécurité au e-commerce en passant par l'automatisation.",
    loading: "Chargement depuis GitHub…",
    fallbackDesc: "Projet GitHub",
    seeLess: "Voir moins",
    seeAll: (n: number) => `Voir les ${n} projets`,
    code: "Code",
    live: "Live",
  },
  certifications: {
    tag: "// Certifications",
    titlePre: "Mes ",
    titleHighlight: "Certifications",
    titlePost: "",
    description:
      "Formations validées par des organismes reconnus mondialement en cybersécurité et réseaux.",
    filterAll: "Tous",
    statsLabels: { certifications: "Certifications", issuers: "Organismes", validated: "Validées" },
    details: "Détails",
    collapse: "Réduire",
    items: [
      {
        id: "1",
        title: "Introduction à la Cybersécurité",
        description:
          "Identification des cybermenaces (malwares, phishing, ingénierie sociale) et application des meilleures pratiques de protection des données et infrastructures.",
        tags: ["Cybersécurité", "Menaces", "Protection"],
      },
      {
        id: "2",
        title: "Linux Unhatched",
        description:
          "Navigation et administration d'un système Linux en ligne de commande, gestion de fichiers et compréhension de l'architecture Open Source.",
        tags: ["Linux", "CLI", "Open Source"],
      },
      {
        id: "3",
        title: "Fortinet Certified Professional",
        description:
          "Compétences en sécurité réseau avec les solutions Fortinet : pare-feux, systèmes de prévention d'intrusion et sécurité des endpoints.",
        tags: ["Réseau", "Pare-feu", "IPS"],
      },
      {
        id: "4",
        title: "Networking Basics",
        description:
          "Architecture réseau (modèles OSI/TCP-IP), configuration d'équipements, adressage IP, subnetting et diagnostic d'incidents réseau.",
        tags: ["TCP/IP", "OSI", "Subnetting"],
      },
      {
        id: "5",
        title: "Networking Devices & Initial Configuration",
        description:
          "Configuration de terminaux, installation de commutateurs et routeurs Cisco, mise en place de la connectivité IPv4 et IPv6.",
        tags: ["Cisco", "Routeurs", "IPv4/IPv6"],
      },
      {
        id: "6",
        title: "Critical Infrastructure Protection (ICIP)",
        description:
          "Protection des infrastructures critiques, identification des vulnérabilités, mesures de sécurité et gestion des risques pour systèmes essentiels.",
        tags: ["Infrastructure", "OT/IT", "Résilience"],
      },
    ],
  },
  blog: {
    tag: "// Blog & Actus",
    titlePre: "Tech ",
    titleHighlight: "en direct",
    titlePost: "",
    description:
      "Les dernières actualités en cybersécurité, IA, développement web et tech — agrégées automatiquement depuis des sources fiables.",
    allCategories: "Toutes catégories",
    refresh: "Actualiser",
    loading: "Récupération des actus…",
    error: "Impossible de charger les actus pour le moment.",
    retry: "Réessayer",
    empty: "Aucun article dans cette catégorie.",
    justNow: "À l'instant",
    hoursAgo: (h: number) => `il y a ${h}h`,
    daysAgo: (d: number) => `il y a ${d}j`,
    categories: {
      "cybersécurité": "cybersécurité",
      "IA": "IA",
      "dev web": "dev web",
      "tech": "tech",
    } as Record<string, string>,
  },
  services: {
    tag: "// Services",
    titlePre: "Mes ",
    titleHighlight: "prestations",
    titlePost: "",
    description:
      "Développement web, cybersécurité, automatisation — des solutions sur-mesure adaptées à votre budget.",
    popular: "⭐ Populaire",
    order: "Commander",
    whatsappMsg: "Bonjour Evans, je voudrais vous contacter pour un projet!",
    items: [
      {
        title: "Site vitrine / Landing Page",
        desc: "Présence web professionnelle, rapide et optimisée SEO. Idéal pour entreprises, freelances et artisans.",
        price: "À partir de 50 000 FCFA",
        delay: "3–7 jours",
        features: ["Design responsive moderne", "SEO optimisé", "Animations fluides", "Déploiement Vercel"],
      },
      {
        title: "Application web complète",
        desc: "Full-stack React + Next.js + API. Dashboard admin, auth utilisateurs, base de données intégrée.",
        price: "À partir de 150 000 FCFA",
        delay: "2–4 semaines",
        features: ["React / Next.js", "Auth & base de données", "API REST sécurisée", "Tableau de bord admin"],
      },
      {
        title: "Audit de sécurité / Pentest",
        desc: "Test de pénétration éthique sur votre application web ou réseau. Rapport complet + recommandations.",
        price: "À partir de 80 000 FCFA",
        delay: "5–10 jours",
        features: ["Scan de vulnérabilités", "OWASP Top 10", "Rapport détaillé PDF", "Recommandations"],
      },
      {
        title: "App mobile (React Native)",
        desc: "Application iOS & Android avec Expo/React Native. UX soignée et performances natives.",
        price: "À partir de 200 000 FCFA",
        delay: "3–6 semaines",
        features: ["iOS & Android", "Expo / React Native", "Notifications push", "Supabase backend"],
      },
      {
        title: "Automatisation & Scripts",
        desc: "Scripts Python pour automatiser vos tâches répétitives, scraping, OSINT ou traitement de données.",
        price: "À partir de 30 000 FCFA",
        delay: "1–5 jours",
        features: ["Python / BeautifulSoup", "Scraping légal", "Exports CSV/Excel", "Documentation"],
      },
      {
        title: "Consultation Cybersécurité",
        desc: "Audit de votre posture de sécurité, formation équipe, mise en place de bonnes pratiques.",
        price: "À partir de 25 000 FCFA/h",
        delay: "Sur rendez-vous",
        features: ["Audit posture sécurité", "Formation équipe", "Politique de sécurité", "Suivi mensuel optionnel"],
      },
    ],
    form: {
      title: "Décrire votre projet",
      subtitle: "Je vous réponds sous 24h avec un devis personnalisé.",
      name: "Nom complet *",
      namePlaceholder: "Votre nom",
      email: "Email *",
      emailPlaceholder: "votre@email.com",
      service: "Service souhaité",
      chooseService: "Choisir un service…",
      other: "Autre",
      budget: "Budget estimé",
      budgetPlaceholder: "Budget…",
      message: "Description du projet *",
      messagePlaceholder: "Décrivez votre projet, vos besoins, délais souhaités…",
      sending: "Envoi…",
      submit: "Envoyer ma demande",
      toast: "Demande envoyée ! Je vous contacte sous 24h.",
      mailSubjectPrefix: "Demande de service",
      mailLabels: { name: "Nom", email: "Email", service: "Service", budget: "Budget" },
    },
  },
  testimonials: {
    tag: "// Avis clients",
    titlePre: "Ce que disent mes ",
    titleHighlight: "clients",
    titlePost: " & partenaires",
    description: "Témoignages authentiques de clients, directeurs techniques et responsables sécurité avec qui j'ai collaboré.",
    roleSuffix: "Cameroun",
    items: [
      {
        name: "Jean-Marc M.",
        role: "Directeur Technique / CTO",
        company: "TechSolutions CM",
        content: "Evans a réalisé l'audit de sécurité et le pentest de notre plateforme e-commerce. Son rapport clair et ses recommandations nous ont permis de corriger des vulnérabilités critiques avant notre lancement officiel.",
        rating: 5,
        service: "Audit de sécurité / Pentest",
      },
      {
        name: "Sarah K.",
        role: "Fondatrice & CEO",
        company: "AfrikEdu",
        content: "Un développeur full-stack exceptionnel ! Evans a conçu notre application web sous Next.js avec un backend rapide et sécurisé. Délais respectés, communication fluide et professionnalisme exemplaire.",
        rating: 5,
        service: "Application web complète",
      },
      {
        name: "Alain D.",
        role: "Responsable Sécurité (CISO)",
        company: "CyberGuard Africa",
        content: "En tant qu'analyste SOC, Evans fait preuve d'une rigueur remarquable dans la surveillance SIEM et l'analyse de logs (Splunk, Wireshark). Sa capacité de détection et de réponse aux incidents a grandement renforcé notre posture de défense.",
        rating: 5,
        service: "Consultation Cybersécurité & SOC",
      },
      {
        name: "Clarisse N.",
        role: "Gérante",
        company: "Yaoundé Express Services",
        content: "Notre site vitrine a été livré en moins d'une semaine, parfaitement optimisé pour le mobile et le SEO. Nous avons vu notre trafic doubler et les contacts affluer dès le premier mois.",
        rating: 5,
        service: "Site vitrine / Landing Page",
      },
    ],
  },
  contact: {
    tag: "// Contact",
    titlePre: "Travaillons ",
    titleHighlight: "ensemble",
    titlePost: "",
    description: "Un projet en tête ? Une question ? N'hésitez pas à me contacter directement.",
    infoTitle: "Informations",
    emailLabel: "Email",
    locationLabel: "Localisation",
    locationValue: "Yaoundé, Cameroun",
    socials: "Réseaux sociaux",
    availablePre: "Disponible pour des ",
    availableHighlight: "missions freelance",
    formTitle: "Envoyer un message",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "votre@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Décrivez votre projet ou demande…",
    sending: "Envoi…",
    submit: "Envoyer le message",
    toastSuccess: "Message envoyé ! Je vous réponds bientôt.",
    toastMail: "Ouverture de votre client mail…",
    mailSubject: "Message",
    mailLabels: { name: "Nom", email: "Email" },
  },
  footer: {
    location: "Yaoundé, Cameroun",
    rights: "Tous droits réservés.",
  },
  meta: {
    title: "Abah Prince Evans — SOC Analyst | Blue Team | Dev Full-Stack & Cybersécurité",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certs",
    blog: "Blog",
    services: "Services",
    testimonials: "Reviews",
    contact: "Contact",
  },
  langToggle: {
    ariaLabel: "Passer au français",
    title: "Passer au français",
  },
  hero: {
    badge: "available_for_work",
    badgeValue: "= true",
    tagline: "SOC Analyst • Blue Team • Full-Stack Dev • Cybersecurity • AI",
    subtitle: "I analyze threats, I build applications, I make the web safer.",
    location: "Yaoundé, Cameroon",
    viewProjects: "View my projects",
    myServices: "My services",
    scroll: "scroll",
    whatsappMsg: "Hello Evans!",
  },
  about: {
    tag: "// About",
    titlePre: "Who am ",
    titleHighlight: "I",
    titlePost: "?",
    description:
      "SOC Analyst (Security Operations Center) Blue Team focused & Full-Stack developer based in Yaoundé, Cameroon. I monitor and secure IT environments (SIEM, Splunk, Wireshark) while building modern, robust web applications secured from day one. My goal: building resilient digital infrastructures that serve local and African communities.",
    cards: [
      {
        title: "SOC Analyst & Blue Team",
        desc: "SIEM monitoring (Splunk, Wireshark), threat hunting, incident detection, ethical pentesting and rapid response.",
      },
      {
        title: "Full-Stack Dev",
        desc: "React, Next.js, TypeScript, Python on the backend — modern, high-performance apps.",
      },
      {
        title: "AI & Automation",
        desc: "LLM integration, smart automation scripts and advanced OSINT tooling.",
      },
      {
        title: "Real Projects",
        desc: "Every project is an opportunity to learn, solve problems and deliver real value.",
      },
    ],
    stats: ["Projects completed", "Certifications", "Languages mastered", "Passion"],
  },
  skills: {
    tag: "// Skills",
    titlePre: "My technical ",
    titleHighlight: "stack",
    titlePost: "",
    groups: { frontend: "Frontend", backend: "Backend & DB", cyber: "Cybersecurity" },
  },
  projects: {
    tag: "// Projects",
    titlePre: "What I ",
    titleHighlight: "build",
    titlePost: "",
    description: "Concrete projects — from security to e-commerce and automation.",
    loading: "Loading from GitHub…",
    fallbackDesc: "GitHub project",
    seeLess: "Show less",
    seeAll: (n: number) => `View all ${n} projects`,
    code: "Code",
    live: "Live",
  },
  certifications: {
    tag: "// Certifications",
    titlePre: "My ",
    titleHighlight: "Certifications",
    titlePost: "",
    description:
      "Training validated by world-renowned organizations in cybersecurity and networking.",
    filterAll: "All",
    statsLabels: { certifications: "Certifications", issuers: "Issuers", validated: "Completed" },
    details: "Details",
    collapse: "Show less",
    items: [
      {
        id: "1",
        title: "Introduction to Cybersecurity",
        description:
          "Identifying cyber threats (malware, phishing, social engineering) and applying best practices to protect data and infrastructure.",
        tags: ["Cybersecurity", "Threats", "Protection"],
      },
      {
        id: "2",
        title: "Linux Unhatched",
        description:
          "Navigating and administering a Linux system from the command line, file management and understanding Open Source architecture.",
        tags: ["Linux", "CLI", "Open Source"],
      },
      {
        id: "3",
        title: "Fortinet Certified Professional",
        description:
          "Network security skills with Fortinet solutions: firewalls, intrusion prevention systems and endpoint security.",
        tags: ["Network", "Firewall", "IPS"],
      },
      {
        id: "4",
        title: "Networking Basics",
        description:
          "Network architecture (OSI/TCP-IP models), device configuration, IP addressing, subnetting and network troubleshooting.",
        tags: ["TCP/IP", "OSI", "Subnetting"],
      },
      {
        id: "5",
        title: "Networking Devices & Initial Configuration",
        description:
          "Configuring end devices, installing Cisco switches and routers, setting up IPv4 and IPv6 connectivity.",
        tags: ["Cisco", "Routers", "IPv4/IPv6"],
      },
      {
        id: "6",
        title: "Critical Infrastructure Protection (ICIP)",
        description:
          "Protecting critical infrastructure, identifying vulnerabilities, security measures and risk management for essential systems.",
        tags: ["Infrastructure", "OT/IT", "Resilience"],
      },
    ],
  },
  blog: {
    tag: "// Blog & News",
    titlePre: "Tech ",
    titleHighlight: "live",
    titlePost: "",
    description:
      "The latest news in cybersecurity, AI, web development and tech — automatically aggregated from trusted sources.",
    allCategories: "All categories",
    refresh: "Refresh",
    loading: "Fetching news…",
    error: "Unable to load news right now.",
    retry: "Retry",
    empty: "No articles in this category.",
    justNow: "Just now",
    hoursAgo: (h: number) => `${h}h ago`,
    daysAgo: (d: number) => `${d}d ago`,
    categories: {
      "cybersécurité": "cybersecurity",
      "IA": "AI",
      "dev web": "web dev",
      "tech": "tech",
    } as Record<string, string>,
  },
  services: {
    tag: "// Services",
    titlePre: "My ",
    titleHighlight: "services",
    titlePost: "",
    description:
      "Web development, cybersecurity, automation — tailor-made solutions adapted to your budget.",
    popular: "⭐ Popular",
    order: "Order now",
    whatsappMsg: "Hello Evans, I'd like to contact you about a project!",
    items: [
      {
        title: "Showcase website / Landing page",
        desc: "Professional, fast and SEO-optimized web presence. Ideal for businesses, freelancers and artisans.",
        price: "From 50,000 FCFA",
        delay: "3–7 days",
        features: ["Modern responsive design", "SEO optimized", "Smooth animations", "Vercel deployment"],
      },
      {
        title: "Complete web application",
        desc: "Full-stack React + Next.js + API. Admin dashboard, user auth, integrated database.",
        price: "From 150,000 FCFA",
        delay: "2–4 weeks",
        features: ["React / Next.js", "Auth & database", "Secure REST API", "Admin dashboard"],
      },
      {
        title: "Security audit / Pentest",
        desc: "Ethical penetration testing on your web application or network. Full report + recommendations.",
        price: "From 80,000 FCFA",
        delay: "5–10 days",
        features: ["Vulnerability scan", "OWASP Top 10", "Detailed PDF report", "Recommendations"],
      },
      {
        title: "Mobile app (React Native)",
        desc: "iOS & Android app with Expo/React Native. Polished UX and native performance.",
        price: "From 200,000 FCFA",
        delay: "3–6 weeks",
        features: ["iOS & Android", "Expo / React Native", "Push notifications", "Supabase backend"],
      },
      {
        title: "Automation & Scripts",
        desc: "Python scripts to automate your repetitive tasks, scraping, OSINT or data processing.",
        price: "From 30,000 FCFA",
        delay: "1–5 days",
        features: ["Python / BeautifulSoup", "Legal scraping", "CSV/Excel exports", "Documentation"],
      },
      {
        title: "Cybersecurity consulting",
        desc: "Audit of your security posture, team training, implementation of best practices.",
        price: "From 25,000 FCFA/h",
        delay: "By appointment",
        features: ["Security posture audit", "Team training", "Security policy", "Optional monthly follow-up"],
      },
    ],
    form: {
      title: "Describe your project",
      subtitle: "I'll get back to you within 24 hours with a personalized quote.",
      name: "Full name *",
      namePlaceholder: "Your name",
      email: "Email *",
      emailPlaceholder: "you@email.com",
      service: "Desired service",
      chooseService: "Choose a service…",
      other: "Other",
      budget: "Estimated budget",
      budgetPlaceholder: "Budget…",
      message: "Project description *",
      messagePlaceholder: "Describe your project, your needs, desired deadlines…",
      sending: "Sending…",
      submit: "Send my request",
      toast: "Request sent! I'll contact you within 24 hours.",
      mailSubjectPrefix: "Service request",
      mailLabels: { name: "Name", email: "Email", service: "Service", budget: "Budget" },
    },
  },
  testimonials: {
    tag: "// Client Reviews",
    titlePre: "What my ",
    titleHighlight: "clients",
    titlePost: " & peers say",
    description: "Authentic testimonials from clients, technical directors and security managers I have worked with.",
    roleSuffix: "Cameroon",
    items: [
      {
        name: "Jean-Marc M.",
        role: "Chief Technical Officer / CTO",
        company: "TechSolutions CM",
        content: "Evans conducted the security audit and pentesting for our e-commerce platform. His clear report and actionable recommendations helped us fix critical vulnerabilities before our official launch.",
        rating: 5,
        service: "Security Audit / Pentesting",
      },
      {
        name: "Sarah K.",
        role: "Founder & CEO",
        company: "AfrikEdu",
        content: "An exceptional full-stack developer! Evans built our web application with Next.js and a fast, secure backend. Met all deadlines with flawless communication and exemplary professionalism.",
        rating: 5,
        service: "Complete Web Application",
      },
      {
        name: "Alain D.",
        role: "Chief Information Security Officer (CISO)",
        company: "CyberGuard Africa",
        content: "As a SOC Analyst, Evans demonstrates remarkable rigor in SIEM monitoring and log analysis (Splunk, Wireshark). His threat detection and incident response capabilities greatly strengthened our defensive posture.",
        rating: 5,
        service: "Cybersecurity & SOC Consulting",
      },
      {
        name: "Clarisse N.",
        role: "Managing Director",
        company: "Yaoundé Express Services",
        content: "Our showcase website was delivered in less than a week, perfectly optimized for mobile and SEO. We saw our traffic double and client inquiries surge within the first month.",
        rating: 5,
        service: "Showcase Website / Landing Page",
      },
    ],
  },
  contact: {
    tag: "// Contact",
    titlePre: "Let's work ",
    titleHighlight: "together",
    titlePost: "",
    description: "Have a project in mind? A question? Feel free to contact me directly.",
    infoTitle: "Information",
    emailLabel: "Email",
    locationLabel: "Location",
    locationValue: "Yaoundé, Cameroon",
    socials: "Social media",
    availablePre: "Available for ",
    availableHighlight: "freelance work",
    formTitle: "Send a message",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Describe your project or request…",
    sending: "Sending…",
    submit: "Send the message",
    toastSuccess: "Message sent! I'll get back to you soon.",
    toastMail: "Opening your email client…",
    mailSubject: "Message",
    mailLabels: { name: "Name", email: "Email" },
  },
  footer: {
    location: "Yaoundé, Cameroon",
    rights: "All rights reserved.",
  },
  meta: {
    title: "Abah Prince Evans — SOC Analyst | Blue Team | Full-Stack Dev & Cybersecurity",
  },
};

const DICTIONARIES: Record<Lang, Dictionary> = { fr, en };

const STORAGE_KEY = "abahdev-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Restore saved preference (or fall back to the browser language)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") {
        setLangState(stored);
        return;
      }
      if (window.navigator.language?.toLowerCase().startsWith("en")) setLangState("en");
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  // Keep <html lang> and the tab title in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = DICTIONARIES[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "fr" ? "en" : "fr"), [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: DICTIONARIES[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
