# Vitthal Kadam — Developer Portfolio

A premium, dark-themed, fully responsive portfolio built with React 19, Vite,
Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Editing content

All text content (name, headline, skills, projects, timeline, socials, etc.)
lives in a single file:

```
src/data/portfolioData.js
```

Update that file and every section updates automatically — no need to touch
component code for content changes.

## Replacing the profile photo

Swap `src/assets/profile.jpg` with your own square photo (the current file
is a generated placeholder). If the file fails to load, the hero
automatically falls back to an initials avatar.

## Project structure

```
src/
 ├── assets/
 │    ├── profile.jpg
 │    ├── projects/
 │    └── icons/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── Hero.jsx
 │    ├── About.jsx
 │    ├── Skills.jsx
 │    ├── Experience.jsx
 │    ├── Projects.jsx
 │    ├── Certificates.jsx
 │    ├── Contact.jsx
 │    ├── Footer.jsx
 │    └── Background.jsx
 ├── data/
 │    └── portfolioData.js
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Design notes

- **Theme**: near-black navy (`#070b14`) base with a sky/cyan accent
  gradient (`#38bdf8` → `#22d3ee`), matching the requested dark blue/cyan
  direction.
- **Type**: Space Grotesk for display headings, Inter for body copy,
  JetBrains Mono for eyebrows, badges, and the terminal-style hero motif.
- **Signature element**: the hero's `$ whoami` terminal card — a nod to a
  backend engineer's world — types through your role list instead of a
  generic gradient headline.
- Respects `prefers-reduced-motion`, and all interactive elements have
  visible keyboard focus states.

## Next steps

- Add real project screenshots under `src/assets/projects/` and reference
  them from `portfolioData.js` if you want image previews instead of the
  code-window placeholder cards.
- Wire the contact form up to a real backend or a service like Formspree /
  EmailJS — it currently simulates a send.
- Update social links and email in `portfolioData.js`.
