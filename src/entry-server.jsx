import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { structuredData } from './lib/structuredData';

export { structuredData };

/** Page markup for the prerender step (scripts/prerender.js). */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
