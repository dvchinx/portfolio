import SuiteImage from '../assets/projects/jflorez-suite.png';
import BlogImage from '../assets/projects/blog.png';
import SimulationImage from '../assets/projects/simulation.png';

/*
 * Cada afirmación sale del código o la documentación de cada repositorio:
 * - JFlorez Suite: JFlorez-Suite (backend/, chat/, frontend/, deploy/docker-compose.yml, commits de oct. 2026).
 * - Fraud Detection: github.com/dvchinx/fraud-detection (README, ml/model/metadata.json, fraud/*).
 * - Credit Scoring: github.com/dvchinx/credit-scoring (README, docs/architecture.md, migraciones Flyway, tests).
 * - Blog: github.com/dvchinx/blog (scripts/prerender.mjs, vite.config.js, nginx.conf, newsletter/src/*).
 * - Simulación: github.com/dvchinx/simulation (server.py, simulation.py, client.js, README.md, CHANGELOG.md).
 *
 * BORRADOR — validar con el autor: `decisions[].why` explica la motivación inferida
 * de la arquitectura; los hechos técnicos y `retrospective` están verificados en el código.
 */

const suiteDiagram = {
  viewBox: '0 0 820 520',
  groups: [
    { id: 'vps', x: 165, y: 25, w: 645, h: 480, label: 'VPS · jesusflorez.cloud · 18 contenedores' }
  ],
  nodes: [
    { id: 'browser', x: 15, y: 215, w: 125, h: 60, label: 'Navegador', sub: 'React 19 SPA' },
    { id: 'google', x: 15, y: 60, w: 140, h: 60, label: 'Google · GitHub', sub: 'Drive · Calendar' },
    { id: 'nginx', x: 190, y: 215, w: 125, h: 60, label: 'Nginx', sub: 'TLS · HSTS · rutas' },
    { id: 'apps', x: 190, y: 405, w: 140, h: 60, label: 'Otros servicios', sub: 'blog · sim · status' },
    { id: 'api', x: 380, y: 95, w: 150, h: 60, label: 'Backend API', sub: 'Spring Boot :8080' },
    { id: 'chat', x: 380, y: 335, w: 150, h: 60, label: 'Chat', sub: 'Spring Boot + WS :8081' },
    { id: 'mysql', x: 630, y: 95, w: 160, h: 60, label: 'MySQL 8.0', sub: 'schema personal' }
  ],
  edges: [
    { id: 'browser-nginx', points: [[140, 245], [190, 245]], label: 'HTTPS', labelAt: [165, 235] },
    { id: 'nginx-api', points: [[315, 235], [345, 235], [345, 125], [380, 125]], label: '/api · /oauth2', labelAt: [351, 182], anchor: 'start' },
    { id: 'nginx-chat', points: [[315, 255], [345, 255], [345, 365], [380, 365]], label: '/ws · /api/chat', labelAt: [351, 312], anchor: 'start' },
    { id: 'nginx-apps', points: [[252, 275], [252, 405]], label: 'subdominios', labelAt: [258, 345], anchor: 'start' },
    { id: 'api-mysql', points: [[530, 125], [630, 125]], label: 'JPA', labelAt: [580, 115] },
    { id: 'api-google', points: [[405, 95], [405, 75], [155, 75]], label: 'OAuth2 · APIs', labelAt: [280, 65] },
    { id: 'chat-api', points: [[455, 335], [455, 155]], label: 'perfil · /internal', labelAt: [461, 250], anchor: 'start' },
    { id: 'chat-mysql', points: [[530, 365], [710, 365], [710, 155]], label: 'guarda primero', labelAt: [716, 260], anchor: 'start' }
  ],
  steps: [
    {
      title: 'Una sola puerta para todo el ecosistema',
      body: 'El mismo VPS corre 18 contenedores: la suite, el blog y su newsletter, la simulación, una página de estado y este portafolio. Nginx termina TLS (Let’s Encrypt con renovación por Certbot, HSTS) y enruta por ruta y por subdominio. Todos los servicios salvo Certbot declaran su healthcheck.',
      nodes: ['browser', 'nginx', 'apps'],
      edges: ['browser-nginx', 'nginx-apps'],
      packets: ['browser-nginx', 'nginx-apps']
    },
    {
      title: 'Identidad: local, federada y revocable',
      body: 'Registro local con verificación por correo (token de 24 h) y recuperación de contraseña (token de 1 h), o login con Google y GitHub; en ambos casos el sistema emite el mismo JWT. Las contraseñas se guardan con BCrypt y los hashes SHA-256 heredados se migran solos en el siguiente login. Un administrador puede cerrar las sesiones de un usuario en todos sus dispositivos: el filtro JWT rechaza los tokens emitidos antes de sessions_revoked_at.',
      nodes: ['nginx', 'api', 'google', 'mysql'],
      edges: ['nginx-api', 'api-google', 'api-mysql'],
      packets: ['nginx-api', 'api-mysql']
    },
    {
      title: 'El chat vive aparte, y ahora con dueño',
      body: 'Las conexiones WebSocket son largas y escalan distinto que el REST, así que el chat es un servicio Spring Boot propio en :8081. REST y STOMP se autentican con el JWT del backend: el remitente sale del token y solo se puede suscribir a los destinos privados /user/queue/**. Antes cualquiera podía leer conversaciones ajenas o hacerse pasar por otro. Al borrar una cuenta, el backend llama a los endpoints /internal del chat con un JWT de servicio de 60 s, que Nginx no expone.',
      nodes: ['nginx', 'chat', 'api'],
      edges: ['nginx-chat', 'chat-api'],
      packets: ['nginx-chat', 'chat-api']
    },
    {
      title: 'Primero la base, sin broker',
      body: 'El chat guarda cada mensaje en MySQL antes de entregarlo por WebSocket, así el historial, los no leídos y las confirmaciones de lectura son consistentes. Con eso, los brokers sobraban: RabbitMQ declaraba colas por usuario que nadie consumía, y Kafka solo repetía una escritura que ya estaba hecha. Salieron los dos, y con Kafka también ZooKeeper.',
      nodes: ['chat', 'mysql'],
      edges: ['chat-mysql'],
      packets: ['chat-mysql']
    },
    {
      title: 'Notas y calendario en la cuenta del usuario',
      body: 'Una sola conexión con Google guarda los tokens y los permisos concedidos; si falta uno, la API responde 409 y pide reconectar. Las notas son archivos Markdown en el Drive del usuario, con carpetas reales de Drive, y siguen siendo offline-first: las ediciones sin conexión se guardan en caché y se sincronizan al volver. El calendario lee y escribe eventos, incluidos los recurrentes, en su calendario principal.',
      nodes: ['browser', 'nginx', 'api', 'google', 'mysql'],
      edges: ['browser-nginx', 'nginx-api', 'api-google', 'api-mysql'],
      packets: ['browser-nginx', 'nginx-api', 'api-google']
    }
  ]
};

