"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Rss, ExternalLink, Loader2, Clock, RefreshCw, Shield, Brain, Code2, Cpu } from "lucide-react";
import { useLanguage, type Dictionary } from "@/lib/i18n";

interface Post {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: "cybersécurité" | "IA" | "dev web" | "tech";
  date: string;
}

const CAT_CONFIG = {
  "cybersécurité": { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",  icon: Shield },
  "IA":            { color: "text-purple-400",  bg: "bg-purple-500/10", border: "border-purple-500/20",icon: Brain },
  "dev web":       { color: "text-blue-400",    bg: "bg-blue-500/10",   border: "border-blue-500/20", icon: Code2 },
  "tech":          { color: "text-green-400",   bg: "bg-green-500/10",  border: "border-green-500/20",icon: Cpu },
};
const CATEGORIES = ["all", "cybersécurité", "IA", "dev web", "tech"] as const;

function timeAgo(dateStr: string, t: Dictionary["blog"]) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return t.justNow;
  if (h < 24) return t.hoursAgo(h);
  return t.daysAgo(Math.floor(h/24));
}

export function Blog() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("all");

  const load = () => {
    setLoading(true); setError(false);
    fetch("/api/blog").then((r) => r.json()).then(setPosts).catch(() => setError(true)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const displayed = filtered.slice(0, 9);

  return (
    <section id="blog" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-title">{t.blog.tag}</span>
          <div className="inline-flex items-center gap-3 mb-4">
            <Rss className="w-7 h-7 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t.blog.titlePre}<span className="text-gradient">{t.blog.titleHighlight}</span>{t.blog.titlePost}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.blog.description}
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          {CATEGORIES.map((cat) => {
            const cfg = cat !== "all" ? CAT_CONFIG[cat] : null;
            const Icon = cfg?.icon;
            return (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-mono border transition-all ${
                  filter === cat ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "glass border-border/50 text-muted-foreground hover:border-primary/30"
                }`}>
                {Icon && <Icon className="w-3.5 h-3.5" />} {cat === "all" ? t.blog.allCategories : t.blog.categories[cat]}
              </button>
            );
          })}
          <button onClick={load} disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-mono glass border border-border/50 text-muted-foreground hover:border-primary/30 disabled:opacity-50 transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> {t.blog.refresh}
          </button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground font-mono text-sm">{t.blog.loading}</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">{t.blog.error}</p>
            <button onClick={load} className="px-4 py-2 glass rounded-xl text-sm text-primary hover:bg-primary/10 transition-all">{t.blog.retry}</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((post, i) => {
              const cfg = CAT_CONFIG[post.category];
              const Icon = cfg.icon;
              return (
                <motion.a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="glass-strong rounded-2xl p-5 flex flex-col gap-3 group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                      <Icon className="w-3 h-3" /> {t.blog.categories[post.category] ?? post.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
                    <span className="text-xs font-semibold text-muted-foreground">{post.source}</span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" /> {timeAgo(post.date, t.blog)}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-mono">{t.blog.empty}</div>
        )}
      </div>
    </section>
  );
}
