# melodoumani.com

Portfolio and digital CV for Melo Doumani.

## Editing content

All facts live in **`src/data/cv.ts`**. Change them there, not in the JSX.

## Run it

```bash
npm install
npm run dev     # http://localhost:3109
npm run build
```

## Design tokens

Defined at the top of `src/app/globals.css`.

- Navy `#0A111F`
- Cream `#F2EDE4`
- Signal red `#D8232A`
- Display type: Archivo
- Body type: Newsreader

## Regenerating the CV PDF

The CV PDF is generated from `src/data/cv.ts` for the record. The site routes
people through the Request CV mailto instead of a direct download. After
editing `cv.ts`, run:

```bash
pip install reportlab
npm run cv          # writes public/melo-doumani-cv.pdf
```

Commit the regenerated PDF. It is deliberately **not** part of `npm run build`,
because the Vercel build image has no Python.

## Social card

`public/og.jpg` is a 1200x630 card cut from the promo frame. Regenerate it if
the promo or the headline changes.
