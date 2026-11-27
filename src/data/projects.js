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
 *
 * Todo texto visible va como `{ es, en }` (ver src/i18n). La versión en inglés
 * traduce la española: al cambiar un hecho, cambia los dos idiomas.
 */

const suiteDiagram = {
  viewBox: '0 0 820 520',
  groups: [
    { id: 'vps', x: 165, y: 25, w: 645, h: 480, label: { es: 'VPS · jesusflorez.cloud · 18 contenedores', en: 'VPS · jesusflorez.cloud · 18 containers' } }
  ],
  nodes: [
    { id: 'browser', x: 15, y: 215, w: 125, h: 60, label: { es: 'Navegador', en: 'Browser' }, sub: 'React 19 SPA' },
    { id: 'google', x: 15, y: 60, w: 140, h: 60, label: 'Google · GitHub', sub: 'Drive · Calendar' },
    { id: 'nginx', x: 190, y: 215, w: 125, h: 60, label: 'Nginx', sub: { es: 'TLS · HSTS · rutas', en: 'TLS · HSTS · paths' } },
    { id: 'apps', x: 190, y: 405, w: 140, h: 60, label: { es: 'Otros servicios', en: 'Other services' }, sub: 'blog · sim · status' },
    { id: 'api', x: 380, y: 95, w: 150, h: 60, label: 'Backend API', sub: 'Spring Boot :8080' },
    { id: 'chat', x: 380, y: 335, w: 150, h: 60, label: 'Chat', sub: 'Spring Boot + WS :8081' },
    { id: 'mysql', x: 630, y: 95, w: 160, h: 60, label: 'MySQL 8.0', sub: { es: 'schema personal', en: 'personal schema' } }
  ],
  edges: [
    { id: 'browser-nginx', points: [[140, 245], [190, 245]], label: 'HTTPS', labelAt: [165, 235] },
    { id: 'nginx-api', points: [[315, 235], [345, 235], [345, 125], [380, 125]], label: '/api · /oauth2', labelAt: [351, 182], anchor: 'start' },
    { id: 'nginx-chat', points: [[315, 255], [345, 255], [345, 365], [380, 365]], label: '/ws · /api/chat', labelAt: [351, 312], anchor: 'start' },
    { id: 'nginx-apps', points: [[252, 275], [252, 405]], label: { es: 'subdominios', en: 'subdomains' }, labelAt: [258, 345], anchor: 'start' },
    { id: 'api-mysql', points: [[530, 125], [630, 125]], label: 'JPA', labelAt: [580, 115] },
    { id: 'api-google', points: [[405, 95], [405, 75], [155, 75]], label: 'OAuth2 · APIs', labelAt: [280, 65] },
    { id: 'chat-api', points: [[455, 335], [455, 155]], label: { es: 'perfil · /internal', en: 'profile · /internal' }, labelAt: [461, 250], anchor: 'start' },
    { id: 'chat-mysql', points: [[530, 365], [710, 365], [710, 155]], label: { es: 'guarda primero', en: 'saves first' }, labelAt: [716, 260], anchor: 'start' }
  ],
  steps: [
    {
      title: { es: 'Una sola puerta para todo el ecosistema', en: 'One door for the whole ecosystem' },
      body: {
        es: 'El mismo VPS corre 18 contenedores: la suite, el blog y su newsletter, la simulación, una página de estado y este portafolio. Nginx termina TLS (Let’s Encrypt con renovación por Certbot, HSTS) y enruta por ruta y por subdominio. Todos los servicios salvo Certbot declaran su healthcheck.',
        en: 'The same VPS runs 18 containers: the suite, the blog and its newsletter, the simulation, a status page and this portfolio. Nginx terminates TLS (Let’s Encrypt renewed by Certbot, HSTS) and routes by path and by subdomain. Every service except Certbot declares a healthcheck.'
      },
      nodes: ['browser', 'nginx', 'apps'],
      edges: ['browser-nginx', 'nginx-apps'],
      packets: ['browser-nginx', 'nginx-apps']
    },
    {
      title: { es: 'Identidad: local, federada y revocable', en: 'Identity: local, federated and revocable' },
      body: {
        es: 'Registro local con verificación por correo (token de 24 h) y recuperación de contraseña (token de 1 h), o login con Google y GitHub; en ambos casos el sistema emite el mismo JWT. Las contraseñas se guardan con BCrypt y los hashes SHA-256 heredados se migran solos en el siguiente login. Un administrador puede cerrar las sesiones de un usuario en todos sus dispositivos: el filtro JWT rechaza los tokens emitidos antes de sessions_revoked_at.',
        en: 'Local sign-up with email verification (24 h token) and password recovery (1 h token), or login with Google and GitHub; either way the system issues the same JWT. Passwords are stored with BCrypt, and legacy SHA-256 hashes migrate themselves on the next login. An admin can end a user’s sessions on every device: the JWT filter rejects tokens issued before sessions_revoked_at.'
      },
      nodes: ['nginx', 'api', 'google', 'mysql'],
      edges: ['nginx-api', 'api-google', 'api-mysql'],
      packets: ['nginx-api', 'api-mysql']
    },
    {
      title: { es: 'El chat vive aparte, y ahora con dueño', en: 'The chat lives apart, and now has an owner' },
      body: {
        es: 'Las conexiones WebSocket son largas y escalan distinto que el REST, así que el chat es un servicio Spring Boot propio en :8081. REST y STOMP se autentican con el JWT del backend: el remitente sale del token y solo se puede suscribir a los destinos privados /user/queue/**. Antes cualquiera podía leer conversaciones ajenas o hacerse pasar por otro. Al borrar una cuenta, el backend llama a los endpoints /internal del chat con un JWT de servicio de 60 s, que Nginx no expone.',
        en: 'WebSocket connections are long-lived and scale differently from REST, so the chat is its own Spring Boot service on :8081. REST and STOMP authenticate with the backend’s JWT: the sender comes from the token, and clients can only subscribe to the private /user/queue/** destinations. Before, anyone could read other people’s conversations or impersonate someone else. When an account is deleted, the backend calls the chat’s /internal endpoints with a 60 s service JWT, and Nginx doesn’t expose them.'
      },
      nodes: ['nginx', 'chat', 'api'],
      edges: ['nginx-chat', 'chat-api'],
      packets: ['nginx-chat', 'chat-api']
    },
    {
      title: { es: 'Primero la base, sin broker', en: 'Database first, no broker' },
      body: {
        es: 'El chat guarda cada mensaje en MySQL antes de entregarlo por WebSocket, así el historial, los no leídos y las confirmaciones de lectura son consistentes. Con eso, los brokers sobraban: RabbitMQ declaraba colas por usuario que nadie consumía, y Kafka solo repetía una escritura que ya estaba hecha. Salieron los dos, y con Kafka también ZooKeeper.',
        en: 'The chat stores every message in MySQL before delivering it over WebSocket, so history, unread counts and read receipts stay consistent. That made the brokers redundant: RabbitMQ declared per-user queues nobody consumed, and Kafka only repeated a write that had already happened. Both went away, and ZooKeeper left with Kafka.'
      },
      nodes: ['chat', 'mysql'],
      edges: ['chat-mysql'],
      packets: ['chat-mysql']
    },
    {
      title: { es: 'Notas y calendario en la cuenta del usuario', en: 'Notes and calendar in the user’s own account' },
      body: {
        es: 'Una sola conexión con Google guarda los tokens y los permisos concedidos; si falta uno, la API responde 409 y pide reconectar. Las notas son archivos Markdown en el Drive del usuario, con carpetas reales de Drive, y siguen siendo offline-first: las ediciones sin conexión se guardan en caché y se sincronizan al volver. El calendario lee y escribe eventos, incluidos los recurrentes, en su calendario principal.',
        en: 'A single Google connection stores the tokens and the granted scopes; if one is missing, the API answers 409 and asks the user to reconnect. Notes are Markdown files in the user’s Drive, in real Drive folders, and remain offline-first: edits made offline are cached and synced when the connection returns. The calendar reads and writes events, recurring ones included, in their primary calendar.'
      },
      nodes: ['browser', 'nginx', 'api', 'google', 'mysql'],
      edges: ['browser-nginx', 'nginx-api', 'api-google', 'api-mysql'],
      packets: ['browser-nginx', 'nginx-api', 'api-google']
    }
  ]
};

