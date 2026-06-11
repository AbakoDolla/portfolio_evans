import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rss, ExternalLink, Loader2, Clock, RefreshCw, Shield, Brain, Code2, Cpu } from "lucide-react";

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
  "cybersécurité": { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", icon: Shield },
  "IA": { color: "#c084fc", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)", icon: Brain },
  "dev web": { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", icon: Code2 },
  "tech": { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", icon: Cpu },
};
const CATEGORIES = ["Tous", "cybersécurité", "IA", "dev web", "tech"] as const;

// Category-specific placeholder images for when no image is available
const CAT_IMAGES: Record<string, string> = {
  "cybersécurité": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop&q=80",
  "IA": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop&q=80",
  "dev web": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop&q=80",
  "tech": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop&q=80",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "À l'instant";
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${Math.floor(h / 24)}j`;
}

function PostCard({ post, i, inView }: { post: Post; i: number; inView: boolean }) {
  const cfg = CAT_CONFIG[post.category];
  const Icon = cfg.icon;
  const [imgError, setImgError] = useState(false);
  const imgSrc = !imgError && post.imageUrl ? post.imageUrl : CAT_IMAGES[post.category];

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.07 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="glass-strong rounded-2xl overflow-hidden flex flex-col group transition-all cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.13)" }}
    >
      {/* Article image */}
      <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
        <img
          src={imgSrc}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.8) 0%, transparent 60%)" }}
        />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.border}`,
              backdropFilter: "blur(8px)",
              fontFamily: "var(--app-font-mono)",
            }}
          >
            <Icon className="w-3 h-3" /> {post.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <ExternalLink className="w-4 h-4 transition-colors" style={{ color: "hsl(var(--muted-foreground))" }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-bold text-sm leading-snug line-clamp-2 transition-colors group-hover:text-gradient"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {post.title}
        </h3>
        {post.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            {post.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid hsl(var(--border) / 0.3)" }}>
          <span className="text-xs font-semibold" style={{ color: "hsl(var(--muted-foreground))" }}>{post.source}</span>
          <div className="flex items-center gap-1 text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Clock className="w-3 h-3" /> {timeAgo(post.date)}
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
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("Tous");

  const load = () => {
    setLoading(true);
    setError(false);
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = filter === "Tous" ? posts : posts.filter((p) => p.category === filter);
  const displayed = filtered.slice(0, 9);

  return (
    <section id="blog" className="py-24 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.03), transparent)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Blog & Actus</span>
          <div className="inline-flex items-center gap-3 mb-4">
            <Rss className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Veille <span className="text-gradient">cyber</span>
            </h2>
          </div>
          <p className="max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Les dernières actualités en cybersécurité, IA et tech — agrégées automatiquement depuis des sources fiables.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => {
            const cfg = cat !== "Tous" ? CAT_CONFIG[cat] : null;
            const Icon = cfg?.icon;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm transition-all"
                style={{
                  fontFamily: "var(--app-font-mono)",
                  background: filter === cat ? "hsl(var(--primary))" : undefined,
                  color: filter === cat ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  border: filter === cat ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--border) / 0.5)",
                  boxShadow: filter === cat ? "0 4px 20px hsl(var(--primary) / 0.2)" : undefined,
                }}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat === "Tous" ? "Toutes" : cat}
              </button>
            );
          })}
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm glass transition-all disabled:opacity-50"
            style={{
              fontFamily: "var(--app-font-mono)",
              color: "hsl(var(--muted-foreground))",
              border: "1px solid hsl(var(--border) / 0.5)",
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
          </button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "hsl(var(--primary))" }} />
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>
              Récupération des actus…
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>Impossible de charger les actus pour le moment.</p>
            <button
              onClick={load}
              className="px-4 py-2 glass rounded-xl text-sm transition-all"
              style={{ color: "hsl(var(--primary))" }}
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((post, i) => (
              <PostCard key={post.id} post={post} i={i} inView={inView} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}
          >
            Aucun article dans cette catégorie.
          </div>
        )}
      </div>
    </section>
  );
}
