# Portfolio SOC — Abah Prince Evans

Portfolio de **Abah Prince Evans** — Futur SOC Analyst orienté Blue Team.

**Stack :** React 19 · Vite · TypeScript · Tailwind CSS · Framer Motion

## 🚀 Déployer sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AbakoDolla/portfolio_evans)

1. Va sur https://vercel.com/new
2. Importe **AbakoDolla/portfolio_evans**
3. Clique **Deploy** — tout est configuré via `vercel.json`

## 💻 Dev local

```bash
npm install
npm run dev
```

## 🔗 API endpoints (Vercel Serverless)
- `GET /api/github`  — repos publics GitHub (cache 10min)
- `GET /api/blog`    — agrégation RSS cybersécurité (cache 30min)
- `POST /api/contact` — formulaire de contact
