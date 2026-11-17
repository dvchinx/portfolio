import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships the page prerendered (scripts/prerender.js);
// the dev server serves an empty #root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