const fraudDiagram = {
  viewBox: '0 0 820 470',
  groups: [
    { id: 'async', x: 435, y: 128, w: 380, h: 240, label: 'Evaluación asíncrona' }
  ],
  nodes: [
    { id: 'client', x: 20, y: 50, w: 150, h: 60, label: 'Cliente', sub: 'JWT' },
    { id: 'api', x: 235, y: 50, w: 150, h: 60, label: 'Spring Boot API', sub: 'POST /transactions' },
    { id: 'kafka', x: 450, y: 50, w: 150, h: 60, label: 'Kafka', sub: 'topic transactions' },
    { id: 'consumer', x: 450, y: 215, w: 150, h: 60, label: 'Consumer', sub: 'motor de reglas' },
    { id: 'redis', x: 660, y: 150, w: 140, h: 60, label: 'Redis', sub: 'velocidad · TTL' },
    { id: 'ml', x: 660, y: 290, w: 140, h: 60, label: 'ML Service', sub: 'FastAPI · SHAP' },
    { id: 'pg', x: 235, y: 215, w: 150, h: 60, label: 'PostgreSQL', sub: 'estado + explicación' },
    { id: 'metrics', x: 235, y: 390, w: 150, h: 60, label: 'Métricas', sub: 'precisión · p95' }
  ],
  edges: [
    { id: 'client-api', points: [[170, 80], [235, 80]], label: '202', labelAt: [202, 70] },
    { id: 'api-kafka', points: [[385, 80], [450, 80]], label: 'commit', labelAt: [417, 70] },
    { id: 'api-pg', points: [[310, 110], [310, 215]], label: 'PENDING', labelAt: [316, 165], anchor: 'start' },
    { id: 'kafka-consumer', points: [[525, 110], [525, 215]] },
    { id: 'consumer-redis', points: [[600, 235], [630, 235], [630, 180], [660, 180]] },
    { id: 'consumer-ml', points: [[600, 255], [630, 255], [630, 320], [660, 320]], label: '2 s', labelAt: [636, 290], anchor: 'start' },
    { id: 'consumer-pg', points: [[450, 245], [385, 245]], label: 'decisión', labelAt: [417, 235] },
    { id: 'pg-metrics', points: [[310, 275], [310, 390]], label: 'agrega', labelAt: [316, 335], anchor: 'start' }
  ],
  steps: [
    {
      title: 'Aceptar no es decidir',
      body: 'POST /transactions valida, persiste con status PENDING y responde 202 Accepted. La latencia que ve el cliente no depende del motor de reglas ni del modelo; el resultado se consulta luego en GET /transactions/{id}.',
      nodes: ['client', 'api', 'pg'],
      edges: ['client-api', 'api-pg'],
      packets: ['client-api', 'api-pg']
    },
    {
      title: 'El evento sale después del commit',
      body: 'TransactionCreatedEvent se publica con @TransactionalEventListener(AFTER_COMMIT): Kafka nunca recibe una transacción que luego se revirtió en la base.',
      nodes: ['api', 'kafka'],
      edges: ['api-kafka'],
      packets: ['api-kafka']
    },
    {
      title: 'Reglas configurables, consumer idempotente',
      body: 'HighAmountRule, VelocityRule (más de 5 transacciones en 300 s, contadas en Redis) y GeoMismatchRule leen sus umbrales de fraud.rules.*, sin tocar código. Si un evento llega dos veces, el consumer lo ignora porque la transacción ya no está PENDING.',
      nodes: ['kafka', 'consumer', 'redis'],
      edges: ['kafka-consumer', 'consumer-redis'],
      packets: ['kafka-consumer', 'consumer-redis']
    },
    {
      title: 'El modelo falla abierto',
      body: 'MlScoringRule pide un score a FastAPI (regresión logística + SHAP) con timeout de 2 s. Si el servicio no responde, se registra un WARN y la regla no aporta: el resto del motor sigue decidiendo. En fraude, detener el pipeline cuesta más que perder una señal.',
      nodes: ['consumer', 'ml'],
      edges: ['consumer-ml'],
      packets: ['consumer-ml']
    },
    {
      title: 'Ninguna decisión silenciosa',
      body: 'Cada transacción guarda las reglas activadas, el score, la versión del modelo, los factores SHAP principales y decidedAt. Con eso /metrics/summary calcula la latencia p95 de decisión, y la precisión y el recall solo sobre casos con fraude confirmado.',
      nodes: ['consumer', 'pg', 'metrics'],
      edges: ['consumer-pg', 'pg-metrics'],
      packets: ['consumer-pg', 'pg-metrics']
    }
  ]
};

