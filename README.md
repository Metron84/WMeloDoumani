# melodoumani.com

Portfolio and digital CV for Melo Doumani.

## Editing content

All facts live in **`src/data/cv.ts`**. Change them there, not in the JSX.
Anything marked `TODO` still needs confirming against the CV.

## Downloadable CV

Drop the PDF at `public/melo-doumani-cv.pdf`.
The filename is set once in `identity.cvFile` in `src/data/cv.ts`.

## Run it

```bash
npm install
npm run dev     # http://localhost:3109
npm run build
```

## Design tokens

Defined at the top of `src/app/globals.css`.

- Ink `#101418`
- Press paper `#EAE7E0`
- Floodlight `#E8B23A`
- Display type: Archivo
- Body type: Newsreader

## Regenerating the CV PDF

The downloadable CV is generated from `src/data/cv.ts`, so the document and the
site can never disagree. After editing `cv.ts`, run:

```bash
pip install reportlab
npm run cv          # writes public/melo-doumani-cv.pdf
```

Commit the regenerated PDF. It is deliberately **not** part of `npm run build`,
because the Vercel build image has no Python.

## Social card

`public/og.jpg` is a 1200x630 card cut from the promo frame. Regenerate it if
the promo or the headline changes.
