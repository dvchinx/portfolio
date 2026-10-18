import { useEffect, useRef, useState } from 'react';
import FlowDiagram from './FlowDiagram';
import { gsap } from '../lib/motion';

/** Index of case studies. On pointer devices a preview of each architecture follows the cursor. */
function WorkIndex({ projects, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const moveX = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3' });
      const moveY = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3' });

      const onMove = (event) => {
        moveX(event.clientX + 24);
        moveY(event.clientY - preview.offsetHeight / 2);
      };

      list.addEventListener('pointermove', onMove);
      return () => list.removeEventListener('pointermove', onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="work-index">
      <ol className="work-list" ref={listRef} onPointerLeave={() => setHovered(null)}>
        {projects.map((project) => (
          <li key={project.id} data-fade>
            <a
              href={`#caso-${project.id}`}
              className="work-row"
              onPointerEnter={() => setHovered(project.id)}
              onFocus={() => setHovered(project.id)}
              onBlur={() => setHovered(null)}
              onClick={(event) => {
                event.preventDefault();
                onSelect(project.id);
              }}
            >
              <span className="work-row__index mono">{project.index}</span>
              <span className="work-row__title">{project.title}</span>
              <span className="work-row__kind">{project.kind}</span>
              <span className="work-row__status mono">{project.status}</span>
              <span className="work-row__arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ol>

      <div
        className={`work-preview ${hovered ? 'is-visible' : ''}`}
        ref={previewRef}
        aria-hidden="true"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`work-preview__item ${hovered === project.id ? 'is-active' : ''}`}
          >
            <FlowDiagram diagram={project.diagram} title="" animated={false} />
            <span className="mono">Fig. {project.index}.1 — Arquitectura</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkIndex;
