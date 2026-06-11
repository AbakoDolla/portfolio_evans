import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe, LayoutDashboard, ShieldCheck, Smartphone, Bot,
  ArrowRight, CheckCircle2, Mail, Clock, Star, Zap,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const SERVICES = [
  {
    icon: ShieldCheck,
    category: "Sécurité",
    title: "Audit de sécurité & Pentest",
    desc: "Test de pénétration éthique sur votre application web ou réseau. Rapport complet + recommandations de remédiation.",
    price: { fcfa: "80 000", eur: "€122", label: "À partir de" },
    timeline: "5–10 jours",
    color: "primary" as const,
    badge: "Recommandé",
    features: [
      "Scan de vulnérabilités OWASP Top 10",
      "Test réseau & application web",
      "Rapport PDF professionnel",
      "Plan de remédiation détaillé",
      "Suivi post-audit (1 semaine)",
    ],
  },
  {
    icon: LayoutDashboard,
    category: "Sécurité",
    title: "Consultation Cybersécurité",
    desc: "Audit de votre posture de sécurité, formation équipe, mise en place de politiques et meilleures pratiques.",
    price: { fcfa: "25 000", eur: "€38", label: "À partir de", per: "/heure" },
    timeline: "Sur rendez-vous",
    color: "secondary" as const,
    features: [
      "Audit complet de la posture sécurité",
      "Formation des équipes IT",
      "Rédaction de politique de sécurité",
      "Suivi mensuel optionnel",
    ],
  },
  {
    icon: Bot,
    category: "Sécurité",
    title: "Scripts & Automatisation",
    desc: "Scripts Python pour automatiser vos tâches, OSINT, monitoring et alertes de sécurité personnalisées.",
    price: { fcfa: "30 000", eur: "€46", label: "À partir de" },
    timeline: "1–5 jours",
    color: "accent" as const,
    features: [
      "Python / Bash sur mesure",
      "Outils OSINT & monitoring",
      "Exports CSV / Excel / JSON",
      "Documentation technique",
    ],
  },
  {
    icon: Globe,
    category: "Web",
    title: "Site vitrine / Landing Page",
    desc: "Présence web professionnelle, rapide et optimisée SEO. Design moderne, responsive et livré clé en main.",
    price: { fcfa: "50 000", eur: "€76", label: "À partir de" },
    timeline: "3–7 jours",
    color: "primary" as const,
    badge: "Populaire",
    features: [
      "Design responsive & moderne",
      "SEO technique optimisé",
      "Animations fluides",
      "Formulaire de contact",
      "Déploiement inclus",
    ],
  },
  {
    icon: LayoutDashboard,
    category: "Web",
    title: "Application web complète",
    desc: "Full-stack React + API sécurisée. Dashboard admin, authentification utilisateurs, base de données.",
    price: { fcfa: "150 000", eur: "€230", label: "À partir de" },
    timeline: "2–4 semaines",
    color: "secondary" as const,
    features: [
      "React / Next.js",
      "API REST sécurisée",
      "Auth & base de données",
      "Dashboard admin",
      "Tests & documentation",
    ],
  },
  {
    icon: Smartphone,
    category: "Web",
    title: "Application mobile",
    desc: "iOS & Android avec Expo / React Native. UX soignée, performances natives et backend sécurisé.",
    price: { fcfa: "200 000", eur: "€307", label: "À partir de" },
    timeline: "3–6 semaines",
    color: "accent" as const,
    features: [
      "iOS & Android (Expo)",
      "UX / UI soignée",
      "Notifications push",
      "Backend & auth sécurisés",
    ],
  },
];

interface FormData { name: string; email: string; service: string; budget: string; message: string; }

