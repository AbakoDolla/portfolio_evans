import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Award, Plus, Upload, Star, TrendingUp, CheckCircle, X, Sparkles } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  badgeSrc?: string;
  description?: string;
}

export function Certifications() {
  const certifications: Certification[] = [
    {
      id: "1",
      title: "Introduction à la cybersécurité",
      issuer: "Cisco",
      date: "2026-02-03",
      description: "Cette certification valide ma compréhension des enjeux fondamentaux de la sécurité numérique. J'ai acquis des compétences clés dans l'identification des cybermenaces (malwares, phishing, ingénierie sociale) et dans l'application des principes de protection des données. Ce parcours démontre ma capacité à évoluer dans un environnement numérique complexe en adoptant les meilleures pratiques de cybersécurité pour protéger les infrastructures et les utilisateurs",
      badgeSrc: "/images/introduction-to-cybersecurity.png"
    },
    {
      id: "2", 
      title: "linux-unhatched",
      issuer: "Cisco",
      date: "2026-02-04",
      description: "Capacité à naviguer et administrer un système en ligne de commande (CLI), gestion de fichiers et compréhension de l'architecture Open Source. ",
      badgeSrc: "/images/linux-unhatched.png"
    },
    {
      id: "3",
      title: "Fortinet Certified Professional",
      issuer: "Fortinet",
      date: "2025-12-11",
      description: "Certification validant mes compétences en sécurité réseau et en cybersécurité avec les solutions Fortinet. Maîtrise des pare-feux, des systèmes de prévention d'intrusion et de la sécurité des endpoints.",
      badgeSrc: "/images/introduction-to-the-threat-landscape-3-0.png"
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Certifications & Diplômes
            </h2>
          </motion.div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mes certifications et diplômes qui témoignent de mon expertise et de mon engagement continu dans l'apprentissage
          </p>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="h-full border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-300 relative group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {cert.badgeSrc ? (
                        <div className="relative">
                          <img
                            src={cert.badgeSrc}
                            alt="badge"
                            className="w-16 h-16 rounded-xl object-cover border-2 border-border/50 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background animate-pulse"></div>
                          <div className="absolute -top-1 -right-1">
                            <CheckCircle className="w-4 h-4 text-green-500 bg-background rounded-full" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-border/50 flex items-center justify-center">
                          <Award className="w-8 h-8 text-primary/60" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-lg text-foreground leading-tight">
                            {cert.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-muted-foreground">4.9</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {cert.issuer && (
                            <Badge variant="secondary" className="text-xs">
                              {cert.issuer}
                            </Badge>
                          )}
                          {cert.date && (
                            <Badge variant="outline" className="text-xs">
                              {new Date(cert.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'short'
                              })}
                            </Badge>
                          )}
                        </div>
                        {cert.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {cert.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span>En demande</span>
                          <span>•</span>
                          <span>Validé par l'organisme</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
