# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server on port 3000
npm run build      # production build + prerender (outputs to dist/)
npm run preview    # preview the production build locally
npm run lint       # ESLint check (flat config, eslint 9+)
```

No test runner is configured. There are no automated tests in this project.

## Architecture

This is a **single-page portfolio** with no routing:

- `src/main.jsx` → `src/App.jsx`

`src/App.jsx` is the page: it composes the sections in order — Hero, Experiencia (`#experiencia`), Logros (`#logros`), Habilidades (`#habilidades`), Proyectos + case studies (`#proyectos`), Formación (`#formacion`), Contacto (`#contacto`) — each in `src/components/`. **All content** is data in `src/data/profile.js` (profile, experience, practices, capabilities, recognitions, certifications) and `src/data/projects.js` (case studies and their diagram definitions). There is no API, no CMS and no state management library. Strings in `profile.headline`, `profile.highlights` and `experience[].bullets` may mark highlights with `**texto**` (rendered by `Rich.jsx`).

`src/data/projects.js` documents its sources at the top: every claim comes from each project's own repository. Keep it that way when updating a case.

### Prerender and SEO

`npm run build` runs the client build, an SSR build of `src/entry-server.jsx` (to `dist-ssr/`, deleted afterwards) and `scripts/prerender.js`, which writes the rendered page into `dist/index.html` and injects the schema.org JSON-LD from `src/lib/structuredData.js` (built from `profile.js`). `src/main.jsx` hydrates when `#root` has markup and renders from scratch in dev.

- **Render must match on server and client**: no `window`/`document` during render or in `useState` initializers. Read browser state in effects (e.g. the `#caso-<id>` hash is applied after mount) or with `useSyncExternalStore` (`useReducedMotion` in `motion.js`).
- **Meta tags** (title, description, canonical, Open Graph) are static in `index.html`; the canonical URL is `profile.site`. `public/` holds `og-image.png` (1200×630 capture of the hero), `sitemap.xml`, `favicon.svg` and `apple-touch-icon.png`.
- An inline script in `index.html` adds `.motion` to `<html>` (unless reduced motion), which hides `[data-hero-in]`, `.hero__photo` and `[data-fade]` before the prerendered page paints; their GSAP reveals use `fromTo` for that reason.

### Motion

`src/lib/motion.js` wires GSAP (ScrollTrigger) to Lenis smooth scrolling and exports `scrollToTarget()` (offset for the floating nav: `HEADER_OFFSET`). Shared reveals in `App.jsx` use `[data-fade]` and `[data-reveal-image]`; the hero has its own entrance with `[data-hero-in]`. Animations are skipped under `prefers-reduced-motion`.

### Icons

`src/lib/icons.jsx` exports `Icon` (hand-drawn stroke icons by name), `BrandIcon` (GitHub, LinkedIn) and `TechIcon`, which maps a technology name from the data to its [Simple Icons](https://simpleicons.org/) logo (or a generic glyph). Import icons from `simple-icons` by name so the bundle only carries the ones used.

### Key non-obvious patterns

**ScrollTrigger refresh after layout changes** — Reveals measure their start once. Anything that changes page height (opening a case study, expanding the certifications list) must call `ScrollTrigger.refresh()`, or content below can stay hidden.

**Collapsible case studies** — The project cards (`Projects.jsx`) are the overview; their "Leer el caso" link opens the matching case below them. Cases start collapsed (`openCases` in `App.jsx`; a `#caso-<id>` hash opens one). `useCollapse` in `CaseStudy.jsx` animates height with GSAP and sets `hidden` itself, not as a prop. The clip (`overflow: hidden`) only exists during the animation because the scrolly diagram inside is `position: sticky`; the case card itself must never get `overflow: hidden`.

**Scrolly diagrams** — `ScrollyDiagram` keeps an SVG `FlowDiagram` sticky while the steps scroll; each step lists the `nodes`, `edges` and `packets` it highlights. Node and edge coordinates are in the diagram's `viewBox`; edge labels are 10px mono, so keep them short.

**Achievements layout** — `Achievements.jsx` opens with `rankings` (current national standing per judge, no photo) as two compact cards, then shows the recognition with `featured: true` as a large card, the next three as a grid and the rest as a compact list, in data order. Photos open in the lightbox.

**Education & certifications** — `Education.jsx` renders entries of kind `Título` as degree cards; the rest are sorted by kind (`KIND_ORDER`), keep each institution together, and put `INSTITUTIONS_LAST` at the end. Add entries anywhere in `certifications`.

### Vite config

- `base: '/portfolio/'` — the app is served at `/portfolio/` within the larger Personal Suite (Nginx routes `/portfolio/*` to this container).
- React Compiler is enabled via `babel-plugin-react-compiler` — React automatically memoizes; avoid manual `useMemo`/`useCallback` unless you have a specific reason.

### Styling

All styles live in `src/styles/portfolio.css`; `src/styles/index.css` only has minimal global resets. Design tokens are CSS custom properties on `:root` in `portfolio.css`, and every rule is scoped under the `.portfolio` root class. The look is light: floating pill nav, rounded cards (`.card`) with soft shadows.

- Colors: `--bg`, `--surface`, `--surface-2`, `--ink`, `--ink-2`, `--muted`, `--faint`, `--rule`, `--accent` (indigo) and `--accent-soft`
- Fonts: Montserrat (everything), Mrs Saint Delafield (signature in the nav) and JetBrains Mono (diagrams and small counters), loaded from Google Fonts with `<link>` tags in `index.html`
- `--nav-h` is the bottom edge of the floating nav; sticky elements sit below it

### Contact form

Uses [Web3Forms](https://web3forms.com/) (`https://api.web3forms.com/submit`) — no backend needed. The `access_key` is embedded in `src/components/Contact.jsx` and routes submissions to `jesus.florezch@gmail.com`.

### Assets

```
src/assets/
  achievements/  # Photos for the Logros cards (<event>-<year>)
  logos/         # Organization SVGs (`logo` on experience, rankings and degrees), shown in `.logo-tile`
  projects/      # Case study covers, named after the project id
  profile/       # Profile photo
public/          # favicon.svg, apple-touch-icon.png, og-image.png, sitemap.xml, served under /portfolio/
```

Images are imported as module URLs and rendered with `<img>`. Use lowercase kebab-case file names.
