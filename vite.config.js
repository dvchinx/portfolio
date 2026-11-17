import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // The prerender step (scripts/prerender.js) runs the SSR bundle in Node:
  // bundle every dependency so it doesn't depend on their Node entry points
  ssr: {
    noExternal: true,
  },
  server: {
    port: 3000,
    allowedHosts: [
      'localhost',
      '.localhost',
    ],
  },
})
