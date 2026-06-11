import { NextResponse } from "next/server";

export const revalidate = 1800; // ISR: 30min

export interface BlogPost {
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
  { url: "https://feeds.feedburner.com/TheHackersNews",  source: "The Hacker News",  category: "cybersécurité" as const },
  { url: "https://krebsonsecurity.com/feed/",            source: "Krebs on Security", category: "cybersécurité" as const },
  { url: "https://techcrunch.com/feed/",                 source: "TechCrunch",        category: "tech"          as const },
  { url: "https://dev.to/feed",                          source: "Dev.to",            category: "dev web"       as const },
];

function parseRSS(xml: string, source: string, category: BlogPost["category"]): BlogPost[] {
  const posts: BlogPost[] = [];
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
  for (const item of items.slice(0, 5)) {
    const title   = decode(item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1] ?? "");
    const link    = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? item.match(/<link[^>]+href="([^"]+)"/)?.[1] ?? "";
    const desc    = decode(item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1] ?? "");
    const date    = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? item.match(/<dc:date>([\s\S]*?)<\/dc:date>/)?.[1] ?? "";
    const imgSrc  = item.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ?? item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1];

    if (!title || !link) continue;
    posts.push({
      id: Buffer.from(link).toString("base64").slice(0, 20),
      title: stripHtml(title).slice(0, 100),
      description: stripHtml(desc).slice(0, 200),
      url: link,
      source,
      category,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      imageUrl: imgSrc,
    });
  }
  return posts;
}

function decode(str: string) {
  return str.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'");
}
function stripHtml(str: string) {
  return str.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
}

export async function GET() {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async ({ url, source, category }) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "portfolio-bot/1.0" },
        next: { revalidate: 1800 },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`${source} feed error ${res.status}`);
      const xml = await res.text();
      return parseRSS(xml, source, category);
    })
  );

  const posts: BlogPost[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") posts.push(...r.value);
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(posts.slice(0, 24));
}
