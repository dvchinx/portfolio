import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';

/**
 * Colors the card closest to `focus` (a viewport coordinate along `axis`).
 * Driven by scroll instead of :hover, which doesn't update while the track
 * moves under a still cursor.
 */
function highlightCardAt(track, axis, focus) {
  const cards = track.querySelectorAll('.recog-card');
  let closest = null;
  let best = Infinity;
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const center = axis === 'x' ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
    const gap = Math.abs(center - focus);
    if (gap < best) {
      best = gap;
      closest = card;
    }
  });
  cards.forEach((card) => card.classList.toggle('is-active', card === closest));
}

/** Dark interlude. On desktop the cards scroll horizontally while the section is pinned. */
function Recognition({ items, introDone }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!introDone) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const lastCard = () => track.querySelector('.recog-card:last-child');
      const paddingRight = () => parseFloat(getComputedStyle(track).paddingRight) || 0;
      // Up to the last card's right edge plus the end padding. scrollWidth
      // leaves that padding out, so the last card ended flush with the edge.
      const distance = () => {
        const last = lastCard();
        if (!last) return 0;
        const contentRight = last.getBoundingClientRect().right - track.getBoundingClientRect().left;
        return Math.max(0, contentRight + paddingRight() - track.clientWidth);
      };

      // The focus point travels from the middle of the viewport to where the
      // last card rests at the end, so the first card is colored at the start
      // and the last one at the end (it never reaches the middle).
      let tween;
      const highlight = () => {
        const last = lastCard();
        if (!last) return;
        const middle = window.innerWidth / 2;
        const lastCenter = track.clientWidth - paddingRight() - last.offsetWidth / 2;
        const progress = tween ? tween.progress() : 0;
        highlightCardAt(track, 'x', middle + (lastCenter - middle) * progress);
      };

      sectionRef.current.classList.add('is-scroll-driven');
      // onUpdate of the tween, not the trigger: with scrub the track keeps
      // easing after the last scroll event
      tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        onUpdate: highlight,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: highlight
        }
      });
      return () => sectionRef.current?.classList.remove('is-scroll-driven');
    });

    // Stacked layout on small screens: the card crossing the middle is colored
    mm.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const highlight = () => highlightCardAt(track, 'y', window.innerHeight / 2);

      sectionRef.current.classList.add('is-scroll-driven');
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: highlight,
        onRefresh: highlight
      });
      return () => sectionRef.current?.classList.remove('is-scroll-driven');
    });

    // Pinning inserts spacing below; triggers created earlier must re-measure.
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [introDone]);

  return (
    <section className="recog" id="logros" ref={sectionRef} aria-labelledby="logros-title">
      <div className="recog__inner" ref={trackRef}>
        <header className="recog__head">
          <p className="eyebrow">(03) Competencia</p>
          <h2 className="section-title" id="logros-title">Bajo reloj.</h2>
          <p className="prose">
            Programación competitiva desde 2024. Resolver con tiempo y memoria limitados enseña a medir antes de optimizar.
          </p>
        </header>

        <ol className="recog__track">
          {items.map((item) => (
            <li key={item.id} className="recog-card">
              <span className="recog-card__rank">{item.rank}</span>
              <div className="recog-card__body">
                <p className="mono recog-card__label">{item.label}</p>
                <p className="recog-card__event">{item.event}</p>
                <p className="mono recog-card__date">{item.date}</p>
              </div>
              {item.image && (
                <div className="recog-card__img">
                  <img src={item.image} alt={`${item.label}: ${item.event}`} loading="lazy" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Recognition;
