import { useEffect, useRef, useState } from 'react';
import { gsap, scrollToTarget, setScrollLocked } from '../lib/motion';

const LINKS = [
  { id: 'perfil', label: 'Perfil', index: '01' },
  { id: 'trabajo', label: 'Trabajo', index: '02' },
  { id: 'logros', label: 'Logros', index: '03' },
  { id: 'contacto', label: 'Contacto', index: '04' }
];

function Header({ name }) {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

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
    const tween = gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    setScrollLocked(true);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      setScrollLocked(false);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const go = (event, id) => {
    event.preventDefault();
    if (!menuOpen) {
      scrollToTarget(`#${id}`);
      return;
    }
    // Closing the menu restarts Lenis, which cancels any scroll in flight:
    // wait for that to happen before scrolling.
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToTarget(`#${id}`));
  };

  return (
    <header className={`site-header ${menuOpen ? 'is-menu-open' : ''}`}>
      <div className="site-header__bar">
        <a href="#inicio" className="site-header__brand" onClick={(event) => go(event, 'inicio')}>
          {name}
        </a>
        <span className="site-header__role mono">Desarrollador Backend</span>
        <nav className="site-header__nav" aria-label="Secciones">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => go(event, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="site-header__toggle mono"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <span className="site-header__progress" ref={progressRef} aria-hidden="true" />

      <nav id="mobile-menu" className="mobile-menu" aria-label="Secciones" hidden={!menuOpen}>
        <ol>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(event) => go(event, link.id)}>
                <span className="mono">{link.index}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

export default Header;