const COLOR = {
  primary:   { text: "hsl(var(--primary))",   bg: "hsl(var(--primary) / 0.08)",   border: "hsl(var(--primary) / 0.25)" },
  secondary: { text: "hsl(var(--secondary))", bg: "hsl(var(--secondary) / 0.08)", border: "hsl(var(--secondary) / 0.25)" },
  accent:    { text: "hsl(var(--accent))",    bg: "hsl(var(--accent) / 0.08)",    border: "hsl(var(--accent) / 0.25)" },
};

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormData>({ name: "", email: "", service: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"Tous" | "Sécurité" | "Web">("Tous");

  const handleSelect = (title: string) => {
    setForm((f) => ({ ...f, service: title }));
    setTimeout(() => {
      document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Demande envoyée ! Je vous contacte sous 24h.", { duration: 5000 });
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
      } else throw new Error();
    } catch {
      const subject = `Demande de service — ${form.service || "Portfolio"}`;
      const body = `Nom: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`;
      window.open(`mailto:evansabah2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } finally {
      setSending(false);
    }
  };

  const displayed = SERVICES.filter((s) => activeCategory === "Tous" || s.category === activeCategory);

  return (
    <section id="services" className="py-16 md:py-24 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--secondary) / 0.02), transparent)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Services &amp; Tarifs</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-gradient">prestations</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            Cybersécurité en priorité · Dev web en complément.
            <br />
            Tarifs compétitifs, qualité professionnelle, livrables clairs.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {[
              { icon: Zap, text: "Réponse sous 24h" },
              { icon: Star, text: "Devis gratuit" },
              { icon: Clock, text: "Délais respectés" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "var(--app-font-mono)",
                }}
              >
                <Icon className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
                {text}
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex justify-center gap-2">
            {(["Tous", "Sécurité", "Web"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeCategory === cat ? "hsl(var(--primary))" : "rgba(255,255,255,0.04)",
                  color: activeCategory === cat ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  border: activeCategory === cat ? "1px solid hsl(var(--primary))" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: activeCategory === cat ? "0 4px 16px hsl(var(--primary) / 0.25)" : undefined,
                  fontFamily: "var(--app-font-mono)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {displayed.map((svc, i) => {
            const cls = COLOR[svc.color];
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col rounded-2xl p-6 transition-all"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: svc.badge ? `1px solid ${cls.border}` : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: svc.badge ? `0 8px 40px ${cls.bg}` : undefined,
                }}
              >
                {/* Badge */}
                {svc.badge && (
                  <div
                    className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: cls.text,
                      color: "hsl(var(--background))",
                      fontFamily: "var(--app-font-mono)",
                    }}
                  >
                    {svc.badge}
                  </div>
                )}

                {/* Category label */}
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: cls.text, fontFamily: "var(--app-font-mono)" }}
                >
                  {svc.category}
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{ background: cls.bg }}
                  >
                    <svc.icon className="w-5 h-5" style={{ color: cls.text }} />
                  </div>
                  <h3 className="font-bold text-base leading-snug">{svc.title}</h3>
                </div>

                <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: "hsl(var(--muted-foreground) / 0.8)" }}>
                  {svc.desc}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: cls.text }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price block */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{ background: cls.bg, border: `1px solid ${cls.border}` }}
                >
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[10px] mb-0.5" style={{ color: cls.text, fontFamily: "var(--app-font-mono)" }}>
                        {svc.price.label}
                      </p>
                      <p className="font-extrabold text-lg leading-none" style={{ color: cls.text }}>
                        {svc.price.fcfa} FCFA
                        {svc.price.per && (
                          <span className="text-xs font-normal ml-1">{svc.price.per}</span>
                        )}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: cls.text, opacity: 0.7 }}>
                        ≈ {svc.price.eur}
                        {svc.price.per ? "/h" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <Clock className="w-3 h-3" />
                        <span style={{ fontFamily: "var(--app-font-mono)" }}>{svc.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(svc.title)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: svc.badge ? cls.text : "rgba(255,255,255,0.06)",
                    color: svc.badge ? "hsl(var(--background))" : cls.text,
                    border: svc.badge ? "none" : `1px solid ${cls.border}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!svc.badge) (e.currentTarget as HTMLElement).style.background = cls.bg;
                  }}
                  onMouseLeave={(e) => {
                    if (!svc.badge) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                >
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form */}
        <motion.div
          id="service-form"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="text-2xl font-bold mb-1 text-center">Décrire votre projet</h3>
            <p className="text-sm text-center mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Devis gratuit · Réponse sous 24h
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1.5 font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Nom complet *
                  </label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-xs block mb-1.5 font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Email *
                  </label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="votre@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1.5 font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Service
                  </label>
                  <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}>
                    <option value="">Choisir un service…</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Autre">Autre / Sur mesure</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1.5 font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Budget estimé
                  </label>
                  <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}>
                    <option value="">Budget…</option>
                    <option>{"< 50 000 FCFA (< €76)"}</option>
                    <option>50 000 – 150 000 FCFA (€76 – €230)</option>
                    <option>150 000 – 300 000 FCFA (€230 – €460)</option>
                    <option>{"300 000+ FCFA (€460+)"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs block mb-1.5 font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Description du projet *
                </label>
                <textarea
                  required rows={4} value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre projet, vos besoins, délais souhaités…"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                    opacity: sending ? 0.6 : 1,
                  }}
                >
                  <Mail className="w-4 h-4" />
                  {sending ? "Envoi en cours…" : "Envoyer ma demande"}
                </button>
                <a
                  href="https://wa.me/+237691439534?text=Bonjour%20Evans,%20je%20voudrais%20vous%20contacter%20pour%20un%20projet!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(37, 211, 102, 0.25)",
                  }}
                >
                  <SiWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
