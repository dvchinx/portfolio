import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/** Short counter + curtain. `onReveal` fires as the curtain starts lifting, `onFinish` when it is gone. */
function Preloader({ onReveal, onFinish }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;

    if (prefersReducedMotion()) {
      onReveal(true);
      onFinish(true);
      return undefined;
    }

    html.classList.add('is-loading');
    window.scrollTo(0, 0);

    const counter = { value: 0 };
    const timeline = gsap.timeline({
      onComplete: () => {
        html.classList.remove('is-loading');
        onFinish(true);
      }
    });

    timeline
      .to(counter, {
        value: 100,
        duration: 1.05,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
          }
        }
      })
      .to('.preloader__meta', { autoAlpha: 0, duration: 0.25 }, '+=0.05')
      .call(() => onReveal(true))
      .to(rootRef.current, { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, '<');

    return () => {
      timeline.kill();
      html.classList.remove('is-loading');
    };
  }, [onReveal, onFinish]);

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__meta">
        <span className="mono">Jesús Flórez — Backend</span>
        <span className="preloader__count" ref={countRef}>000</span>
      </div>
    </div>
  );
}

export default Preloader;
