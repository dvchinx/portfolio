import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { LANGS } from './i18n';
import { headTags } from './lib/head';
import { structuredData } from './lib/structuredData';

// lowercase: an uppercase export reads as a component to react-refresh/only-export-components
export { LANGS as langs, headTags, structuredData };

/** Page markup in one language for the prerender step (scripts/prerender.js). */
export function render(lang) {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  );
}
