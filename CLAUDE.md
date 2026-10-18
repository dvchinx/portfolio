# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server on port 3000
npm run build      # production build (outputs to dist/)
npm run preview    # preview the production build locally
npm run lint       # ESLint check (flat config, eslint 9+)
```

No test runner is configured. There are no automated tests in this project.

## Architecture

This is a **single-page portfolio** with no routing:

- `src/main.jsx` → `src/App.jsx`

`src/App.jsx` is the page: it composes the sections in order — Hero, Profile (`#perfil`), Work index + case studies (`#trabajo`), Recognition (`#logros`), Contact (`#contacto`) — each in `src/components/`. **All content** is data in `src/data/profile.js` (profile, experience, practices, capabilities, recognitions, certifications) and `src/data/projects.js` (case studies and their diagram definitions). There is no API, no CMS and no state management library.

`src/data/projects.js` documents its sources at the top: every claim comes from each project's own repository. Keep it that way when updating a case.

### Motion

`src/lib/motion.js` wires GSAP (ScrollTrigger, SplitText) to Lenis smooth scrolling and exports `scrollToTarget()`. Shared reveals in `App.jsx` use `[data-split]`, `[data-fade]` and `[data-reveal-image]`. Animations are skipped under `prefers-reduced-motion`.

### Key non-obvious patterns

**ScrollTrigger refresh after layout changes** — The Recognition section is pinned and measures its start once. Anything that changes page height (opening a case study, expanding the certifications list) must call `ScrollTrigger.refresh()`, or the pinned carousel ends up on top of other content.

**Collapsible case studies** — Cases start collapsed (`openCases` in `App.jsx`; a `#caso-<id>` hash opens one). `useCollapse` in `CaseStudy.jsx` animates height with GSAP and sets `hidden` itself, not as a prop. The clip (`overflow: hidden`) only exists during the animation because the scrolly diagram inside is `position: sticky`.

**Scrolly diagrams** — `ScrollyDiagram` keeps an SVG `FlowDiagram` sticky while the steps scroll; each step lists the `nodes`, `edges` and `packets` it highlights. Node and edge coordinates are in the diagram's `viewBox`; edge labels are 10px mono, so keep them short.

**Recognition carousel** — On desktop the track scrolls horizontally while pinned; the distance is measured to the last card's right edge plus padding (`scrollWidth` omits that padding). The colored card is driven by scroll progress, not `:hover`, which doesn't update while the track moves under a still cursor.

**Certifications order** — `Profile.jsx` sorts by kind (`KIND_ORDER`), keeps each institution together, and puts `INSTITUTIONS_LAST` at the end. Add entries anywhere in `certifications`.

### Vite config

- `base: '/portfolio/'` — the app is served at `/portfolio/` within the larger Personal Suite (Nginx routes `/portfolio/*` to this container).
- React Compiler is enabled via `babel-plugin-react-compiler` — React automatically memoizes; avoid manual `useMemo`/`useCallback` unless you have a specific reason.

### Styling

All styles live in `src/styles/portfolio.css`; `src/styles/index.css` only has minimal global resets. Design tokens are CSS custom properties on `:root` in `portfolio.css`, and every rule is scoped under the `.portfolio` root class:

- Colors: `--paper`, `--paper-2`, `--ink`, `--ink-2`, `--rule`, `--accent` (red), and `--night*` / `--on-night*` for the dark Recognition section
- Fonts: Archivo (display/UI), Newsreader (text) and JetBrains Mono, loaded from Google Fonts

### Contact form

Uses [Web3Forms](https://web3forms.com/) (`https://api.web3forms.com/submit`) — no backend needed. The `access_key` is embedded in `src/components/Contact.jsx` and routes submissions to `jesus.florezch@gmail.com`.

### Assets

```
src/assets/
  achievements/  # Photos for the Recognition cards (<event>-<year>)
  projects/      # Case study covers, named after the project id
  profile/       # Profile photo
public/          # favicon.svg / favicon.ico / apple-touch-icon.png, served under /portfolio/
```

Images are imported as module URLs and rendered with `<img>`. Use lowercase kebab-case file names.
