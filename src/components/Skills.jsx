import { Icon, TechIcon } from '../lib/icons';
import SectionHead from './SectionHead';

function Skills({ capabilities }) {
  return (
    <section className="section container" id="habilidades" aria-labelledby="habilidades-title">
      <SectionHead
        id="habilidades"
        title="Habilidades"
        intro="Cada herramienta con el lugar donde la usé, no solo el nombre."
      />

      <div className="grid grid--2">
        {capabilities.map((group) => (
          <section key={group.domain} className="card skill-group" data-fade>
            <h3 className="skill-group__title">
              <span className="logo-tile logo-tile--sm" aria-hidden="true">
                <Icon name={group.icon} size={14} />
              </span>
              {group.domain}
            </h3>
            <ul className="skill-group__items">
              {group.items.map((item) => (
                <li key={item.name} className="skill">
                  <div className="skill__head">
                    <ul className="chips" aria-label={item.name}>
                      {item.name.split(' · ').map((tech) => (
                        <li key={tech} className="chip">
                          <TechIcon name={tech} />
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <span className="level">{item.level}</span>
                  </div>
                  <p className="skill__evidence">{item.evidence}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Skills;
