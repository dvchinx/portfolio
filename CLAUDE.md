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

This is a **single-page portfolio** with no routing. The entire app is one component:

- `src/main.jsx` → `src/App.jsx` → `src/components/portfolio/Portfolio/Portfolio.jsx`

**All content** (skill domains, certifications, project stories) is hardcoded as data arrays directly inside `Portfolio.jsx`. There is no API, no CMS, and no state management library.

### Navigation

Navigation is scroll-based. `scrollToSection()` calls `element.scrollIntoView()`. An `IntersectionObserver` watches the five `<section>` elements (`#home`, `#about`, `#skills`, `#projects`, `#contact`) to keep `activeSection` in sync with the scroll position.

### Key non-obvious patterns

**Certifications list height sync** — `certListHeight` state is set via a `ResizeObserver` on `.skills-left` (left column) and `.skills-right-header`, then injected as the CSS custom property `--cert-list-height`. This makes the scrollable cert list exactly fill the remaining height of the left column at any viewport size.

**Diagram modal** — `activeDiagram` holds the currently open SVG asset. Opening a diagram locks `document.body.style.overflow = 'hidden'` and listens for `Escape`. Click outside the modal or clicking × closes it.

**Project story layout** — Each project uses a `.project-story-sticky` wrapper with a `.project-story-rail` that scrolls horizontally through narrative panels (architecture, stack/metrics). The `.project-story-shell` triggers a reveal animation via `IntersectionObserver` adding `.project-visible`.

**`diagrams` vs `diagramAssets`** — `diagramAssets` holds real SVG image imports (used by all current projects). The `diagrams` field (text-based stage flows) exists in the schema but is unused and not rendered in any current project data.

### Vite config

- `base: '/portfolio/'` — the app is served at `/portfolio/` within the larger Personal Suite (Nginx routes `/portfolio/*` to this container).
- React Compiler is enabled via `babel-plugin-react-compiler` — React automatically memoizes; avoid manual `useMemo`/`useCallback` unless you have a specific reason.

### Styling

All portfolio styles live in `Portfolio.css` (co-located with the component). Global resets are in `src/styles/index.css`. CSS custom properties are defined at the `:root` level in `Portfolio.css`:

- Colors: `--portfolio-bg-*`, `--portfolio-text-main`, `--portfolio-text-soft`, `--portfolio-accent-a` (violet), `--portfolio-accent-b` (pink)
- Fonts: Sora (body) and Space Grotesk (headings) loaded from Google Fonts

### Contact form

Uses [Web3Forms](https://web3forms.com/) (`https://api.web3forms.com/submit`) — no backend needed. The `access_key` is embedded in `Portfolio.jsx` and routes submissions to `jesus.florezch@gmail.com`.

### Assets

```
src/assets/
  Images/    # PNG screenshots of projects
  Me/        # Profile photo
  SVGs/      # Architecture diagrams (component, sequence, deployment) + UI icons
```

SVG diagrams are imported as React component `src` values and displayed via `<img>` tags (not as inline SVG components).
