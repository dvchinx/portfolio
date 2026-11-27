import { createContext, useContext } from 'react';
import { strings } from './strings';

/*
 * The page exists in two languages, each prerendered at its own URL:
 * Spanish at BASE_URL and English at BASE_URL + "en/". The language comes
 * from the URL, so the server and the client always render the same one.
 * Which URL a visitor ends up on is decided before the page paints by the
 * inline script in index.html (device language, then time zone, unless the
 * visitor picked one with the switch in the nav).
 */

export const LANGS = ['es', 'en'];
export const DEFAULT_LANG = 'es';

// Remembers the language picked in the nav; the inline script in index.html reads the same key
export const LANG_STORAGE_KEY = 'lang';

const BASE = import.meta.env.BASE_URL;

export const pathFor = (lang) => (lang === 'en' ? `${BASE}en/` : BASE);

export const langFromPath = (pathname) =>
  pathname === `${BASE}en` || pathname.startsWith(`${BASE}en/`) ? 'en' : DEFAULT_LANG;

const isTranslation = (value) => {
  const keys = Object.keys(value);
  return keys.length === LANGS.length && LANGS.every((lang) => lang in value);
};

/**
 * Resolves the data for one language: every `{ es, en }` object, at any depth,
 * becomes its `lang` string. Everything else is copied as is.
 */
export function localize(value, lang) {
  if (Array.isArray(value)) return value.map((item) => localize(item, lang));
  if (value && typeof value === 'object') {
    if (isTranslation(value)) return value[lang];
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)]));
  }
  return value;
}

export const LangContext = createContext(DEFAULT_LANG);

export const useLang = () => useContext(LangContext);

/** UI strings (labels, buttons, messages) in the page's language. */
export const useStrings = () => strings[useLang()];

export { strings };
