import ProfilePhoto from '../assets/profile/photo.jpeg';
import GpcUeb2026Image from '../assets/achievements/gpc-ueb-2026.jpeg';
import Icpc2025Image from '../assets/achievements/icpc-2025.jpg';
import Ccpl2025Image from '../assets/achievements/ccpl-2025.jpeg';
import PlatziImage from '../assets/achievements/platzi-2024.jpeg';
import Icpc2026Image from '../assets/achievements/icpc-2026.jpeg';
import NetDev2025Image from '../assets/achievements/netdev-2025.jpeg';
import MiuTabLogo from '../assets/logos/miutab.svg';
import UniagustinianaLogo from '../assets/logos/uniagustiniana.svg';
import SenaLogo from '../assets/logos/sena.svg';
import KattisLogo from '../assets/logos/kattis.svg';
import AtCoderLogo from '../assets/logos/atcoder.svg';

/*
 * Todo texto visible va como `{ es, en }`; `localize()` (src/i18n) elige el
 * idioma de la página. Lo que no se traduce (nombres, URLs, tecnologías) va
 * como string simple.
 */

export const profile = {
  name: 'Jesús Flórez',
  photo: ProfilePhoto,
  email: 'jesus.florezch@gmail.com',
  github: 'https://github.com/dvchinx',
  linkedin: 'https://www.linkedin.com/in/dvchinx',
  location: 'Colombia · UTC−5',
  blog: 'https://blog.jesusflorez.cloud',
  // URL canónica de la versión en español; la inglesa es `${site}en/` (src/lib/head.js)
  site: 'https://jesusflorez.cloud/portfolio/',
  // Temas para los datos estructurados (schema.org `knowsAbout`)
  knowsAbout: [
    'Java', 'Spring Boot', 'Spring Security', { es: 'APIs REST', en: 'REST APIs' }, 'OAuth2', 'JWT', 'SQL', 'MySQL', 'PostgreSQL',
    { es: 'Arquitectura hexagonal', en: 'Hexagonal architecture' }, { es: 'Microservicios', en: 'Microservices' },
    'Kafka', 'RabbitMQ', 'Redis', 'Docker', 'AWS', 'Nginx', 'Linux', 'Python', 'FastAPI',
    { es: 'Programación competitiva', en: 'Competitive programming' }
  ],
  // `**texto**` se muestra resaltado
  headline: {
    es: 'Desarrollador Backend en **MiuTab** | Especializado en **Java** y **Spring Framework**, desde el **modelo de datos** hasta el **contenedor en producción**',
    en: 'Backend Developer at **MiuTab** | Specialized in **Java** and the **Spring Framework**, from the **data model** to the **container in production**'
  },
  highlights: {
    es: '**Top 14** de Colombia en **Kattis** | **Top 16** de Colombia en **AtCoder** | Competidor activo en **ICPC** y **CCPL**',
    en: '**Top 14** in Colombia on **Kattis** | **Top 16** in Colombia on **AtCoder** | Active competitor in **ICPC** and **CCPL**'
  },
  about: {
    work: {
      es: 'Llevo más de dos años desarrollando software con Java 17+, Spring Framework y Python. Me interesa la parte del sistema que nadie ve cuando funciona: contratos de API, transacciones, colas y despliegues.',
      en: 'I have been building software with Java 17+, the Spring Framework and Python for over two years. I care about the part of a system nobody sees when it works: API contracts, transactions, queues and deployments.'
    },
    competition: {
      es: 'Fuera del trabajo compito en programación competitiva (ICPC, CCPL, Kattis, AtCoder) y contribuyo a proyectos de código abierto. La competencia me dejó un hábito útil: medir antes de optimizar.',
      en: 'Outside work I compete in competitive programming (ICPC, CCPL, Kattis, AtCoder) and contribute to open source projects. Competing left me with a useful habit: measure before optimizing.'
    }
  }
};

const BACKEND_DEVELOPER = { es: 'Desarrollador Backend', en: 'Backend Developer' };