const creditDiagram = {
  viewBox: '0 0 820 430',
  groups: [
    { id: 'core', x: 235, y: 30, w: 355, h: 370, label: 'Núcleo · sin Spring ni JPA' }
  ],
  nodes: [
    { id: 'rest', x: 20, y: 75, w: 170, h: 60, label: 'REST + JWT', sub: 'POST …/decisions' },
    { id: 'spa', x: 20, y: 195, w: 170, h: 60, label: 'React SPA', sub: 'solo presenta' },
    { id: 'usecase', x: 255, y: 75, w: 160, h: 60, label: 'Caso de uso', sub: 'evaluar · what-if' },
    { id: 'snapshot', x: 255, y: 195, w: 160, h: 60, label: 'Snapshot', sub: 'ModelFeatures' },
    { id: 'policy', x: 255, y: 315, w: 160, h: 60, label: 'DecisionPolicy', sub: 'reglas + umbrales' },
    { id: 'portModel', x: 445, y: 75, w: 130, h: 60, label: 'ScoringModel', sub: 'puerto de salida' },
    { id: 'registry', x: 445, y: 195, w: 130, h: 60, label: 'Registry', sub: 'versión activa' },
    { id: 'portRepo', x: 445, y: 315, w: 130, h: 60, label: 'DecisionRepo', sub: 'puerto de salida' },
    { id: 'ml', x: 640, y: 75, w: 165, h: 60, label: 'ML Service', sub: 'versión explícita' },
    { id: 'pg', x: 640, y: 315, w: 165, h: 60, label: 'PostgreSQL', sub: 'append-only' }
  ],
  edges: [
    { id: 'spa-rest', points: [[105, 195], [105, 135]], label: 'JWT en memoria', labelAt: [111, 168], anchor: 'start' },
    { id: 'usecase-registry', points: [[415, 120], [430, 120], [430, 225], [445, 225]] },
    { id: 'registry-portRepo', points: [[510, 255], [510, 315]] },
    { id: 'rest-usecase', points: [[190, 105], [255, 105]] },
    { id: 'usecase-snapshot', points: [[335, 135], [335, 195]] },
    { id: 'snapshot-policy', points: [[335, 255], [335, 315]] },
    { id: 'usecase-portModel', points: [[415, 105], [445, 105]] },
    { id: 'portModel-ml', points: [[575, 105], [640, 105]], label: 'HTTP', labelAt: [607, 95] },
    { id: 'policy-portRepo', points: [[415, 345], [445, 345]] },
    { id: 'portRepo-pg', points: [[575, 345], [640, 345]], label: '1 tx', labelAt: [607, 335] }
  ],
  steps: [
    {
      title: 'La regla de dependencia',
      body: 'Arquitectura hexagonal por feature (solicitudes, scoring, registry, what-if, auditoría): domain no conoce Spring ni JPA, application solo depende de puertos, e infrastructure implementa esos puertos. Hasta delimitar una transacción pasa por un puerto (TransactionRunner).',
      nodes: ['usecase', 'snapshot', 'policy', 'portModel', 'registry', 'portRepo'],
      edges: ['usecase-snapshot', 'snapshot-policy', 'usecase-portModel', 'usecase-registry', 'policy-portRepo'],
      packets: []
    },
    {
      title: 'Una SPA que no decide',
      body: 'El frontend en React y TypeScript muestra lo que decidió el backend y nunca recalcula scores ni umbrales. El JWT vive solo en memoria, no en localStorage, para reducir la exposición ante XSS: recargar la página obliga a iniciar sesión. Ocultar la sección de modelos a un ANALYST es solo usabilidad; quien autoriza es el backend con un 403.',
      nodes: ['spa', 'rest'],
      edges: ['spa-rest'],
      packets: ['spa-rest']
    },
    {
      title: 'Primero, una foto de los datos',
      body: 'Se toma un snapshot de la solicitud y se traduce a las variables del modelo. El debt_ratio incluye la cuota nueva, no solo la deuda existente. Ese payload exacto se guarda, así que cualquier decisión se puede reproducir reenviándolo a /score.',
      nodes: ['rest', 'usecase', 'snapshot'],
      edges: ['rest-usecase', 'usecase-snapshot'],
      packets: ['rest-usecase', 'usecase-snapshot']
    },
    {
      title: 'El backend decide qué modelo decide',
      body: 'La versión activa es la última fila de model_activations, y cada activación guarda quién, cuándo y por qué; un rollback es activar de nuevo una versión anterior. El ML no conoce la "versión activa": sirve la versión exacta que se le pide y se niega (409) si el SHA-256 del artefacto ya no coincide. Al activar, el backend exige que ese hash sea el mismo que se registró.',
      nodes: ['usecase', 'registry', 'portRepo', 'pg', 'ml'],
      edges: ['usecase-registry', 'registry-portRepo', 'portRepo-pg'],
      packets: ['usecase-registry', 'registry-portRepo']
    },
    {
      title: 'El modelo, fuera de la transacción',
      body: 'Las llamadas a /score y /explain van con esa versión explícita y ocurren fuera de cualquier transacción de base de datos, con timeouts de 2 s para conectar y 5 s para leer. Si el ML falla o responde con otra versión, se registra una decisión FAILED y la API responde 503. Aquí el sistema falla cerrado.',
      nodes: ['usecase', 'portModel', 'ml'],
      edges: ['usecase-portModel', 'portModel-ml'],
      packets: ['usecase-portModel', 'portModel-ml']
    },
    {
      title: 'Una política explícita y versionada',
      body: 'Primero las reglas duras (edad mínima 18, endeudamiento máximo del 50 %) y luego los umbrales de probabilidad de default: ≥ 0,60 rechaza, ≤ 0,30 aprueba y lo intermedio va a revisión manual. Si la política es inválida, la aplicación no arranca. Cada decisión guarda la política que se le aplicó.',
      nodes: ['snapshot', 'policy'],
      edges: ['snapshot-policy'],
      packets: ['snapshot-policy']
    },
    {
      title: 'Append-only en la base',
      body: 'La decisión se inserta y el estado de la solicitud se actualiza en una sola transacción. Triggers de PostgreSQL rechazan cualquier UPDATE o DELETE sobre las decisiones, las versiones de modelo, las activaciones y las simulaciones. Un CHECK impide guardar una decisión COMPLETED sin score, explicación y versión del modelo, y una FK la ata a una versión registrada.',
      nodes: ['policy', 'portRepo', 'pg'],
      edges: ['policy-portRepo', 'portRepo-pg'],
      packets: ['policy-portRepo', 'portRepo-pg']
    },
    {
      title: 'What-if sin trampas',
      body: 'Simular "¿y si el ingreso fuera mayor?" pasa por la misma derivación de variables y la misma política que una decisión real, reglas duras incluidas. El escenario base y el simulado se evalúan en la misma llamada a /what-if, con el mismo modelo. Nunca crea una decisión, pero queda registrada para detectar a quien pruebe variantes hasta que algo se apruebe.',
      nodes: ['rest', 'usecase', 'snapshot', 'policy', 'portModel', 'ml', 'portRepo', 'pg'],
      edges: ['rest-usecase', 'usecase-snapshot', 'snapshot-policy', 'usecase-portModel', 'portModel-ml', 'policy-portRepo', 'portRepo-pg'],
      packets: ['usecase-portModel', 'portModel-ml', 'portRepo-pg']
    }
  ]
};

