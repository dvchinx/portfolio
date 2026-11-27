import * as profileData from '../data/profile';
import { localize, strings } from '../i18n';

const plain = (text) => text.replaceAll('**', '');
const unique = (items) => [...new Set(items)];

/**
 * schema.org ProfilePage + Person for search engines, built from the page data
 * so it never drifts from what the page says. Injected by scripts/prerender.js
 * into each language's page.
 */
export function structuredData(lang) {
  const { profile, experience, recognitions, rankings, certifications } = localize(profileData, lang);
  const t = strings[lang];
  const current = experience.filter((job) => job.current);
  const url = lang === 'en' ? `${profile.site}en/` : profile.site;

  const person = {
    '@type': 'Person',
    // Same entity in both languages
    '@id': `${profile.site}#persona`,
    name: profile.name,
    alternateName: [profile.name.normalize('NFD').replace(/\p{Diacritic}/gu, ''), 'dvchinx'],
    jobTitle: t.meta.jobTitle,
    description: plain(profile.headline),
    url,
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
      ...rankings.map((item) => t.structuredData.ranking(item.rank, item.scope, item.platform)),
      ...recognitions.map((item) =>
        item.rank === 'MH'
          ? `${item.label} (${item.event})`
          : `${t.structuredData.place(item.rank.replace('#', ''))} · ${item.label} (${item.event})`
      )
    ]
  };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    inLanguage: lang,
    mainEntity: person
  };

  // Safe inside <script>: no "</script>" can close the tag early
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