export const experience = [
  {
    role: BACKEND_DEVELOPER,
    company: 'MiuTab',
    logo: MiuTabLogo,
    url: 'https://miutab.com',
    period: { es: 'Feb 2025 — Presente', en: 'Feb 2025 — Present' },
    current: true,
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    bullets: [
      {
        es: 'Lideré la construcción del **backend del producto desde cero**: arquitectura de módulos, modelo relacional y convenciones de API.',
        en: 'Led the build of the **product’s backend from scratch**: module architecture, relational model and API conventions.'
      },
      {
        es: 'Implementé **APIs REST con Spring Boot**, persistencia con **JPA/MySQL** y despliegue containerizado con **Docker**.',
        en: 'Implemented **REST APIs with Spring Boot**, persistence with **JPA/MySQL** and containerized deployment with **Docker**.'
      },
      {
        es: 'Responsable del **ciclo de vida completo del backend**: modelado de entidades, migraciones y operación de **entornos productivos**.',
        en: 'Own the **full backend lifecycle**: entity modeling, migrations and running the **production environments**.'
      }
    ]
  },
  {
    role: BACKEND_DEVELOPER,
    company: 'Universitaria Agustiniana',
    logo: UniagustinianaLogo,
    url: 'https://www.uniagustiniana.edu.co',
    period: { es: 'Mar 2026 — Presente', en: 'Mar 2026 — Present' },
    current: true,
    summary: {
      es: 'Proyecto de investigación: plataforma de realidad virtual con IA para enseñar algoritmia y POO a estudiantes sordos y mudos. Partí de un videojuego VR sin backend y construí desde cero su backend, IA e infraestructura.',
      en: 'Research project: an AI-powered virtual reality platform that teaches algorithms and OOP to deaf and mute students. I started from a VR game with no backend and built its backend, AI and infrastructure from scratch.'
    },
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'React', 'TypeScript', 'WebSockets', 'Llama 3.2'],
    bullets: [
      {
        es: 'Aprovisioné y aseguré un VPS con **7 servicios en Docker**: solo 3 puertos expuestos, SSH por llave, TLS automático y MySQL aislado de Internet con backups diarios.',
        en: 'Provisioned and hardened a VPS running **7 services in Docker**: only 3 exposed ports, key-only SSH, automatic TLS and MySQL cut off from the Internet with daily backups.'
      },
      {
        es: 'Desarrollé una **API REST** en **Spring Boot** con más de 20 endpoints que registra el progreso de los estudiantes en los 12 niveles del juego.',
        en: 'Built a **REST API** in **Spring Boot** with over 20 endpoints that tracks student progress across the game’s 12 levels.'
      },
      {
        es: 'Construí un panel docente en **React** y **TypeScript** con métricas por estudiante en tiempo real: avance, tiempos, errores y pistas.',
        en: 'Built a teacher dashboard in **React** and **TypeScript** with real-time metrics per student: progress, times, mistakes and hints.'
      },
      {
        es: 'Implementé un **asistente de IA por voz** con modelos locales sin GPU (Whisper, Llama 3.2, Piper) y reduje su latencia de 6–12 s a 3–6 s con streaming.',
        en: 'Implemented a **voice AI assistant** on local models without a GPU (Whisper, Llama 3.2, Piper) and cut its latency from 6–12 s to 3–6 s with streaming.'
      },
      {
        es: 'Creé un lobby multijugador con **WebSockets** que sincroniza los avatares de hasta 3 jugadores a 20 actualizaciones por segundo.',
        en: 'Created a multiplayer lobby over **WebSockets** that syncs the avatars of up to 3 players at 20 updates per second.'
      }
    ]
  },
  {
    role: { es: 'Mentor en Desarrollo de Software', en: 'Software Development Mentor' },
    company: 'Universitaria Agustiniana',
    logo: UniagustinianaLogo,
    url: 'https://www.uniagustiniana.edu.co',
    period: { es: 'Mar 2025 — Presente', en: 'Mar 2025 — Present' },
    current: true,
    summary: {
      es: 'En el semillero OpenSGroup fundé y lidero un programa que pasó de formación avanzada (2025) a mentoría de proyectos de software reales, desde la idea hasta producción (2026).',
      en: 'In the OpenSGroup research group I founded and lead a program that went from advanced training (2025) to mentoring real software projects, from idea to production (2026).'
    },
    stack: ['Git', 'GitHub', 'Code review', 'ICPC'],
    bullets: [
      {
        es: 'Diseñé y dicté un programa de formación en programación durante 2 semestres: **más de 36 horas** y **más de 30 asistentes por sesión**.',
        en: 'Designed and taught a programming course over 2 semesters: **over 36 hours** and **more than 30 attendees per session**.'
      },
      {
        es: 'Guié a más de 20 estudiantes en **5 proyectos desplegados** en producción: 3 con clientes reales y 2 productos SaaS en etapa comercial.',
        en: 'Guided more than 20 students through **5 projects deployed** to production: 3 with real clients and 2 SaaS products at the commercial stage.'
      },
      {
        es: 'Orienté las decisiones técnicas de cada equipo (stack, arquitectura y despliegue) e implementé flujo de trabajo con **Git** y **GitHub**: ramas, pull requests y revisión de código.',
        en: 'Steered each team’s technical decisions (stack, architecture and deployment) and set up a **Git** and **GitHub** workflow: branches, pull requests and code review.'
      },
      {
        es: 'Entrené a 2 equipos para la **Maratón Nacional de Programación** (ICPC); ambos obtuvieron mención de honor.',
        en: 'Coached 2 teams for the **National Programming Contest** (ICPC); both earned an honorable mention.'
      }
    ]
  }
];

