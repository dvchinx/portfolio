import {
  siApachekafka,
  siDocker,
  siFastapi,
  siFlyway,
  siGit,
  siGithub,
  siJsonwebtokens,
  siLinux,
  siMysql,
  siNginx,
  siNumpy,
  siOpenjdk,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siScikitlearn,
  siSpringboot,
  siSpringsecurity,
  siTypescript
} from 'simple-icons';

/* Stroke icons on a 24×24 grid (Lucide geometry). */
const PATHS = {
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  folder: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />,
  cap: <><path d="m2 10 10-5 10 5-10 5Z" /><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" /></>,
  network: <><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" /></>,
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  cpu: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" /></>,
  shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />,
  sparkles: <><path d="M12 3 13.9 8.1 19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" /><path d="M19 3v4M21 5h-4M5 17v4M7 19H3" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" /></>,
  book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  up: <path d="m18 15-6-6-6 6" />
};

export function Icon({ name, size = 16, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/* Simple Icons dropped LinkedIn; this is its glyph without the square. */
const BRANDS = {
  github: siGithub.path,
  linkedin:
    'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z'
};

export function BrandIcon({ name, size = 16 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRANDS[name]} />
    </svg>
  );
}

/* Technology name (as written in the data) → logo, or a generic glyph. */
const TECH = [
  [/spring security/i, siSpringsecurity],
  [/spring/i, siSpringboot],
  [/java/i, siOpenjdk],
  [/kafka/i, siApachekafka],
  [/rabbitmq/i, siRabbitmq],
  [/redis/i, siRedis],
  [/postgres/i, siPostgresql],
  [/mysql/i, siMysql],
  [/docker|compose/i, siDocker],
  [/nginx/i, siNginx],
  [/linux/i, siLinux],
  [/fastapi/i, siFastapi],
  [/python/i, siPython],
  [/scikit/i, siScikitlearn],
  [/numpy/i, siNumpy],
  [/jwt/i, siJsonwebtokens],
  [/flyway/i, siFlyway],
  [/react/i, siReact],
  [/typescript/i, siTypescript],
  [/github/i, siGithub],
  [/git/i, siGit],
  [/oauth/i, 'shield'],
  [/websocket/i, 'network'],
  [/llama/i, 'sparkles'],
  [/review/i, 'code'],
  [/icpc/i, 'trophy'],
  [/aws/i, 'cloud'],
  [/sql/i, 'database'],
  [/hexagonal|microservic/i, 'layers']
];

export function TechIcon({ name, size = 14 }) {
  const match = TECH.find(([pattern]) => pattern.test(name))?.[1] ?? 'cpu';
  if (typeof match === 'string') return <Icon name={match} size={size} />;
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={match.path} />
    </svg>
  );
}
