# maferozi.vercel.app

Personal site of Muhammad Asad Ferozi, full-stack engineer building LLM-powered
systems.

The site has two views of the same content:

- **Professional**: a researcher-style homepage for professors and recruiters,
  with a downloadable CV.
- **Developer**: an interactive terminal (try `help`, `projects`,
  `sudo hire-asad`), a ⌘K command palette, projects as editor tabs and
  experience as a `git log`.

Switch with the toggle at the top, the `D` key, or a link with `?mode=pro` or
`?mode=dev`. The choice is remembered per visitor.

## Editing content

All text lives in [`src/data/profile.js`](src/data/profile.js); both views read
from it. The CV is served from `public/Muhammad_Asad_Ferozi_CV.pdf` and the
portrait from `public/asad-720.*`.

## Running locally

```bash
npm install
npm run dev
```

`npm run build` writes the production site to `dist/`. Vercel deploys the
`main` branch.

## Structure

```
src/
├── data/profile.js        all site content
├── App.jsx                mode state (URL, saved choice, D key)
├── components/            mode switch and icons
├── pro/                   professional view
├── dev/                   developer view: terminal, command palette
└── styles/base.css        shared reset and the mode switch
```
