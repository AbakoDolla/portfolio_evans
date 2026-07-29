"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, LayoutDashboard, ShieldCheck, Smartphone, Bot, ArrowRight, CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";

const SERVICE_META = [
  { icon: Globe,            color: "primary" as const,   highlight: false },
  { icon: LayoutDashboard,  color: "secondary" as const, highlight: true },
  { icon: ShieldCheck,      color: "accent" as const,    highlight: false },
  { icon: Smartphone,       color: "primary" as const,   highlight: false },
  { icon: Bot,              color: "secondary" as const, highlight: false },
  { icon: LayoutDashboard,  color: "accent" as const,    highlight: false },
];

interface FormData { name: string; email: string; service: string; budget: string; message: string; }

export function Services() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const SERVICES = SERVICE_META.map((m, i) => ({ ...m, ...t.services.items[i] }));
  const pathname = usePathname() || "/";
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name:"", email:"", service:"", budget:"", message:"" });
  const [sending, setSending] = useState(false);

  const colorCls = (c: "primary"|"secondary"|"accent") => ({
    text: c === "primary" ? "text-primary" : c === "secondary" ? "text-secondary" : "text-accent",
    bg: c === "primary" ? "bg-primary/10" : c === "secondary" ? "bg-secondary/10" : "bg-accent/10",
    border: c === "primary" ? "border-primary/30" : c === "secondary" ? "border-secondary/30" : "border-accent/30",
  });

  const handleSelect = (index: number) => {
    const title = t.services.items[index].title;
    setSelected(title);
    setForm((f) => ({ ...f, service: title }));
    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    try {
      await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      toast.success(t.services.form.toast, { duration: 5000 });
      setForm({ name:"", email:"", service:"", budget:"", message:"" }); setSelected(null);
    } catch {
      const L = t.services.form.mailLabels;
      const subject = `${t.services.form.mailSubjectPrefix} — ${form.service || "Portfolio"}`;
      const body = `${L.name}: ${form.name}\n${L.email}: ${form.email}\n${L.service}: ${form.service}\n${L.budget}: ${form.budget}\n\n${form.message}`;
      window.open(`mailto:evansabah2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } finally { setSending(false); }
  };

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">

        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">{t.services.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.services.titlePre}<span className="text-gradient">{t.services.titleHighlight}</span>{t.services.titlePost}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.services.description}
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
                    {t.services.popular}
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
                  <button onClick={() => handleSelect(i)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border ${cls.border} ${cls.bg} ${cls.text} font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all`}>
                    {t.services.order} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {pathname !== "/services" && (
          <div className="text-center mb-16">
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-primary/30 text-primary font-bold hover:bg-primary/10 transition-all shadow-sm"
            >
              Voir la page dédiée Services & Tarifs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Contact form */}
        <motion.div id="service-form"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-2 text-center">{t.services.form.title}</h3>
            <p className="text-muted-foreground text-sm text-center mb-8">
              {t.services.form.subtitle}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.services.form.name}</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t.services.form.namePlaceholder} className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.services.form.email}</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={t.services.form.emailPlaceholder} className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.services.form.service}</label>
                  <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm">
                    <option value="">{t.services.form.chooseService}</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value={t.services.form.other}>{t.services.form.other}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.services.form.budget}</label>
                  <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm">
                    <option value="">{t.services.form.budgetPlaceholder}</option>
                    <option>{"< 50 000 FCFA"}</option>
                    <option>50 000 – 150 000 FCFA</option>
                    <option>150 000 – 300 000 FCFA</option>
                    <option>{"300 000+ FCFA"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">{t.services.form.message}</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder={t.services.form.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all resize-none text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-lg shadow-primary/25">
                  <Mail className="w-4 h-4" /> {sending ? t.services.form.sending : t.services.form.submit}
                </button>
                <a href={`https://wa.me/+237691439534?text=${encodeURIComponent(t.services.whatsappMsg)}`} target="_blank" rel="noopener noreferrer"
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
