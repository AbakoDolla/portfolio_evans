import type { VercelRequest, VercelResponse } from "@vercel/node";



interface BlogPost {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: "cybersécurité" | "IA" | "dev web" | "tech";
  date: string;
  imageUrl?: string;
}

const RSS_FEEDS = [
  { url: "https://feeds.feedburner.com/TheHackersNews",   source: "The Hacker News",   category: "cybersécurité" as const },
  { url: "https://krebsonsecurity.com/feed/",             source: "Krebs on Security", category: "cybersécurité" as const },
  { url: "https://www.bleepingcomputer.com/feed/",        source: "Bleeping Computer", category: "cybersécurité" as const },
  { url: "https://techcrunch.com/feed/",                  source: "TechCrunch",        category: "tech"          as const },
  { url: "https://dev.to/feed",                           source: "Dev.to",            category: "dev web"       as const },
];

function decode(str: string) {
  return str
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g,  "'");
}

function stripHtml(str: string) {
  return str.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractOgImage(html: string): string | undefined {
  const og =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
  if (og && og.startsWith("http")) return og;

  const tw =
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)?.[1];
  if (tw && tw.startsWith("http")) return tw;

  return undefined;
}

function parseRSS(xml: string, source: string, category: BlogPost["category"]): BlogPost[] {
  const posts: BlogPost[] = [];
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  for (const item of items.slice(0, 6)) {
    const title = decode(item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1] ?? "");
    const link =
      item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ??
      item.match(/<link[^>]+href="([^"]+)"/)?.[1] ?? "";
    const rawDesc = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1] ?? "";
    const desc = decode(rawDesc);
    const date =
      item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ??
      item.match(/<dc:date>([\s\S]*?)<\/dc:date>/)?.[1] ?? "";

    // Image priority: media:content → enclosure → media:thumbnail → <img> in description HTML
    const imgSrc: string | undefined =
      item.match(/<media:content[^>]+url="([^"']+)"/)?.[1] ??
      item.match(/<enclosure[^>]+url="([^"']+)"/)?.[1] ??
      item.match(/<media:thumbnail[^>]+url="([^"']+)"/)?.[1] ??
      (() => {
        const m = desc.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
        return m && m.startsWith("http") ? m : undefined;
      })();

    if (!title || !link) continue;

    posts.push({
      id:          `${Buffer.from(link).toString("base64").slice(0, 16)}_${posts.length}`,
      title:       stripHtml(title).slice(0, 120),
      description: stripHtml(desc).slice(0, 220),
      url:         link,
      source,
      category,
      date:        date ? new Date(date).toISOString() : new Date().toISOString(),
      imageUrl:    imgSrc,
    });
  }

  return posts;
}

// Enrich articles that have no image by fetching their og:image (parallel, capped)
async function enrichImages(posts: BlogPost[]): Promise<BlogPost[]> {
  const missing = posts.filter((p) => !p.imageUrl).slice(0, 10);
  if (missing.length === 0) return posts;

  const fetched = await Promise.allSettled(
    missing.map(async (post) => {
      try {
        const r = await fetch(post.url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
          signal: AbortSignal.timeout(3500),
        });
        if (!r.ok) return post;
        const img = extractOgImage(await r.text());
        return img ? { ...post, imageUrl: img } : post;
      } catch {
        return post;
      }
    })
  );

  const enriched = new Map<string, BlogPost>();
  for (const r of fetched) {
    if (r.status === "fulfilled") enriched.set(r.value.id, r.value);
  }

  return posts.map((p) => enriched.get(p.id) ?? p);
}

let cache: { posts: BlogPost[]; ts: number } | null = null;
const CACHE_MS = 25 * 60 * 1000;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (cache && Date.now() - cache.ts < CACHE_MS) {
    return res.json(cache.posts);
  }

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async ({ url, source, category }) => {
      const r = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
        signal: AbortSignal.timeout(6000),
      });
      if (!r.ok) throw new Error(`${source} → HTTP ${r.status}`);
      return parseRSS(await r.text(), source, category);
    })
  );

  const posts: BlogPost[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") posts.push(...r.value);
    else req.log.warn({ err: r.reason }, "RSS feed failed");
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sliced = posts.slice(0, 27);

  const enriched = await enrichImages(sliced);
  cache = { posts: enriched, ts: Date.now() };
  return res.json(enriched);
});


