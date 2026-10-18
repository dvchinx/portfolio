import { useEffect, useRef, useState } from 'react';
import FlowDiagram from './FlowDiagram';
import { prefersReducedMotion, scrollToTarget } from '../lib/motion';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Scrollytelling: the diagram stays pinned while the steps scroll past it.
 * The step closest to the middle of the viewport drives the highlight.
 */
function ScrollyDiagram({ diagram, caption }) {
  const [active, setActive] = useState(-1);
  const stepsRef = useRef(null);
  const scrollerRef = useRef(null);
  const total = diagram.steps.length;
  const step = active >= 0 ? diagram.steps[active] : null;

  useEffect(() => {
    const stepElements = stepsRef.current?.querySelectorAll('[data-step]') ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.step));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // On narrow screens the diagram is wider than its frame: keep the active
  // nodes centered by scrolling the frame horizontally.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !step || scroller.scrollWidth <= scroller.clientWidth) return;

    const nodes = diagram.nodes.filter((node) => step.nodes.includes(node.id));
    if (!nodes.length) return;

    const viewBoxWidth = Number(diagram.viewBox.split(' ')[2]);
    const minX = Math.min(...nodes.map((node) => node.x));
    const maxX = Math.max(...nodes.map((node) => node.x + node.w));
    const scale = scroller.scrollWidth / viewBoxWidth;
    const center = ((minX + maxX) / 2) * scale;

    scroller.scrollTo({
      left: center - scroller.clientWidth / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }, [step, diagram]);

  const goToStep = (index) => {
    const element = stepsRef.current?.querySelector(`[data-step="${index}"]`);
    if (!element) return;
    const offset = -(window.innerHeight / 2) + element.offsetHeight / 2;
    scrollToTarget(element, { offset });
  };

  const [, , viewBoxWidth, viewBoxHeight] = diagram.viewBox.split(' ');

  return (
    <div className="scrolly">
      <div className="scrolly__stage">
        <div className="scrolly__frame">
          <div className="scrolly__scroller" ref={scrollerRef}>
            <div className="scrolly__canvas" style={{ '--diagram-ratio': `${viewBoxWidth} / ${viewBoxHeight}` }}>
              <FlowDiagram
                diagram={diagram}
                step={step}
                stepKey={String(active)}
                title={caption}
                animated={!prefersReducedMotion()}
              />
            </div>
          </div>
        </div>
        <div className="scrolly__bar">
          <p className="scrolly__caption">
            <span className="mono">{caption}</span>
            <span className="mono scrolly__count">
              {step ? `Paso ${pad(active + 1)} / ${pad(total)}` : 'Vista general'}
            </span>
          </p>
          <div className="scrolly__dots" role="tablist" aria-label="Pasos del diagrama">
            {diagram.steps.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Paso ${i + 1}: ${item.title}`}
                className={i === active ? 'is-active' : ''}
                onClick={() => goToStep(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="scrolly__steps" ref={stepsRef}>
        {diagram.steps.map((item, i) => (
          <li
            key={item.title}
            data-step={i}
            className={`scrolly__step ${i === active ? 'is-active' : ''}`}
          >
            <span className="mono scrolly__step-num">{pad(i + 1)} / {pad(total)}</span>
            <h5 className="scrolly__step-title">{item.title}</h5>
            <p className="scrolly__step-body">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ScrollyDiagram;
