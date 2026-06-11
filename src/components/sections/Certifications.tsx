import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, CheckCircle, Calendar, Building2, ChevronDown, ChevronUp } from "lucide-react";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badgeSrc: string;
  tags: string[];
}

const CERTS: Cert[] = [
  {
    id: "1", title: "Introduction à la Cybersécurité", issuer: "Cisco", date: "2026-02-03",
    badgeSrc: "/images/introduction-to-cybersecurity.png",
    tags: ["Cybersécurité", "Menaces", "Protection"],
    description: "Identification des cybermenaces (malwares, phishing, ingénierie sociale) et application des meilleures pratiques de protection des données et infrastructures.",
  },
  {
    id: "2", title: "Linux Unhatched", issuer: "Cisco", date: "2026-02-04",
    badgeSrc: "/images/linux-unhatched.png",
    tags: ["Linux", "CLI", "Open Source"],
    description: "Navigation et administration d'un système Linux en ligne de commande, gestion de fichiers et compréhension de l'architecture Open Source.",
  },
  {
    id: "3", title: "Fortinet Certified Professional", issuer: "Fortinet", date: "2025-12-11",
    badgeSrc: "/images/introduction-to-the-threat-landscape-3-0.png",
    tags: ["Réseau", "Pare-feu", "IPS"],
    description: "Compétences en sécurité réseau avec les solutions Fortinet : pare-feux, systèmes de prévention d'intrusion et sécurité des endpoints.",
  },
  {
    id: "4", title: "Networking Basics", issuer: "Cisco", date: "2026-03-28",
    badgeSrc: "/images/networking-basics.png",
    tags: ["TCP/IP", "OSI", "Subnetting"],
    description: "Architecture réseau (modèles OSI/TCP-IP), configuration d'équipements, adressage IP, subnetting et diagnostic d'incidents réseau.",
  },
  {
    id: "5", title: "Networking Devices & Initial Configuration", issuer: "Cisco", date: "2026-05-02",
    badgeSrc: "/images/networking-devices-and-initial-configuration.png",
    tags: ["Cisco", "Routeurs", "IPv4/IPv6"],
    description: "Configuration de terminaux, installation de commutateurs et routeurs Cisco, mise en place de la connectivité IPv4 et IPv6.",
  },
  {
    id: "6", title: "Critical Infrastructure Protection (ICIP)", issuer: "OPSWAT", date: "2026-04-22",
    badgeSrc: "/images/opswat-introduction-to-critical-infrastructure-protection-icip.png",
    tags: ["Infrastructure", "OT/IT", "Résilience"],
    description: "Protection des infrastructures critiques, identification des vulnérabilités, mesures de sécurité et gestion des risques pour systèmes essentiels.",
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.03), transparent)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Certifications</span>
          <div className="inline-flex items-center gap-3 mb-4">
            <Award className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Mes <span className="text-gradient">Certifications</span>
            </h2>
          </div>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Formations validées par des organismes reconnus en cybersécurité et réseaux.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {ISSUERS.map((iss) => (
            <button
              key={iss}
              onClick={() => setFilter(iss)}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
              style={{
                fontFamily: "var(--app-font-mono)",
                background: filter === iss ? "hsl(var(--primary))" : undefined,
                color: filter === iss ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                border: filter === iss ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--border) / 0.5)",
                boxShadow: filter === iss ? "0 4px 20px hsl(var(--primary) / 0.25)" : undefined,
              }}
            >
              {iss}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          {[
            { icon: Award, val: CERTS.length, label: "Certifications" },
            { icon: Building2, val: "3", label: "Organismes" },
            { icon: CheckCircle, val: "100%", label: "Validées" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-5 py-3 glass rounded-xl">
              <s.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
              <div>
                <div className="text-xl font-black text-gradient">{s.val}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-strong rounded-2xl overflow-hidden group"
            >
              {/* Badge */}
              <div
                className="relative h-32 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.05))",
                  borderBottom: "1px solid hsl(var(--border) / 0.3)",
                }}
              >
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    src={cert.badgeSrc}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-5 h-5" style={{ color: "hsl(var(--secondary))" }} />
                </div>
                <div
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-full"
                  style={{
                    background: "hsl(var(--background) / 0.8)",
                    border: "1px solid hsl(var(--border) / 0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}>
                    {cert.issuer}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-base leading-snug mb-2">{cert.title}</h3>
                <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <Calendar className="w-3 h-3" />
                  {new Date(cert.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded-full"
                      style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}
                  className="flex items-center gap-1 text-xs transition-colors font-bold mb-2"
                  style={{ color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}
                >
                  {expanded === cert.id ? (
                    <><ChevronUp className="w-3 h-3" />Réduire</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" />Détails</>
                  )}
                </button>
                {expanded === cert.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs leading-relaxed"
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      borderTop: "1px solid hsl(var(--border) / 0.3)",
                      paddingTop: "0.5rem",
                    }}
                  >
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
