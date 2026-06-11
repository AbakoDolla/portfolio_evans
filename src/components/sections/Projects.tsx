import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Globe, Loader2, Star, ChevronDown, ChevronUp } from "lucide-react";

interface Repo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572a5",
  "C++": "#f34b7d", Rust: "#dea584", Go: "#00add8",
  HTML: "#e34c26", CSS: "#563d7c", Dart: "#00b4ab",
};

const PROJECT_LOGOS: Record<string, string> = {
  "ember-grill": "/images/ember-grill-logo.png",
  "star-live-studio": "/images/starlive-logo.png",
  "starlive": "/images/starlive-logo.png",
};

function getProjectImage(repo: Repo) {
  const lower = repo.name.toLowerCase();
  for (const [key, path] of Object.entries(PROJECT_LOGOS)) {
    if (lower.includes(key.split("-")[0])) return { type: "logo" as const, src: path };
  }
  if (repo.homepage) {
    return {
      type: "screenshot" as const,
      src: `https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&embed=screenshot.url&meta=false`,
    };
  }
  const lang = repo.language || "Code";
  return { type: "lang" as const, lang, color: LANG_COLORS[lang] || "#6e40c9" };
}

function ProjectImage({ repo }: { repo: Repo }) {
  const img = getProjectImage(repo);
  const [err, setErr] = useState(false);

  if (img.type === "logo" && !err) {
    return (
      <div className="w-full h-36 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: "hsl(var(--muted) / 0.3)" }}>
        <img src={img.src} alt={repo.name} className="max-h-24 max-w-full object-contain p-4" onError={() => setErr(true)} />
      </div>
    );
  }
  if (img.type === "screenshot" && !err) {
    return (
      <div className="w-full h-36 rounded-xl overflow-hidden relative" style={{ background: "hsl(var(--muted) / 0.3)" }}>
        <img src={img.src} alt={repo.name} className="w-full h-full object-cover object-top" onError={() => setErr(true)} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.6), transparent)" }} />
      </div>
    );
  }
  const color = img.type === "lang" ? img.color : "#6e40c9";
  const label = img.type === "lang" ? img.lang : "Code";
  return (
    <div
      className="w-full h-36 rounded-xl overflow-hidden flex items-center justify-center relative"
      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, border: `1px solid ${color}40` }}
    >
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center text-2xl font-black"
          style={{ backgroundColor: color, color: "#fff" }}
        >
          {(label || "?").charAt(0)}
        </div>
        <span className="text-xs font-bold" style={{ color, fontFamily: "var(--app-font-mono)" }}>{label}</span>
      </div>
      <div className="absolute top-3 right-3 flex gap-1.5">
        {["#ff5f57", "#ffbd2e", "#28c940"].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setRepos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayed = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="py-16 md:py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title">// Projets</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ce que je <span className="text-gradient">construis</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
            Sécurité, automatisation et outils — des projets concrets tirés directement de GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "hsl(var(--primary))" }} />
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>
              Chargement depuis GitHub…
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((repo, i) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-strong rounded-2xl overflow-hidden group flex flex-col"
                >
                  <div className="p-4 pb-0">
                    <ProjectImage repo={repo} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="font-bold text-base line-clamp-1 transition-colors"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </h3>
                      <div className="flex items-center gap-1 text-xs ml-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                      </div>
                    </div>
                    {repo.language && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || "#666" }} />
                        <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--app-font-mono)" }}>{repo.language}</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {repo.description || "Projet GitHub"}
                    </p>
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {repo.topics.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] rounded-full"
                            style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: "1px solid hsl(var(--border) / 0.4)" }}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg glass text-xs font-medium transition-all"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                          style={{
                            background: "hsl(var(--primary) / 0.1)",
                            border: "1px solid hsl(var(--primary) / 0.2)",
                            color: "hsl(var(--primary))",
                          }}
                        >
                          <Globe className="w-3.5 h-3.5" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {repos.length > 6 && (
              <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-sm font-bold transition-all"
                  style={{ border: "1px solid hsl(var(--primary) / 0.2)", color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}
                >
                  {showAll ? (
                    <><ChevronUp className="w-4 h-4" /> Voir moins</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> Voir tous ({repos.length}) projets</>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
