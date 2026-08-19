# Wivenhoe Music Trail Timeline

A static Next.js festival timetable designed for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Artist images

Replace the placeholder SVG files in `public/artists/` with your real artist images. If you change file extensions, update `app/data.ts` accordingly.

Replace `public/logo.svg` with your logo, or update the logo filename in `app/page.tsx`.

## GitHub Pages

The repository name is assumed to be `wivenhoe-music-trail`. If yours differs, update `repoName` in:

- `next.config.ts`
- `app/page.tsx`
- `app/events/[slug]/page.tsx`

Then push to `main` and select **Settings → Pages → Source: GitHub Actions**.
