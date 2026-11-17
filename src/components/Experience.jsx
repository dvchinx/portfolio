import { Icon, TechIcon } from '../lib/icons';
import Rich from './Rich';
import SectionHead from './SectionHead';

function Experience({ intro, experience, practices }) {
  return (
    <section className="section container" id="experiencia" aria-labelledby="experiencia-title">
      <SectionHead id="experiencia" title="Experiencia" intro={intro} />

      <div className="stack">
        {experience.map((job) => (
          <article key={`${job.company}-${job.role}`} className="card job" data-fade>
            <aside className="job__side">
              <span className="logo-tile logo-tile--lg" aria-hidden="true">
                {job.logo ? <img className="logo-tile__img" src={job.logo} alt="" /> : job.company[0]}
              </span>
              <h3 className="job__company">{job.company}</h3>
              <p className="job__role-short">{job.role}</p>
              <ul className="meta-list">
                <li>
                  <Icon name="calendar" size={13} />
                  {job.period}
                </li>
              </ul>
              <a className="text-link" href={job.url} target="_blank" rel="noopener noreferrer">
                Sitio web <Icon name="arrow" size={10} />
              </a>
            </aside>

            <div className="job__main">
              <header className="job__head">
                <h4 className="job__role">{job.role}</h4>
                <p className="job__period">
                  <Icon name="calendar" size={12} />
                  {job.period}
                </p>
              </header>
              {job.summary && <p className="job__summary">{job.summary}</p>}
              <ul className="chips chips--small" aria-label="Stack">
                {job.stack.map((tech) => (
                  <li key={tech} className="chip">
                    <TechIcon name={tech} size={12} />
                    {tech}
                  </li>
                ))}
              </ul>
              <ul className="bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Rich text={bullet} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <h3 className="subsection-title" data-fade>Cómo trabajo</h3>
      <ul className="grid grid--3">
        {practices.map((practice) => (
          <li key={practice.title} className="card feature-card" data-fade>
            <header className="feature-card__head">
              <span className="logo-tile" aria-hidden="true">
                <Icon name={practice.icon} size={18} />
              </span>
              <div>
                <p className="kicker">{practice.area}</p>
                <h4 className="feature-card__title">{practice.title}</h4>
              </div>
            </header>
            <p className="feature-card__body">{practice.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
