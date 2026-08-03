# Astro International — Static Website

A clean, dependency-free static version of the Astro International procurement
website. No framework, no build step, no database — just HTML, CSS, and a small
amount of vanilla JavaScript. Open any `.html` file directly in a browser.

## Structure

```
.
├── index.html            Home
├── about.html            About
├── products.html         Product catalogue (filter + search)
├── industries.html       Industries we serve
├── brands.html           Partner brands
├── projects.html         Completed projects
├── blog.html             Blog & insights
├── careers.html          Open positions
├── downloads.html        Document downloads (filter + search)
├── contact.html          Contact form
├── request-quote.html    Request-for-quote form
├── css/
│   └── style.css         Full hand-written design system (navy / emerald)
├── js/
│   └── main.js           Sticky header, mobile menu, search toggle,
│                         reveal-on-scroll, form handling, list filtering
├── favicon.svg           Brand mark (navy square + emerald globe)
├── favicon.ico           ICO fallback (32×32)
├── favicon-32.png        PNG favicon
├── apple-touch-icon.png  180×180 iOS home-screen icon
├── icon-192.png          192×192 PWA / maskable icon
└── site.webmanifest      Web app manifest (name, icons, theme colour)
```

## Design

The look and layout are ported 1:1 from the original design:

- **Palette:** navy (`#0f2b46`) + emerald (`#16b364`), defined as CSS custom
  properties in `css/style.css`.
- **Typography:** Inter with a system-font fallback (no external font request).
- **Components:** semantic class names (`.card`, `.btn`, `.hero`, `.section`,
  `.feature`, `.tst`, …) instead of utility soup, so the markup stays readable.
- **Images:** self-contained branded SVG cover graphics live in `images/`
  (`cover-safety.svg`, `cover-medical.svg`, `cover-building.svg`,
  `cover-consumer.svg`, `cover-corporate.svg`, `cover-aviation.svg`,
  `cover-industrial.svg`, and the wide `hero-bg.svg`). They render fully
  offline — no remote hosts. **To use real photography instead**, drop your own
  `.jpg`/`.webp` into `images/` and point the card's `<img src="…">` at it
  (or simply overwrite a `cover-*.svg` with a same-named image). All card media
  use `object-fit: cover`, so any aspect ratio fits cleanly.

## Zero dependencies

- No CDN scripts, external fonts, or remote images — everything loads locally.
- No package manager, bundler, or server required.
- Works by double-clicking a file (`file://`) or from any static host
  (Netlify, GitHub Pages, S3, nginx, …).

## Notes

- The contact and request-quote forms are front-end only; on submit they show a
  success state. Wire the `<form>` elements to your backend/email service to
  make them live.
- Navigation, mega-menus, filtering, and search are handled in `js/main.js`
  with plain DOM APIs (no libraries).