export const practices = [
  {
    title: { es: 'Endpoints y seguridad', en: 'Endpoints and security' },
    area: 'APIs',
    icon: 'shield',
    body: {
      es: 'APIs REST con Spring Security, JWT y OAuth2. Contratos explícitos, errores consistentes y endpoints públicos solo cuando es una decisión, no un descuido.',
      en: 'REST APIs with Spring Security, JWT and OAuth2. Explicit contracts, consistent errors, and public endpoints only when that is a decision, not an oversight.'
    }
  },
  {
    title: { es: 'IA como servicio', en: 'AI as a service' },
    area: { es: 'Integración', en: 'Integration' },
    icon: 'sparkles',
    body: {
      es: 'Consumo de modelos con Spring AI eligiendo proveedor por costo y calidad; cuando no alcanza, microservicios en Python aislados del núcleo.',
      en: 'Models consumed through Spring AI, picking the provider by cost and quality; when that falls short, Python microservices kept apart from the core.'
    }
  },
  {
    title: { es: 'Despliegue y operación', en: 'Deployment and operations' },
    area: { es: 'Infraestructura', en: 'Infrastructure' },
    icon: 'rocket',
    body: {
      es: 'Más de un año operando servicios en AWS (EC2, RDS) y VPS Debian con Docker Compose, Nginx y certificados automatizados.',
      en: 'Over a year running services on AWS (EC2, RDS) and Debian VPSs with Docker Compose, Nginx and automated certificates.'
    }
  }
];

const ADVANCED = { es: 'Avanzado', en: 'Advanced' };
const UPPER_INTERMEDIATE = { es: 'Intermedio+', en: 'Intermediate+' };
const INTERMEDIATE = { es: 'Intermedio', en: 'Intermediate' };

export const capabilities = [
  {
    domain: 'Backend core',
    icon: 'server',
    items: [
      {
        name: 'Java 21 · Spring Boot',
        level: ADVANCED,
        evidence: { es: 'APIs REST, seguridad y lógica transaccional en producción.', en: 'REST APIs, security and transactional logic in production.' }
      },
      {
        name: 'OAuth2 · JWT',
        level: ADVANCED,
        evidence: { es: 'Login local, Google y GitHub en JFlorez Suite.', en: 'Local, Google and GitHub login in JFlorez Suite.' }
      },
      {
        name: 'SQL · Flyway',
        level: ADVANCED,
        evidence: {
          es: 'Migraciones versionadas, triggers y CHECK como garantías de dominio.',
          en: 'Versioned migrations, with triggers and CHECK constraints as domain guarantees.'
        }
      }
    ]
  },
  {
    domain: { es: 'Arquitectura y eventos', en: 'Architecture and events' },
    icon: 'network',
    items: [
      {
        name: { es: 'Hexagonal · microservicios', en: 'Hexagonal · microservices' },
        level: ADVANCED,
        evidence: {
          es: 'Puertos y adaptadores; servicios separados por patrón de carga.',
          en: 'Ports and adapters; services split by load pattern.'
        }
      },
      {
        name: 'Kafka · RabbitMQ',
        level: ADVANCED,
        evidence: { es: 'Pipeline asíncrono de fraude.', en: 'Asynchronous fraud pipeline.' }
      },
      {
        name: 'Redis',
        level: UPPER_INTERMEDIATE,
        evidence: { es: 'Contadores con TTL para reglas de velocidad.', en: 'Counters with TTL for velocity rules.' }
      }
    ]
  },
  {
    domain: { es: 'Infraestructura', en: 'Infrastructure' },
    icon: 'cloud',
    items: [
      {
        name: 'Docker · Compose',
        level: ADVANCED,
        evidence: { es: '18 contenedores en un VPS propio, 17 con healthcheck.', en: '18 containers on my own VPS, 17 with a healthcheck.' }
      },
      {
        name: 'AWS',
        level: INTERMEDIATE,
        evidence: { es: 'EC2 y RDS para servicios productivos.', en: 'EC2 and RDS for production services.' }
      },
      {
        name: 'Nginx · Linux',
        level: UPPER_INTERMEDIATE,
        evidence: { es: 'Reverse proxy, TLS con Certbot, fallback SPA.', en: 'Reverse proxy, TLS with Certbot, SPA fallback.' }
      }
    ]
  },
  {
    domain: { es: 'ML aplicado', en: 'Applied ML' },
    icon: 'cpu',
    items: [
      {
        name: 'Python · FastAPI',
        level: UPPER_INTERMEDIATE,
        evidence: { es: 'Servicios de ML aislados del backend Java.', en: 'ML services kept apart from the Java backend.' }
      },
      {
        name: 'scikit-learn · SHAP',
        level: UPPER_INTERMEDIATE,
        evidence: { es: 'Modelos interpretables con explicación por decisión.', en: 'Interpretable models with an explanation for every decision.' }
      },
      {
        name: 'NumPy',
        level: UPPER_INTERMEDIATE,
        evidence: { es: 'Simulación vectorizada sobre grillas de 200×200.', en: 'Vectorized simulation over 200×200 grids.' }
      }
    ]
  }
];

