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

export const profile = {
  name: 'Jesús Flórez',
  photo: ProfilePhoto,
  email: 'jesus.florezch@gmail.com',
  github: 'https://github.com/dvchinx',
  linkedin: 'https://www.linkedin.com/in/dvchinx',
  location: 'Colombia · UTC−5',
  blog: 'https://blog.jesusflorez.cloud',
  // URL canónica (también en index.html: canonical y Open Graph)
  site: 'https://jesusflorez.cloud/portfolio/',
  // Temas para los datos estructurados (schema.org `knowsAbout`)
  knowsAbout: [
    'Java', 'Spring Boot', 'Spring Security', 'APIs REST', 'OAuth2', 'JWT', 'SQL', 'MySQL', 'PostgreSQL',
    'Arquitectura hexagonal', 'Microservicios', 'Kafka', 'RabbitMQ', 'Redis', 'Docker', 'AWS', 'Nginx',
    'Linux', 'Python', 'FastAPI', 'Programación competitiva'
  ],
  // `**texto**` se muestra resaltado
  headline:
    'Desarrollador Backend en **MiuTab** | Especializado en **Java** y **Spring Framework**, desde el **modelo de datos** hasta el **contenedor en producción**',
  highlights:
    '**Top 14** de Colombia en **Kattis** | **Top 19** de Colombia en **AtCoder** | Competidor activo en **ICPC** y **CCPL**',
  about: {
    work:
      'Llevo más de dos años desarrollando software con Java 17+, Spring Framework y Python. Me interesa la parte del sistema que nadie ve cuando funciona: contratos de API, transacciones, colas y despliegues.',
    competition:
      'Fuera del trabajo compito en programación competitiva (ICPC, CCPL, Kattis, AtCoder) y contribuyo a proyectos de código abierto. La competencia me dejó un hábito útil: medir antes de optimizar.'
  }
};

export const experience = [
  {
    role: 'Desarrollador Backend',
    company: 'MiuTab',
    logo: MiuTabLogo,
    url: 'https://miutab.com',
    period: 'Feb 2025 — Presente',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    bullets: [
      'Lideré la construcción del **backend del producto desde cero**: arquitectura de módulos, modelo relacional y convenciones de API.',
      'Implementé **APIs REST con Spring Boot**, persistencia con **JPA/MySQL** y despliegue containerizado con **Docker**.',
      'Responsable del **ciclo de vida completo del backend**: modelado de entidades, migraciones y operación de **entornos productivos**.'
    ]
  },
  {
    role: 'Desarrollador Backend',
    company: 'Universitaria Agustiniana',
    logo: UniagustinianaLogo,
    url: 'https://www.uniagustiniana.edu.co',
    period: 'Mar 2026 — Presente',
    summary:
      'Proyecto de investigación: plataforma de realidad virtual con IA para enseñar algoritmia y POO a estudiantes sordos y mudos. Partí de un videojuego VR sin backend y construí desde cero su backend, IA e infraestructura.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'React', 'TypeScript', 'WebSockets', 'Llama 3.2'],
    bullets: [
      'Aprovisioné y aseguré un VPS con **7 servicios en Docker**: solo 3 puertos expuestos, SSH por llave, TLS automático y MySQL aislado de Internet con backups diarios.',
      'Desarrollé una **API REST** en **Spring Boot** con más de 20 endpoints que registra el progreso de los estudiantes en los 12 niveles del juego.',
      'Construí un panel docente en **React** y **TypeScript** con métricas por estudiante en tiempo real: avance, tiempos, errores y pistas.',
      'Implementé un **asistente de IA por voz** con modelos locales sin GPU (Whisper, Llama 3.2, Piper) y reduje su latencia de 6–12 s a 3–6 s con streaming.',
      'Creé un lobby multijugador con **WebSockets** que sincroniza los avatares de hasta 3 jugadores a 20 actualizaciones por segundo.'
    ]
  },
  {
    role: 'Mentor en Desarrollo de Software',
    company: 'Universitaria Agustiniana',
    logo: UniagustinianaLogo,
    url: 'https://www.uniagustiniana.edu.co',
    period: 'Mar 2025 — Presente',
    summary:
      'En el semillero OpenSGroup fundé y lidero un programa que pasó de formación avanzada (2025) a mentoría de proyectos de software reales, desde la idea hasta producción (2026).',
    stack: ['Git', 'GitHub', 'Code review', 'ICPC'],
    bullets: [
      'Diseñé y dicté un programa de formación en programación durante 2 semestres: **más de 36 horas** y **más de 30 asistentes por sesión**.',
      'Guié a más de 20 estudiantes en **5 proyectos desplegados** en producción: 3 con clientes reales y 2 productos SaaS en etapa comercial.',
      'Orienté las decisiones técnicas de cada equipo (stack, arquitectura y despliegue) e implementé flujo de trabajo con **Git** y **GitHub**: ramas, pull requests y revisión de código.',
      'Entrené a 2 equipos para la **Maratón Nacional de Programación** (ICPC); ambos obtuvieron mención de honor.'
    ]
  }
];