const blogDiagram = {
  viewBox: '0 0 830 480',
  groups: [
    { id: 'build', x: 15, y: 40, w: 590, h: 120, label: 'Build · prebuild → vite → postbuild' },
    { id: 'serve', x: 615, y: 40, w: 200, h: 120, label: 'Serve' },
    { id: 'newsletter', x: 15, y: 300, w: 800, h: 150, label: 'Newsletter · Express + SQLite' }
  ],
  nodes: [
    { id: 'md', x: 30, y: 78, w: 160, h: 60, label: 'Posts .md', sub: 'Git como CMS' },
    { id: 'gen', x: 230, y: 78, w: 160, h: 60, label: 'prebuild', sub: 'sitemap · feed · llms.txt' },
    { id: 'prer', x: 430, y: 78, w: 160, h: 60, label: 'postbuild', sub: 'HTML prerenderizado' },
    { id: 'nginx', x: 640, y: 78, w: 160, h: 60, label: 'Nginx', sub: 'estático · gzip' },
    { id: 'reader', x: 680, y: 345, w: 125, h: 60, label: 'Lector', sub: 'formulario' },
    { id: 'api', x: 515, y: 345, w: 130, h: 60, label: '/subscribe', sub: 'rate limit · trampa' },
    { id: 'db', x: 350, y: 345, w: 130, h: 60, label: 'SQLite', sub: 'deliveries · sent' },
    { id: 'cron', x: 185, y: 345, w: 130, h: 60, label: 'Cron digest', sub: 'node-cron' },
    { id: 'resend', x: 25, y: 345, w: 125, h: 60, label: 'Resend', sub: 'idempotency key' }
  ],
  edges: [
    { id: 'md-gen', points: [[190, 108], [230, 108]] },
    { id: 'gen-prer', points: [[390, 108], [430, 108]] },
    { id: 'prer-nginx', points: [[590, 108], [640, 108]] },
    { id: 'nginx-reader', points: [[742, 138], [742, 345]], label: 'HTML real', labelAt: [736, 230], anchor: 'end' },
    { id: 'reader-api', points: [[680, 375], [645, 375]] },
    { id: 'api-db', points: [[515, 375], [480, 375]] },
    { id: 'cron-db', points: [[315, 375], [350, 375]] },
    { id: 'cron-resend', points: [[185, 375], [150, 375]] },
    { id: 'nginx-cron', points: [[660, 138], [660, 255], [250, 255], [250, 345]], label: 'feed.json', labelAt: [455, 245] }
  ],
  steps: [
    {
      title: 'Git como CMS',
      body: 'Cada post es un archivo Markdown versionado y organizado por año y mes. Publicar es hacer push: el contenido tiene historial, diffs y rollback como el código, y no hay base de datos ni panel que mantener.',
      nodes: ['md', 'gen'],
      edges: ['md-gen'],
      packets: ['md-gen']
    },
    {
      title: 'Un build que piensa en los crawlers',
      body: 'prebuild genera sitemap, feeds RSS/JSON y llms.txt. Un plugin de Vite separa cada post en dos módulos: el frontmatter para el catálogo y el cuerpo como chunk propio, así la portada no descarga ningún artículo. postbuild prerenderiza cada ruta a HTML real (título, meta, JSON-LD y cuerpo) para los bots que no ejecutan JavaScript: GPTBot, ClaudeBot y la primera pasada de Google.',
      nodes: ['md', 'gen', 'prer', 'nginx'],
      edges: ['md-gen', 'gen-prer', 'prer-nginx'],
      packets: ['md-gen', 'gen-prer', 'prer-nginx']
    },
    {
      title: 'Sin salto entre el HTML y React',
      body: 'Antes de montar, el cliente precarga el chunk de PostView y el markdown del artículo abierto, de modo que el primer render de React ya es el post completo y reemplaza el HTML prerenderizado sin pantalla de carga: el CLS bajó de 0,98 a 0. React monta con createRoot, sin desajustes de hidratación posibles.',
      nodes: ['nginx', 'reader'],
      edges: ['nginx-reader'],
      packets: ['nginx-reader']
    },
    {
      title: 'Lo que pidió Search Console',
      body: 'Nginx responde 301 para los slugs renombrados, los .html duplicados y las URLs heredadas de categoría, y marca noindex las búsquedas (?q=), que Google trataba como soft 404. Los posts y categorías que no existen muestran una página NotFound sin canonical, y el sitemap usa la fecha de actualización de cada artículo.',
      nodes: ['prer', 'nginx', 'reader'],
      edges: ['prer-nginx', 'nginx-reader'],
      packets: ['nginx-reader']
    },
    {
      title: 'Suscribirse sin filtrar datos',
      body: 'Doble opt-in con token aleatorio de 24 bytes. La respuesta es idéntica exista o no el correo, para no permitir enumerar suscriptores. Hay un campo trampa para bots, límite de 5 intentos por ventana y registro del consentimiento con la versión de la política vigente.',
      nodes: ['reader', 'api', 'db'],
      edges: ['reader-api', 'api-db'],
      packets: ['reader-api', 'api-db']
    },
    {
      title: 'Un envío que se puede retomar',
      body: 'El cron lee feed.json y arma un resumen con los posts que nunca salieron (sent_posts), dentro de una transacción. La tabla deliveries tiene como clave (issue, suscriptor): si el envío se corta por un reinicio o el límite diario, se retoma sin duplicar correos. Solo reciben el resumen quienes confirmaron antes de que se armara.',
      nodes: ['nginx', 'cron', 'db'],
      edges: ['nginx-cron', 'cron-db'],
      packets: ['nginx-cron', 'cron-db']
    },
    {
      title: 'Entregabilidad y presupuesto',
      body: 'Cada correo lleva la clave de idempotencia digest-{issue}-{suscriptor}. El cupo diario reserva espacio para confirmaciones. Un 4xx marca la entrega como fallida y sigue con el siguiente; un 5xx o un error de red corta la corrida y la retoma mañana. Baja en un clic según RFC 8058.',
      nodes: ['cron', 'resend', 'db'],
      edges: ['cron-resend', 'cron-db'],
      packets: ['cron-resend']
    }
  ]
};