const NATIONAL_CONTEST = { es: 'Maratón Nacional de Programación', en: 'National Programming Contest' };

// `rank`: '#n' o 'MH' (mención honorífica); su texto sale de src/i18n/strings.js
export const recognitions = [
  {
    id: 'icpc-2026',
    rank: 'MH',
    event: NATIONAL_CONTEST,
    label: { es: 'ICPC 2026 · Mención honorífica', en: 'ICPC 2026 · Honorable mention' },
    date: { es: 'Octubre 2026', en: 'October 2026' },
    image: Icpc2026Image
  },
  {
    id: 'gpc-ueb-2026',
    rank: 'MH',
    event: {
      es: '5ta Maratón de Programación · Universidad El Bosque',
      en: '5th Programming Contest · Universidad El Bosque'
    },
    label: { es: 'GPC-UEB 2026 · Mención honorífica', en: 'GPC-UEB 2026 · Honorable mention' },
    date: { es: 'Marzo 2026', en: 'March 2026' },
    image: GpcUeb2026Image
  },
  {
    id: 'icpc-2025',
    rank: '#48',
    event: NATIONAL_CONTEST,
    label: 'ICPC 2025',
    date: { es: 'Octubre 2025', en: 'October 2025' },
    image: Icpc2025Image
  },
  {
    id: 'netdev-2025',
    rank: '#1',
    event: { es: 'Reto Backend Net & Dev', en: 'Net & Dev Backend Challenge' },
    label: 'Net&Dev 2025',
    featured: true,
    date: { es: 'Septiembre 2025', en: 'September 2025' },
    image: NetDev2025Image
  },
  {
    id: 'ccpl-2025',
    rank: '#2',
    event: { es: 'Liga de Programación Colombiana', en: 'Colombian Programming League' },
    label: 'CCPL R4 2025',
    date: { es: 'Mayo 2025', en: 'May 2025' },
    image: Ccpl2025Image
  },
  {
    id: 'platzi-2024',
    rank: '#1',
    event: { es: 'Competencia de Programación en Python', en: 'Python Programming Competition' },
    label: 'Platzi',
    date: { es: 'Septiembre 2024', en: 'September 2024' },
    image: PlatziImage
  }
];

// Posición vigente en rankings por país; `url` (perfil público) es opcional
export const rankings = [
  { id: 'kattis', rank: 'Top 14', platform: 'Kattis', scope: 'Colombia', logo: KattisLogo },
  { id: 'atcoder', rank: 'Top 16', platform: 'AtCoder', scope: 'Colombia', logo: AtCoderLogo }
];

