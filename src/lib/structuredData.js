import { profile, experience, recognitions, rankings, certifications } from '../data/profile';

const plain = (text) => text.replaceAll('**', '');
const unique = (items) => [...new Set(items)];

/**
 * schema.org ProfilePage + Person for search engines, built from the page data
 * so it never drifts from what the page says. Injected by scripts/prerender.js.
 */
export function structuredData() {
  const current = experience.filter((job) => job.period.includes('Presente'));

  const person = {
    '@type': 'Person',
    '@id': `${profile.site}#persona`,
    name: profile.name,
    alternateName: [profile.name.normalize('NFD').replace(/\p{Diacritic}/gu, ''), 'dvchinx'],
    jobTitle: 'Desarrollador Backend',
    description: plain(profile.headline),
    url: profile.site,
    image: `${profile.site}og-image.png`,
    sameAs: [profile.github, profile.linkedin, profile.blog],
    address: { '@type': 'PostalAddress', addressCountry: 'CO' },
    worksFor: unique(current.map((job) => job.company)).map((name) => ({
      '@type': 'Organization',
      name,
      url: current.find((job) => job.company === name).url
    })),
    alumniOf: certifications
      .filter((cert) => cert.kind === 'Título')
      .map((cert) => ({ '@type': 'EducationalOrganization', name: cert.institution })),
    knowsAbout: profile.knowsAbout,
    award: [
      ...rankings.map((item) => `${item.rank} de ${item.scope} en ${item.platform}`),
      ...recognitions.map((item) =>
        item.rank === 'MH' ? `${item.label} (${item.event})` : `Puesto ${item.rank.replace('#', '')} · ${item.label} (${item.event})`
      )
    ]
  };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: profile.site,
    inLanguage: 'es',
    mainEntity: person
  };

  // Safe inside <script>: no "</script>" can close the tag early
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
