import { useLayoutEffect, useRef, useState } from 'react';
import ScrollyDiagram from './ScrollyDiagram';
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTarget } from '../lib/motion';
import { Icon } from '../lib/icons';

function ExternalLink({ href, children }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
      {children} <Icon name="arrow" size={10} />
    </a>
  );
}

/**
 * Collapsible body. Height is animated with GSAP and cleared afterwards: the
 * diagram inside is position: sticky, which an overflow: hidden ancestor
 * would break, so the clip only exists while the animation runs. `hidden` is
 * set here and not as a changing prop, so React doesn't cut the closing
 * animation short. The initial value is rendered once (constant afterwards, so
 * React never touches it again) so the prerendered HTML starts collapsed.
 */
function useCollapse(open) {
  const ref = useRef(null);
  const mounted = useRef(false);
  const [initiallyHidden] = useState(!open);

  useLayoutEffect(() => {
    const body = ref.current;
    if (!body) return undefined;
    if (!mounted.current) {
      mounted.current = true;
      body.hidden = !open;
      return undefined;
    }

    // Reveals inside the body measured their position while it was hidden
    const settle = () => ScrollTrigger.refresh();

    if (prefersReducedMotion()) {
      body.hidden = !open;
      settle();
      return undefined;
    }

    let tween;
    if (open) {
      body.hidden = false;
      tween = gsap.fromTo(
        body,
        { height: 0, overflow: 'hidden', autoAlpha: 0 },
        { height: 'auto', autoAlpha: 1, duration: 0.8, ease: 'expo.inOut', clearProps: 'height,overflow,opacity,visibility', onComplete: settle }
      );
    } else {
      tween = gsap.to(body, {
        height: 0,
        overflow: 'hidden',
        autoAlpha: 0,
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => {
          body.hidden = true;
          gsap.set(body, { clearProps: 'height,overflow,opacity,visibility' });
          settle();
        }
      });
    }
    return () => tween.kill();
  }, [open]);

  return [ref, initiallyHidden];
}

function CaseStudy({ project, open, onToggle, onOpenFigure }) {
  const { index } = project;
  const [bodyRef, bodyInitiallyHidden] = useCollapse(open);
  const bodyId = `caso-${project.id}-detalle`;

  const close = () => {
    onToggle(false);
    scrollToTarget(`#caso-${project.id}`);
  };

  return (
    <article className={`card case ${open ? 'is-open' : ''}`} id={`caso-${project.id}`} aria-labelledby={`caso-${project.id}-title`}>
      <header className="case__head">
        <div className="case__heading">
          <p className="kicker">
            Caso {index} · {project.kind}
          </p>
          <h3 className="case__title" id={`caso-${project.id}-title`}>
            {project.title}
          </h3>
        </div>
        <span className="pill">{project.status}</span>
      </header>

      <dl className="case__meta">
        <div>
          <dt>Rol</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="case__meta-stack">
          <dt>Stack</dt>
          <dd>
            <ul className="dot-list">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </dd>
        </div>
        {(project.liveUrl || project.repoUrl) && (
          <div>
            <dt>Enlaces</dt>
            <dd className="case__links">
              {project.liveUrl && <ExternalLink href={project.liveUrl}>En vivo</ExternalLink>}
              {project.repoUrl && <ExternalLink href={project.repoUrl}>Código</ExternalLink>}
            </dd>
          </div>
        )}
      </dl>

      <div className="case__toggle">
        <button
          type="button"
          className="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => onToggle(!open)}
        >
          {open ? 'Ocultar el caso' : 'Ver el caso completo'}
          <Icon name={open ? 'up' : 'chevron'} size={14} />
        </button>
      </div>

      <div className="case__body" id={bodyId} ref={bodyRef} hidden={bodyInitiallyHidden}>
        {/* The project card above already shows the lede; here it opens the detail */}
        <p className="case__lede">{project.lede}</p>

        {(project.cover || project.stats) && (
          <div className={`case__visual ${project.cover ? '' : 'case__visual--stats-only'}`}>
            {project.cover && (
              <figure className="case__cover" data-reveal-image>
                <div className="case__cover-frame">
                  <img src={project.cover.src} alt={project.cover.alt} loading="lazy" />
                </div>
                <figcaption>Fig. {index}.0 — {project.cover.alt}</figcaption>
              </figure>
            )}
            {project.stats && (
              <ul className="case__stats">
                {project.stats.map((stat) => (
                  <li key={stat.label} data-fade>
                    <span className="case__stat-value">{stat.value}</span>
                    <span className="case__stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="case__brief">
          <section data-fade>
            <h4 className="case__label">Contexto</h4>
            <p className="case__text">{project.context}</p>
          </section>
          <section data-fade>
            <h4 className="case__label">Restricciones</h4>
            <ol className="case__constraints">
              {project.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </div>

        <section className="case__flow" aria-label={`Arquitectura de ${project.title}`}>
          <h4 className="case__label">Cómo funciona</h4>
          <ScrollyDiagram diagram={project.diagram} caption={`Fig. ${index}.1 — Arquitectura`} />
        </section>

        <section className="case__decisions">
          <h4 className="case__label">Decisiones</h4>
          <ol>
            {project.decisions.map((decision, i) => (
              <li key={decision.title} className="decision" data-fade>
                <span className="decision__num">D{String(i + 1).padStart(2, '0')}</span>
                <h5 className="decision__title">{decision.title}</h5>
                <p className="decision__why">
                  <span>Por qué</span>
                  {decision.why}
                </p>
                <p className="decision__cost">
                  <span>Costo</span>
                  {decision.tradeoff}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="case__retro" data-fade>
          <h4 className="case__label">Qué cambiaría hoy</h4>
          <ol>
            {project.retrospective.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        {project.figures.length > 0 && (
          <section className="case__figures">
            <h4 className="case__label">Documentación</h4>
            <ul>
              {project.figures.map((figure, i) => (
                <li key={figure.title}>
                  <button type="button" className="figure-thumb" onClick={() => onOpenFigure(figure)}>
                    <span className="figure-thumb__img">
                      <img src={figure.src} alt="" loading="lazy" />
                    </span>
                    <span className="figure-thumb__num">Fig. {index}.{i + 2}</span>
                    <span>{figure.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="case__toggle case__toggle--end">
          <button type="button" className="button" aria-controls={bodyId} onClick={close}>
            Cerrar el caso <Icon name="up" size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CaseStudy;
