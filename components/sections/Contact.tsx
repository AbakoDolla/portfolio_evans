"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Github, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Message envoyé ! Je vous réponds bientôt."); setForm({ name:"", email:"", message:"" }); }
      else throw new Error();
    } catch {
      const b = `Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:evansabah2006@gmail.com?subject=${encodeURIComponent("Message — " + form.name)}&body=${encodeURIComponent(b)}`;
      toast.info("Ouverture de votre client mail…");
    } finally { setSending(false); }
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">// Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un projet en tête ? Une question ? N&apos;hésitez pas à me contacter directement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div className="glass-strong rounded-2xl p-8"
            initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <h3 className="text-xl font-bold mb-6">Informations</h3>
            <div className="space-y-5 mb-8">
              {[
                { icon: Mail, label:"Email", value:"evansabah2006@gmail.com", href:"mailto:evansabah2006@gmail.com" },
                { icon: MapPin, label:"Localisation", value:"Yaoundé, Cameroun" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/15"><info.icon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    {info.href ? <a href={info.href} className="text-foreground hover:text-primary transition-colors">{info.value}</a> : <p>{info.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3">Réseaux sociaux</p>
            <div className="flex gap-3 mb-8">
              {[
                { icon: Github,         href:"https://github.com/AbakoDolla",                          label:"GitHub" },
                { icon: Linkedin,       href:"https://www.linkedin.com/in/prince-evans-abah-0000b935a", label:"LinkedIn" },
                { icon: Facebook,       href:"https://web.facebook.com/profile.php?id=100092248629611", label:"Facebook" },
                { icon: MessageCircle, href:"https://wa.me/+237691439534",                              label:"WhatsApp" },
              ].map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4 }}
                  className="p-3 rounded-xl glass hover:border-primary/50 transition-all" aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
                </span>
                <span className="text-sm">Disponible pour des <span className="text-secondary font-semibold">missions freelance</span></span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8"
            initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <h3 className="text-xl font-bold mb-6">Envoyer un message</h3>
            <div className="space-y-4">
              {[
                { id:"name",  label:"Nom complet", type:"text",  placeholder:"Votre nom" },
                { id:"email", label:"Email",        type:"email", placeholder:"votre@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                  <input id={f.id} type={f.type} required placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all text-sm" />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                <textarea id="message" required rows={5} placeholder="Décrivez votre projet ou demande…"
                  value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all resize-none text-sm" />
              </div>
              <button type="submit" disabled={sending}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-lg shadow-primary/20">
                {sending ? "Envoi…" : "Envoyer le message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
