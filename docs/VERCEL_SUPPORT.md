# If production URLs return `404 NOT_FOUND` (Vercel edge)

## Symptoms

- `curl -sI https://<project>.vercel.app/` shows **`HTTP/2 404`** and header **`x-vercel-error: NOT_FOUND`**
- Same for **`https://www.<your-domain>/`** while apex may **`307`** redirect to `www` correctly

This response is **Vercel’s edge**, not the Next.js `not-found` page. The app repo can still **build cleanly** locally (`npm run build`).

## Repo checklist (already verified in development)

- **`/`** route exists: `src/app/(marketing)/page.tsx`
- No **`middleware.ts`** blocking routes
- **`next.config.ts`** has no `basePath` / static `output` mismatch

## What to verify in Vercel UI

1. **Project → Settings → Git** — Connected repository **`Metron84/WMeloDoumani`**, branch **`main`** = Production branch.
2. **Deployments** — Latest **`main`** deployment is assigned **Production** (not Preview-only).
3. **Settings → Deployment Protection** — Production allows **public** access (no SSO gate for anonymous visitors).
4. **Settings → General → Root Directory** — Empty (app at repo root).
5. **Settings → Environment Variables** — `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` set for **Production** (needed at **runtime**; build may use placeholders depending on setup).

## Support ticket template

Paste build output +:

```
Project: w-melo-doumani
Repo: github.com/Metron84/WMeloDoumani (branch main)

curl -sI https://w-melo-doumani.vercel.app/
# observe: HTTP/2 404, x-vercel-error: NOT_FOUND

curl -sI https://www.melodoumani.com/
# observe: same NOT_FOUND

Local: npm run build succeeds; Next.js emits route /
```

Ask Vercel why **production hostname** returns **NOT_FOUND** despite **Valid** domain configuration.
