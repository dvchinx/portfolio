import { useLayoutEffect, useRef } from 'react';
import ScrollyDiagram from './ScrollyDiagram';
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTarget } from '../lib/motion';

function ExternalLink({ href, children }) {
  return (
    <a className="link-arrow" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/**
 * Collapsible body. Height is animated with GSAP and cleared afterwards: the
 * diagram inside is position: sticky, which an overflow: hidden ancestor
 * would break, so the clip only exists while the animation runs. `hidden` is
 * set here and not as a prop, so React doesn't cut the closing animation short.
 */
function useCollapse(open) {
  const ref = useRef(null);
  const mounted = useRef(false);

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

  return ref;
}

function CaseStudy({ project, open, onToggle, onOpenFigure }) {
  const { index } = project;
  const bodyRef = useCollapse(open);
  const bodyId = `caso-${project.id}-detalle`;

  const close = () => {
    onToggle(false);
    scrollToTarget(`#caso-${project.id}`);
  };

  return (
    <article className={`case ${open ? 'is-open' : ''}`} id={`caso-${project.id}`} aria-labelledby={`caso-${project.id}-title`}>
      <header className="case__head">
        <span className="case__index" aria-hidden="true">{index}</span>
        <div className="case__heading">
          <p className="eyebrow">
            Caso {index} · {project.kind}
          </p>
          <h3 className="case__title" id={`caso-${project.id}-title`} data-split>
            {project.title}
          </h3>
        </div>
        <dl className="case__meta" data-fade>
          <div>
            <dt>Estado</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Rol</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(' · ')}</dd>
          </div>
          <div>
            <dt>Enlaces</dt>
            <dd className="case__links">
              {project.liveUrl && <ExternalLink href={project.liveUrl}>En vivo</ExternalLink>}
              {project.repoUrl && <ExternalLink href={project.repoUrl}>Código</ExternalLink>}
            </dd>
          </div>
        </dl>
      </header>

      <div className="case__toggle">
        <button
          type="button"
          className="button-line"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => onToggle(!open)}
        >
          {open ? 'Ocultar el caso' : 'Ver el caso completo'}
          <span aria-hidden="true">{open ? ' −' : ' +'}</span>
        </button>
      </div>

      <div className="case__body" id={bodyId} ref={bodyRef}>
      <p className="case__lede">{project.lede}</p>

      {(project.cover || project.stats) && (
        <div className={`case__visual ${project.cover ? '' : 'case__visual--stats-only'}`}>
          {project.cover && (
            <figure className="case__cover" data-reveal-image>
              <div className="case__cover-frame">
                <img src={project.cover.src} alt={project.cover.alt} loading="lazy" />
              </div>
              <figcaption className="mono">Fig. {index}.0 — {project.cover.alt}</figcaption>
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
          <p className="prose">{project.context}</p>
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
              <span className="mono decision__num">D{String(i + 1).padStart(2, '0')}</span>
              <h5 className="decision__title">{decision.title}</h5>
              <p className="decision__why">
                <span className="mono">Por qué</span>
                {decision.why}
              </p>
              <p className="decision__cost">
                <span className="mono">Costo</span>
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
            <li key={item} className="prose">{item}</li>
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
                  <span className="mono">Fig. {index}.{i + 2}</span>
                  <span>{figure.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="case__toggle case__toggle--end">
        <button type="button" className="button-line" aria-controls={bodyId} onClick={close}>
          Cerrar el caso <span aria-hidden="true">↑</span>
        </button>
      </div>
      </div>
    </article>
  );
}

export default CaseStudy;
