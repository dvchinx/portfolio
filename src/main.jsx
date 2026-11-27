import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { langFromPath } from './i18n'

// The URL decides the language (/portfolio/ or /portfolio/en/), the same one
// the prerender used for this page
const lang = langFromPath(window.location.pathname)
document.documentElement.lang = lang

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
)

// The production build ships the page prerendered (scripts/prerender.js);
// the dev server serves an empty #root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