const fraudDiagram = {
  viewBox: '0 0 820 470',
  groups: [
    { id: 'async', x: 435, y: 128, w: 380, h: 240, label: { es: 'Evaluación asíncrona', en: 'Asynchronous evaluation' } }
  ],
  nodes: [
    { id: 'client', x: 20, y: 50, w: 150, h: 60, label: { es: 'Cliente', en: 'Client' }, sub: 'JWT' },
    { id: 'api', x: 235, y: 50, w: 150, h: 60, label: 'Spring Boot API', sub: 'POST /transactions' },
    { id: 'kafka', x: 450, y: 50, w: 150, h: 60, label: 'Kafka', sub: 'topic transactions' },
    { id: 'consumer', x: 450, y: 215, w: 150, h: 60, label: 'Consumer', sub: { es: 'motor de reglas', en: 'rules engine' } },
    { id: 'redis', x: 660, y: 150, w: 140, h: 60, label: 'Redis', sub: { es: 'velocidad · TTL', en: 'velocity · TTL' } },
    { id: 'ml', x: 660, y: 290, w: 140, h: 60, label: 'ML Service', sub: 'FastAPI · SHAP' },
    { id: 'pg', x: 235, y: 215, w: 150, h: 60, label: 'PostgreSQL', sub: { es: 'estado + explicación', en: 'status + explanation' } },
    { id: 'metrics', x: 235, y: 390, w: 150, h: 60, label: { es: 'Métricas', en: 'Metrics' }, sub: { es: 'precisión · p95', en: 'precision · p95' } }
  ],
  edges: [
    { id: 'client-api', points: [[170, 80], [235, 80]], label: '202', labelAt: [202, 70] },
    { id: 'api-kafka', points: [[385, 80], [450, 80]], label: 'commit', labelAt: [417, 70] },
    { id: 'api-pg', points: [[310, 110], [310, 215]], label: 'PENDING', labelAt: [316, 165], anchor: 'start' },
    { id: 'kafka-consumer', points: [[525, 110], [525, 215]] },
    { id: 'consumer-redis', points: [[600, 235], [630, 235], [630, 180], [660, 180]] },
    { id: 'consumer-ml', points: [[600, 255], [630, 255], [630, 320], [660, 320]], label: '2 s', labelAt: [636, 290], anchor: 'start' },
    { id: 'consumer-pg', points: [[450, 245], [385, 245]], label: { es: 'decisión', en: 'decision' }, labelAt: [417, 235] },
    { id: 'pg-metrics', points: [[310, 275], [310, 390]], label: { es: 'agrega', en: 'aggregates' }, labelAt: [316, 335], anchor: 'start' }
  ],
  steps: [
    {
      title: { es: 'Aceptar no es decidir', en: 'Accepting is not deciding' },
      body: {
        es: 'POST /transactions valida, persiste con status PENDING y responde 202 Accepted. La latencia que ve el cliente no depende del motor de reglas ni del modelo; el resultado se consulta luego en GET /transactions/{id}.',
        en: 'POST /transactions validates, persists with status PENDING and answers 202 Accepted. The latency the client sees depends neither on the rules engine nor on the model; the result is fetched later from GET /transactions/{id}.'
      },
      nodes: ['client', 'api', 'pg'],
      edges: ['client-api', 'api-pg'],
      packets: ['client-api', 'api-pg']
    },
    {
      title: { es: 'El evento sale después del commit', en: 'The event goes out after the commit' },
      body: {
        es: 'TransactionCreatedEvent se publica con @TransactionalEventListener(AFTER_COMMIT): Kafka nunca recibe una transacción que luego se revirtió en la base.',
        en: 'TransactionCreatedEvent is published with @TransactionalEventListener(AFTER_COMMIT): Kafka never receives a transaction that was later rolled back in the database.'
      },
      nodes: ['api', 'kafka'],
      edges: ['api-kafka'],
      packets: ['api-kafka']
    },
    {
      title: { es: 'Reglas configurables, consumer idempotente', en: 'Configurable rules, idempotent consumer' },
      body: {
        es: 'HighAmountRule, VelocityRule (más de 5 transacciones en 300 s, contadas en Redis) y GeoMismatchRule leen sus umbrales de fraud.rules.*, sin tocar código. Si un evento llega dos veces, el consumer lo ignora porque la transacción ya no está PENDING.',
        en: 'HighAmountRule, VelocityRule (more than 5 transactions in 300 s, counted in Redis) and GeoMismatchRule read their thresholds from fraud.rules.*, with no code changes. If an event arrives twice, the consumer ignores it because the transaction is no longer PENDING.'
      },
      nodes: ['kafka', 'consumer', 'redis'],
      edges: ['kafka-consumer', 'consumer-redis'],
      packets: ['kafka-consumer', 'consumer-redis']
    },
    {
      title: { es: 'El modelo falla abierto', en: 'The model fails open' },
      body: {
        es: 'MlScoringRule pide un score a FastAPI (regresión logística + SHAP) con timeout de 2 s. Si el servicio no responde, se registra un WARN y la regla no aporta: el resto del motor sigue decidiendo. En fraude, detener el pipeline cuesta más que perder una señal.',
        en: 'MlScoringRule asks FastAPI for a score (logistic regression + SHAP) with a 2 s timeout. If the service doesn’t answer, a WARN is logged and the rule contributes nothing: the rest of the engine keeps deciding. In fraud, stopping the pipeline costs more than losing one signal.'
      },
      nodes: ['consumer', 'ml'],
      edges: ['consumer-ml'],
      packets: ['consumer-ml']
    },
    {
      title: { es: 'Ninguna decisión silenciosa', en: 'No silent decisions' },
      body: {
        es: 'Cada transacción guarda las reglas activadas, el score, la versión del modelo, los factores SHAP principales y decidedAt. Con eso /metrics/summary calcula la latencia p95 de decisión, y la precisión y el recall solo sobre casos con fraude confirmado.',
        en: 'Every transaction stores the rules that fired, the score, the model version, the top SHAP factors and decidedAt. From that, /metrics/summary computes the p95 decision latency, and precision and recall only over cases with confirmed fraud.'
      },
      nodes: ['consumer', 'pg', 'metrics'],
      edges: ['consumer-pg', 'pg-metrics'],
      packets: ['consumer-pg', 'pg-metrics']
    }
  ]
};

const OUTPUT_PORT = { es: 'puerto de salida', en: 'output port' };

