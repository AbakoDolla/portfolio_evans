import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, LayoutDashboard, ShieldCheck, Smartphone, Bot, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Audit de sécurité / Pentest",
    desc: "Test de pénétration éthique sur votre application web ou réseau. Rapport complet + recommandations de remédiation.",
    price: "À partir de 80 000 FCFA",
    delay: "5–10 jours",
    color: "primary" as const,
    features: ["Scan de vulnérabilités", "OWASP Top 10", "Rapport détaillé PDF", "Recommandations"],
    highlight: true,
  },
  {
    icon: LayoutDashboard,
    title: "Consultation Cybersécurité",
    desc: "Audit de votre posture de sécurité, formation équipe, mise en place de bonnes pratiques et politique de sécurité.",
    price: "À partir de 25 000 FCFA/h",
    delay: "Sur rendez-vous",
    color: "secondary" as const,
    features: ["Audit posture sécurité", "Formation équipe", "Politique sécurité", "Suivi mensuel optionnel"],
  },
  {
    icon: Bot,
    title: "Automatisation & Scripts",
    desc: "Scripts Python pour automatiser vos tâches, scraping, OSINT ou traitement de données et alertes de sécurité.",
    price: "À partir de 30 000 FCFA",
    delay: "1–5 jours",
    color: "accent" as const,
    features: ["Python / BeautifulSoup", "Outils OSINT", "Exports CSV/Excel", "Documentation"],
  },
  {
    icon: Globe,
    title: "Site vitrine / Landing Page",
    desc: "Présence web professionnelle, rapide et optimisée SEO. Idéal pour entreprises, freelances et startups.",
    price: "À partir de 50 000 FCFA",
    delay: "3–7 jours",
    color: "primary" as const,
    features: ["Design responsive", "SEO optimisé", "Animations fluides", "Déploiement inclus"],
  },
  {
    icon: LayoutDashboard,
    title: "Application web complète",
    desc: "Full-stack React + Next.js + API. Dashboard admin, auth utilisateurs, base de données intégrée.",
    price: "À partir de 150 000 FCFA",
    delay: "2–4 semaines",
    color: "secondary" as const,
    features: ["React / Next.js", "Auth & base de données", "API REST sécurisée", "Dashboard admin"],
  },
  {
    icon: Smartphone,
    title: "App mobile (React Native)",
    desc: "Application iOS & Android avec Expo/React Native. UX soignée et performances natives.",
    price: "À partir de 200 000 FCFA",
    delay: "3–6 semaines",
    color: "accent" as const,
    features: ["iOS & Android", "Expo / React Native", "Notifications push", "Backend sécurisé"],
  },
];

interface FormData { name: string; email: string; service: string; budget: string; message: string; }

function colorStyle(c: "primary" | "secondary" | "accent") {
  return {
    text: c === "primary" ? "hsl(var(--primary))" : c === "secondary" ? "hsl(var(--secondary))" : "hsl(var(--accent))",
    bg: c === "primary" ? "hsl(var(--primary) / 0.1)" : c === "secondary" ? "hsl(var(--secondary) / 0.1)" : "hsl(var(--accent) / 0.1)",
    border: c === "primary" ? "hsl(var(--primary) / 0.3)" : c === "secondary" ? "hsl(var(--secondary) / 0.3)" : "hsl(var(--accent) / 0.3)",
  };
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormData>({ name: "", email: "", service: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSelect = (title: string) => {
    setForm((f) => ({ ...f, service: title }));
    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  return (
    <section id="services" className="py-16 md:py-24 relative" ref={ref}>
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
          <span className="section-title">// Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-gradient">prestations</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Cybersécurité en priorité, développement web en complément — des solutions adaptées à votre budget.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((svc, i) => {
            const cls = colorStyle(svc.color);
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-strong rounded-2xl p-6 relative flex flex-col"
                style={svc.highlight ? { outline: "1px solid hsl(var(--primary) / 0.4)", boxShadow: "0 8px 40px hsl(var(--primary) / 0.1)" } : {}}
              >
                {svc.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontFamily: "var(--app-font-mono)" }}
                  >
                    Recommandé
                  </div>
                )}
                <div className="p-3 rounded-xl inline-flex mb-4" style={{ background: cls.bg }}>
                  <svc.icon className="w-6 h-6" style={{ color: cls.text }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>{svc.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cls.text }} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.4)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm" style={{ color: cls.text }}>{svc.price}</span>
                    <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>{svc.delay}</span>
                  </div>
                  <button
                    onClick={() => handleSelect(svc.title)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all"
                    style={{ border: `1px solid ${cls.border}`, background: cls.bg, color: cls.text }}
                  >
                    Commander <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Service request form */}
        <motion.div
          id="service-form"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-2 text-center">Décrire votre projet</h3>
            <p className="text-sm text-center mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Je vous réponds sous 24h avec un devis personnalisé.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Nom complet *</label>
                  <input
                    required value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Email *</label>
                  <input
                    required type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Service souhaité</label>
                  <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}>
                    <option value="">Choisir un service…</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Budget estimé</label>
                  <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}>
                    <option value="">Budget…</option>
                    <option>{"< 50 000 FCFA"}</option>
                    <option>50 000 – 150 000 FCFA</option>
                    <option>150 000 – 300 000 FCFA</option>
                    <option>{"300 000+ FCFA"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Description du projet *</label>
                <textarea
                  required rows={5} value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre projet, vos besoins, délais souhaités…"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                    opacity: sending ? 0.6 : 1,
                  }}
                >
                  <Mail className="w-4 h-4" />
                  {sending ? "Envoi…" : "Envoyer ma demande"}
                </button>
                <a
                  href="https://wa.me/+237691439534?text=Bonjour%20Evans,%20je%20voudrais%20vous%20contacter%20pour%20un%20projet!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
                  }}
                >
                  <SiWhatsapp className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
