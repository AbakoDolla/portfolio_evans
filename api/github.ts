export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") return res.status(200).end();

  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");

  try {
    const r = await fetch("https://api.github.com/users/AbakoDolla/repos?per_page=50&sort=updated&type=public", {
      headers: {
        "User-Agent": "portfolio-bot/1.0",
        Accept: "application/vnd.github.v3+json",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) throw new Error(`GitHub API: ${r.status}`);
    const all = (await r.json()) as Array<{
      fork: boolean;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      topics: string[];
      stargazers_count: number;
      updated_at: string;
    }>;
    const repos = all
      .filter((repo) => !repo.fork)
      .map(({ name, description, html_url, homepage, language, topics, stargazers_count, updated_at }) => ({
        name, description: description ?? "", html_url, homepage, language,
        topics: topics ?? [], stargazers_count, updated_at,
      }));
    return res.json(repos);
  } catch (err) {
    return res.status(503).json({ error: "GitHub API indisponible" });
  }
}
