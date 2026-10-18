import { useEffect, useRef, useState } from 'react';
import './styles/portfolio.css';
import { profile, experience, practices, capabilities, recognitions, certifications } from './data/profile';
import { projects } from './data/projects';
import { gsap, ScrollTrigger, SplitText, scrollToTarget, startSmoothScroll } from './lib/motion';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkIndex from './components/WorkIndex';
import CaseStudy from './components/CaseStudy';
import Profile from './components/Profile';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';

function App() {
  const rootRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [preloaderGone, setPreloaderGone] = useState(false);
  const [figure, setFigure] = useState(null);
  // Cases start collapsed; a #caso-<id> link opens that one
  const [openCases, setOpenCases] = useState(() => {
    const id = window.location.hash.replace('#caso-', '');
    return new Set(projects.some((project) => project.id === id) ? [id] : []);
  });

  const toggleCase = (id, open) =>
    setOpenCases((current) => {
      const next = new Set(current);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });

  const openCase = (id) => {
    toggleCase(id, true);
    scrollToTarget(`#caso-${id}`);
  };

  useEffect(() => {
    if (!introDone) return undefined;
    return startSmoothScroll();
  }, [introDone]);

  // Scroll-triggered reveals shared by every section: [data-split] headings and
  // paragraphs rise line by line, [data-fade] blocks fade up, images unveil.
  useEffect(() => {
    if (!introDone) return undefined;

    const mm = gsap.matchMedia(rootRef.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-split]').forEach((element) => {
        SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.07,
              scrollTrigger: { trigger: element, start: 'top 88%', once: true }
            })
        });
      });

      gsap.utils.toArray('[data-fade]').forEach((element) => {
        gsap.from(element, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true }
        });
      });

      gsap.utils.toArray('[data-reveal-image]').forEach((element) => {
        const frame = element.querySelector('.case__cover-frame');
        const image = element.querySelector('img');
        gsap.from(frame, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: element, start: 'top 80%', once: true }
        });
        // Zoom solo durante la entrada; la imagen termina a escala 1 para que se lea nítida
        gsap.from(image, {
          scale: 1.08,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start: 'top 80%', once: true }
        });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [introDone]);

  return (
    <div className="portfolio" ref={rootRef}>
      <a className="skip-link" href="#trabajo">Saltar al trabajo</a>
      {!preloaderGone && <Preloader onReveal={setIntroDone} onFinish={setPreloaderGone} />}

      <Header name={profile.shortName} />

      <main>
        <Hero
          profile={profile}
          projectCount={projects.length}
          introDone={introDone}
          onScrollToWork={(event) => {
            event.preventDefault();
            scrollToTarget('#trabajo');
          }}
        />

        <Profile
          profile={profile}
          experience={experience}
          practices={practices}
          capabilities={capabilities}
          certifications={certifications}
        />

        <section className="section work" id="trabajo" aria-labelledby="trabajo-title">
          <header className="section-head">
            <p className="eyebrow">(02) Trabajo seleccionado</p>
            <h2 className="section-title" id="trabajo-title" data-split>
              Cinco sistemas, explicados por dentro.
            </h2>
            <p className="section-intro prose" data-fade>
              Cada caso recorre el contexto, la arquitectura paso a paso, las decisiones con su costo y lo que cambiaría hoy. Abre el que te interese para ver el detalle.
            </p>
          </header>
          <WorkIndex projects={projects} onSelect={openCase} />
        </section>

        <div className="cases">
          {projects.map((project) => (
            <CaseStudy
              key={project.id}
              project={project}
              open={openCases.has(project.id)}
              onToggle={(open) => toggleCase(project.id, open)}
              onOpenFigure={setFigure}
            />
          ))}
        </div>

        <Recognition items={recognitions} introDone={introDone} />

        <Contact profile={profile} />
      </main>

      <Lightbox figure={figure} onClose={() => setFigure(null)} />
    </div>
  );
}

export default App;
