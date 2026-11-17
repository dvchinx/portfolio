import { useEffect, useState } from 'react';
import { scrollToTarget } from '../lib/motion';
import { Icon } from '../lib/icons';

const LINKS = [
  { id: 'experiencia', label: 'Experiencia', icon: 'briefcase' },
  { id: 'logros', label: 'Logros', icon: 'trophy' },
  { id: 'habilidades', label: 'Habilidades', icon: 'code' },
  { id: 'proyectos', label: 'Proyectos', icon: 'folder' },
  { id: 'formacion', label: 'Formación', icon: 'cap' },
  { id: 'contacto', label: 'Contacto', icon: 'mail' }
];

function Header({ name }) {
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
        <nav className="nav__links" aria-label="Secciones">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => go(event, link.id)}
            >
              <Icon name={link.icon} size={14} />
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      <nav id="mobile-menu" className="nav__menu" aria-label="Secciones" hidden={!menuOpen}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? 'is-active' : ''}
            onClick={(event) => go(event, link.id)}
          >
            <Icon name={link.icon} size={16} />
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
