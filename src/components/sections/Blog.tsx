import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rss, ExternalLink, Loader2, Clock, RefreshCw, Shield, Brain, Code2, Cpu, AlertTriangle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: "cybersécurité" | "IA" | "dev web" | "tech";
  date: string;
  imageUrl?: string;
}

const CAT_CONFIG = {
  "cybersécurité": { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)", icon: Shield },
  "IA":            { color: "#c084fc", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.25)", icon: Brain },
  "dev web":       { color: "#60a5fa", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.25)",  icon: Code2 },
  "tech":          { color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.25)",  icon: Cpu },
};
const CATEGORIES = ["Tous", "cybersécurité", "IA", "dev web", "tech"] as const;

const SOURCE_INITIALS: Record<string, string> = {
  "The Hacker News":   "THN",
  "Krebs on Security": "KBS",
  "TechCrunch":        "TC",
  "Dev.to":            "DEV",
  "ANSSI":             "ANS",
  "Bleeping Computer": "BPC",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "À l'instant";
  if (h < 24) return `il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `il y a ${d}j`;
  return `il y a ${Math.floor(d / 7)}sem`;
}

function PostCard({ post, i, inView }: { post: Post; i: number; inView: boolean }) {
  const cfg = CAT_CONFIG[post.category];
  const Icon = cfg.icon;
  const [imgOk, setImgOk] = useState(true);
  const initials = SOURCE_INITIALS[post.source] ?? post.source.slice(0, 3).toUpperCase();

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      whileHover={{ y: -6 }}
      className="flex flex-col group cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1rem",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = cfg.border;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${cfg.bg}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image or styled placeholder */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0 bg-black/30">
        {post.imageUrl && imgOk ? (
          <>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgOk(false)}
              loading="lazy"
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(5,10,24,0.85) 0%, transparent 55%)" }}
            />
          </>
        ) : (
          /* No image — styled branded placeholder */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${cfg.bg}, rgba(0,0,0,0.3))` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              <Icon className="w-7 h-7" style={{ color: cfg.color }} />
            </div>
            <span
              className="text-xs font-bold tracking-widest"
              style={{ color: cfg.color, fontFamily: "var(--app-font-mono)" }}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: "rgba(5,10,24,0.75)",
              color: cfg.color,
              border: `1px solid ${cfg.border}`,
              backdropFilter: "blur(8px)",
              fontFamily: "var(--app-font-mono)",
            }}
          >
            <Icon className="w-3 h-3" />
            {post.category}
          </span>
        </div>

        <ExternalLink
          className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          style={{ color: "hsl(var(--muted-foreground))" }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-semibold text-sm leading-snug line-clamp-2"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {post.title}
        </h3>
        {post.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "hsl(var(--muted-foreground) / 0.75)" }}>
            {post.description}
          </p>
        )}
        <div
          className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded"
            style={{
              color: cfg.color,
              background: cfg.bg,
              fontFamily: "var(--app-font-mono)",
            }}
          >
            {post.source}
          </span>
          <div className="flex items-center gap-1 text-[11px]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
            <Clock className="w-3 h-3" />
            {timeAgo(post.date)}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("Tous");

  const load = () => {
    setLoading(true);
    setError(false);
    fetch("/api/blog")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = filter === "Tous" ? posts : posts.filter((p) => p.category === filter);
  const displayed = filtered.slice(0, 9);

  return (
    <section id="blog" className="py-16 md:py-24 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.02), transparent)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Veille &amp; Actus</span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rss className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Veille <span className="text-gradient">cyber</span>
            </h2>
          </div>
          <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Dernières actualités en cybersécurité, IA et tech — agrégées depuis des sources de référence.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => {
            const cfg = cat !== "Tous" ? CAT_CONFIG[cat] : null;
            const Icon = cfg?.icon;
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-all"
                style={{
                  fontFamily: "var(--app-font-mono)",
                  background: active ? "hsl(var(--primary))" : "rgba(255,255,255,0.04)",
                  color: active ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  border: active ? "1px solid hsl(var(--primary))" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: active ? "0 4px 16px hsl(var(--primary) / 0.25)" : undefined,
                }}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {cat === "Tous" ? "Toutes" : cat}
              </button>
            );
          })}
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-all disabled:opacity-50"
            style={{
              fontFamily: "var(--app-font-mono)",
              color: "hsl(var(--muted-foreground))",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </motion.div>

        {/* States */}
        {loading ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "hsl(var(--primary))" }} />
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>
              Récupération des actus…
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <AlertTriangle className="w-10 h-10 mx-auto mb-4" style={{ color: "hsl(var(--accent))" }} />
            <p className="mb-6 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Impossible de charger les actus pour le moment.
            </p>
            <button
              onClick={load}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                border: "1px solid hsl(var(--primary) / 0.3)",
                color: "hsl(var(--primary))",
              }}
            >
              Réessayer
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-sm"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}
          >
            Aucun article dans cette catégorie.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((post, i) => (
              <PostCard key={post.id} post={post} i={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
