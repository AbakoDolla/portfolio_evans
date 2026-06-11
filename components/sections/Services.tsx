"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, LayoutDashboard, ShieldCheck, Smartphone, Bot, ArrowRight, CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

const SERVICES = [
  {
    icon: Globe,
    title: "Site vitrine / Landing Page",
    desc: "Présence web professionnelle, rapide et optimisée SEO. Idéal pour entreprises, freelances et artisans.",
    price: "À partir de 50 000 FCFA",
    delay: "3–7 jours",
    color: "primary" as const,
    features: ["Design responsive moderne","SEO optimisé","Animations fluides","Déploiement Vercel"],
  },
  {
    icon: LayoutDashboard,
    title: "Application web complète",
    desc: "Full-stack React + Next.js + API. Dashboard admin, auth utilisateurs, base de données intégrée.",
    price: "À partir de 150 000 FCFA",
    delay: "2–4 semaines",
    color: "secondary" as const,
    features: ["React / Next.js","Auth & base de données","API REST sécurisée","Tableau de bord admin"],
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "Audit de sécurité / Pentest",
    desc: "Test de pénétration éthique sur votre application web ou réseau. Rapport complet + recommandations.",
    price: "À partir de 80 000 FCFA",
    delay: "5–10 jours",
    color: "accent" as const,
    features: ["Scan de vulnérabilités","OWASP Top 10","Rapport détaillé PDF","Recommandations"],
  },
  {
    icon: Smartphone,
    title: "App mobile (React Native)",
    desc: "Application iOS & Android avec Expo/React Native. UX soignée et performances natives.",
    price: "À partir de 200 000 FCFA",
    delay: "3–6 semaines",
    color: "primary" as const,
    features: ["iOS & Android","Expo / React Native","Notifications push","Supabase backend"],
  },
  {
    icon: Bot,
    title: "Automatisation & Scripts",
    desc: "Scripts Python pour automatiser vos tâches répétitives, scraping, OSINT ou traitement de données.",
    price: "À partir de 30 000 FCFA",
    delay: "1–5 jours",
    color: "secondary" as const,
    features: ["Python / BeautifulSoup","Scraping légal","Exports CSV/Excel","Documentation"],
  },
  {
    icon: LayoutDashboard,
    title: "Consultation Cybersécurité",
    desc: "Audit de votre posture de sécurité, formation équipe, mise en place de bonnes pratiques.",
    price: "À partir de 25 000 FCFA/h",
    delay: "Sur rendez-vous",
    color: "accent" as const,
    features: ["Audit posture sécurité","Formation équipe","Politique de sécurité","Suivi mensuel optionnel"],
  },
];

interface FormData { name: string; email: string; service: string; budget: string; message: string; }

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name:"", email:"", service:"", budget:"", message:"" });
  const [sending, setSending] = useState(false);

  const colorCls = (c: "primary"|"secondary"|"accent") => ({
    text: c === "primary" ? "text-primary" : c === "secondary" ? "text-secondary" : "text-accent",
    bg: c === "primary" ? "bg-primary/10" : c === "secondary" ? "bg-secondary/10" : "bg-accent/10",
    border: c === "primary" ? "border-primary/30" : c === "secondary" ? "border-secondary/30" : "border-accent/30",
  });

  const handleSelect = (title: string) => {
    setSelected(title);
    setForm((f) => ({ ...f, service: title }));
    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    try {
      await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      toast.success("Demande envoyée ! Je vous contacte sous 24h.", { duration: 5000 });
      setForm({ name:"", email:"", service:"", budget:"", message:"" }); setSelected(null);
    } catch {
      const subject = `Demande de service — ${form.service || "Portfolio"}`;
      const body = `Nom: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`;
      window.open(`mailto:evansabah2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } finally { setSending(false); }
  };

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">

        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">// Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-gradient">prestations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Développement web, cybersécurité, automatisation — des solutions sur-mesure adaptées à votre budget.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((svc, i) => {
            const cls = colorCls(svc.color);
            return (
              <motion.div key={svc.title}
                initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`glass-strong rounded-2xl p-6 relative flex flex-col ${svc.highlight ? "ring-1 ring-secondary/40 shadow-lg shadow-secondary/10" : ""}`}>
                {svc.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold font-mono">
                    ⭐ Populaire
                  </div>
                )}
                <div className={`p-3 rounded-xl inline-flex mb-4 ${cls.bg}`}>
                  <svc.icon className={`w-6 h-6 ${cls.text}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{svc.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${cls.text}`} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-bold text-sm ${cls.text}`}>{svc.price}</span>
                    <span className="text-xs text-muted-foreground font-mono">{svc.delay}</span>
                  </div>
                  <button onClick={() => handleSelect(svc.title)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border ${cls.border} ${cls.bg} ${cls.text} font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all`}>
                    Commander <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form */}
        <motion.div id="service-form"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-2 text-center">Décrire votre projet</h3>
            <p className="text-muted-foreground text-sm text-center mb-8">
              Je vous réponds sous 24h avec un devis personnalisé.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Nom complet *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Votre nom" className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="votre@email.com" className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Service souhaité</label>
                  <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm">
                    <option value="">Choisir un service…</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Budget estimé</label>
                  <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm">
                    <option value="">Budget…</option>
                    <option>{"< 50 000 FCFA"}</option>
                    <option>50 000 – 150 000 FCFA</option>
                    <option>150 000 – 300 000 FCFA</option>
                    <option>{"300 000+ FCFA"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Description du projet *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre projet, vos besoins, délais souhaités…"
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all resize-none text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-lg shadow-primary/25">
                  <Mail className="w-4 h-4" /> {sending ? "Envoi…" : "Envoyer ma demande"}
                </button>
                <a href="https://wa.me/+237691439534?text=Bonjour%20Evans,%20je%20voudrais%20vous%20contacter%20pour%20un%20projet!" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-green-500/30 text-green-400 font-bold hover:bg-green-500/10 transition-all">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