const simulationDiagram = {
  viewBox: '0 0 820 420',
  groups: [
    { id: 'server', x: 15, y: 25, w: 520, h: 375, label: 'server.py · asyncio' },
    { id: 'client', x: 560, y: 175, w: 250, h: 225, label: 'Navegador' }
  ],
  nodes: [
    { id: 'state', x: 35, y: 60, w: 200, h: 60, label: 'Estado', sub: 'grillas NumPy 200×200' },
    {
      id: 'tick', x: 300, y: 45, w: 210, label: 'tick()', table: true, rowHeight: 19,
      fields: ['temperatura', 'perturbaciones', 'comida', 'difusión', 'feromonas', 'territorio', 'flocking', 'depredación', 'omnívoro', 'infección', 'movimiento', 'envejecimiento', 'reproducción', 'migración']
    },
    { id: 'render', x: 35, y: 190, w: 200, h: 60, label: 'build_render', sub: 'uint8 por celda · 40 KB' },
    { id: 'ws', x: 35, y: 310, w: 200, h: 60, label: 'WebSocket', sub: 'broadcast · 4 FPS' },
    { id: 'canvas', x: 585, y: 205, w: 205, h: 60, label: 'Canvas 2D', sub: 'LUT → ImageData' },
    { id: 'inspector', x: 585, y: 320, w: 205, h: 60, label: 'Inspector', sub: 'celda en vivo' }
  ],
  edges: [
    { id: 'state-tick', points: [[235, 80], [300, 80]], label: 'tick n', labelAt: [267, 70] },
    { id: 'tick-state', points: [[300, 105], [235, 105]], label: 'n + 1', labelAt: [267, 122] },
    { id: 'state-render', points: [[135, 120], [135, 190]] },
    { id: 'render-ws', points: [[135, 250], [135, 310]] },
    { id: 'ws-canvas', points: [[235, 330], [550, 330], [550, 235], [585, 235]], label: 'binario', labelAt: [400, 320] },
    { id: 'ws-inspector', points: [[235, 355], [585, 355]], label: 'JSON', labelAt: [400, 372] }
  ],
  steps: [
    {
      title: 'El mundo es un conjunto de matrices',
      body: 'No hay un objeto por organismo: especie, energía, edad, infección y género son grillas uint8 de 200×200, y el genoma es un float32[200, 200, 5]. Mover, matar o cobrar energía pasa siempre por rules/common.py, que actualiza todas las capas a la vez. Así se corrigió un bug de fondo: la edad no viajaba con el organismo y casi nadie moría de viejo.',
      nodes: ['state'],
      edges: [],
      packets: []
    },
    {
      title: 'tick() como pipeline',
      body: 'Cada regla es un módulo con apply(state) → state, y tick() encadena las 14 en un orden fijo: la temperatura va primero porque condiciona a las demás, y la migración cierra el tick trayendo un grupo fundador si una especie lleva 120 ticks extinta. Agregar un comportamiento nuevo es un archivo y una línea. Con ese esquema el proyecto llegó a la v4.0 en 10 versiones.',
      nodes: ['state', 'tick'],
      edges: ['state-tick', 'tick-state'],
      packets: ['state-tick', 'tick-state']
    },
    {
      title: 'Medir antes de optimizar',
      body: 'Un benchmark por regla mostró que la reproducción se llevaba 113 de los 139 ms del tick: buscaba pareja recorriendo el grid completo. Ahora solo busca entre los individuos fértiles y tarda 2,4 ms. Con el cardumen sobre un array con padding en lugar de 256 np.roll, el tick completo bajó a unos 21 ms, 6,7 veces más rápido.',
      nodes: ['tick'],
      edges: [],
      packets: []
    },
    {
      title: 'Un servidor autoritativo que no se bloquea',
      body: 'Hay un solo mundo y todos los visitantes ven el mismo. El tick y build_render corren en asyncio.to_thread (NumPy libera el GIL), así conectar o inspeccionar nunca espera a la simulación. El bucle se programa por deadline a 4 FPS y broadcast le salta frames al cliente cuyo buffer supera 1 MB en lugar de frenar a los demás.',
      nodes: ['state', 'render', 'ws', 'canvas'],
      edges: ['state-render', 'render-ws', 'ws-canvas'],
      packets: ['state-render', 'render-ws', 'ws-canvas']
    },
    {
      title: 'Un drawImage en lugar de 40.000',
      body: 'A zoom bajo, el frame pasa por una tabla de colores Uint32 a un ImageData de 200×200 y se dibuja con un único drawImage escalado; antes podían ser hasta 40.000 por frame, y en pantallas pequeñas los organismos ni se veían. A zoom alto solo se dibujan sprites pre-rasterizados en las celdas visibles.',
      nodes: ['canvas'],
      edges: [],
      packets: []
    },
    {
      title: 'Inspección bajo demanda, en vivo',
      body: 'Al hacer clic en una celda, el cliente pide su detalle por el mismo WebSocket y lo vuelve a pedir en cada tick mientras esté seleccionada. El servidor responde con especie, género, energía, edad, infección, los 5 genes y el entorno (bioma, terreno, temperatura y nutriente). Ese detalle no viaja en cada frame: solo se paga cuando alguien lo pide.',
      nodes: ['inspector', 'ws', 'state'],
      edges: ['ws-inspector'],
      packets: ['ws-inspector']
    }
  ]
};

