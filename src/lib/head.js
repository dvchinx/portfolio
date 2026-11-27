import { profile } from '../data/profile';
import { LANGS, strings } from '../i18n';

/*
 * Per-language <head> tags: title, description, canonical, hreflang
 * alternates and Open Graph. scripts/prerender.js writes them between the
 * <!-- head:start --> and <!-- head:end --> markers of index.html.
 */

const urlFor = (lang) => (lang === 'en' ? `${profile.site}en/` : profile.site);

const escape = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const meta = (attr, key, content) => `<meta ${attr}="${key}" content="${escape(content)}" />`;

export function headTags(lang) {
  const t = strings[lang].meta;
  const url = urlFor(lang);
  const image = `${profile.site}og-image.png`;
  const [firstName, ...lastName] = profile.name.split(' ');

  return [
    `<title>${escape(t.title)}</title>`,
    meta('name', 'description', t.description),
    meta('name', 'author', profile.name),
    meta('name', 'robots', 'index, follow, max-image-preview:large'),
    `<link rel="canonical" href="${url}" />`,
    // Each version points to both; x-default is the Spanish URL, which also
    // redirects visitors whose device asks for English
    ...LANGS.map((code) => `<link rel="alternate" hreflang="${code}" href="${urlFor(code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${urlFor('es')}" />`,
    '',
    meta('property', 'og:type', 'profile'),
    meta('property', 'og:site_name', profile.name),
    meta('property', 'og:locale', t.locale),
    ...LANGS.filter((code) => code !== lang).map((code) => meta('property', 'og:locale:alternate', strings[code].meta.locale)),
    meta('property', 'og:url', url),
    meta('property', 'og:title', t.title),
    meta('property', 'og:description', t.ogDescription),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', t.imageAlt),
    meta('property', 'profile:first_name', firstName),
    meta('property', 'profile:last_name', lastName.join(' ')),
    meta('property', 'profile:username', 'dvchinx'),
    meta('name', 'twitter:card', 'summary_large_image')
  ].join('\n    ');
}
