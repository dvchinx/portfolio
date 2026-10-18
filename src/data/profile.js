import ProfilePhoto from '../assets/profile/photo.jpeg';
import GpcUeb2026Image from '../assets/achievements/gpc-ueb-2026.jpeg';
import Icpc2025Image from '../assets/achievements/icpc-2025.jpg';
import Ccpl2025Image from '../assets/achievements/ccpl-2025.jpeg';
import PlatziImage from '../assets/achievements/platzi-2024.jpeg';
import Icpc2026Image from '../assets/achievements/icpc-2026.jpeg';
import NetDev2025Image from '../assets/achievements/netdev-2025.jpeg';

export const profile = {
  name: 'Jesús Flórez',
  shortName: 'J. Flórez',
  role: 'Desarrollador Backend',
  photo: ProfilePhoto,
  email: 'jesus.florezch@gmail.com',
  github: 'https://github.com/dvchinx',
  linkedin: 'https://www.linkedin.com/in/dvchinx',
  location: 'Colombia · UTC−5',
  statement:
    'Especializado en Java y Spring Framework, desde el modelo de datos hasta el contenedor en producción. Documento cada decisión como si otra persona fuera a mantener el sistema mañana.',
  spec: [
    { label: 'Actualmente', value: 'Backend en MiuTab · desde feb 2025' },
    { label: 'Stack', value: 'Java 21 · Spring Boot · Kafka · RabbitMQ · Redis · PostgreSQL · Docker' },
    { label: 'Competidor', value: 'ICPC / CCPL / AtCoder / Codeforces / Kattis' },
    { label: 'Experiencia', value: '+2 años en backend' }
  ],
  about: [
    'Llevo más de dos años desarrollando software con Java 17+, Spring Framework y Python. Me interesa la parte del sistema que nadie ve cuando funciona: contratos de API, transacciones, colas y despliegues.',
    'Fuera del trabajo compito en programación competitiva (ICPC, CCPL) y contribuyo a proyectos de código abierto. La competencia me dejó un hábito útil: medir antes de optimizar.'
  ]
};

export const experience = [
  {
    role: 'Desarrollador Backend',
    company: 'MiuTab',
    url: 'https://miutab.com',
    period: 'Feb 2025 — Presente',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    bullets: [
      'Lideré la construcción del backend del producto desde cero: arquitectura de módulos, modelo relacional y convenciones de API.',
      'Implementé APIs REST con Spring Boot, persistencia con JPA/MySQL y despliegue containerizado con Docker.',
      'Responsable del ciclo de vida completo del backend: modelado de entidades, migraciones y operación de entornos productivos.'
    ]
  }
];

export const practices = [
  {
    title: 'Endpoints y seguridad',
    body: 'APIs REST con Spring Security, JWT y OAuth2. Contratos explícitos, errores consistentes y endpoints públicos solo cuando es una decisión, no un descuido.'
  },
  {
    title: 'IA como servicio',
    body: 'Consumo de modelos con Spring AI eligiendo proveedor por costo y calidad; cuando no alcanza, microservicios en Python aislados del núcleo.'
  },
  {
    title: 'Despliegue y operación',
    body: 'Más de un año operando servicios en AWS (EC2, RDS) y VPS Debian con Docker Compose, Nginx y certificados automatizados.'
  }
];

export const capabilities = [
  {
    domain: 'Backend core',
    items: [
      { name: 'Java 21 · Spring Boot', level: 'Avanzado', evidence: 'APIs REST, seguridad y lógica transaccional en producción.' },
      { name: 'OAuth2 · JWT', level: 'Avanzado', evidence: 'Login local, Google y GitHub en JFlorez Suite.' },
      { name: 'SQL · Flyway', level: 'Avanzado', evidence: 'Migraciones versionadas, triggers y CHECK como garantías de dominio.' }
    ]
  },
  {
    domain: 'Arquitectura y eventos',
    items: [
      { name: 'Hexagonal · microservicios', level: 'Avanzado', evidence: 'Puertos y adaptadores; servicios separados por patrón de carga.' },
      { name: 'Kafka · RabbitMQ', level: 'Avanzado', evidence: 'Pipeline asíncrono de fraude.' },
      { name: 'Redis', level: 'Intermedio+', evidence: 'Contadores con TTL para reglas de velocidad.' }
    ]
  },
  {
    domain: 'Infraestructura',
    items: [
      { name: 'Docker · Compose', level: 'Avanzado', evidence: '18 contenedores en un VPS propio, 17 con healthcheck.' },
      { name: 'AWS', level: 'Intermedio', evidence: 'EC2 y RDS para servicios productivos.' },
      { name: 'Nginx · Linux', level: 'Intermedio+', evidence: 'Reverse proxy, TLS con Certbot, fallback SPA.' }
    ]
  },
  {
    domain: 'ML aplicado',
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

export const certifications = [
  { title: 'Tecnólogo en Desarrollo de Software', institution: 'Universitaria Agustiniana', kind: 'Título' },
  { title: 'Técnico en Sistemas Informáticos', institution: 'SENA', kind: 'Título' },
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
