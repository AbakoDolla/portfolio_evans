import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Github, Linkedin, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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
        toast.success("Message envoyé ! Je vous réponds bientôt.");
        setForm({ name: "", email: "", message: "" });
      } else throw new Error();
    } catch {
      const b = `Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:evansabah2006@gmail.com?subject=${encodeURIComponent("Message — " + form.name)}&body=${encodeURIComponent(b)}`;
      toast.info("Ouverture de votre client mail…");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(var(--primary) / 0.05), transparent)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Un projet en tête ? Une question sécurité ? Contactez-moi directement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            className="glass-strong rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold mb-6">Informations</h3>
            <div className="space-y-5 mb-8">
              {[
                { icon: Mail, label: "Email", value: "evansabah2006@gmail.com", href: "mailto:evansabah2006@gmail.com" },
                { icon: MapPin, label: "Localisation", value: "Yaoundé, Cameroun" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                    <info.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{info.label}</p>
                    {"href" in info ? (
                      <a href={info.href} className="transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                        {info.value}
                      </a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Réseaux sociaux</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Github, href: "https://github.com/AbakoDolla", label: "GitHub", color: undefined, bg: undefined },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn", color: undefined, bg: undefined },
                { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100092248629611", label: "Facebook", color: undefined, bg: undefined },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4 }}
                  className="p-3 rounded-xl glass transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
              {/* WhatsApp with official green */}
              <motion.a
                href="https://wa.me/+237691439534"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                className="p-3 rounded-xl transition-all flex items-center justify-center"
                style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 15px rgba(37,211,102,0.3)" }}
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-5 h-5" />
              </motion.a>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: "hsl(var(--secondary) / 0.1)", border: "1px solid hsl(var(--secondary) / 0.3)" }}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "hsl(var(--secondary))" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-3 w-3"
                    style={{ background: "hsl(var(--secondary))" }}
                  />
                </span>
                <span className="text-sm">
                  Disponible pour des{" "}
                  <span className="font-semibold" style={{ color: "hsl(var(--secondary))" }}>
                    missions freelance
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold mb-6">Envoyer un message</h3>
            <div className="space-y-4">
              {[
                { id: "name", label: "Nom complet", type: "text", placeholder: "Votre nom" },
                { id: "email", label: "Email", type: "email", placeholder: "votre@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="text-xs block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet ou demande…"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  style={{ resize: "none" }}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl font-bold transition-all"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.2)",
                  opacity: sending ? 0.6 : 1,
                }}
              >
                {sending ? "Envoi…" : "Envoyer le message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