export const practices = [
  {
    title: 'Endpoints y seguridad',
    area: 'APIs',
    icon: 'shield',
    body: 'APIs REST con Spring Security, JWT y OAuth2. Contratos explícitos, errores consistentes y endpoints públicos solo cuando es una decisión, no un descuido.'
  },
  {
    title: 'IA como servicio',
    area: 'Integración',
    icon: 'sparkles',
    body: 'Consumo de modelos con Spring AI eligiendo proveedor por costo y calidad; cuando no alcanza, microservicios en Python aislados del núcleo.'
  },
  {
    title: 'Despliegue y operación',
    area: 'Infraestructura',
    icon: 'rocket',
    body: 'Más de un año operando servicios en AWS (EC2, RDS) y VPS Debian con Docker Compose, Nginx y certificados automatizados.'
  }
];

export const capabilities = [
  {
    domain: 'Backend core',
    icon: 'server',
    items: [
      { name: 'Java 21 · Spring Boot', level: 'Avanzado', evidence: 'APIs REST, seguridad y lógica transaccional en producción.' },
      { name: 'OAuth2 · JWT', level: 'Avanzado', evidence: 'Login local, Google y GitHub en JFlorez Suite.' },
      { name: 'SQL · Flyway', level: 'Avanzado', evidence: 'Migraciones versionadas, triggers y CHECK como garantías de dominio.' }
    ]
  },
  {
    domain: 'Arquitectura y eventos',
    icon: 'network',
    items: [
      { name: 'Hexagonal · microservicios', level: 'Avanzado', evidence: 'Puertos y adaptadores; servicios separados por patrón de carga.' },
      { name: 'Kafka · RabbitMQ', level: 'Avanzado', evidence: 'Pipeline asíncrono de fraude.' },
      { name: 'Redis', level: 'Intermedio+', evidence: 'Contadores con TTL para reglas de velocidad.' }
    ]
  },
  {
    domain: 'Infraestructura',
    icon: 'cloud',
    items: [
      { name: 'Docker · Compose', level: 'Avanzado', evidence: '18 contenedores en un VPS propio, 17 con healthcheck.' },
      { name: 'AWS', level: 'Intermedio', evidence: 'EC2 y RDS para servicios productivos.' },
      { name: 'Nginx · Linux', level: 'Intermedio+', evidence: 'Reverse proxy, TLS con Certbot, fallback SPA.' }
    ]
  },
  {
    domain: 'ML aplicado',
    icon: 'cpu',
    items: [
      { name: 'Python · FastAPI', level: 'Intermedio+', evidence: 'Servicios de ML aislados del backend Java.' },
      { name: 'scikit-learn · SHAP', level: 'Intermedio+', evidence: 'Modelos interpretables con explicación por decisión.' },
      { name: 'NumPy', level: 'Intermedio+', evidence: 'Simulación vectorizada sobre grillas de 200×200.' }
    ]
  }
];

export const recognitions = [
  {
    id: 'icpc-2026',
    rank: 'MH',
    event: 'Maratón Nacional de Programación',
    label: 'ICPC 2026 · Mención honorífica',
    date: 'Octubre 2026',
    image: Icpc2026Image
  },
  {
    id: 'gpc-ueb-2026',
    rank: 'MH',
    event: '5ta Maratón de Programación · Universidad El Bosque',
    label: 'GPC-UEB 2026 · Mención honorífica',
    date: 'Marzo 2026',
    image: GpcUeb2026Image
  },
  {
    id: 'icpc-2025',
    rank: '#48',
    event: 'Maratón Nacional de Programación',
    label: 'ICPC 2025',
    date: 'Octubre 2025',
    image: Icpc2025Image
  },
  {
    id: 'netdev-2025',
    rank: '#1',
    event: 'Reto Backend Net & Dev',
    label: 'Net&Dev 2025',
    featured: true,
    date: 'Septiembre 2025',
    image: NetDev2025Image
  },
  {
    id: 'ccpl-2025',
    rank: '#2',
    event: 'Liga de Programación Colombiana',
    label: 'CCPL R4 2025',
    date: 'Mayo 2025',
    image: Ccpl2025Image
  },
  {
    id: 'platzi-2024',
    rank: '#1',
    event: 'Competencia de Programación en Python',
    label: 'Platzi',
    date: 'Septiembre 2024',
    image: PlatziImage
  }
];

