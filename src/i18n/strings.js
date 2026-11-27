/*
 * Interface strings in both languages. Content (experience, projects,
 * achievements…) lives in src/data with its translations next to it.
 * Both languages must have the same keys.
 */

// Certification kinds are keys in the data (src/data/profile.js); these are their labels
const KINDS_ES = { Título: 'Título', Diplomado: 'Diplomado', Certificación: 'Certificación', Curso: 'Curso', Badge: 'Badge' };
const KINDS_EN = { Título: 'Degree', Diplomado: 'Diploma', Certificación: 'Certification', Curso: 'Course', Badge: 'Badge' };

export const strings = {
  es: {
    meta: {
      title: 'Jesús Flórez · Desarrollador Backend Java y Spring Boot',
      description:
        'Portafolio de Jesús Flórez, desarrollador backend en Colombia: APIs con Java y Spring Boot, Docker en producción y casos de estudio de arquitectura.',
      ogDescription:
        'APIs con Java y Spring Boot, Docker en producción y casos de estudio de arquitectura. Top 14 de Colombia en Kattis y Top 19 en AtCoder.',
      imageAlt: 'Jesús Flórez, desarrollador backend en Java y Spring Boot',
      locale: 'es_CO',
      jobTitle: 'Desarrollador Backend'
    },
    skipLink: 'Saltar al contenido',
    nav: {
      label: 'Secciones',
      sections: {
        experiencia: 'Experiencia',
        logros: 'Logros',
        habilidades: 'Habilidades',
        proyectos: 'Proyectos',
        formacion: 'Formación',
        contacto: 'Contacto'
      },
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      // Shown on the Spanish page: switches to English
      switchName: 'English',
      switchLabel: 'Read in English',
      switchShort: 'EN'
    },
    hero: {
      greeting: 'Hola, soy',
      email: 'Correo',
      photoAlt: (name) => `${name}, desarrollador backend`
    },
    experience: {
      title: 'Experiencia',
      website: 'Sitio web',
      practices: 'Cómo trabajo'
    },
    achievements: {
      title: 'Logros',
      rankings: 'Rankings nacionales',
      ranking: (scope) => `Ranking de ${scope}`,
      rankShort: (rank) => rank,
      rankTitle: (rank) => (rank === 'MH' ? 'Mención honorífica' : `Puesto ${rank.replace('#', '')}`),
      featured: (rankTitle, label) => `${rankTitle} en ${label}.`,
      more: 'Más logros',
      viewPhoto: (label) => `Ver foto: ${label}`,
      photoAlt: (name, label, event) => `${name} en ${label}, ${event}`
    },
    skills: {
      title: 'Habilidades',
      intro: 'Cada herramienta con el lugar donde la usé, no solo el nombre.'
    },
    projects: {
      title: 'Proyectos',
      intro:
        'Sistemas que diseñé, construí y opero. Cada uno tiene un caso de estudio con la arquitectura paso a paso, las decisiones con su costo y lo que cambiaría hoy.',
      cases: 'Casos de estudio',
      readCase: 'Leer el caso',
      live: 'En vivo',
      code: 'Código',
      more: 'Más proyectos en GitHub'
    },
    caseStudy: {
      kicker: (index, kind) => `Caso ${index} · ${kind}`,
      role: 'Rol',
      stack: 'Stack',
      links: 'Enlaces',
      open: 'Ver el caso completo',
      hide: 'Ocultar el caso',
      close: 'Cerrar el caso',
      context: 'Contexto',
      constraints: 'Restricciones',
      flow: 'Cómo funciona',
      architectureOf: (title) => `Arquitectura de ${title}`,
      architecture: 'Arquitectura',
      decisions: 'Decisiones',
      why: 'Por qué',
      cost: 'Costo',
      retrospective: 'Qué cambiaría hoy',
      figures: 'Documentación'
    },
    diagram: {
      step: (n, total) => `Paso ${n} / ${total}`,
      overview: 'Vista general',
      steps: 'Pasos del diagrama',
      stepLabel: (n, title) => `Paso ${n}: ${title}`
    },
    education: {
      title: 'Formación',
      certifications: 'Certificaciones y cursos',
      count: (n) => `${n} registros`,
      showAll: (n) => `Ver los ${n}`,
      showLess: 'Mostrar menos',
      kinds: KINDS_ES
    },
    contact: {
      title: 'Contacto',
      intro: '¿Tienes un rol de backend, una colaboración o una pregunta? Escríbeme por el formulario o directo al correo.',
      copy: 'Copiar correo',
      copied: 'Copiado',
      copiedLabel: 'Correo copiado',
      copiedStatus: 'Correo copiado al portapapeles.',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      missing: 'Completa los tres campos.',
      sending: 'Enviando…',
      sent: 'Mensaje enviado. Te respondo pronto.',
      failed: 'No se pudo enviar. Escríbeme directamente al correo.',
      // Goes to my inbox: always in Spanish, tagged with the page's language
      subject: (name) => `Nuevo mensaje de ${name} desde tu portafolio`,
      madeWith: 'Hecho con React y GSAP',
      backToTop: 'Volver arriba',
      timeLocale: 'es-CO'
    },
    lightbox: {
      fallbackTitle: 'Diagrama',
      close: 'Cerrar'
    },
    structuredData: {
      ranking: (rank, scope, platform) => `${rank} de ${scope} en ${platform}`,
      place: (n) => `Puesto ${n}`
    }
  },

  en: {
    meta: {
      title: 'Jesús Flórez · Java & Spring Boot Backend Developer',
      description:
        'Portfolio of Jesús Flórez, a backend developer in Colombia: Java and Spring Boot APIs, Docker in production and architecture case studies.',
      ogDescription:
        'Java and Spring Boot APIs, Docker in production and architecture case studies. Top 14 in Colombia on Kattis and Top 19 on AtCoder.',
      imageAlt: 'Jesús Flórez, Java and Spring Boot backend developer',
      locale: 'en_US',
      jobTitle: 'Backend Developer'
    },
    skipLink: 'Skip to content',
    nav: {
      label: 'Sections',
      sections: {
        experiencia: 'Experience',
        logros: 'Achievements',
        habilidades: 'Skills',
        proyectos: 'Projects',
        formacion: 'Education',
        contacto: 'Contact'
      },
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      // Shown on the English page: switches to Spanish
      switchName: 'Español',
      switchLabel: 'Ver en español',
      switchShort: 'ES'
    },
    hero: {
      greeting: 'Hi, I’m',
      email: 'Email',
      photoAlt: (name) => `${name}, backend developer`
    },
    experience: {
      title: 'Experience',
      website: 'Website',
      practices: 'How I work'
    },
    achievements: {
      title: 'Achievements',
      rankings: 'National rankings',
      ranking: (scope) => `${scope} ranking`,
      rankShort: (rank) => (rank === 'MH' ? 'HM' : rank),
      rankTitle: (rank) => (rank === 'MH' ? 'Honorable mention' : `Place ${rank.replace('#', '')}`),
      featured: (rankTitle, label) => `${rankTitle} at ${label}.`,
      more: 'More achievements',
      viewPhoto: (label) => `View photo: ${label}`,
      photoAlt: (name, label, event) => `${name} at ${label}, ${event}`
    },
    skills: {
      title: 'Skills',
      intro: 'Every tool next to where I used it, not just its name.'
    },
    projects: {
      title: 'Projects',
      intro:
        'Systems I designed, built and run. Each one has a case study with the architecture step by step, the decisions with their cost and what I would change today.',
      cases: 'Case studies',
      readCase: 'Read the case',
      live: 'Live',
      code: 'Code',
      more: 'More projects on GitHub'
    },
    caseStudy: {
      kicker: (index, kind) => `Case ${index} · ${kind}`,
      role: 'Role',
      stack: 'Stack',
      links: 'Links',
      open: 'Read the full case',
      hide: 'Hide the case',
      close: 'Close the case',
      context: 'Context',
      constraints: 'Constraints',
      flow: 'How it works',
      architectureOf: (title) => `${title} architecture`,
      architecture: 'Architecture',
      decisions: 'Decisions',
      why: 'Why',
      cost: 'Cost',
      retrospective: 'What I would change today',
      figures: 'Documentation'
    },
    diagram: {
      step: (n, total) => `Step ${n} / ${total}`,
      overview: 'Overview',
      steps: 'Diagram steps',
      stepLabel: (n, title) => `Step ${n}: ${title}`
    },
    education: {
      title: 'Education',
      certifications: 'Certifications and courses',
      count: (n) => `${n} entries`,
      showAll: (n) => `Show all ${n}`,
      showLess: 'Show less',
      kinds: KINDS_EN
    },
    contact: {
      title: 'Contact',
      intro: 'Have a backend role, a collaboration or a question? Write to me through the form or straight to my email.',
      copy: 'Copy email',
      copied: 'Copied',
      copiedLabel: 'Email copied',
      copiedStatus: 'Email copied to the clipboard.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      missing: 'Please fill in all three fields.',
      sending: 'Sending…',
      sent: 'Message sent. I’ll get back to you soon.',
      failed: 'It couldn’t be sent. Please email me directly.',
      subject: (name) => `Nuevo mensaje de ${name} desde tu portafolio (EN)`,
      madeWith: 'Built with React and GSAP',
      backToTop: 'Back to top',
      timeLocale: 'en-US'
    },
    lightbox: {
      fallbackTitle: 'Diagram',
      close: 'Close'
    },
    structuredData: {
      ranking: (rank, scope, platform) => `${rank} in ${scope} on ${platform}`,
      place: (n) => `Place ${n}`
    }
  }
};
