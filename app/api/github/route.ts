import { NextResponse } from "next/server";

export const revalidate = 3600; // ISR: 1h

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  stargazers_count: number;
  fork: boolean;
  visibility: string;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/AbakoDolla/repos?sort=updated&per_page=20",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos: GitHubRepo[] = await res.json();
    const filtered = repos
      .filter((r) => !r.fork && r.name !== "AbakoDolla")
      .slice(0, 12);
    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
