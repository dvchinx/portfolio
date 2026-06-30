import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import ProfilePhoto from '../../../assets/Me/Yo.jpeg';
import TasksImage from '../../../assets/Images/Tasks.png';
import BlogImage from '../../../assets/Images/Blog.png';
import Pizzeria from '../../../assets/Images/Pizzeria.png';
import FractalImage from '../../../assets/Images/Fractal_Gallery.png';
import TrophyIcon from '../../../assets/SVGs/Trophy_Icon.svg';
import TrophyIcon2 from '../../../assets/SVGs/Trophy_Icon2.svg';
import WebIcon from '../../../assets/SVGs/Web_Icon.svg';
import AppIcon from '../../../assets/SVGs/App_Icon.svg';
import DeployIcon from '../../../assets/SVGs/Deploy_Icon.svg';
import BlogSequenceDiagram from '../../../assets/SVGs/Blog_Sequence_Diagram.svg';
import BlogDeploymentDiagram from '../../../assets/SVGs/Blog_Deployment_Diagram.svg';
import BlogComponentDiagram from '../../../assets/SVGs/Blog_Component_Diagram.svg';
import JFlorezSuiteComponentDiagram from '../../../assets/SVGs/JFlorezSuite_Component_Diagram.svg';
import JFlorezSuiteNotesSequenceDiagram from '../../../assets/SVGs/JFlorezSuite_Notes_Sequence_Diagram.svg';
import JFlorezSuiteDeploymentDiagram from '../../../assets/SVGs/JFlorezSuite_Deployment_Diagram.svg';
import GpcUeb2026Image from '../../../assets/Achievements/GPC-UEB-2026.jpeg';
import Icpc2025Image from '../../../assets/Achievements/ICPC-2025.jpg';
import Ccpl2025Image from '../../../assets/Achievements/CCPL-2025.jpeg';
import PlatziImage from '../../../assets/Achievements/Platzi.jpeg';

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeDiagram, setActiveDiagram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [certListHeight, setCertListHeight] = useState(null);
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);
  const [activeAchievementIndex, setActiveAchievementIndex] = useState(0);
  const skillsLeftRef = useRef(null);
  const skillsRightHeaderRef = useRef(null);

  useEffect(() => {
    const projectShells = document.querySelectorAll('.project-story-shell');
    projectShells.forEach((shell) => shell.classList.add('project-visible'));

    if (!projectShells.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    projectShells.forEach((shell) => observer.observe(shell));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncCertListHeight = () => {
      if (!skillsLeftRef.current || !skillsRightHeaderRef.current) return;

      const leftHeight = skillsLeftRef.current.getBoundingClientRect().height;
      const headerHeight = skillsRightHeaderRef.current.getBoundingClientRect().height;
      const gapBetweenHeaderAndList = 24;
      const desktopHeight = Math.max(260, Math.floor(leftHeight - headerHeight - gapBetweenHeaderAndList));

      // On stacked layouts, keep a controlled viewport-bound area so certs are always scrollable.
      const isNarrowViewport = window.innerWidth <= 968;
      const viewportHeightCap = Math.max(260, Math.floor(window.innerHeight * 0.58));
      const nextHeight = isNarrowViewport
        ? Math.min(desktopHeight, viewportHeightCap)
        : desktopHeight;

      setCertListHeight(nextHeight);
    };

    syncCertListHeight();

    const resizeObserver = new ResizeObserver(syncCertListHeight);
    if (skillsLeftRef.current) resizeObserver.observe(skillsLeftRef.current);
    if (skillsRightHeaderRef.current) resizeObserver.observe(skillsRightHeaderRef.current);

    window.addEventListener('resize', syncCertListHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncCertListHeight);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    sections.forEach((section) => section.classList.add('reveal-visible'));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 560);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const achievements = [
    {
      id: 'gpc-ueb-2026',
      rank: 'Mención honorífica',
      event: '5ta Maratón de Programación de la Universidad El Bosque',
      label: 'GPC-UEB 2026',
      date: 'Marzo 2026',
      image: GpcUeb2026Image,
    },
    {
      id: 'icpc-2025',
      rank: 'Puesto #48',
      event: 'Maratón Internacional de Programación Universitaria',
      label: 'ICPC 2025',
      date: 'Octubre 2025',
      image: Icpc2025Image,
    },
    {
      id: 'ccpl-2025',
      rank: 'Puesto #2',
      event: 'Liga de Programación Colombiana',
      label: 'CCPL R4 2025',
      date: 'Mayo 2025',
      image: Ccpl2025Image,
    },
    {
      id: 'platzi-2024',
      rank: 'Puesto #1',
      event: 'Competencia de Programación en Python',
      label: 'Platzi',
      date: 'Septiembre 2024',
      image: PlatziImage,
    },
  ];

  useEffect(() => {
    if (!activeDiagram) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDiagram(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeDiagram]);

  useEffect(() => {
    if (!achievementsModalOpen) return undefined;

    const total = achievements.length;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAchievementsModalOpen(false);
      } else if (event.key === 'ArrowRight') {
        setActiveAchievementIndex((prev) => (prev + 1) % total);
      } else if (event.key === 'ArrowLeft') {
        setActiveAchievementIndex((prev) => (prev - 1 + total) % total);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [achievementsModalOpen, achievements.length]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsNavOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor completa todos los campos' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Usando Web3Forms (servicio gratuito sin necesidad de registro previo)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0747e6a8-4350-4ca8-b840-8aaf7effeb64',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'jesus.florezch@gmail.com',
          subject: `Nuevo mensaje de ${formData.name} desde tu portafolio`
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Hubo un error al enviar el mensaje. Por favor inténtalo de nuevo.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillDomains = [
    {
      title: 'Backend Core',
      summary: 'Diseño de APIs seguras, robustas y listas para producción.',
      items: [
        {
          name: 'Java 17+ y Spring Boot',
          level: 'Avanzado',
          evidence: '3+ años implementando APIs REST, seguridad y lógica transaccional.'
        },
        {
          name: 'Seguridad OAuth2/JWT',
          level: 'Avanzado',
          evidence: 'Flujos de autenticación/autorización en suite empresarial pública.'
        },
        {
          name: 'Persistencia SQL',
          level: 'Avanzado',
          evidence: 'Diseño de modelo relacional, paginación y auditoría en MySQL.'
        }
      ]
    },
    {
      title: 'Arquitectura y Eventos',
      summary: 'Sistemas modulares orientados a escalabilidad por dominios.',
      items: [
        {
          name: 'Microservicios',
          level: 'Avanzado',
          evidence: 'Separación de responsabilidades y despliegue independiente por servicio.'
        },
        {
          name: 'Kafka + RabbitMQ',
          level: 'Avanzado',
          evidence: 'Mensajería asíncrona para eventos de negocio y procesamiento diferido.'
        },
        {
          name: 'Patrones de integración',
          level: 'Intermedio+',
          evidence: 'Orquestación entre APIs backend, procesos async e IA como servicio.'
        }
      ]
    },
    {
      title: 'Infraestructura y DevOps',
      summary: 'Operación confiable de servicios backend en entornos reales.',
      items: [
        {
          name: 'Docker y despliegues',
          level: 'Intermedio+',
          evidence: 'Despliegue de servicios en VPS Debian y entornos cloud.'
        },
        {
          name: 'AWS / Cloud',
          level: 'Intermedio',
          evidence: 'Experiencia práctica con EC2 y RDS para servicios productivos.'
        },
        {
          name: 'GitHub Flow + PR Reviews',
          level: 'Avanzado',
          evidence: 'Colaboración activa en repos open source y blog técnico semanal.'
        }
      ]
    },
    {
      title: 'Data y AI Integration',
      summary: 'Integración de capacidades IA al backend sin comprometer estabilidad.',
      items: [
        {
          name: 'Python / Flask',
          level: 'Intermedio+',
          evidence: 'Microservicios para tareas de IA y procesamiento especializado.'
        },
        {
          name: 'Spring AI / MaaS',
          level: 'Intermedio+',
          evidence: 'Consumo de modelos y selección según costo/beneficio de uso.'
        },
        {
          name: 'Rendimiento numérico',
          level: 'Intermedio',
          evidence: 'NumPy/Numba aplicados a generación de fractales y optimización.'
        }
      ]
    }
  ];

  const credentialsHighlights = [
    { value: '+20', label: 'Certificados técnicos' },
    { value: '+2 años', label: 'Experiencia backend' },
    { value: 'CCPL', label: 'Competidor 2024-2026' },
    { value: 'OSS', label: 'Contribuidor open source' }
  ];

  // const certificatePlaceholders = Array.from({ length: 30 }, (_, index) => ({
  //   id: String(index + 1).padStart(2, '0'),
  //   title: `Certificación ${String(index + 1).padStart(2, '0')} · Nombre del programa`,
  //   institution: 'Institución y URL pendientes'
  // }));

  const certificatePlaceholders = [
  {
    id: '01',
    title: 'Tecnólogo, Desarrollo de software',
    institution: 'Universidad Agustiniana'
  },
  {
    id: '02',
    title: 'Técnico, Sistemas informáticos',
    institution: 'Servicio Nacional de Aprendizaje (SENA)'
  },
  {
    id: '03',
    title: 'Diplomado, Programación en Java',
    institution: 'Politécnico de Colombia'
  },
  {
    id: '04',
    title: 'Diplomado, Metodología SCRUM',
    institution: 'Edutin Academy'
  },
  {
    id: '05',
    title: 'Java Foundations',
    institution: 'Oracle Academy'
  },
  {
    id: '06',
    title: 'Cloud Computing Fundamentals',
    institution: 'Google Cloud Skills Boost'
  },
  {
    id: '07',
    title: 'Inteligencia Artificial Aplicada',
    institution: 'MinTIC Colombia'
  },
  {
    id: '08',
    title: 'Curso, Bases de datos: Generalidades y sistemas de gestión',
    institution: 'Servicio Nacional de Aprendizaje (SENA)'
  },
  {
    id: '09',
    title: 'Curso, Spring Boot esencial',
    institution: 'LinkedIn Learning'
  },
  {
    id: '10',
    title: 'Curso, Como gestionar equipos de trabajo',
    institution: 'Project Management Institute'
  },
  {
    id: '11',
    title: 'Curso, Java SE Orientado a objetos',
    institution: 'Platzi'
  },
  {
    id: '12',
    title: 'Curso, Java SE SQL y bases de datos',
    institution: 'Platzi'
  },
  {
    id: '13',
    title: 'Curso, Java SE Persistencia de datos',
    institution: 'Platzi'
  },
  {
    id: '14',
    title: 'Curso, Testing en Java',
    institution: 'Platzi'
  },
  {
    id: '15',
    title: 'Curso, Java Spring Framework',
    institution: 'Platzi'
  },
  {
    id: '16',
    title: 'Curso, Spring Data JPA: Bases de datos',
    institution: 'Platzi'
  },
  {
    id: '17',
    title: 'Curso, Seguridad web con Spring Security',
    institution: 'Platzi'
  },
  {
    id: '18',
    title: 'Curso, Programación funcional con Java SE',
    institution: 'Platzi'
  },
  {
    id: '19',
    title: 'Curso, Funciones y estructuras de control',
    institution: 'Platzi'
  },
  {
    id: '20',
    title: 'Curso, Git y GitHub',
    institution: 'Platzi'
  },
  {
    id: '21',
    title: 'Curso, Docker',
    institution: 'Platzi'
  },
  {
    id: '22',
    title: 'Curso, Introducción a la Ciencia de datos',
    institution: 'Cisco Networking Academy'
  },
  {
    id: '23',
    title: 'Curso, Introducción a la Ciberseguridad',
    institution: 'Cisco Networking Academy'
  }
];

  const projectStories = [
    {
      id: 'suite-jflorez',
      title: 'JFlorez Suite',
      subtitle: 'Plataforma gratuita con arquitectura distribuida',
      summary:
        'Suite modular orientada a productividad: autenticación robusta, mensajería asíncrona y servicios desacoplados para escalar por dominio.',
      tags: ['React', 'Spring Boot', 'Flask', 'Kafka', 'RabbitMQ', 'OAuth2', 'JWT', 'Docker', 'MySQL'],
      liveUrl: 'https://jesusflorez.cloud',
      repoUrl: 'https://github.com/dvchinx',
      preview: { src: TasksImage, alt: 'JFlorez Suite' },
      diagramAssets: [
        {
          id: 'jflorez-components-real',
          title: 'Diagrama de componentes',
          src: JFlorezSuiteComponentDiagram,
          alt: 'Diagrama de componentes de JFlorez Suite con frontend, backend, chat, mensajeria e infraestructura.'
        },
        {
          id: 'jflorez-notes-sequence-real',
          title: 'Diagrama de secuencia (Notas)',
          src: JFlorezSuiteNotesSequenceDiagram,
          alt: 'Diagrama de secuencia del modulo Notas con flujo de Google Drive, cache local y sincronizacion online/offline.'
        },
        {
          id: 'jflorez-deployment-real',
          title: 'Diagrama de despliegue',
          src: JFlorezSuiteDeploymentDiagram,
          alt: 'Diagrama de despliegue de JFlorez Suite con Nginx, contenedores Docker, servicios de datos e integraciones externas.'
        }
      ],
      architecture: {
        nodes: ['Frontend React', 'API Gateway + OAuth2', 'Core Spring APIs', 'Kafka / RabbitMQ', 'Microservicio IA (Flask)'],
        links: [
          'React consume APIs seguras con JWT + refresh tokens',
          'Eventos de negocio se propagan por Kafka/RabbitMQ',
          'El servicio IA se orquesta por colas para tareas intensivas'
        ]
      },
      stackReasoning: [
        { tech: 'Spring Boot', reason: 'Seguridad madura, modularidad y despliegue predecible en producción.' },
        { tech: 'Kafka + RabbitMQ', reason: 'Combina streaming de eventos y colas confiables según caso de uso.' },
        { tech: 'React', reason: 'Interfaz ágil para dominios múltiples con buena mantenibilidad.' }
      ],
      metrics: [
        { label: 'Latencia API (p95)', value: '< 120ms', note: 'en medición continua' },
        { label: 'Uptime objetivo', value: '99.9%', note: 'baseline de arquitectura' },
        { label: 'Procesamiento asíncrono', value: '2K+ eventos/h', note: 'estimación bajo carga media' }
      ],
      tradeoffs: [
        'Elegí consistencia eventual en flujos asíncronos para ganar resiliencia.',
        'Separé IA en microservicio para escalar computación sin afectar APIs core.',
        'Aumenta complejidad operativa, pero mejora la evolución por dominios.'
      ]
    },
    {
      id: 'blog-personal',
      title: 'Blog Personal Colaborativo',
      subtitle: 'SPA Markdown con pipeline estático y despliegue containerizado',
      summary:
        'Blog técnico en React desplegado en blog.jesusflorez.cloud, con carga de posts Markdown por fecha, routing dinámico y flujo de build Docker + Nginx.',
      tags: ['React', 'Vite', 'React Router', 'gray-matter', 'React Markdown', 'Docker', 'Nginx'],
      liveUrl: 'https://blog.jesusflorez.cloud',
      repoUrl: 'https://github.com/dvchinx/blog',
      preview: { src: BlogImage, alt: 'JFlorez Blog' },
      architecture: {
        nodes: ['index.html + main.jsx', 'App + React Router', 'postsLoader(import.meta.glob)', 'gray-matter + ReactMarkdown', 'Docker build + Nginx'],
        links: [
          'Bootstrap: BrowserRouter monta App y define rutas / y /:year/:month/:slug.',
          'Pipeline de contenido: postsLoader carga Markdown, separa frontmatter YAML y body.',
          'Render final: ReactMarkdown aplica remark-gfm y rehype-raw para mostrar el post.'
        ]
      },
      diagramAssets: [
        {
          id: 'blog-sequence-real',
          title: 'Diagrama de secuencia',
          src: BlogSequenceDiagram,
          alt: 'Diagrama de secuencia del blog: flujo entre User, PostList, PostView, postsLoader, gray-matter y ReactMarkdown.'
        },
        {
          id: 'blog-deployment-real',
          title: 'Diagrama de despliegue',
          src: BlogDeploymentDiagram,
          alt: 'Diagrama de despliegue del blog: etapa de build con Vite y etapa de serving con Nginx en Docker.'
        },
        {
          id: 'blog-components-real',
          title: 'Diagrama de componentes',
          src: BlogComponentDiagram,
          alt: 'Diagrama de componentes del blog: entry points, app, componentes de pagina, layout, utilidades y contenido markdown.'
        }
      ],
      stackReasoning: [
        { tech: 'Vite + import.meta.glob', reason: 'Permite carga estática de contenido y build rápido sin backend dedicado.' },
        { tech: 'gray-matter + frontmatter', reason: 'Estructura uniforme de metadatos para búsqueda, filtros y tarjetas de posts.' },
        { tech: 'Docker multistage + Nginx', reason: 'Empaquetado reproducible y soporte de rutas SPA con try_files a index.html.' }
      ],
      metrics: [
        { label: 'Paginación', value: '9 posts/página', note: 'navegación definida en PostList' },
        { label: 'Tipos de contenido', value: '2 categorías', note: 'tech y coding con filtros y búsqueda' },
        { label: 'Rutas principales', value: '2 vistas', note: '/ (listado) y /:year/:month/:slug (detalle)' }
      ],
      tradeoffs: [
        'El enfoque estático simplifica infraestructura, pero requiere rebuild para publicar cambios.',
        'rehype-raw habilita HTML avanzado en Markdown, con mayor responsabilidad de sanitización de contenido.',
        'El modelo SPA mejora UX, pero exige configuración explícita de fallback en Nginx para deep links.'
      ]
    },
    {
      id: 'pizzeria-api',
      title: 'Backend Monolítico para Pizzería',
      subtitle: 'Dominio transaccional con API robusta',
      summary:
        'API backend para gestión de clientes, pedidos y catálogo, con foco en integridad de datos, paginación y auditoría operativa.',
      tags: ['Java 17+', 'Spring Framework', 'Gradle', 'MySQL', 'REST API'],
      repoUrl: 'https://github.com/dvchinx/Pizzeria-API',
      preview: { src: Pizzeria, alt: 'Backend Pizzería' },
      architecture: {
        nodes: ['Cliente/Panel', 'Controladores REST', 'Servicios de dominio', 'Persistencia JPA', 'MySQL'],
        links: [
          'Las reglas de negocio viven en capa de servicios.',
          'La persistencia garantiza integridad relacional y consultas paginadas.',
          'La auditoría facilita trazabilidad operativa de órdenes.'
        ]
      },
      stackReasoning: [
        { tech: 'Monolito modular', reason: 'Permite entregar rápido sin sobrecosto operativo temprano.' },
        { tech: 'Spring + JPA', reason: 'Acelera CRUD y capas transaccionales con buenas prácticas.' },
        { tech: 'MySQL', reason: 'Modelo relacional sólido para entidades de negocio y reportes.' }
      ],
      metrics: [
        { label: 'Cobertura endpoints', value: '100% CRUD dominio', note: 'clientes, pizzas, órdenes' },
        { label: 'Latencia objetivo', value: '< 150ms', note: 'placeholder para p95 interno' },
        { label: 'Paginación', value: 'Activa', note: 'optimiza listados de órdenes' }
      ],
      tradeoffs: [
        'Monolito reduce complejidad inicial frente a microservicios.',
        'Escala verticalmente bien, con ruta clara a separación por bounded contexts.',
        'Centralizar auditoría simplifica soporte y observabilidad.'
      ]
    },
    {
      id: 'fractal-gallery',
      title: 'Galería y Generador de Fractales',
      subtitle: 'Pipeline numérico y visualización científica',
      summary:
        'Proyecto orientado a generación de fractales con parámetros ajustables, optimización numérica y salida gráfica para exploración visual.',
      tags: ['Python', 'Flask', 'NumPy', 'Numba', 'Matplotlib', 'Pillow'],
      repoUrl: 'https://github.com/dvchinx/Fractal-Gallery',
      preview: { src: FractalImage, alt: 'Fractal Gallery' },
      architecture: {
        nodes: ['CLI / UI', 'Motor fractal', 'Optimización Numba', 'Render Matplotlib', 'Exportación imagen'],
        links: [
          'La parametrización alimenta el motor matemático de generación.',
          'Numba acelera cálculos en iteraciones intensivas.',
          'El pipeline termina en exportación reutilizable para galería.'
        ]
      },
      stackReasoning: [
        { tech: 'NumPy + Numba', reason: 'Excelente costo-beneficio para cálculo de alto volumen.' },
        { tech: 'Flask', reason: 'Entrega rápida de endpoints para experimentar con generación remota.' },
        { tech: 'Matplotlib/Pillow', reason: 'Control fino del render y exportación de resultados.' }
      ],
      metrics: [
        { label: 'Resolución objetivo', value: '4K', note: 'placeholder para renders finales' },
        { label: 'Aceleración', value: '3x - 8x', note: 'estimación con Numba según fractal' },
        { label: 'Tiempo por render', value: '< 4s', note: 'escenario base en hardware medio' }
      ],
      tradeoffs: [
        'Mayor precisión matemática incrementa tiempo de render.',
        'Optimización prematura se evita hasta medir cuellos reales.',
        'Se prioriza reproducibilidad visual sobre efectos no deterministas.'
      ]
    }
  ];

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="portfolio-nav-brand">
          <span className="brand-text">J.Flórez</span>
        </div>
        <button
          type="button"
          className={`portfolio-nav-toggle ${isNavOpen ? 'open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`portfolio-nav-links ${isNavOpen ? 'open' : ''}`}>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Inicio
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            Sobre mí
          </a>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            Habilidades
          </a>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Proyectos
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="portfolio-hero reveal-section">
        {/* Animated background elements */}
        <div className="hero-bg-element hero-bg-1"></div>
        <div className="hero-bg-element hero-bg-2"></div>
        <div className="hero-bg-element hero-bg-3"></div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-greeting">Hola, soy <br />Jesús Flórez</h1>
            <h2 className="hero-title">Desarrollador Back-End</h2>
            <p className="hero-description">
              Creando soluciones back-end robustas, escalables y eficientes
              con pasión y precisión.
            </p>
            <div className="hero-badges">
              <span className="hero-badge">+2 años en backend</span>
              <span className="hero-badge">Competidor CCPL/ICPC</span>
              <span className="hero-badge">Java / Spring</span>
            </div>
            <div className="hero-actions">
              <a
                href="mailto:jesus.florezch@gmail.com"
                className="btn-hero-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                </svg>
                Contáctame
              </a>
              <a
                href="https://github.com/dvchinx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dvchinx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <img src={ProfilePhoto} alt="Jesús Flórez" className="profile-photo" />
            </div>
            
            {/* Floating tech icons */}
            <div className="floating-icon icon-1">
              <span>☕</span>
            </div>
            <div className="floating-icon icon-2">
              <span>🍃</span>
            </div>
            <div className="floating-icon icon-3">
              <span>🐳</span>
            </div>
            <div className="floating-icon icon-4">
              <span>🐍</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section reveal-section">
        <div className="section-content">

          <div className="about-experience-full">
            <h3 className="about-experience-label">Experiencia Profesional</h3>
            <div className="experience-card-full">
              <div className="experience-card-meta">
                <div className="experience-card-meta-top">
                  <div>
                    <p className="experience-role">Desarrollador Backend</p>
                    <p className="experience-company">
                      <a href="https://miutab.com" target="_blank" rel="noopener noreferrer" className="experience-company-link">
                        MiuTab
                      </a>
                      <span className="experience-period">· Feb 2025 – Presente</span>
                    </p>
                  </div>
                  <span className="experience-badge">Actual</span>
                </div>
                <div className="experience-tags">
                  {['Java', 'Spring Boot', 'MySQL', 'Docker'].map((t) => (
                    <span key={t} className="experience-tag">{t}</span>
                  ))}
                </div>
              </div>
              <ul className="experience-bullets">
                <li>Lideré la construcción del backend del producto desde cero: definición de la arquitectura de módulos, diseño del modelo relacional y establecimiento de convenciones de API.</li>
                <li>Implementé APIs REST con Spring Boot, gestioné la persistencia con JPA/MySQL y configuré el despliegue containerizado con Docker.</li>
                <li>Responsable del ciclo de vida completo del backend: desde el modelado de entidades y escritura de migraciones hasta la configuración y mantenimiento de entornos productivos.</li>
              </ul>
            </div>
          </div>

          <div className="about-container">
            <div className="about-left">
              <div className="about-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={WebIcon} alt="Web Development" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Desarrollo Web de Endpoints y Seguridad</h3>
                    <p className="timeline-description">
                      Mediante Spring Framework y sus herramientas, expongo
                      de manera efectiva y segura endpoints consumibles por
                      parte del servidor bajo demanda del Front-End.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={AppIcon} alt="AI Development" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Consumo y Desarrollo de Modelos de IA</h3>
                    <p className="timeline-description">
                      Usando Spring AI, consumo los MaaS más óptimos para
                      satisfacer la necesidad o en su defecto, creo mi propio
                      modelo implementando Python como microservicio.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={DeployIcon} alt="Cloud Deployment" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Despliegue de Servicios en la Nube</h3>
                    <p className="timeline-description">
                      +1 año de experiencia consumiendo servicios de Cloud
                      tales como: AWS EC2, Amazon RDS y de VPS: Debian
                      con conexión por SSH y despliegue con Docker Compose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-right">
              <h2 className="section-title">ACERCA DE MÍ</h2>
              <div className="about-intro">
                <p className="about-intro-text">
                  Llevo más de 2 años desarrollando software con Java
                  17+, Spring Framework y Python con Flask/FastAPI.
                </p>
                <p className="about-intro-text">
                  Mi pasión es la construcción de aplicaciones web que
                  resuelvan problemas complejos, me gusta retarme día
                  a día y aprender algo nuevo.
                </p>
                <p className="about-intro-text">
                  Actualmente estoy contribuyendo a proyectos de
                  código abierto (open-source) y participando
                  activamente en programación competitiva.
                </p>
              </div>
              <div className="about-achievements">
                <div className="achievement-item">
                  <img src={TrophyIcon} alt="Trophy Gold" className="trophy-icon" />
                  <p className="achievement-text">Reto Back-End<br />Net&Dev 2025</p>
                </div>
                <div className="achievement-item">
                  <img src={TrophyIcon2} alt="Trophy Silver" className="trophy-icon" />
                  <p className="achievement-text">2°do Puesto<br />CCPL R8 2025</p>
                </div>
              </div>
              <button
                type="button"
                className="btn-more"
                onClick={() => {
                  setAchievementsModalOpen(true);
                  setActiveAchievementIndex(0);
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Ver más logros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section reveal-section">
        <div className="section-content">
          <h2 className="section-title-two">Habilidades y Certificaciones</h2>
          <div className="skills-container">
            <div className="skills-left" ref={skillsLeftRef}>
              <h3 className="skills-subtitle">Capacidades Técnicas</h3>
              <p className="skills-summary-text">
                Stack backend orientado a producción, arquitectura distribuida y calidad de entrega.
              </p>

              <div className="skills-overview-grid">
                {credentialsHighlights.map((item) => (
                  <article key={item.label} className="skills-overview-card">
                    <p className="skills-overview-value">{item.value}</p>
                    <p className="skills-overview-label">{item.label}</p>
                  </article>
                ))}
              </div>

              <div className="skills-domain-grid">
                {skillDomains.map((domain) => (
                  <article key={domain.title} className="skills-domain-card">
                    <h4 className="skills-domain-title">{domain.title}</h4>
                    <p className="skills-domain-summary">{domain.summary}</p>

                    <div className="skills-evidence-list">
                      {domain.items.map((item) => (
                        <div key={item.name} className="skills-evidence-item">
                          <div className="skills-evidence-head">
                            <p className="skills-evidence-name">{item.name}</p>
                            <span className="skills-level-chip">{item.level}</span>
                          </div>
                          <p className="skills-evidence-text">{item.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="skills-right">
              <div className="skills-right-header" ref={skillsRightHeaderRef}>
                <h3 className="skills-subtitle">Estudios y Certificados</h3>
                <p className="skills-summary-text">
                  Listado de mis estudios y certificaciones
                </p>
              </div>
              <div
                className="certifications-list"
                role="list"
                aria-label="Lista de certificaciones"
                style={
                  certListHeight !== null
                    ? { '--cert-list-height': `${certListHeight}px` }
                    : undefined
                }
              >
                {certificatePlaceholders.map((item) => (
                  <article key={item.id} className="certification-card certification-placeholder" role="listitem">
                    <div className="cert-placeholder-index">{item.id}</div>
                    <div className="cert-content">
                      <h4 className="cert-title">{item.title}</h4>
                      <p className="cert-institution">{item.institution}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="portfolio-section portfolio-projects-section reveal-section">
        <div className="section-content">
          <h2 className="section-title-two">MIS PROYECTOS</h2>
          <p className="projects-intro">
            Cada proyecto incluye un recorrido técnico: arquitectura, decisiones de stack,
            métricas de referencia y trade-offs de ingeniería. Desplázate en cada panel
            para explorar la narrativa completa.
          </p>

          <div className="project-story-list">
            {projectStories.map((project, index) => {
              const diagramAssets = project.diagramAssets || [];

              return (
              <article key={project.id} className="project-story-shell">
                <div className="project-story-sticky">
                  <div className="project-story-meta">
                    <p className="project-rank">Proyecto {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-summary">{project.summary}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="project-link-btn project-link-live" target="_blank" rel="noopener noreferrer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Ver proyecto
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} className="project-link-btn project-link-repo" target="_blank" rel="noopener noreferrer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Repositorio
                        </a>
                      )}
                    </div>
                    <div className="project-media-preview">
                      {project.preview ? (
                        <img src={project.preview.src} alt={project.preview.alt} className="project-preview-image" />
                      ) : (
                        <div className="project-preview-placeholder">
                          <span>Documentación visual en preparación</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-story-rail" aria-label={`Narrativa técnica de ${project.title}`}>
                    <section className="story-panel architecture-panel">
                      <p className="story-label">Arquitectura</p>
                      <h4 className="story-title">Diagramas del sistema</h4>

                      {project.diagrams?.length > 0 && (
                        <div className="project-diagram-gallery" role="group" aria-label={`Diagramas del proyecto ${project.title}`}>
                          {project.diagrams.map((diagram) => (
                            <article key={`${project.id}-${diagram.id}`} className="project-diagram-card">
                              <h5 className="project-diagram-title">{diagram.title}</h5>
                              <p className="project-diagram-caption">{diagram.caption}</p>
                              <div className="project-diagram-flow" role="list" aria-label={diagram.title}>
                                {diagram.stages.map((stage, stageIndex) => (
                                  <div key={`${diagram.id}-${stage}`} className="project-diagram-stage-wrap" role="listitem">
                                    <span className="project-diagram-stage">{stage}</span>
                                    {stageIndex < diagram.stages.length - 1 && (
                                      <span className="project-diagram-arrow" aria-hidden="true">-</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      )}

                      {diagramAssets.length > 0 && (
                        <div className="project-svg-gallery" role="group" aria-label={`SVGs de ${project.title}`}>
                          {diagramAssets.map((diagramAsset) => (
                            <figure key={`${project.id}-${diagramAsset.id}`} className="project-sequence-diagram">
                              <figcaption className="project-sequence-caption">{diagramAsset.title}</figcaption>
                              <button
                                type="button"
                                className="project-sequence-link"
                                onClick={() => setActiveDiagram(diagramAsset)}
                                aria-label={`Abrir ${diagramAsset.title} en modal`}
                              >
                                <img
                                  src={diagramAsset.src}
                                  alt={diagramAsset.alt}
                                  className="project-sequence-image"
                                  loading="lazy"
                                />
                              </button>
                            </figure>
                          ))}
                        </div>
                      )}

                      {!project.diagrams?.length && !diagramAssets.length && (
                        <p className="project-diagram-empty">Diagramas en preparación para este proyecto.</p>
                      )}
                    </section>

                    <section className="story-panel">
                      <p className="story-label">Stack + Métricas</p>
                      <h4 className="story-title">Tecnologías, decisiones e indicadores</h4>
                      <div className="story-key-values">
                        {project.stackReasoning.map((item) => (
                          <div key={`${project.id}-${item.tech}`} className="story-key-row">
                            <p className="story-key">{item.tech}</p>
                            <p className="story-value">{item.reason}</p>
                          </div>
                        ))}
                      </div>

                      <h4 className="story-title">Indicadores de desempeño</h4>
                      <div className="metrics-grid">
                        {project.metrics.map((metric) => (
                          <article key={`${project.id}-${metric.label}`} className="metric-card">
                            <p className="metric-label">{metric.label}</p>
                            <p className="metric-value">{metric.value}</p>
                            <p className="metric-note">{metric.note}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </article>
            );})}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section contact-section reveal-section">
        <div className="section-content">
          <div className="contact-container">
            <div className="contact-left">
              <h2 className="contact-main-title">
                HAGAMOS
                <br />
                QUE
                <br />
                SUCEDA
              </h2>
              <p className="contact-subtitle">
                Transformo retos técnicos en productos sólidos, escalables y listos para producción.
              </p>
              <div className="contact-pill-list">
                <span className="contact-pill">Respuesta en menos de 24h</span>
                <span className="contact-pill">Arquitectura y consultoría técnica</span>
              </div>
            </div>
            <div className="contact-right">
              <h3 className="contact-form-heading">Trabajemos juntos</h3>
              <p className="contact-form-subheading">
                Cuéntame tu desafío y diseñemos una solución robusta con una ejecución profesional.
              </p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    className="form-input form-textarea" 
                    placeholder="Tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                {submitStatus.message && (
                  <div className={`form-message form-message-${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
                <button type="submit" className="form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer reveal-section">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-name">
              Jesús Flórez
            </h3>
            <p className="footer-copyright">© Todos los derechos reservados.</p>
          </div>
          <div className="footer-right">
            <p className="footer-info">
              Sitio diseñado con Figma. Desarrollado con React.js y Spring Boot.
            </p>
            <div className="footer-socials">
              <a 
                href="https://github.com/dvchinx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/dvchinx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label="Volver arriba"
          onClick={() => scrollToSection('home')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      )}

      {activeDiagram && (
        <div
          className="diagram-modal-overlay"
          role="presentation"
          onClick={() => setActiveDiagram(null)}
        >
          <div
            className="diagram-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeDiagram.title || 'Diagrama ampliado'}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="diagram-modal-header">
              <p className="diagram-modal-title">{activeDiagram.title || 'Diagrama'}</p>
              <button
                type="button"
                className="diagram-modal-close"
                onClick={() => setActiveDiagram(null)}
                aria-label="Cerrar modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13"/>
                  <line x1="13" y1="1" x2="1" y2="13"/>
                </svg>
              </button>
            </div>
            <div className="diagram-modal-body">
              <img src={activeDiagram.src} alt={activeDiagram.alt} className="diagram-modal-image" />
            </div>
          </div>
        </div>
      )}

      {achievementsModalOpen && (
        <div
          className="achievements-modal-overlay"
          role="presentation"
          onClick={() => setAchievementsModalOpen(false)}
        >
          <div
            className="achievements-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Logros y Reconocimientos"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="achievements-modal-header">
              <div className="achievements-modal-title-group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="achievements-modal-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p className="achievements-modal-title">Logros y Reconocimientos</p>
              </div>
              <button
                type="button"
                className="achievements-modal-close"
                onClick={() => setAchievementsModalOpen(false)}
                aria-label="Cerrar modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13"/>
                  <line x1="13" y1="1" x2="1" y2="13"/>
                </svg>
              </button>
            </div>

            {/* Slide image */}
            <div className="achievements-modal-image-wrap">
              <img
                key={activeAchievementIndex}
                src={achievements[activeAchievementIndex].image}
                alt={achievements[activeAchievementIndex].event}
                className="achievements-modal-image"
              />
              <div className="achievements-modal-image-overlay" />
            </div>

            {/* Slide info */}
            <div className="achievements-modal-info">
              <div className="achievements-modal-meta">
                <span className="achievements-modal-date">{achievements[activeAchievementIndex].date}</span>
                <span className="achievements-modal-label">{achievements[activeAchievementIndex].label}</span>
              </div>
              <p className="achievements-modal-rank">{achievements[activeAchievementIndex].rank}</p>
              <p className="achievements-modal-event">{achievements[activeAchievementIndex].event}</p>
            </div>

            {/* Navigation */}
            <div className="achievements-modal-nav">
              <button
                type="button"
                className="achievement-nav-btn"
                aria-label="Logro anterior"
                onClick={() =>
                  setActiveAchievementIndex((prev) => (prev - 1 + achievements.length) % achievements.length)
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              <div className="achievement-dots">
                {achievements.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`achievement-dot ${i === activeAchievementIndex ? 'active' : ''}`}
                    aria-label={`Ir al logro ${i + 1}`}
                    onClick={() => setActiveAchievementIndex(i)}
                  />
                ))}
              </div>

              <span className="achievement-counter">
                {activeAchievementIndex + 1} / {achievements.length}
              </span>

              <button
                type="button"
                className="achievement-nav-btn"
                aria-label="Siguiente logro"
                onClick={() =>
                  setActiveAchievementIndex((prev) => (prev + 1) % achievements.length)
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
