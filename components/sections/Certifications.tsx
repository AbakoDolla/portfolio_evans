"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, CheckCircle, Calendar, Building2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badgeSrc: string;
  verifyUrl?: string;
  tags: string[];
}

const CERTS: Cert[] = [
  {
    id:"1", title:"Introduction à la Cybersécurité", issuer:"Cisco", date:"2026-02-03",
    badgeSrc:"/images/introduction-to-cybersecurity.png",
    tags:["Cybersécurité","Menaces","Protection"],
    description:"Identification des cybermenaces (malwares, phishing, ingénierie sociale) et application des meilleures pratiques de protection des données et infrastructures.",
  },
  {
    id:"2", title:"Linux Unhatched", issuer:"Cisco", date:"2026-02-04",
    badgeSrc:"/images/linux-unhatched.png",
    tags:["Linux","CLI","Open Source"],
    description:"Navigation et administration d'un système Linux en ligne de commande, gestion de fichiers et compréhension de l'architecture Open Source.",
  },
  {
    id:"3", title:"Fortinet Certified Professional", issuer:"Fortinet", date:"2025-12-11",
    badgeSrc:"/images/introduction-to-the-threat-landscape-3-0.png",
    tags:["Réseau","Pare-feu","IPS"],
    description:"Compétences en sécurité réseau avec les solutions Fortinet : pare-feux, systèmes de prévention d'intrusion et sécurité des endpoints.",
  },
  {
    id:"4", title:"Networking Basics", issuer:"Cisco", date:"2026-03-28",
    badgeSrc:"/images/networking-basics.png",
    tags:["TCP/IP","OSI","Subnetting"],
    description:"Architecture réseau (modèles OSI/TCP-IP), configuration d'équipements, adressage IP, subnetting et diagnostic d'incidents réseau.",
  },
  {
    id:"5", title:"Networking Devices & Initial Configuration", issuer:"Cisco", date:"2026-05-02",
    badgeSrc:"/images/networking-devices-and-initial-configuration.png",
    tags:["Cisco","Routeurs","IPv4/IPv6"],
    description:"Configuration de terminaux, installation de commutateurs et routeurs Cisco, mise en place de la connectivité IPv4 et IPv6.",
  },
  {
    id:"6", title:"Critical Infrastructure Protection (ICIP)", issuer:"OPSWAT", date:"2026-04-22",
    badgeSrc:"/images/opswat-introduction-to-critical-infrastructure-protection-icip.png",
    tags:["Infrastructure","OT/IT","Résilience"],
    description:"Protection des infrastructures critiques, identification des vulnérabilités, mesures de sécurité et gestion des risques pour systèmes essentiels.",
  },
];

const ISSUERS = ["Tous", "Cisco", "Fortinet", "OPSWAT"];

export function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("Tous");
  const [expanded, setExpanded] = useState<string | null>(null);

  const displayed = filter === "Tous" ? CERTS : CERTS.filter((c) => c.issuer === filter);

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">// Certifications</span>
          <div className="inline-flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Mes <span className="text-gradient">Certifications</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formations validées par des organismes reconnus mondialement en cybersécurité et réseaux.
          </p>
        </motion.div>

        {/* Issuer filter */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          {ISSUERS.map((iss) => (
            <button key={iss} onClick={() => setFilter(iss)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium border transition-all ${
                filter === iss ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25" : "glass border-border/50 text-muted-foreground hover:border-primary/30"
              }`}>
              {iss}
            </button>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div className="flex flex-wrap justify-center gap-6 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}>
          {[
            { icon: Award,     val: CERTS.length, label: "Certifications" },
            { icon: Building2, val: "3",           label: "Organismes" },
            { icon: CheckCircle, val: "100%",      label: "Validées" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-5 py-3 glass rounded-xl">
              <s.icon className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xl font-black text-primary">{s.val}</div>
                <div className="text-xs text-muted-foreground font-mono">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((cert, i) => (
            <motion.div key={cert.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-strong rounded-2xl overflow-hidden group">
              {/* Badge image */}
              <div className="relative h-32 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent flex items-center justify-center border-b border-border/30">
                <div className="relative w-24 h-24">
                  <Image src={cert.badgeSrc} alt={cert.title} fill className="object-contain drop-shadow-lg" sizes="96px" />
                </div>
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                  <span className="text-xs font-bold text-primary font-mono">{cert.issuer}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {new Date(cert.date).toLocaleDateString("fr-FR", { year:"numeric", month:"long" })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-mono">{t}</span>
                  ))}
                </div>

                {/* Expand description */}
                <button onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-mono mb-2">
                  {expanded === cert.id ? <><ChevronUp className="w-3 h-3" />Réduire</> : <><ChevronDown className="w-3 h-3" />Détails</>}
                </button>
                {expanded === cert.id && (
                  <motion.p initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                    className="text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2">
                    {cert.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