const creditDiagram = {
  viewBox: '0 0 820 430',
  groups: [
    { id: 'core', x: 235, y: 30, w: 355, h: 370, label: { es: 'Núcleo · sin Spring ni JPA', en: 'Core · no Spring, no JPA' } }
  ],
  nodes: [
    { id: 'rest', x: 20, y: 75, w: 170, h: 60, label: 'REST + JWT', sub: 'POST …/decisions' },
    { id: 'spa', x: 20, y: 195, w: 170, h: 60, label: 'React SPA', sub: { es: 'solo presenta', en: 'display only' } },
    { id: 'usecase', x: 255, y: 75, w: 160, h: 60, label: { es: 'Caso de uso', en: 'Use case' }, sub: { es: 'evaluar · what-if', en: 'evaluate · what-if' } },
    { id: 'snapshot', x: 255, y: 195, w: 160, h: 60, label: 'Snapshot', sub: 'ModelFeatures' },
    { id: 'policy', x: 255, y: 315, w: 160, h: 60, label: 'DecisionPolicy', sub: { es: 'reglas + umbrales', en: 'rules + thresholds' } },
    { id: 'portModel', x: 445, y: 75, w: 130, h: 60, label: 'ScoringModel', sub: OUTPUT_PORT },
    { id: 'registry', x: 445, y: 195, w: 130, h: 60, label: 'Registry', sub: { es: 'versión activa', en: 'active version' } },
    { id: 'portRepo', x: 445, y: 315, w: 130, h: 60, label: 'DecisionRepo', sub: OUTPUT_PORT },
    { id: 'ml', x: 640, y: 75, w: 165, h: 60, label: 'ML Service', sub: { es: 'versión explícita', en: 'explicit version' } },
    { id: 'pg', x: 640, y: 315, w: 165, h: 60, label: 'PostgreSQL', sub: 'append-only' }
  ],
  edges: [
    { id: 'spa-rest', points: [[105, 195], [105, 135]], label: { es: 'JWT en memoria', en: 'JWT in memory' }, labelAt: [111, 168], anchor: 'start' },
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
      title: { es: 'La regla de dependencia', en: 'The dependency rule' },
      body: {
        es: 'Arquitectura hexagonal por feature (solicitudes, scoring, registry, what-if, auditoría): domain no conoce Spring ni JPA, application solo depende de puertos, e infrastructure implementa esos puertos. Hasta delimitar una transacción pasa por un puerto (TransactionRunner).',
        en: 'Hexagonal architecture per feature (applications, scoring, registry, what-if, audit): domain knows nothing about Spring or JPA, application depends only on ports, and infrastructure implements those ports. Even drawing a transaction boundary goes through a port (TransactionRunner).'
      },
      nodes: ['usecase', 'snapshot', 'policy', 'portModel', 'registry', 'portRepo'],
      edges: ['usecase-snapshot', 'snapshot-policy', 'usecase-portModel', 'usecase-registry', 'policy-portRepo'],
      packets: []
    },
    {
      title: { es: 'Una SPA que no decide', en: 'A SPA that doesn’t decide' },
      body: {
        es: 'El frontend en React y TypeScript muestra lo que decidió el backend y nunca recalcula scores ni umbrales. El JWT vive solo en memoria, no en localStorage, para reducir la exposición ante XSS: recargar la página obliga a iniciar sesión. Ocultar la sección de modelos a un ANALYST es solo usabilidad; quien autoriza es el backend con un 403.',
        en: 'The React and TypeScript frontend shows what the backend decided and never recomputes scores or thresholds. The JWT lives only in memory, not in localStorage, to limit exposure to XSS: reloading the page means logging in again. Hiding the models section from an ANALYST is just usability; the backend is what authorizes, with a 403.'
      },
      nodes: ['spa', 'rest'],
      edges: ['spa-rest'],
      packets: ['spa-rest']
    },
    {
      title: { es: 'Primero, una foto de los datos', en: 'First, a snapshot of the data' },
      body: {
        es: 'Se toma un snapshot de la solicitud y se traduce a las variables del modelo. El debt_ratio incluye la cuota nueva, no solo la deuda existente. Ese payload exacto se guarda, así que cualquier decisión se puede reproducir reenviándolo a /score.',
        en: 'The application is snapshotted and translated into the model’s features. The debt_ratio includes the new installment, not just existing debt. That exact payload is stored, so any decision can be reproduced by sending it to /score again.'
      },
      nodes: ['rest', 'usecase', 'snapshot'],
      edges: ['rest-usecase', 'usecase-snapshot'],
      packets: ['rest-usecase', 'usecase-snapshot']
    },
    {
      title: { es: 'El backend decide qué modelo decide', en: 'The backend decides which model decides' },
      body: {
        es: 'La versión activa es la última fila de model_activations, y cada activación guarda quién, cuándo y por qué; un rollback es activar de nuevo una versión anterior. El ML no conoce la "versión activa": sirve la versión exacta que se le pide y se niega (409) si el SHA-256 del artefacto ya no coincide. Al activar, el backend exige que ese hash sea el mismo que se registró.',
        en: 'The active version is the last row of model_activations, and every activation records who, when and why; a rollback is activating an earlier version again. The ML service has no notion of an "active version": it serves the exact version it is asked for and refuses (409) if the artifact’s SHA-256 no longer matches. On activation, the backend requires that hash to be the one that was registered.'
      },
      nodes: ['usecase', 'registry', 'portRepo', 'pg', 'ml'],
      edges: ['usecase-registry', 'registry-portRepo', 'portRepo-pg'],
      packets: ['usecase-registry', 'registry-portRepo']
    },
    {
      title: { es: 'El modelo, fuera de la transacción', en: 'The model stays outside the transaction' },
      body: {
        es: 'Las llamadas a /score y /explain van con esa versión explícita y ocurren fuera de cualquier transacción de base de datos, con timeouts de 2 s para conectar y 5 s para leer. Si el ML falla o responde con otra versión, se registra una decisión FAILED y la API responde 503. Aquí el sistema falla cerrado.',
        en: 'Calls to /score and /explain carry that explicit version and happen outside any database transaction, with timeouts of 2 s to connect and 5 s to read. If the ML service fails or answers with another version, a FAILED decision is recorded and the API returns 503. Here the system fails closed.'
      },
      nodes: ['usecase', 'portModel', 'ml'],
      edges: ['usecase-portModel', 'portModel-ml'],
      packets: ['usecase-portModel', 'portModel-ml']
    },
    {
      title: { es: 'Una política explícita y versionada', en: 'An explicit, versioned policy' },
      body: {
        es: 'Primero las reglas duras (edad mínima 18, endeudamiento máximo del 50 %) y luego los umbrales de probabilidad de default: ≥ 0,60 rechaza, ≤ 0,30 aprueba y lo intermedio va a revisión manual. Si la política es inválida, la aplicación no arranca. Cada decisión guarda la política que se le aplicó.',
        en: 'Hard rules come first (minimum age 18, maximum debt ratio of 50%), then the default-probability thresholds: ≥ 0.60 rejects, ≤ 0.30 approves and anything in between goes to manual review. If the policy is invalid, the application doesn’t start. Every decision stores the policy that was applied to it.'
      },
      nodes: ['snapshot', 'policy'],
      edges: ['snapshot-policy'],
      packets: ['snapshot-policy']
    },
    {
      title: { es: 'Append-only en la base', en: 'Append-only in the database' },
      body: {
        es: 'La decisión se inserta y el estado de la solicitud se actualiza en una sola transacción. Triggers de PostgreSQL rechazan cualquier UPDATE o DELETE sobre las decisiones, las versiones de modelo, las activaciones y las simulaciones. Un CHECK impide guardar una decisión COMPLETED sin score, explicación y versión del modelo, y una FK la ata a una versión registrada.',
        en: 'The decision is inserted and the application’s status updated in a single transaction. PostgreSQL triggers reject any UPDATE or DELETE on decisions, model versions, activations and simulations. A CHECK prevents storing a COMPLETED decision without a score, an explanation and a model version, and a FK ties it to a registered version.'
      },
      nodes: ['policy', 'portRepo', 'pg'],
      edges: ['policy-portRepo', 'portRepo-pg'],
      packets: ['policy-portRepo', 'portRepo-pg']
    },
    {
      title: { es: 'What-if sin trampas', en: 'What-if without loopholes' },
      body: {
        es: 'Simular "¿y si el ingreso fuera mayor?" pasa por la misma derivación de variables y la misma política que una decisión real, reglas duras incluidas. El escenario base y el simulado se evalúan en la misma llamada a /what-if, con el mismo modelo. Nunca crea una decisión, pero queda registrada para detectar a quien pruebe variantes hasta que algo se apruebe.',
        en: 'Simulating "what if the income were higher?" goes through the same feature derivation and the same policy as a real decision, hard rules included. The baseline and the simulated scenario are evaluated in the same /what-if call, with the same model. It never creates a decision, but it is recorded to catch anyone trying variants until something gets approved.'
      },
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
    { id: 'md', x: 30, y: 78, w: 160, h: 60, label: 'Posts .md', sub: { es: 'Git como CMS', en: 'Git as CMS' } },
    { id: 'gen', x: 230, y: 78, w: 160, h: 60, label: 'prebuild', sub: 'sitemap · feed · llms.txt' },
    { id: 'prer', x: 430, y: 78, w: 160, h: 60, label: 'postbuild', sub: { es: 'HTML prerenderizado', en: 'prerendered HTML' } },
    { id: 'nginx', x: 640, y: 78, w: 160, h: 60, label: 'Nginx', sub: { es: 'estático · gzip', en: 'static · gzip' } },
    { id: 'reader', x: 680, y: 345, w: 125, h: 60, label: { es: 'Lector', en: 'Reader' }, sub: { es: 'formulario', en: 'form' } },
    { id: 'api', x: 515, y: 345, w: 130, h: 60, label: '/subscribe', sub: { es: 'rate limit · trampa', en: 'rate limit · trap' } },
    { id: 'db', x: 350, y: 345, w: 130, h: 60, label: 'SQLite', sub: 'deliveries · sent' },
    { id: 'cron', x: 185, y: 345, w: 130, h: 60, label: 'Cron digest', sub: 'node-cron' },
    { id: 'resend', x: 25, y: 345, w: 125, h: 60, label: 'Resend', sub: 'idempotency key' }
  ],
  edges: [
    { id: 'md-gen', points: [[190, 108], [230, 108]] },
    { id: 'gen-prer', points: [[390, 108], [430, 108]] },
    { id: 'prer-nginx', points: [[590, 108], [640, 108]] },
    { id: 'nginx-reader', points: [[742, 138], [742, 345]], label: { es: 'HTML real', en: 'real HTML' }, labelAt: [736, 230], anchor: 'end' },
    { id: 'reader-api', points: [[680, 375], [645, 375]] },
    { id: 'api-db', points: [[515, 375], [480, 375]] },
    { id: 'cron-db', points: [[315, 375], [350, 375]] },
    { id: 'cron-resend', points: [[185, 375], [150, 375]] },
    { id: 'nginx-cron', points: [[660, 138], [660, 255], [250, 255], [250, 345]], label: 'feed.json', labelAt: [455, 245] }
  ],
  steps: [
    {
      title: { es: 'Git como CMS', en: 'Git as a CMS' },
      body: {
        es: 'Cada post es un archivo Markdown versionado y organizado por año y mes. Publicar es hacer push: el contenido tiene historial, diffs y rollback como el código, y no hay base de datos ni panel que mantener.',
        en: 'Every post is a versioned Markdown file, organized by year and month. Publishing is a push: content gets history, diffs and rollback just like code, and there is no database or admin panel to maintain.'
      },
      nodes: ['md', 'gen'],
      edges: ['md-gen'],
      packets: ['md-gen']
    },
    {
      title: { es: 'Un build que piensa en los crawlers', en: 'A build that thinks about crawlers' },
      body: {
        es: 'prebuild genera sitemap, feeds RSS/JSON y llms.txt. Un plugin de Vite separa cada post en dos módulos: el frontmatter para el catálogo y el cuerpo como chunk propio, así la portada no descarga ningún artículo. postbuild prerenderiza cada ruta a HTML real (título, meta, JSON-LD y cuerpo) para los bots que no ejecutan JavaScript: GPTBot, ClaudeBot y la primera pasada de Google.',
        en: 'prebuild generates the sitemap, RSS/JSON feeds and llms.txt. A Vite plugin splits every post into two modules: the frontmatter for the catalog and the body as its own chunk, so the home page downloads no articles. postbuild prerenders every route to real HTML (title, meta, JSON-LD and body) for bots that don’t run JavaScript: GPTBot, ClaudeBot and Google’s first pass.'
      },
      nodes: ['md', 'gen', 'prer', 'nginx'],
      edges: ['md-gen', 'gen-prer', 'prer-nginx'],
      packets: ['md-gen', 'gen-prer', 'prer-nginx']
    },
    {
      title: { es: 'Sin salto entre el HTML y React', en: 'No jump between the HTML and React' },
      body: {
        es: 'Antes de montar, el cliente precarga el chunk de PostView y el markdown del artículo abierto, de modo que el primer render de React ya es el post completo y reemplaza el HTML prerenderizado sin pantalla de carga: el CLS bajó de 0,98 a 0. React monta con createRoot, sin desajustes de hidratación posibles.',
        en: 'Before mounting, the client preloads the PostView chunk and the open article’s markdown, so React’s first render is already the full post and replaces the prerendered HTML with no loading screen: CLS dropped from 0.98 to 0. React mounts with createRoot, so hydration mismatches can’t happen.'
      },
      nodes: ['nginx', 'reader'],
      edges: ['nginx-reader'],
      packets: ['nginx-reader']
    },
    {
      title: { es: 'Lo que pidió Search Console', en: 'What Search Console asked for' },
      body: {
        es: 'Nginx responde 301 para los slugs renombrados, los .html duplicados y las URLs heredadas de categoría, y marca noindex las búsquedas (?q=), que Google trataba como soft 404. Los posts y categorías que no existen muestran una página NotFound sin canonical, y el sitemap usa la fecha de actualización de cada artículo.',
        en: 'Nginx answers 301 for renamed slugs, duplicate .html URLs and legacy category URLs, and marks searches (?q=) noindex, since Google treated them as soft 404s. Posts and categories that don’t exist show a NotFound page without a canonical, and the sitemap uses each article’s last-updated date.'
      },
      nodes: ['prer', 'nginx', 'reader'],
      edges: ['prer-nginx', 'nginx-reader'],
      packets: ['nginx-reader']
    },
    {
      title: { es: 'Suscribirse sin filtrar datos', en: 'Subscribing without leaking data' },
      body: {
        es: 'Doble opt-in con token aleatorio de 24 bytes. La respuesta es idéntica exista o no el correo, para no permitir enumerar suscriptores. Hay un campo trampa para bots, límite de 5 intentos por ventana y registro del consentimiento con la versión de la política vigente.',
        en: 'Double opt-in with a random 24-byte token. The response is identical whether or not the email exists, so subscribers can’t be enumerated. There is a honeypot field for bots, a limit of 5 attempts per window and a consent record with the version of the policy in force.'
      },
      nodes: ['reader', 'api', 'db'],
      edges: ['reader-api', 'api-db'],
      packets: ['reader-api', 'api-db']
    },
    {
      title: { es: 'Un envío que se puede retomar', en: 'A send that can be resumed' },
      body: {
        es: 'El cron lee feed.json y arma un resumen con los posts que nunca salieron (sent_posts), dentro de una transacción. La tabla deliveries tiene como clave (issue, suscriptor): si el envío se corta por un reinicio o el límite diario, se retoma sin duplicar correos. Solo reciben el resumen quienes confirmaron antes de que se armara.',
        en: 'The cron job reads feed.json and builds a digest of the posts that never went out (sent_posts), inside a transaction. The deliveries table is keyed by (issue, subscriber): if sending stops because of a restart or the daily limit, it resumes without duplicate emails. Only people who confirmed before the digest was built receive it.'
      },
      nodes: ['nginx', 'cron', 'db'],
      edges: ['nginx-cron', 'cron-db'],
      packets: ['nginx-cron', 'cron-db']
    },
    {
      title: { es: 'Entregabilidad y presupuesto', en: 'Deliverability and budget' },
      body: {
        es: 'Cada correo lleva la clave de idempotencia digest-{issue}-{suscriptor}. El cupo diario reserva espacio para confirmaciones. Un 4xx marca la entrega como fallida y sigue con el siguiente; un 5xx o un error de red corta la corrida y la retoma mañana. Baja en un clic según RFC 8058.',
        en: 'Every email carries the idempotency key digest-{issue}-{subscriber}. The daily quota keeps room for confirmations. A 4xx marks the delivery as failed and moves on to the next one; a 5xx or a network error stops the run and resumes it tomorrow. One-click unsubscribe per RFC 8058.'
      },
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
    { id: 'client', x: 560, y: 175, w: 250, h: 225, label: { es: 'Navegador', en: 'Browser' } }
  ],
  nodes: [
    { id: 'state', x: 35, y: 60, w: 200, h: 60, label: { es: 'Estado', en: 'State' }, sub: { es: 'grillas NumPy 200×200', en: '200×200 NumPy grids' } },
    {
      id: 'tick', x: 300, y: 45, w: 210, label: 'tick()', table: true, rowHeight: 19,
      fields: {
        es: ['temperatura', 'perturbaciones', 'comida', 'difusión', 'feromonas', 'territorio', 'flocking', 'depredación', 'omnívoro', 'infección', 'movimiento', 'envejecimiento', 'reproducción', 'migración'],
        en: ['temperature', 'disturbances', 'food', 'diffusion', 'pheromones', 'territory', 'flocking', 'predation', 'omnivore', 'infection', 'movement', 'aging', 'reproduction', 'migration']
      }
    },
    { id: 'render', x: 35, y: 190, w: 200, h: 60, label: 'build_render', sub: { es: 'uint8 por celda · 40 KB', en: 'uint8 per cell · 40 KB' } },
    { id: 'ws', x: 35, y: 310, w: 200, h: 60, label: 'WebSocket', sub: 'broadcast · 4 FPS' },
    { id: 'canvas', x: 585, y: 205, w: 205, h: 60, label: 'Canvas 2D', sub: 'LUT → ImageData' },
    { id: 'inspector', x: 585, y: 320, w: 205, h: 60, label: 'Inspector', sub: { es: 'celda en vivo', en: 'live cell' } }
  ],
  edges: [
    { id: 'state-tick', points: [[235, 80], [300, 80]], label: 'tick n', labelAt: [267, 70] },
    { id: 'tick-state', points: [[300, 105], [235, 105]], label: 'n + 1', labelAt: [267, 122] },
    { id: 'state-render', points: [[135, 120], [135, 190]] },
    { id: 'render-ws', points: [[135, 250], [135, 310]] },
    { id: 'ws-canvas', points: [[235, 330], [550, 330], [550, 235], [585, 235]], label: { es: 'binario', en: 'binary' }, labelAt: [400, 320] },
    { id: 'ws-inspector', points: [[235, 355], [585, 355]], label: 'JSON', labelAt: [400, 372] }
  ],
  steps: [
    {
      title: { es: 'El mundo es un conjunto de matrices', en: 'The world is a set of matrices' },
      body: {
        es: 'No hay un objeto por organismo: especie, energía, edad, infección y género son grillas uint8 de 200×200, y el genoma es un float32[200, 200, 5]. Mover, matar o cobrar energía pasa siempre por rules/common.py, que actualiza todas las capas a la vez. Así se corrigió un bug de fondo: la edad no viajaba con el organismo y casi nadie moría de viejo.',
        en: 'There is no object per organism: species, energy, age, infection and sex are 200×200 uint8 grids, and the genome is a float32[200, 200, 5]. Moving, killing or charging energy always goes through rules/common.py, which updates every layer at once. That fixed a deep bug: age didn’t travel with the organism, so almost nothing died of old age.'
      },
      nodes: ['state'],
      edges: [],
      packets: []
    },
    {
      title: { es: 'tick() como pipeline', en: 'tick() as a pipeline' },
      body: {
        es: 'Cada regla es un módulo con apply(state) → state, y tick() encadena las 14 en un orden fijo: la temperatura va primero porque condiciona a las demás, y la migración cierra el tick trayendo un grupo fundador si una especie lleva 120 ticks extinta. Agregar un comportamiento nuevo es un archivo y una línea. Con ese esquema el proyecto llegó a la v4.0 en 10 versiones.',
        en: 'Each rule is a module with apply(state) → state, and tick() chains all 14 in a fixed order: temperature goes first because it conditions the rest, and migration closes the tick by bringing in a founder group when a species has been extinct for 120 ticks. Adding a new behavior is one file and one line. With that scheme the project reached v4.0 in 10 releases.'
      },
      nodes: ['state', 'tick'],
      edges: ['state-tick', 'tick-state'],
      packets: ['state-tick', 'tick-state']
    },
    {
      title: { es: 'Medir antes de optimizar', en: 'Measure before optimizing' },
      body: {
        es: 'Un benchmark por regla mostró que la reproducción se llevaba 113 de los 139 ms del tick: buscaba pareja recorriendo el grid completo. Ahora solo busca entre los individuos fértiles y tarda 2,4 ms. Con el cardumen sobre un array con padding en lugar de 256 np.roll, el tick completo bajó a unos 21 ms, 6,7 veces más rápido.',
        en: 'A per-rule benchmark showed reproduction took 113 of the tick’s 139 ms: it looked for a mate by scanning the whole grid. Now it only searches among fertile individuals and takes 2.4 ms. With schooling on a padded array instead of 256 np.roll calls, the full tick dropped to about 21 ms, 6.7 times faster.'
      },
      nodes: ['tick'],
      edges: [],
      packets: []
    },
    {
      title: { es: 'Un servidor autoritativo que no se bloquea', en: 'An authoritative server that never blocks' },
      body: {
        es: 'Hay un solo mundo y todos los visitantes ven el mismo. El tick y build_render corren en asyncio.to_thread (NumPy libera el GIL), así conectar o inspeccionar nunca espera a la simulación. El bucle se programa por deadline a 4 FPS y broadcast le salta frames al cliente cuyo buffer supera 1 MB en lugar de frenar a los demás.',
        en: 'There is a single world and every visitor sees the same one. The tick and build_render run in asyncio.to_thread (NumPy releases the GIL), so connecting or inspecting never waits for the simulation. The loop is scheduled by deadline at 4 FPS, and broadcast skips frames for a client whose buffer exceeds 1 MB instead of slowing everyone else down.'
      },
      nodes: ['state', 'render', 'ws', 'canvas'],
      edges: ['state-render', 'render-ws', 'ws-canvas'],
      packets: ['state-render', 'render-ws', 'ws-canvas']
    },
    {
      title: { es: 'Un drawImage en lugar de 40.000', en: 'One drawImage instead of 40,000' },
      body: {
        es: 'A zoom bajo, el frame pasa por una tabla de colores Uint32 a un ImageData de 200×200 y se dibuja con un único drawImage escalado; antes podían ser hasta 40.000 por frame, y en pantallas pequeñas los organismos ni se veían. A zoom alto solo se dibujan sprites pre-rasterizados en las celdas visibles.',
        en: 'At low zoom, the frame goes through a Uint32 color table into a 200×200 ImageData and is drawn with a single scaled drawImage; before, it could take up to 40,000 per frame, and on small screens the organisms weren’t even visible. At high zoom, only pre-rasterized sprites are drawn, in the visible cells.'
      },
      nodes: ['canvas'],
      edges: [],
      packets: []
    },
    {
      title: { es: 'Inspección bajo demanda, en vivo', en: 'Live inspection on demand' },
      body: {
        es: 'Al hacer clic en una celda, el cliente pide su detalle por el mismo WebSocket y lo vuelve a pedir en cada tick mientras esté seleccionada. El servidor responde con especie, género, energía, edad, infección, los 5 genes y el entorno (bioma, terreno, temperatura y nutriente). Ese detalle no viaja en cada frame: solo se paga cuando alguien lo pide.',
        en: 'Clicking a cell makes the client request its details over the same WebSocket, and request them again every tick while it stays selected. The server answers with species, sex, energy, age, infection, the 5 genes and the environment (biome, terrain, temperature and nutrient). Those details don’t travel in every frame: they are only paid for when someone asks.'
      },
      nodes: ['inspector', 'ws', 'state'],
      edges: ['ws-inspector'],
      packets: ['ws-inspector']
    }
  ]
};

const IN_PRODUCTION = { es: 'En producción', en: 'In production' };
const REPOSITORY = { es: 'Repositorio', en: 'Repository' };
const FULL_DESIGN = { es: 'Diseño y desarrollo completo', en: 'End-to-end design and development' };

export const projects = [
  {
    id: 'jflorez-suite',
    index: '01',
    title: 'JFlorez Suite',
    kind: { es: 'Plataforma y microservicios', en: 'Platform and microservices' },
    status: IN_PRODUCTION,
    role: { es: 'Diseño, backend, infraestructura', en: 'Design, backend, infrastructure' },
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'WebSocket + STOMP', 'MySQL', 'React 19', 'TipTap', { es: 'Google Drive y Calendar API', en: 'Google Drive and Calendar APIs' }, 'Nginx', 'Docker'],
    liveUrl: 'https://jesusflorez.cloud',
    cover: {
      src: SuiteImage,
      alt: { es: 'Inicio de JFlorez Suite con eventos, tareas, finanzas y chats', en: 'JFlorez Suite home with events, tasks, finances and chats' }
    },
    lede: {
      es: 'Suite de productividad gratuita (tareas, notas, calendario, finanzas personales y chat) y, a la vez, la plataforma que aloja el resto de mis proyectos: 18 contenedores en un solo VPS, detrás de un único Nginx.',
      en: 'A free productivity suite (tasks, notes, calendar, personal finances and chat) that is also the platform hosting the rest of my projects: 18 containers on a single VPS, behind one Nginx.'
    },
    context: {
      es: 'Un producto gratuito no tiene presupuesto para infraestructura administrada. Necesitaba autenticación seria, un chat en tiempo real, notas que funcionen sin conexión y un calendario sincronizado con Google, y además una casa común para los demás proyectos, todo operado por una sola persona.',
      en: 'A free product has no budget for managed infrastructure. It needed serious authentication, real-time chat, notes that work offline and a calendar synced with Google, plus a shared home for the other projects, all run by one person.'
    },
    constraints: [
      { es: 'Costo de infraestructura fijo: un VPS, sin servicios administrados.', en: 'Fixed infrastructure cost: one VPS, no managed services.' },
      { es: 'Una persona opera, despliega y atiende incidentes.', en: 'One person runs it, deploys it and handles incidents.' },
      { es: 'El chat no puede degradar al resto de la suite.', en: 'The chat must not degrade the rest of the suite.' },
      { es: 'Las notas deben seguir editándose sin conexión.', en: 'Notes must stay editable offline.' },
      { es: 'Notas y eventos viven en la cuenta de Google del usuario, no en mi servidor.', en: 'Notes and events live in the user’s Google account, not on my server.' }
    ],
    stats: [
      { value: '18', label: { es: 'contenedores en un VPS', en: 'containers on one VPS' } },
      { value: '6', label: { es: 'dominios bajo un Nginx', en: 'domains behind one Nginx' } },
      { value: '233 KB', label: { es: 'de JS inicial (antes 570 KB)', en: 'of initial JS (was 570 KB)' } }
    ],
    diagram: suiteDiagram,
    decisions: [
      {
        title: { es: 'El chat como servicio propio', en: 'The chat as its own service' },
        why: {
          es: 'WebSocket mantiene conexiones abiertas y tiene un patrón de carga distinto al del REST.',
          en: 'WebSocket keeps connections open and has a different load pattern from REST.'
        },
        tradeoff: {
          es: 'Un despliegue más, una llamada HTTP para obtener perfiles y endpoints internos para borrar cuentas.',
          en: 'One more deployment, an HTTP call to fetch profiles and internal endpoints to delete accounts.'
        }
      },
      {
        title: { es: 'Guardar en MySQL antes de entregar', en: 'Save to MySQL before delivering' },
        why: {
          es: 'Un mensaje que llegó al destinatario ya está en el historial, con sus no leídos y confirmaciones de lectura.',
          en: 'A message that reached its recipient is already in the history, with its unread count and read receipts.'
        },
        tradeoff: { es: 'El envío espera la escritura en la base.', en: 'Sending waits for the database write.' }
      },
      {
        title: { es: 'Quitar RabbitMQ y Kafka', en: 'Remove RabbitMQ and Kafka' },
        why: {
          es: 'Las colas de RabbitMQ nadie las consumía y crecían sin límite; Kafka duplicaba una escritura ya confirmada. Con ellos salió también ZooKeeper.',
          en: 'Nobody consumed the RabbitMQ queues and they grew without limit; Kafka duplicated a write that was already committed. ZooKeeper went away with them.'
        },
        tradeoff: {
          es: 'Sin broker no hay dónde enganchar consumidores nuevos, y un usuario desconectado ve sus mensajes al cargar las conversaciones, no por push.',
          en: 'Without a broker there is nowhere to hook new consumers, and an offline user sees their messages when the conversations load, not through a push.'
        }
      },
      {
        title: { es: 'Los datos del usuario, en su propia cuenta de Google', en: 'User data in their own Google account' },
        why: {
          es: 'Las notas quedan en su Drive y los eventos en su calendario; la suite no custodia ese contenido.',
          en: 'Notes stay in their Drive and events in their calendar; the suite doesn’t hold that content.'
        },
        tradeoff: {
          es: 'Todo depende de los permisos de Google: si falta uno, la API responde 409 y hay que reconectar.',
          en: 'Everything depends on Google permissions: if one is missing, the API answers 409 and the user has to reconnect.'
        }
      },
      {
        title: { es: 'Todo el ecosistema en un VPS', en: 'The whole ecosystem on one VPS' },
        why: { es: 'Costo fijo y despliegue reproducible con Docker Compose.', en: 'Fixed cost and reproducible deployment with Docker Compose.' },
        tradeoff: {
          es: 'Punto único de falla aceptado conscientemente; lo mitigan los healthchecks y status.jesusflorez.cloud.',
          en: 'A single point of failure, accepted on purpose; healthchecks and status.jesusflorez.cloud mitigate it.'
        }
      }
    ],
    retrospective: [
      {
        es: 'El JWT dura 15 días y vive en localStorage. Ya se puede revocar, pero lo acortaría y movería el refresh a una cookie httpOnly.',
        en: 'The JWT lasts 15 days and lives in localStorage. It can be revoked now, but I would shorten it and move the refresh to an httpOnly cookie.'
      },
      {
        es: 'MySQL publica el puerto 3306 en el host. Lo dejaría solo en la red interna de Docker.',
        en: 'MySQL publishes port 3306 on the host. I would keep it on Docker’s internal network only.'
      },
      {
        es: 'El esquema lo crea ddl-auto=update y el único test del backend es FinanceCalcTest. Pasaría a migraciones con Flyway, como en Credit Scoring, y cubriría la autenticación y el chat.',
        en: 'The schema is created by ddl-auto=update and the backend’s only test is FinanceCalcTest. I would move to Flyway migrations, as in Credit Scoring, and cover authentication and the chat.'
      }
    ],
    figures: []
  },
  {
    id: 'fraud-detection',
    index: '02',
    title: 'Fraud Detection',
    kind: { es: 'Backend + IA · tiempo real', en: 'Backend + AI · real time' },
    status: REPOSITORY,
    role: FULL_DESIGN,
    stack: ['Java 21', 'Spring Boot 4.1', 'Kafka', 'Redis', 'PostgreSQL', 'Flyway', 'FastAPI', 'scikit-learn', 'SHAP', 'Testcontainers'],
    repoUrl: 'https://github.com/dvchinx/fraud-detection',
    lede: {
      es: 'Evaluación de transacciones en tiempo real que combina reglas configurables y un modelo explicable, y deja justificada cada decisión, también las aprobadas.',
      en: 'Real-time transaction evaluation that combines configurable rules with an explainable model, and records the reasons for every decision, approvals included.'
    },
    context: {
      es: 'Un sistema de fraude tiene dos clientes con necesidades opuestas: quien paga quiere una respuesta inmediata, y quien investiga quiere saber por qué se bloqueó algo. Además, el modelo de ML es la pieza menos confiable de la cadena.',
      en: 'A fraud system has two clients with opposite needs: whoever pays wants an immediate answer, and whoever investigates wants to know why something was blocked. On top of that, the ML model is the least reliable piece in the chain.'
    },
    constraints: [
      { es: 'La ingesta no puede esperar al motor de reglas ni al modelo.', en: 'Ingestion can’t wait for the rules engine or the model.' },
      { es: 'Una caída del modelo no puede detener la evaluación.', en: 'A model outage can’t stop evaluation.' },
      { es: 'Toda decisión debe poder auditarse después.', en: 'Every decision must be auditable afterwards.' }
    ],
    stats: [
      { value: { es: '0,84', en: '0.84' }, label: { es: 'ROC-AUC del modelo', en: 'model ROC-AUC' } },
      { value: { es: '0,71', en: '0.71' }, label: { es: 'recall de fraude', en: 'fraud recall' } },
      { value: '23', label: { es: 'tests con Postgres, Redis y Kafka reales', en: 'tests against real Postgres, Redis and Kafka' } }
    ],
    diagram: fraudDiagram,
    decisions: [
      {
        title: { es: '202 Accepted y evaluación asíncrona', en: '202 Accepted and asynchronous evaluation' },
        why: { es: 'Desacopla la latencia de ingesta del costo de evaluar.', en: 'Decouples ingestion latency from the cost of evaluating.' },
        tradeoff: { es: 'El cliente tiene que consultar el resultado después.', en: 'The client has to fetch the result later.' }
      },
      {
        title: { es: 'Fail-open en la regla de ML', en: 'Fail-open on the ML rule' },
        why: { es: 'En fraude, perder una señal es más barato que detener el pipeline.', en: 'In fraud, losing a signal is cheaper than stopping the pipeline.' },
        tradeoff: { es: 'Durante una caída del modelo, el sistema decide solo con reglas.', en: 'While the model is down, the system decides with rules alone.' }
      },
      {
        title: { es: 'Regresión logística, no un modelo más potente', en: 'Logistic regression, not a more powerful model' },
        why: { es: 'Los valores SHAP son exactos y cada decisión se puede auditar.', en: 'SHAP values are exact and every decision can be audited.' },
        tradeoff: { es: 'Menor capacidad predictiva que un ensamble de árboles.', en: 'Less predictive power than a tree ensemble.' }
      }
    ],
    retrospective: [
      {
        es: 'La precisión de fraude es 0,07 con 0,75 % de fraude en el dataset: el modelo solo ve monto y hora. Le agregaría las señales por usuario (velocidad, país) que el motor de reglas ya calcula.',
        en: 'Fraud precision is 0.07 with 0.75% fraud in the dataset: the model only sees amount and time. I would add the per-user signals (velocity, country) the rules engine already computes.'
      },
      {
        es: 'El evento se publica después del commit pero sin outbox: si Kafka no está disponible en ese instante, la transacción queda PENDING para siempre. Usaría un outbox transaccional.',
        en: 'The event is published after the commit but without an outbox: if Kafka is unavailable at that instant, the transaction stays PENDING forever. I would use a transactional outbox.'
      },
      {
        es: 'El error handler reintenta 3 veces y no tiene dead-letter topic, así que un evento que falla se descarta en silencio.',
        en: 'The error handler retries 3 times and has no dead-letter topic, so an event that fails is silently dropped.'
      },
      {
        es: 'VelocityRule usa INCR y luego EXPIRE en dos comandos: es una ventana fija, no deslizante, y si el proceso cae entre ambos la clave queda sin TTL. Usaría un script Lua o un ZSET.',
        en: 'VelocityRule runs INCR and then EXPIRE as two commands: it is a fixed window, not a sliding one, and if the process dies in between the key is left without a TTL. I would use a Lua script or a ZSET.'
      }
    ],
    figures: []
  },
  {
    id: 'credit-scoring',
    index: '03',
    title: 'Credit Scoring',
    kind: { es: 'Backend + IA · decisiones auditables', en: 'Backend + AI · auditable decisions' },
    status: REPOSITORY,
    role: FULL_DESIGN,
    stack: ['Java 21', 'Spring Boot 4', { es: 'Arquitectura hexagonal', en: 'Hexagonal architecture' }, 'PostgreSQL', 'Flyway', 'FastAPI', 'scikit-learn', 'SHAP', 'React 19', 'TypeScript', 'TanStack Query', 'Testcontainers', 'GitHub Actions'],
    repoUrl: 'https://github.com/dvchinx/credit-scoring',
    lede: {
      es: 'Motor de scoring crediticio donde la explicación es parte del contrato: cada decisión queda explicada con SHAP, atada a una versión de modelo con hash verificado y protegida contra cambios desde la propia base de datos. Incluye simulador what-if y dashboard de auditoría.',
      en: 'A credit scoring engine where the explanation is part of the contract: every decision is explained with SHAP, tied to a model version with a verified hash and protected against changes by the database itself. It includes a what-if simulator and an audit dashboard.'
    },
    context: {
      es: 'La regulación financiera exige poder explicar una decisión automatizada ("right to explanation"). Por eso no basta con que el modelo acierte: hay que saber con qué datos, con qué versión del modelo y con qué política se decidió, y garantizar que ese registro no cambie.',
      en: 'Financial regulation requires being able to explain an automated decision (the "right to explanation"). So it isn’t enough for the model to be right: you need to know which data, which model version and which policy produced the decision, and guarantee that record never changes.'
    },
    constraints: [
      { es: 'Toda decisión debe poder reproducirse.', en: 'Every decision must be reproducible.' },
      { es: 'Un registro de decisión nunca se edita ni se borra.', en: 'A decision record is never edited or deleted.' },
      { es: 'Sin modelo disponible no se decide.', en: 'No model available, no decision.' },
      { es: 'Un artefacto de modelo alterado nunca llega a decidir.', en: 'A tampered model artifact never gets to decide.' }
    ],
    stats: [
      { value: '183', label: { es: 'tests (131 Java, 32 Python, 20 frontend)', en: 'tests (131 Java, 32 Python, 20 frontend)' } },
      { value: '7 / 7', label: { es: 'fases del roadmap completas', en: 'roadmap phases complete' } },
      { value: '4', label: { es: 'tablas append-only protegidas por trigger', en: 'append-only tables guarded by triggers' } }
    ],
    diagram: creditDiagram,
    decisions: [
      {
        title: { es: 'Falla cerrado, al contrario que en fraude', en: 'Fail closed, unlike fraud' },
        why: { es: 'Aprobar un crédito sin modelo es un riesgo que no se puede deshacer.', en: 'Approving a loan without a model is a risk that can’t be undone.' },
        tradeoff: { es: 'Si el ML cae, la API responde 503 en lugar de decidir.', en: 'If the ML service goes down, the API answers 503 instead of deciding.' }
      },
      {
        title: { es: 'Append-only impuesto por la base', en: 'Append-only enforced by the database' },
        why: { es: 'Un trigger protege la auditoría aunque el código tenga un bug.', en: 'A trigger protects the audit trail even if the code has a bug.' },
        tradeoff: { es: 'Corregir una decisión es crear otra nueva; la tabla solo crece.', en: 'Correcting a decision means creating a new one; the table only grows.' }
      },
      {
        title: { es: 'El backend gobierna la versión activa', en: 'The backend owns the active version' },
        why: { es: 'Una sola fuente de verdad, auditada con motivo, y un rollback trivial.', en: 'A single source of truth, audited with a reason, and a trivial rollback.' },
        tradeoff: { es: 'Registrar y activar un modelo es un paso manual de un ADMIN.', en: 'Registering and activating a model is a manual step for an ADMIN.' }
      },
      {
        title: { es: 'Test de contrato con el ML real', en: 'Contract test against the real ML service' },
        why: {
          es: 'Durante tres fases todos los tests pasaban y ninguna evaluación funcionaba: el HttpClient del JDK negociaba HTTP/2 y uvicorn descartaba el cuerpo del POST. Los mocks no abren conexiones.',
          en: 'For three phases every test passed and no evaluation worked: the JDK’s HttpClient negotiated HTTP/2 and uvicorn dropped the POST body. Mocks don’t open connections.'
        },
        tradeoff: {
          es: 'Cada build construye la imagen del ML y entrena un modelo, así que verify tarda más.',
          en: 'Every build builds the ML image and trains a model, so verify takes longer.'
        }
      },
      {
        title: { es: 'Hexagonal por feature', en: 'Hexagonal per feature' },
        why: { es: 'El dominio y la política se prueban sin levantar Spring.', en: 'The domain and the policy are tested without starting Spring.' },
        tradeoff: { es: 'Más mappers y más archivos por cada caso de uso.', en: 'More mappers and more files for every use case.' }
      }
    ],
    retrospective: [
      {
        es: 'Uniría /score y /explain en una sola llamada: así el caso de "versiones distintas del modelo" no podría ocurrir, en lugar de tener que detectarlo.',
        en: 'I would merge /score and /explain into one call: that way the "different model versions" case couldn’t happen, instead of having to detect it.'
      },
      {
        es: 'El modelo se entrena con class_weight="balanced" y sus probabilidades no están calibradas. Las calibraría antes de fijar umbrales en producción.',
        en: 'The model is trained with class_weight="balanced" and its probabilities aren’t calibrated. I would calibrate them before setting thresholds in production.'
      },
      {
        es: 'employmentYears se pide en la solicitud pero el modelo no la usa: o entra al modelo o sale del formulario.',
        en: 'employmentYears is requested in the application but the model doesn’t use it: either it goes into the model or it leaves the form.'
      },
      {
        es: 'Sin el dataset real, la demo entrena con datos sintéticos: sirve para recorrer el sistema, pero sus métricas no dicen nada del mundo real.',
        en: 'Without the real dataset, the demo trains on synthetic data: it is good for walking through the system, but its metrics say nothing about the real world.'
      }
    ],
    figures: []
  },
  {
    id: 'blog',
    index: '04',
    title: 'Blog + Newsletter',
    kind: { es: 'Sitio estático y servicio de correo', en: 'Static site and email service' },
    status: IN_PRODUCTION,
    role: { es: 'Arquitectura, backend y despliegue', en: 'Architecture, backend and deployment' },
    stack: ['React 19', 'Vite', 'Prerender', 'Node', 'Express 5', 'SQLite', 'node-cron', 'Resend', 'Docker', 'Nginx'],
    liveUrl: 'https://blog.jesusflorez.cloud',
    repoUrl: 'https://github.com/dvchinx/blog',
    cover: { src: BlogImage, alt: { es: 'Portada del blog técnico', en: 'Home page of the tech blog' } },
    lede: {
      es: 'Blog técnico sin base de datos ni CMS, con más de cien artículos prerenderizados para buscadores y asistentes de IA, y un newsletter propio que resiste reinicios sin duplicar correos.',
      en: 'A tech blog with no database or CMS, over a hundred articles prerendered for search engines and AI assistants, and its own newsletter that survives restarts without duplicate emails.'
    },
    context: {
      es: 'Escribo y publico el blog yo solo, cada semana. El contenido cambia poco, pero tiene que ser legible para crawlers que no ejecutan JavaScript, y el newsletter tiene que respetar el consentimiento y el límite diario de envíos del proveedor.',
      en: 'I write and publish the blog alone, every week. The content changes little, but it has to be readable by crawlers that don’t run JavaScript, and the newsletter has to respect consent and the provider’s daily sending limit.'
    },
    constraints: [
      { es: 'Una persona escribe, publica y opera todo.', en: 'One person writes, publishes and runs everything.' },
      { es: 'HTML real para crawlers, sin un servidor de render.', en: 'Real HTML for crawlers, without a render server.' },
      { es: 'Un límite diario de correos y cero envíos duplicados.', en: 'A daily email limit and zero duplicate sends.' }
    ],
    stats: [
      { value: '115', label: { es: 'artículos en Markdown', en: 'articles in Markdown' } },
      { value: '0', label: { es: 'CLS al abrir un artículo (antes 0,98)', en: 'CLS when opening an article (was 0.98)' } },
      { value: '301', label: { es: 'para slugs renombrados y URLs duplicadas', en: 'for renamed slugs and duplicate URLs' } }
    ],
    diagram: blogDiagram,
    decisions: [
      {
        title: { es: 'Prerender en build en lugar de SSR', en: 'Build-time prerendering instead of SSR' },
        why: { es: 'HTML completo para crawlers sin mantener un runtime de servidor.', en: 'Complete HTML for crawlers without maintaining a server runtime.' },
        tradeoff: { es: 'Cada publicación exige un rebuild.', en: 'Every post requires a rebuild.' }
      },
      {
        title: { es: 'Metadatos en build, cuerpos bajo demanda', en: 'Metadata at build time, bodies on demand' },
        why: {
          es: 'La portada y los relacionados solo necesitan el frontmatter, y gray-matter sale del bundle del cliente.',
          en: 'The home page and related posts only need the frontmatter, and gray-matter leaves the client bundle.'
        },
        tradeoff: {
          es: 'La búsqueda de texto completo tiene que descargar todos los cuerpos cuando hay un ?q=.',
          en: 'Full-text search has to download every body when there is a ?q=.'
        }
      },
      {
        title: { es: 'SQLite para el newsletter', en: 'SQLite for the newsletter' },
        why: { es: 'El volumen es bajo; un archivo con transacciones y respaldo trivial.', en: 'The volume is low; one file with transactions and trivial backups.' },
        tradeoff: { es: 'SQLite admite un escritor a la vez y no tiene alta disponibilidad.', en: 'SQLite allows one writer at a time and has no high availability.' }
      },
      {
        title: { es: 'Envío reanudable en lugar de reintentos ciegos', en: 'Resumable sending instead of blind retries' },
        why: { es: 'La tabla deliveries registra quién ya recibió cada resumen.', en: 'The deliveries table records who already got each digest.' },
        tradeoff: { es: 'Un estado más que modelar y limpiar.', en: 'One more piece of state to model and clean up.' }
      }
    ],
    retrospective: [
      {
        es: 'El token de preferencias de cada suscriptor nunca rota: quien tenga un correo reenviado conserva acceso indefinido. Lo rotaría al cambiar preferencias.',
        en: 'Each subscriber’s preferences token never rotates: anyone holding a forwarded email keeps access indefinitely. I would rotate it whenever preferences change.'
      },
      {
        es: 'ReactMarkdown usa rehype-raw sin rehype-sanitize; hoy la única barrera es que solo yo escribo los posts. Agregaría una lista blanca antes de aceptar contenido de terceros.',
        en: 'ReactMarkdown uses rehype-raw without rehype-sanitize; today the only barrier is that I am the only one writing posts. I would add an allowlist before accepting third-party content.'
      }
    ],
    figures: []
  },
  {
    id: 'simulation',
    index: '05',
    title: { es: 'Simulación de Vida', en: 'Life Simulation' },
    kind: { es: 'Simulación en tiempo real', en: 'Real-time simulation' },
    status: IN_PRODUCTION,
    role: FULL_DESIGN,
    stack: ['Python', 'NumPy', 'asyncio', 'websockets', 'Canvas 2D', 'pytest', 'GitHub Actions', 'Docker', 'Nginx'],
    liveUrl: 'https://simulation.jesusflorez.cloud',
    repoUrl: 'https://github.com/dvchinx/simulation',
    cover: {
      src: SimulationImage,
      alt: { es: 'Simulación en vivo con paneles de población y ambiente', en: 'Live simulation with population and environment panels' }
    },
    lede: {
      es: 'Ecosistema de cuatro especies con genoma heredable, biomas, estaciones, infecciones y migración, simulado en el servidor y transmitido en vivo a todos los visitantes.',
      en: 'An ecosystem of four species with a heritable genome, biomes, seasons, infections and migration, simulated on the server and streamed live to every visitor.'
    },
    context: {
      es: 'Quería un mundo compartido, en el que todos vieran la misma evolución en vivo, y que fuera liviano tanto para el VPS como para un teléfono. Eso obliga a pensar la simulación como datos y la red como un presupuesto.',
      en: 'I wanted a shared world where everyone watches the same evolution live, light enough for both the VPS and a phone. That forces you to think of the simulation as data and of the network as a budget.'
    },
    constraints: [
      { es: 'Un solo mundo para todos los visitantes.', en: 'A single world for every visitor.' },
      { es: 'Que corra en un VPS modesto junto a otros 17 contenedores.', en: 'It runs on a modest VPS next to 17 other containers.' },
      { es: 'Fluido en móviles.', en: 'Smooth on phones.' },
      { es: 'La demo pública nunca puede quedarse vacía.', en: 'The public demo can never end up empty.' }
    ],
    stats: [
      { value: { es: '6,7×', en: '6.7×' }, label: { es: 'más rápido por tick (139 → 21 ms)', en: 'faster per tick (139 → 21 ms)' } },
      { value: '14', label: { es: 'reglas por tick', en: 'rules per tick' } },
      { value: '24', label: { es: 'tests en CI, con regresiones de bugs', en: 'tests in CI, including bug regressions' } }
    ],
    diagram: simulationDiagram,
    decisions: [
      {
        title: { es: 'Simular en el servidor', en: 'Simulate on the server' },
        why: { es: 'Todos ven el mismo mundo y el cliente solo dibuja.', en: 'Everyone sees the same world and the client only draws.' },
        tradeoff: { es: 'El ancho de banda crece con cada visitante conectado.', en: 'Bandwidth grows with every connected visitor.' }
      },
      {
        title: { es: 'Grillas en lugar de objetos', en: 'Grids instead of objects' },
        why: { es: 'Permite operar sobre todo el mundo con NumPy.', en: 'It lets NumPy operate on the whole world at once.' },
        tradeoff: {
          es: 'Las reglas son menos intuitivas de leer, y cada capa de un organismo debe moverse junto a las demás.',
          en: 'Rules are less intuitive to read, and every layer of an organism has to move together with the rest.'
        }
      },
      {
        title: { es: 'El tick fuera del event loop', en: 'The tick outside the event loop' },
        why: {
          es: 'NumPy libera el GIL: el hilo calcula mientras el loop atiende conexiones e inspecciones.',
          en: 'NumPy releases the GIL: the thread computes while the loop serves connections and inspections.'
        },
        tradeoff: {
          es: 'Funciona porque cada regla devuelve capas nuevas en lugar de mutar el estado, y ese copiado cuesta en cada tick.',
          en: 'It works because every rule returns new layers instead of mutating the state, and that copying costs something every tick.'
        }
      },
      {
        title: { es: 'Migración como efecto rescate', en: 'Migration as a rescue effect' },
        why: {
          es: 'Una especie extinta no vuelve por sí sola, y la demo pública debe mostrar siempre la cadena trófica completa.',
          en: 'An extinct species doesn’t come back on its own, and the public demo must always show the full food chain.'
        },
        tradeoff: {
          es: 'El ecosistema ya no es cerrado: la extinción deja de ser definitiva.',
          en: 'The ecosystem is no longer closed: extinction stops being final.'
        }
      },
      {
        title: { es: 'Canvas 2D sin librerías', en: 'Canvas 2D without libraries' },
        why: { es: 'El control fino del viewport importa más que las abstracciones.', en: 'Fine control of the viewport matters more than abstractions.' },
        tradeoff: { es: 'Todo el manejo de zoom, pan, gestos y redibujo es código propio.', en: 'All the zoom, pan, gesture and redraw handling is my own code.' }
      }
    ],
    retrospective: [
      {
        es: 'Cada tick envía la grilla completa: a 4 FPS son unos 160 KB/s por visitante antes de comprimir. Para subir los FPS enviaría solo las celdas que cambiaron.',
        en: 'Every tick sends the full grid: at 4 FPS that is about 160 KB/s per visitor before compression. To raise the FPS I would send only the cells that changed.'
      },
      {
        es: 'El servidor arranca un mundo nuevo en cada reinicio y no guarda el estado. Lo persistiría cada cierto número de ticks para que un despliegue no borre la evolución acumulada.',
        en: 'The server starts a new world on every restart and doesn’t save its state. I would persist it every so many ticks so a deployment doesn’t wipe out the accumulated evolution.'
      }
    ],
    figures: []
  }
];
