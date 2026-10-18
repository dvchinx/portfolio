import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

function SplitLine({ text, className }) {
  return (
    <span className={`hero__line ${className}`}>
      <span className="hero__mask">
        {[...text].map((char, i) => (
          <span key={`${char}-${i}`} className="hero__char">{char}</span>
        ))}
      </span>
    </span>
  );
}

function Hero({ profile, projectCount, introDone, onScrollToWork }) {
  const rootRef = useRef(null);
  const [firstName, lastName] = profile.name.split(' ');

  // Layout effect: the from-states must be applied before the first painted frame.
  useLayoutEffect(() => {
    if (!introDone) return undefined;

    const mm = gsap.matchMedia(rootRef.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__char', { yPercent: 115, duration: 1.3, stagger: 0.035 })
        .from('.hero__photo-frame', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3 }, 0.25)
        .from('.hero__photo-frame img', { scale: 1.25, duration: 1.6 }, 0.25)
        .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.07 }, 0.5);

      const scrollOut = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('.hero__line--a', { xPercent: -12, ease: 'none', scrollTrigger: scrollOut });
      gsap.to('.hero__line--b', { xPercent: 9, ease: 'none', scrollTrigger: scrollOut });
      gsap.to('.hero__photo-frame img', { yPercent: 14, ease: 'none', scrollTrigger: scrollOut });
    });

    return () => mm.revert();
  }, [introDone]);

  return (
    <section className={`hero ${introDone ? 'is-ready' : ''}`} id="inicio" ref={rootRef}>
      <div className="hero__top mono" data-hero-fade>
        <span>Portafolio · 2026</span>
        <span>{profile.location}</span>
      </div>

      <h1 className="hero__name" aria-label={profile.name}>
        <SplitLine text={firstName} className="hero__line--a" />
        <SplitLine text={lastName} className="hero__line--b" />
      </h1>

      <div className="hero__grid">
        <figure className="hero__photo">
          <div className="hero__photo-frame">
            <img src={profile.photo} alt={`Retrato de ${profile.name}`} />
          </div>
          <figcaption className="mono" data-hero-fade>Fig. 0 — {profile.name}</figcaption>
        </figure>

        <p className="hero__statement" data-hero-fade>{profile.statement}</p>

        <dl className="hero__spec">
          {profile.spec.map((row) => (
            <div key={row.label} data-hero-fade>
              <dt className="mono">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#trabajo" className="hero__cue mono" data-hero-fade onClick={onScrollToWork}>
        <span>{projectCount} casos de estudio</span>
        <span aria-hidden="true" className="hero__cue-arrow">↓</span>
      </a>
    </section>
  );
}

export default Hero;
