# Portfolio

[![Documentación](https://deepwiki.com/badge.svg)](https://deepwiki.com/dvchinx/portafolio)

Portafolio personal de Jesús Flórez, construido como una single-page app en React (Vite) y desplegado en `jesusflorez.cloud/portfolio` como parte de [Personal Suite](https://github.com/dvchinx).

## Stack

- React + Vite
- React Compiler (`babel-plugin-react-compiler`)
- GSAP (ScrollTrigger, SplitText) y Lenis para las animaciones y el scroll suave
- CSS puro (sin frameworks de estilos)

## Comandos

```bash
npm run dev        # servidor de desarrollo en el puerto 3000
npm run build       # build de producción (salida en dist/)
npm run preview     # previsualizar el build de producción
npm run lint         # revisión con ESLint
```

## Arquitectura

Aplicación de una sola página sin enrutamiento. `src/App.jsx` es la página y compone las secciones (inicio, perfil, trabajo, logros y contacto). No hay API, CMS ni librería de manejo de estado.

```
src/
├── main.jsx          punto de entrada
├── App.jsx           la página: orden de las secciones y animaciones compartidas
├── components/       secciones y piezas (Hero, Profile, CaseStudy, ScrollyDiagram, …)
├── data/             todo el contenido: profile.js y projects.js
├── lib/              motion.js (GSAP + Lenis)
├── styles/           index.css (resets) y portfolio.css (estilos y tokens)
└── assets/
    ├── achievements/ fotos de los logros
    ├── projects/     capturas de los proyectos
    └── profile/      foto de perfil
public/               favicon e ícono de iPhone
```

## Despliegue

El build se sirve bajo la ruta base `/portfolio/` dentro de Personal Suite, enrutado por Nginx hacia este contenedor.
