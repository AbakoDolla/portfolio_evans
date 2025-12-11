import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
  Phone,
  PhoneIcon,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "evansabah2006@gmail.com",
    href: "mailto:evansabah2006@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Yaoundé, Cameroun",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.https://github.com/AbakoDolla", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/prince-evans-abah-0000b935a", label: "LinkedIn" },
  { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100092248629611", label: "Facebook" },
  { icon: PhoneIcon, href: "https://wa.me/+237691439534?text=Salut%20Evans! j'ai%20%20besoin%20de%20tes%20services", label: "WhatsApp" },

];

export function Contact() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const subject = `Message de ${formData.name}`;
  const body = `Nom complet : ${formData.name}%0D%0AEmail : ${formData.email}%0D%0A%0D%0AMessage :%0D%0A${formData.message}`;

  // Ouvre le client mail avec les infos déjà remplies
  window.location.href = `mailto:evansabah2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  toast({
    title: "Ouverture du client mail",
    description: "Votre client mail par défaut va s'ouvrir pour envoyer le message.",
    duration: 5000,
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"
      />

      {/* Floating Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -100]) }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
      />

      {/* Animated Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

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
            // Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Travaillons{" "}
            <motion.span
              animate={{
                color: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--primary))"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-gradient"
            >
              ensemble
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Vous avez un projet de sécurité ou de développement ? Contactez-moi !
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            style={{ x: leftX }}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-strong rounded-2xl p-8 h-full"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold mb-6"
              >
                Informations
              </motion.h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-xl bg-primary/20"
                    >
                      <info.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <motion.a
                          href={info.href}
                          whileHover={{ scale: 1.02, color: "hsl(var(--primary))" }}
                          className="text-foreground transition-colors"
                        >
                          {info.value}
                        </motion.a>
                      ) : (
                        <p className="text-foreground">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-muted-foreground mb-4">Réseaux sociaux</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl glass hover:border-primary/50 transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-4 rounded-xl bg-secondary/10 border border-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inline-flex h-full w-full rounded-full bg-secondary"
                    />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
                  </span>
                  <span className="text-sm">
                    Disponible pour des{" "}
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-secondary font-medium"
                    >
                      missions
                    </motion.span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            style={{ x: rightX }}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-strong rounded-2xl p-8"
            >
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-xl font-bold mb-6"
              >
                Envoyez un message
              </motion.h3>

              <div className="space-y-4">
                {[
                  { id: "name", label: "Nom complet", type: "text", placeholder: "Votre nom" },
                  { id: "email", label: "Email", type: "email", placeholder: "votre@email.com" },
                ].map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <label htmlFor={field.id} className="text-sm text-muted-foreground mb-2 block">
                      {field.label}
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.id]: e.target.value })
                        }
                        required
                        className="bg-muted/50 border-border focus:border-primary transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet ou votre demande..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-muted/50 border-border focus:border-primary resize-none transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-4 h-4" />
                        </motion.span>
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
