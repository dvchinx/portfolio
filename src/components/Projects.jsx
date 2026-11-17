import { BrandIcon, Icon } from '../lib/icons';

const VISIBLE_TAGS = 5;
const VISIBLE_STATS = 2;

function Projects({ projects, github, onSelect }) {
  return (
    <ul className="grid grid--3 project-grid">
      {projects.map((project) => (
        <li key={project.id} className="card project-card" data-fade>
          <header className="project-card__head">
            <span className="logo-tile" aria-hidden="true">
              {project.liveUrl ? <Icon name="globe" size={18} /> : <BrandIcon name="github" size={18} />}
            </span>
            <div>
              <p className="kicker">
                {project.kind}
              </p>
              <h3 className="project-card__title">{project.title}</h3>
            </div>
          </header>

          <p className="project-card__lede">{project.lede}</p>

          <ul className="dot-list" aria-label="Stack">
            {project.stack.slice(0, VISIBLE_TAGS).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          {project.stats && (
            <ul className="project-card__stats">
              {project.stats.slice(0, VISIBLE_STATS).map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong> {stat.label}
                </li>
              ))}
            </ul>
          )}

          <footer className="project-card__links">
            <a
              href={`#caso-${project.id}`}
              className="text-link text-link--strong"
              onClick={(event) => {
                event.preventDefault();
                onSelect(project.id);
              }}
            >
              Leer el caso <Icon name="chevron" size={12} />
            </a>
            {project.liveUrl && (
              <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                En vivo <Icon name="arrow" size={10} />
              </a>
            )}
            {project.repoUrl && (
              <a className="text-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Código <Icon name="arrow" size={10} />
              </a>
            )}
          </footer>
        </li>
      ))}

      <li className="card project-card project-card--more" data-fade>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <span className="logo-tile logo-tile--lg" aria-hidden="true">
            <BrandIcon name="github" size={28} />
          </span>
          <span className="project-card__title">Más proyectos en GitHub</span>
          <span className="text-link">
            {github.replace('https://', '')} <Icon name="arrow" size={10} />
          </span>
        </a>
      </li>
    </ul>
  );
}

export default Projects;
