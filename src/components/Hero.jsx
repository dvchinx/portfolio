import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { BrandIcon, Icon } from '../lib/icons';
import Rich from './Rich';
import { useStrings } from '../i18n';

function Hero({ profile }) {
  const t = useStrings();
  const rootRef = useRef(null);

  const socials = [
    { label: 'GitHub', href: profile.github, icon: <BrandIcon name="github" /> },
    { label: 'LinkedIn', href: profile.linkedin, icon: <BrandIcon name="linkedin" /> },
    { label: t.hero.email, href: `mailto:${profile.email}`, icon: <Icon name="mail" /> },
    { label: 'Blog', href: profile.blog, icon: <Icon name="pen" /> }
  ];

  // Layout effect: the from-states must be applied before the first painted frame.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // fromTo: the prerendered HTML starts these hidden (`.motion` in index.html)
      gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } })
        .fromTo('[data-hero-in]', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 })
        .fromTo('.hero__photo', { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.3 }, 0.15);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="hero container" id="inicio" ref={rootRef}>
      <div className="hero__text">
        <h1 className="hero__title" data-hero-in aria-label={`${t.hero.greeting} ${profile.name}`}>
          {t.hero.greeting} <span className="hero__name">{profile.name}</span>
        </h1>
        <p className="hero__headline" data-hero-in>
          <Rich text={profile.headline} />
        </p>
        <hr className="hero__rule" data-hero-in />
        <p className="hero__highlights" data-hero-in>
          <Rich text={profile.highlights} />
        </p>
        <ul className="hero__socials" data-hero-in>
          {socials.map((social) => (
            <li key={social.label}>
              <a
                className="icon-button"
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__photo">
        <img
          src={profile.photo}
          alt={t.hero.photoAlt(profile.name)}
          width="1186"
          height="1599"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

export default Hero;
