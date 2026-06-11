import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export function truncate(text: string, limit = 120) {
  return text?.length > limit ? `${text.slice(0, limit)}…` : text;
}

export const GITHUB_USERNAME = "AbakoDolla";
export const SITE_URL = "https://portfolio-evans-abah.vercel.app";