// Posición vigente en rankings por país; `url` (perfil público) es opcional
export const rankings = [
  { id: 'kattis', rank: 'Top 14', platform: 'Kattis', scope: 'Colombia', logo: KattisLogo },
  { id: 'atcoder', rank: 'Top 19', platform: 'AtCoder', scope: 'Colombia', logo: AtCoderLogo }
];

export const certifications = [
  { title: 'Tecnólogo en Desarrollo de Software', institution: 'Universitaria Agustiniana', kind: 'Título', logo: UniagustinianaLogo },
  { title: 'Técnico en Sistemas Informáticos', institution: 'SENA', kind: 'Título', logo: SenaLogo },
  { title: 'Programación en Java', institution: 'Politécnico de Colombia', kind: 'Diplomado' },
  { title: 'Metodología SCRUM', institution: 'Edutin Academy', kind: 'Diplomado' },
  { title: 'Java Foundations', institution: 'Oracle Academy', kind: 'Certificación' },
  { title: 'Cloud Computing Fundamentals', institution: 'Google Cloud Skills Boost', kind: 'Certificación' },
  { title: 'Inteligencia Artificial Aplicada', institution: 'MinTIC Colombia', kind: 'Certificación' },
  { title: 'Enterprise Full Stack con Spring Boot y Angular', institution: 'Dev Senior Code', kind: 'Certificación' },
  { title: 'Artificial Intelligence and Cybersecurity Essentials', institution: 'Hewlett Packard Enterprise', kind: 'Certificación' },
  { title: 'Inteligencia artificial para el autoaprendizaje y la investigación', institution: 'Universidad de Pamplona', kind: 'Certificación' },
  { title: 'Bases de datos: generalidades y sistemas de gestión', institution: 'SENA', kind: 'Curso' },
  { title: 'Spring Boot esencial', institution: 'LinkedIn Learning', kind: 'Curso' },
  { title: 'Cómo gestionar equipos de trabajo', institution: 'Project Management Institute', kind: 'Curso' },
  { title: 'Java SE orientado a objetos', institution: 'Platzi', kind: 'Curso' },
  { title: 'Java SE: SQL y bases de datos', institution: 'Platzi', kind: 'Curso' },
  { title: 'Java SE: persistencia de datos', institution: 'Platzi', kind: 'Curso' },
  { title: 'Testing en Java', institution: 'Platzi', kind: 'Curso' },
  { title: 'Java Spring Framework', institution: 'Platzi', kind: 'Curso' },
  { title: 'Spring Data JPA', institution: 'Platzi', kind: 'Curso' },
  { title: 'Seguridad web con Spring Security', institution: 'Platzi', kind: 'Curso' },
  { title: 'Programación funcional con Java SE', institution: 'Platzi', kind: 'Curso' },
  { title: 'Funciones y estructuras de control', institution: 'Platzi', kind: 'Curso' },
  { title: 'Git y GitHub', institution: 'Platzi', kind: 'Curso' },
  { title: 'Docker', institution: 'Platzi', kind: 'Curso' },
  { title: 'Introducción a la ciencia de datos', institution: 'Cisco Networking Academy', kind: 'Curso' },
  { title: 'Introducción a la ciberseguridad', institution: 'Cisco Networking Academy', kind: 'Curso' },
  { title: 'Introducción a las redes', institution: 'Cisco Networking Academy', kind: 'Curso' },
  { title: 'Modelo de Seguridad y Privacidad de la Información (MSPI)', institution: 'MinTIC Colombia', kind: 'Curso' },
  { title: 'Ciudadanía Digital, Soy Digital', institution: 'Meta', kind: 'Curso' },
  { title: 'English Does Work, nivel 13', institution: 'SENA', kind: 'Curso' },
  { title: 'Schema Patterns and Anti-patterns', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Memory for AI Applications', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Schema Design Optimization', institution: 'MongoDB', kind: 'Badge' },
  { title: 'Indexing Design Fundamentals', institution: 'MongoDB', kind: 'Badge' }
];