// `kind` es una clave (Título, Diplomado, Certificación, Curso, Badge); su etiqueta
// en cada idioma está en src/i18n/strings.js
export const certifications = [
  {
    title: { es: 'Tecnólogo en Desarrollo de Software', en: 'Software Development Technologist' },
    institution: 'Universitaria Agustiniana',
    kind: 'Título',
    logo: UniagustinianaLogo
  },
  {
    title: { es: 'Técnico en Sistemas Informáticos', en: 'Computer Systems Technician' },
    institution: 'SENA',
    kind: 'Título',
    logo: SenaLogo
  },
  { title: { es: 'Programación en Java', en: 'Java Programming' }, institution: 'Politécnico de Colombia', kind: 'Diplomado' },
  { title: { es: 'Metodología SCRUM', en: 'SCRUM Methodology' }, institution: 'Edutin Academy', kind: 'Diplomado' },
  { title: 'Java Foundations', institution: 'Oracle Academy', kind: 'Certificación' },
  { title: 'Cloud Computing Fundamentals', institution: 'Google Cloud Skills Boost', kind: 'Certificación' },
  { title: { es: 'Inteligencia Artificial Aplicada', en: 'Applied Artificial Intelligence' }, institution: 'MinTIC Colombia', kind: 'Certificación' },
  {
    title: { es: 'Enterprise Full Stack con Spring Boot y Angular', en: 'Enterprise Full Stack with Spring Boot and Angular' },
    institution: 'Dev Senior Code',
    kind: 'Certificación'
  },
  { title: 'Artificial Intelligence and Cybersecurity Essentials', institution: 'Hewlett Packard Enterprise', kind: 'Certificación' },
  {
    title: {
      es: 'Inteligencia artificial para el autoaprendizaje y la investigación',
      en: 'Artificial intelligence for self-learning and research'
    },
    institution: 'Universidad de Pamplona',
    kind: 'Certificación'
  },
  {
    title: { es: 'Bases de datos: generalidades y sistemas de gestión', en: 'Databases: fundamentals and management systems' },
    institution: 'SENA',
    kind: 'Curso'
  },
  { title: { es: 'Spring Boot esencial', en: 'Spring Boot Essential Training' }, institution: 'LinkedIn Learning', kind: 'Curso' },
  { title: { es: 'Cómo gestionar equipos de trabajo', en: 'Managing teams' }, institution: 'Project Management Institute', kind: 'Curso' },
  { title: { es: 'Java SE orientado a objetos', en: 'Object-oriented Java SE' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Java SE: SQL y bases de datos', en: 'Java SE: SQL and databases' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Java SE: persistencia de datos', en: 'Java SE: data persistence' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Testing en Java', en: 'Testing in Java' }, institution: 'Platzi', kind: 'Curso' },
  { title: 'Java Spring Framework', institution: 'Platzi', kind: 'Curso' },
  { title: 'Spring Data JPA', institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Seguridad web con Spring Security', en: 'Web security with Spring Security' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Programación funcional con Java SE', en: 'Functional programming with Java SE' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Funciones y estructuras de control', en: 'Functions and control structures' }, institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Git y GitHub', en: 'Git and GitHub' }, institution: 'Platzi', kind: 'Curso' },
  { title: 'Docker', institution: 'Platzi', kind: 'Curso' },
  { title: { es: 'Introducción a la ciencia de datos', en: 'Introduction to Data Science' }, institution: 'Cisco Networking Academy', kind: 'Curso' },
  { title: { es: 'Introducción a la ciberseguridad', en: 'Introduction to Cybersecurity' }, institution: 'Cisco Networking Academy', kind: 'Curso' },
  { title: { es: 'Introducción a las redes', en: 'Networking Basics' }, institution: 'Cisco Networking Academy', kind: 'Curso' },
  {
    title: {
      es: 'Modelo de Seguridad y Privacidad de la Información (MSPI)',
      en: 'Information Security and Privacy Model (MSPI)'
    },
    institution: 'MinTIC Colombia',
    kind: 'Curso'
  },
  { title: { es: 'Ciudadanía Digital, Soy Digital', en: 'Digital Citizenship, Soy Digital' }, institution: 'Meta', kind: 'Curso' },
  { title: { es: 'English Does Work, nivel 13', en: 'English Does Work, level 13' }, institution: 'SENA', kind: 'Curso' },
  { title: 'Schema Patterns and Anti-patterns', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Memory for AI Applications', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Schema Design Optimization', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Indexing Design Fundamentals', institution: 'MongoDB', kind: 'Badge' }
];