export const projects = [
  {
    id: 'jflorez-suite',
    index: '01',
    title: 'JFlorez Suite',
    kind: 'Plataforma y microservicios',
    status: 'En producción',
    role: 'Diseño, backend, infraestructura',
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'WebSocket + STOMP', 'MySQL', 'React 19', 'TipTap', 'Google Drive y Calendar API', 'Nginx', 'Docker'],
    liveUrl: 'https://jesusflorez.cloud',
    cover: { src: SuiteImage, alt: 'Inicio de JFlorez Suite con eventos, tareas, finanzas y chats' },
    lede: 'Suite de productividad gratuita (tareas, notas, calendario, finanzas personales y chat) y, a la vez, la plataforma que aloja el resto de mis proyectos: 18 contenedores en un solo VPS, detrás de un único Nginx.',
    context:
      'Un producto gratuito no tiene presupuesto para infraestructura administrada. Necesitaba autenticación seria, un chat en tiempo real, notas que funcionen sin conexión y un calendario sincronizado con Google, y además una casa común para los demás proyectos, todo operado por una sola persona.',
    constraints: [
      'Costo de infraestructura fijo: un VPS, sin servicios administrados.',
      'Una persona opera, despliega y atiende incidentes.',
      'El chat no puede degradar al resto de la suite.',
      'Las notas deben seguir editándose sin conexión.',
      'Notas y eventos viven en la cuenta de Google del usuario, no en mi servidor.'
    ],
    stats: [
      { value: '18', label: 'contenedores en un VPS' },
      { value: '6', label: 'dominios bajo un Nginx' },
      { value: '233 KB', label: 'de JS inicial (antes 570 KB)' }
    ],
    diagram: suiteDiagram,
    decisions: [
      {
        title: 'El chat como servicio propio',
        why: 'WebSocket mantiene conexiones abiertas y tiene un patrón de carga distinto al del REST.',
        tradeoff: 'Un despliegue más, una llamada HTTP para obtener perfiles y endpoints internos para borrar cuentas.'
      },
      {
        title: 'Guardar en MySQL antes de entregar',
        why: 'Un mensaje que llegó al destinatario ya está en el historial, con sus no leídos y confirmaciones de lectura.',
        tradeoff: 'El envío espera la escritura en la base.'
      },
      {
        title: 'Quitar RabbitMQ y Kafka',
        why: 'Las colas de RabbitMQ nadie las consumía y crecían sin límite; Kafka duplicaba una escritura ya confirmada. Con ellos salió también ZooKeeper.',
        tradeoff: 'Sin broker no hay dónde enganchar consumidores nuevos, y un usuario desconectado ve sus mensajes al cargar las conversaciones, no por push.'
      },
      {
        title: 'Los datos del usuario, en su propia cuenta de Google',
        why: 'Las notas quedan en su Drive y los eventos en su calendario; la suite no custodia ese contenido.',
        tradeoff: 'Todo depende de los permisos de Google: si falta uno, la API responde 409 y hay que reconectar.'
      },
      {
        title: 'Todo el ecosistema en un VPS',
        why: 'Costo fijo y despliegue reproducible con Docker Compose.',
        tradeoff: 'Punto único de falla aceptado conscientemente; lo mitigan los healthchecks y status.jesusflorez.cloud.'
      }
    ],
    retrospective: [
      'El JWT dura 15 días y vive en localStorage. Ya se puede revocar, pero lo acortaría y movería el refresh a una cookie httpOnly.',
      'MySQL publica el puerto 3306 en el host. Lo dejaría solo en la red interna de Docker.',
      'El esquema lo crea ddl-auto=update y el único test del backend es FinanceCalcTest. Pasaría a migraciones con Flyway, como en Credit Scoring, y cubriría la autenticación y el chat.'
    ],
    figures: []
  },
  {
    id: 'fraud-detection',
    index: '02',
    title: 'Fraud Detection',
    kind: 'Backend + IA · tiempo real',
    status: 'Repositorio',
    role: 'Diseño y desarrollo completo',
    stack: ['Java 21', 'Spring Boot 4.1', 'Kafka', 'Redis', 'PostgreSQL', 'Flyway', 'FastAPI', 'scikit-learn', 'SHAP', 'Testcontainers'],
    repoUrl: 'https://github.com/dvchinx/fraud-detection',
    lede: 'Evaluación de transacciones en tiempo real que combina reglas configurables y un modelo explicable, y deja justificada cada decisión, también las aprobadas.',
    context:
      'Un sistema de fraude tiene dos clientes con necesidades opuestas: quien paga quiere una respuesta inmediata, y quien investiga quiere saber por qué se bloqueó algo. Además, el modelo de ML es la pieza menos confiable de la cadena.',
    constraints: [
      'La ingesta no puede esperar al motor de reglas ni al modelo.',
      'Una caída del modelo no puede detener la evaluación.',
      'Toda decisión debe poder auditarse después.'
    ],
    stats: [
      { value: '0,84', label: 'ROC-AUC del modelo' },
      { value: '0,71', label: 'recall de fraude' },
      { value: '23', label: 'tests con Postgres, Redis y Kafka reales' }
    ],
    diagram: fraudDiagram,
    decisions: [
      {
        title: '202 Accepted y evaluación asíncrona',
        why: 'Desacopla la latencia de ingesta del costo de evaluar.',
        tradeoff: 'El cliente tiene que consultar el resultado después.'
      },
      {
        title: 'Fail-open en la regla de ML',
        why: 'En fraude, perder una señal es más barato que detener el pipeline.',
        tradeoff: 'Durante una caída del modelo, el sistema decide solo con reglas.'
      },
      {
        title: 'Regresión logística, no un modelo más potente',
        why: 'Los valores SHAP son exactos y cada decisión se puede auditar.',
        tradeoff: 'Menor capacidad predictiva que un ensamble de árboles.'
      }
    ],
    retrospective: [
      'La precisión de fraude es 0,07 con 0,75 % de fraude en el dataset: el modelo solo ve monto y hora. Le agregaría las señales por usuario (velocidad, país) que el motor de reglas ya calcula.',
      'El evento se publica después del commit pero sin outbox: si Kafka no está disponible en ese instante, la transacción queda PENDING para siempre. Usaría un outbox transaccional.',
      'El error handler reintenta 3 veces y no tiene dead-letter topic, así que un evento que falla se descarta en silencio.',
      'VelocityRule usa INCR y luego EXPIRE en dos comandos: es una ventana fija, no deslizante, y si el proceso cae entre ambos la clave queda sin TTL. Usaría un script Lua o un ZSET.'
    ],
    figures: []
  },
  {
    id: 'credit-scoring',
    index: '03',
    title: 'Credit Scoring',
    kind: 'Backend + IA · decisiones auditables',
    status: 'Repositorio',
    role: 'Diseño y desarrollo completo',
    stack: ['Java 21', 'Spring Boot 4', 'Arquitectura hexagonal', 'PostgreSQL', 'Flyway', 'FastAPI', 'scikit-learn', 'SHAP', 'React 19', 'TypeScript', 'TanStack Query', 'Testcontainers', 'GitHub Actions'],
    repoUrl: 'https://github.com/dvchinx/credit-scoring',
    lede: 'Motor de scoring crediticio donde la explicación es parte del contrato: cada decisión queda explicada con SHAP, atada a una versión de modelo con hash verificado y protegida contra cambios desde la propia base de datos. Incluye simulador what-if y dashboard de auditoría.',
    context:
      'La regulación financiera exige poder explicar una decisión automatizada ("right to explanation"). Por eso no basta con que el modelo acierte: hay que saber con qué datos, con qué versión del modelo y con qué política se decidió, y garantizar que ese registro no cambie.',
    constraints: [
      'Toda decisión debe poder reproducirse.',
      'Un registro de decisión nunca se edita ni se borra.',
      'Sin modelo disponible no se decide.',
      'Un artefacto de modelo alterado nunca llega a decidir.'
    ],
    stats: [
      { value: '183', label: 'tests (131 Java, 32 Python, 20 frontend)' },
      { value: '7 / 7', label: 'fases del roadmap completas' },
      { value: '4', label: 'tablas append-only protegidas por trigger' }
    ],
    diagram: creditDiagram,
    decisions: [
      {
        title: 'Falla cerrado, al contrario que en fraude',
        why: 'Aprobar un crédito sin modelo es un riesgo que no se puede deshacer.',
        tradeoff: 'Si el ML cae, la API responde 503 en lugar de decidir.'
      },
      {
        title: 'Append-only impuesto por la base',
        why: 'Un trigger protege la auditoría aunque el código tenga un bug.',
        tradeoff: 'Corregir una decisión es crear otra nueva; la tabla solo crece.'
      },
      {
        title: 'El backend gobierna la versión activa',
        why: 'Una sola fuente de verdad, auditada con motivo, y un rollback trivial.',
        tradeoff: 'Registrar y activar un modelo es un paso manual de un ADMIN.'
      },
      {
        title: 'Test de contrato con el ML real',
        why: 'Durante tres fases todos los tests pasaban y ninguna evaluación funcionaba: el HttpClient del JDK negociaba HTTP/2 y uvicorn descartaba el cuerpo del POST. Los mocks no abren conexiones.',
        tradeoff: 'Cada build construye la imagen del ML y entrena un modelo, así que verify tarda más.'
      },
      {
        title: 'Hexagonal por feature',
        why: 'El dominio y la política se prueban sin levantar Spring.',
        tradeoff: 'Más mappers y más archivos por cada caso de uso.'
      }
    ],
    retrospective: [
      'Uniría /score y /explain en una sola llamada: así el caso de "versiones distintas del modelo" no podría ocurrir, en lugar de tener que detectarlo.',
      'El modelo se entrena con class_weight="balanced" y sus probabilidades no están calibradas. Las calibraría antes de fijar umbrales en producción.',
      'employmentYears se pide en la solicitud pero el modelo no la usa: o entra al modelo o sale del formulario.',
      'Sin el dataset real, la demo entrena con datos sintéticos: sirve para recorrer el sistema, pero sus métricas no dicen nada del mundo real.'
    ],
    figures: []
  },
  {
    id: 'blog',
    index: '04',
    title: 'Blog + Newsletter',
    kind: 'Sitio estático y servicio de correo',
    status: 'En producción',
    role: 'Arquitectura, backend y despliegue',
    stack: ['React 19', 'Vite', 'Prerender', 'Node', 'Express 5', 'SQLite', 'node-cron', 'Resend', 'Docker', 'Nginx'],
    liveUrl: 'https://blog.jesusflorez.cloud',
    repoUrl: 'https://github.com/dvchinx/blog',
    cover: { src: BlogImage, alt: 'Portada del blog técnico' },
    lede: 'Blog técnico sin base de datos ni CMS, con más de cien artículos prerenderizados para buscadores y asistentes de IA, y un newsletter propio que resiste reinicios sin duplicar correos.',
    context:
      'Escribo y publico el blog yo solo, cada semana. El contenido cambia poco, pero tiene que ser legible para crawlers que no ejecutan JavaScript, y el newsletter tiene que respetar el consentimiento y el límite diario de envíos del proveedor.',
    constraints: [
      'Una persona escribe, publica y opera todo.',
      'HTML real para crawlers, sin un servidor de render.',
      'Un límite diario de correos y cero envíos duplicados.'
    ],
    stats: [
      { value: '115', label: 'artículos en Markdown' },
      { value: '0', label: 'CLS al abrir un artículo (antes 0,98)' },
      { value: '301', label: 'para slugs renombrados y URLs duplicadas' }
    ],
    diagram: blogDiagram,
    decisions: [
      {
        title: 'Prerender en build en lugar de SSR',
        why: 'HTML completo para crawlers sin mantener un runtime de servidor.',
        tradeoff: 'Cada publicación exige un rebuild.'
      },
      {
        title: 'Metadatos en build, cuerpos bajo demanda',
        why: 'La portada y los relacionados solo necesitan el frontmatter, y gray-matter sale del bundle del cliente.',
        tradeoff: 'La búsqueda de texto completo tiene que descargar todos los cuerpos cuando hay un ?q=.'
      },
      {
        title: 'SQLite para el newsletter',
        why: 'El volumen es bajo; un archivo con transacciones y respaldo trivial.',
        tradeoff: 'SQLite admite un escritor a la vez y no tiene alta disponibilidad.'
      },
      {
        title: 'Envío reanudable en lugar de reintentos ciegos',
        why: 'La tabla deliveries registra quién ya recibió cada resumen.',
        tradeoff: 'Un estado más que modelar y limpiar.'
      }
    ],
    retrospective: [
      'El token de preferencias de cada suscriptor nunca rota: quien tenga un correo reenviado conserva acceso indefinido. Lo rotaría al cambiar preferencias.',
      'ReactMarkdown usa rehype-raw sin rehype-sanitize; hoy la única barrera es que solo yo escribo los posts. Agregaría una lista blanca antes de aceptar contenido de terceros.'
    ],
    figures: []
  },
  {
    id: 'simulation',
    index: '05',
    title: 'Simulación de Vida',
    kind: 'Simulación en tiempo real',
    status: 'En producción',
    role: 'Diseño y desarrollo completo',
    stack: ['Python', 'NumPy', 'asyncio', 'websockets', 'Canvas 2D', 'pytest', 'GitHub Actions', 'Docker', 'Nginx'],
    liveUrl: 'https://simulation.jesusflorez.cloud',
    repoUrl: 'https://github.com/dvchinx/simulation',
    cover: { src: SimulationImage, alt: 'Simulación en vivo con paneles de población y ambiente' },
    lede: 'Ecosistema de cuatro especies con genoma heredable, biomas, estaciones, infecciones y migración, simulado en el servidor y transmitido en vivo a todos los visitantes.',
    context:
      'Quería un mundo compartido, en el que todos vieran la misma evolución en vivo, y que fuera liviano tanto para el VPS como para un teléfono. Eso obliga a pensar la simulación como datos y la red como un presupuesto.',
    constraints: [
      'Un solo mundo para todos los visitantes.',
      'Que corra en un VPS modesto junto a otros 17 contenedores.',
      'Fluido en móviles.',
      'La demo pública nunca puede quedarse vacía.'
    ],
    stats: [
      { value: '6,7×', label: 'más rápido por tick (139 → 21 ms)' },
      { value: '14', label: 'reglas por tick' },
      { value: '24', label: 'tests en CI, con regresiones de bugs' }
    ],
    diagram: simulationDiagram,
    decisions: [
      {
        title: 'Simular en el servidor',
        why: 'Todos ven el mismo mundo y el cliente solo dibuja.',
        tradeoff: 'El ancho de banda crece con cada visitante conectado.'
      },
      {
        title: 'Grillas en lugar de objetos',
        why: 'Permite operar sobre todo el mundo con NumPy.',
        tradeoff: 'Las reglas son menos intuitivas de leer, y cada capa de un organismo debe moverse junto a las demás.'
      },
      {
        title: 'El tick fuera del event loop',
        why: 'NumPy libera el GIL: el hilo calcula mientras el loop atiende conexiones e inspecciones.',
        tradeoff: 'Funciona porque cada regla devuelve capas nuevas en lugar de mutar el estado, y ese copiado cuesta en cada tick.'
      },
      {
        title: 'Migración como efecto rescate',
        why: 'Una especie extinta no vuelve por sí sola, y la demo pública debe mostrar siempre la cadena trófica completa.',
        tradeoff: 'El ecosistema ya no es cerrado: la extinción deja de ser definitiva.'
      },
      {
        title: 'Canvas 2D sin librerías',
        why: 'El control fino del viewport importa más que las abstracciones.',
        tradeoff: 'Todo el manejo de zoom, pan, gestos y redibujo es código propio.'
      }
    ],
    retrospective: [
      'Cada tick envía la grilla completa: a 4 FPS son unos 160 KB/s por visitante antes de comprimir. Para subir los FPS enviaría solo las celdas que cambiaron.',
      'El servidor arranca un mundo nuevo en cada reinicio y no guarda el estado. Lo persistiría cada cierto número de ticks para que un despliegue no borre la evolución acumulada.'
    ],
    figures: []
  }
];
