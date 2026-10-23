# Vitthal Kadam — Developer Portfolio

A fully responsive portfolio built with React 19, Vite, Tailwind CSS v4, and
Framer Motion, styled as a vintage sepia "wonders of street view" scene.

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
 │    ├── Background.jsx
 │    └── vintage/
 │         ├── Objects.jsx   (floating sepia 3D objects)
 │         └── Skyline.jsx   (hero + footer skyline)
 ├── data/
 │    └── portfolioData.js
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Design notes

- **Look**: warm cream paper (`#fdeed4`), dark-brown ink (`#3a2314`) and
  burnt-umber accents, with film grain and a soft vignette. The dark theme is
  a candlelit sepia (coffee brown + parchment) so the toggle still works.
  A first visit opens on the cream look; a saved choice always wins.
- **Type**: Fondamento (calligraphic display), Lora (body), Courier Prime
  (typewriter labels, nav and buttons).
- **Vintage objects**: `components/vintage/Objects.jsx` draws a globe, coffee
  cup, camera, hot-air balloon, pocket watch, paper plane, cog and map pin as
  gradient-shaded SVG — no image files. `Background.jsx` floats them on their
  own random-looking loops and adds scroll + pointer parallax.
- **Hero skyline**: `vintage/Skyline.jsx` (church, windmill, coffee-cup
  building, double-decker, radio tower, cottage and a Street View pegman). It
  rises in on load and its two layers drift at different scroll speeds.
- **Footer**: a sunset scene — the sky deepens and the sun sets as you scroll
  in, windows flicker on, fireflies drift, the pegman strolls, the name's
  letters hop on hover, and "Back to top" is a balloon that lifts off.
- **Tuning**: colours are CSS variables at the top of `src/index.css`
  (`--sp-*` objects, `--sk-*` skyline, `--dusk-*` footer sky). Floating
  objects are configured in the `OBJECTS` list in `Background.jsx`.
- **Motion & a11y**: everything animates with transform/opacity only;
  `prefers-reduced-motion` is honoured (CSS and Framer Motion), decorative
  art is `aria-hidden`, text contrast meets WCAG AA in both themes, and focus
  rings are kept.

## Next steps

- Add real project screenshots under `src/assets/projects/` and reference
  them from `portfolioData.js` if you want image previews instead of the
  code-window placeholder cards.
- Wire the contact form up to a real backend or a service like Formspree /
  EmailJS — it currently simulates a send.
- Update social links and email in `portfolioData.js`.
