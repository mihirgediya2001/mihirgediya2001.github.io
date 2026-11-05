# Mihir Portfolio — multi-variant

One codebase, many portfolios. Content lives in `data/variants/*.json` and the active variant is picked by the `PORTFOLIO_VARIANT` env var.

## Variants

| Slug | For | File |
|---|---|---|
| `ai` | AI/ML Engineer roles | `data/variants/ai.json` |
| `sde` | Backend / distributed systems | `data/variants/sde.json` |
| `fullstack` | Full-stack product roles | `data/variants/fullstack.json` |

Add more by dropping a new JSON file into `data/variants/` and adding it to `lib/variant.ts`.

## Local dev

```
npm install
copy .env.example .env.local   # (PowerShell)  # or: cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Change `PORTFOLIO_VARIANT=sde` in `.env.local` to switch variants, then restart.

## Deploying multiple portfolios on Vercel

The trick: **same repo, one Vercel project per variant**, each with its own env var.

1. Push this folder to a GitHub repo (private is fine).
2. On Vercel, click **Add New Project** and import the repo three times:
   - Project name: `mihir-ai`     → env `PORTFOLIO_VARIANT=ai`
   - Project name: `mihir-sde`    → env `PORTFOLIO_VARIANT=sde`
   - Project name: `mihir-fs`     → env `PORTFOLIO_VARIANT=fullstack`
3. Each gets its own URL, e.g. `mihir-ai.vercel.app`, `mihir-sde.vercel.app`, `mihir-fs.vercel.app`.
4. Push once — Vercel rebuilds every project that follows that branch. Change `ai.json`, only the AI site visibly changes.

Buy a domain later and attach whichever variant to `mihir.dev`; the others stay on `*.vercel.app` as per-role links.

## Editing content for a specific role

Tweak bullets/tags in `data/variants/<slug>.json`, commit, push. Vercel redeploys in ~30s.
