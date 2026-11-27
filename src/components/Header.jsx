import { useEffect, useState } from 'react';
import { scrollToTarget } from '../lib/motion';
import { Icon } from '../lib/icons';
import { LANG_STORAGE_KEY, pathFor, useLang, useStrings } from '../i18n';

// Section ids are the same in both languages; labels come from the strings
const LINKS = [
  { id: 'experiencia', icon: 'briefcase' },
  { id: 'logros', icon: 'trophy' },
  { id: 'habilidades', icon: 'code' },
  { id: 'proyectos', icon: 'folder' },
  { id: 'formacion', icon: 'cap' },
  { id: 'contacto', icon: 'mail' }
];

/** Link to the page in the other language. Remembers the choice, so the auto-detection in index.html stops overriding it. */
function LangSwitch() {
  const lang = useLang();
  const t = useStrings();
  const other = lang === 'es' ? 'en' : 'es';

  const onClick = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem(LANG_STORAGE_KEY, other);
    } catch {
      // Storage blocked: the switch still works for this visit
    }
    window.location.assign(pathFor(other) + window.location.hash);
  };

  return (
    <a
      className="nav__lang"
      href={pathFor(other)}
      hrefLang={other}
      lang={other}
      aria-label={t.nav.switchName}
      title={t.nav.switchLabel}
      onClick={onClick}
    >
      <Icon name="globe" size={14} />
      {t.nav.switchShort}
    </a>
  );
}

function Header({ name }) {
  const t = useStrings();
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const go = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToTarget(`#${id}`, id === 'inicio' ? { offset: 0 } : undefined);
  };

  return (
    <header className={`nav ${menuOpen ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <a href="#inicio" className="nav__brand" onClick={(event) => go(event, 'inicio')}>
          {name}
        </a>
        <nav className="nav__links" aria-label={t.nav.label}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => go(event, link.id)}
            >
              <Icon name={link.icon} size={14} />
              {t.nav.sections[link.id]}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <LangSwitch />
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="nav__menu" aria-label={t.nav.label} hidden={!menuOpen}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? 'is-active' : ''}
            onClick={(event) => go(event, link.id)}
          >
            <Icon name={link.icon} size={16} />
            {t.nav.sections[link.id]}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
