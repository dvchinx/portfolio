import { useEffect, useRef, useState } from 'react';
import './styles/portfolio.css';
import * as profileData from './data/profile';
import { projects as projectsData } from './data/projects';
import { LangContext, localize, strings } from './i18n';
import { gsap, ScrollTrigger, scrollToTarget, startSmoothScroll } from './lib/motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CaseStudy from './components/CaseStudy';
import SectionHead from './components/SectionHead';
import Education from './components/Education';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';

function App({ lang }) {
  const t = strings[lang];
  const { profile, experience, practices, capabilities, recognitions, rankings, certifications } = localize(profileData, lang);
  const projects = localize(projectsData, lang);
  const rootRef = useRef(null);
  const [figure, setFigure] = useState(null);
  // Cases start collapsed, also in the prerendered HTML; a #caso-<id> link
  // opens that one after hydration
  const [openCases, setOpenCases] = useState(() => new Set());

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

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    const id = window.location.hash.replace('#caso-', '');
    if (projects.some((project) => project.id === id)) openCase(id);
    // Only the hash present on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-triggered reveals shared by every section: [data-fade] blocks fade
  // up, case covers unveil.
  useEffect(() => {
    const mm = gsap.matchMedia(rootRef.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // fromTo: the prerendered HTML starts these hidden (`.motion` in index.html)
      gsap.utils.toArray('[data-fade]').forEach((element) => {
        gsap.fromTo(element, { y: 24, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true }
        });
      });

      gsap.utils.toArray('[data-reveal-image]').forEach((element) => {
        gsap.from(element.querySelector('.case__cover-frame'), {
          clipPath: 'inset(0% 0% 100% 0% round 16px)',
          duration: 1.3,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: element, start: 'top 80%', once: true }
        });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, []);

  return (
    <LangContext value={lang}>
      <div className="portfolio" ref={rootRef}>
        <a className="skip-link" href="#experiencia">{t.skipLink}</a>

        <Header name={profile.name} />

        <main>
          <Hero profile={profile} />

          <Experience intro={profile.about.work} experience={experience} practices={practices} />

          <Achievements intro={profile.about.competition} items={recognitions} rankings={rankings} onOpenFigure={setFigure} />

          <Skills capabilities={capabilities} />

          <section className="section container" id="proyectos" aria-labelledby="proyectos-title">
            <SectionHead
              id="proyectos"
              title={t.projects.title}
              intro={t.projects.intro}
            />
            <Projects projects={projects} github={profile.github} onSelect={openCase} />

            <h3 className="subsection-title subsection-title--rule" data-fade>{t.projects.cases}</h3>
            <div className="stack">
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
          </section>

          <Education certifications={certifications} />

          <Contact profile={profile} />
        </main>

        <Lightbox figure={figure} onClose={() => setFigure(null)} />
      </div>
    </LangContext>
  );
}

export default App;
