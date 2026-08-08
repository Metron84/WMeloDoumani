# Deploying melodoumani.com

## Short answer on environment variables

**None.** This site needs zero environment variables on Vercel.

It is a fully static Next.js build: no database, no auth, no API routes, no
external API keys. Every page prerenders at build time. The old Prisma,
NextAuth and Postgres dependencies were removed with the fantasy football app,
which is why nothing needs configuring.

## Pushing to GitHub

```bash
unzip melodoumani-portfolio.zip
cd WMeloDoumani-main

git init
git add .
git commit -m "Rebuild melodoumani.com as a portfolio and digital CV"
git branch -M main
git remote add origin https://github.com/Metron84/WMeloDoumani.git
git push -u origin main --force
```

Note `--force`: this replaces the old site entirely rather than merging with it.

## Importing into Vercel

1. vercel.com/new, import the repo.
2. Framework preset: **Next.js** (auto-detected).
3. Root directory: `./`
4. Build command: `next build` (already set in `vercel.json`).
5. Environment variables: **leave empty**.
6. Deploy.

Then add `melodoumani.com` under Project, Settings, Domains.

## Things that must be committed, not generated

These live in `public/` and are **not** produced by the Vercel build, because
the build image has no Python:

- `public/melo-doumani-cv.pdf` — regenerate locally with `npm run cv`
- `public/og.jpg` — the 1200x630 social card
- `public/films/*.jpg` — the poster frames
- `public/icon.png` and `src/app/favicon.ico`

Check they are all present before pushing:

```bash
ls public/melo-doumani-cv.pdf public/og.jpg public/icon.png public/films/
```

## Before you go live

- Update `metadataBase` in `src/app/layout.tsx` if the domain ever changes.
- Anything still marked `CONFIRM` in `src/data/cv.ts` is unverified. Search for
  it and settle it: `grep -n CONFIRM src/data/cv.ts`
