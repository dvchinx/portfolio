import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, scrollToTarget } from '../lib/motion';

const VISIBLE_CERTIFICATIONS = 8;

// Unknown kinds go after the known ones
const KIND_ORDER = ['Título', 'Diplomado', 'Certificación', 'Curso', 'Badge'];
// These institutions close the list, in this order, whatever their kind
const INSTITUTIONS_LAST = ['Cisco Networking Academy', 'MongoDB', 'Platzi'];

function groupRank({ kind, institution }) {
  const last = INSTITUTIONS_LAST.indexOf(institution);
  if (last >= 0) return KIND_ORDER.length + 1 + last;
  return KIND_ORDER.includes(kind) ? KIND_ORDER.indexOf(kind) : KIND_ORDER.length;
}

/**
 * Orders by kind (titles, then certifications, then courses), with
 * INSTITUTIONS_LAST at the end. Entries from the same institution and kind stay
 * together, in order of first appearance.
 */
function sortCertifications(certifications) {
  const groups = new Map();
  certifications.forEach((cert) => {
    const key = `${groupRank(cert)}|${cert.institution}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(cert);
  });
  return [...groups.values()]
    .sort((a, b) => groupRank(a[0]) - groupRank(b[0]))
    .flat();
}

function Profile({ profile, experience, practices, capabilities, certifications }) {
  const [showAll, setShowAll] = useState(false);
  const certsRef = useRef(null);
  const toggled = useRef(false);
  const sorted = sortCertifications(certifications);
  const visible = showAll ? sorted : sorted.slice(0, VISIBLE_CERTIFICATIONS);

  // The pinned section below measured its start with the shorter list: without
  // a refresh it would pin on top of the expanded certifications.
  useEffect(() => {
    if (!toggled.current) return;
    ScrollTrigger.refresh();
    if (!showAll) scrollToTarget(certsRef.current);
  }, [showAll]);

  return (
    <section className="section profile" id="perfil" aria-labelledby="perfil-title">
      <header className="section-head">
        <p className="eyebrow">(01) Perfil</p>
        <h2 className="section-title" id="perfil-title" data-split>
          Backend de punta a punta.
        </h2>
      </header>

      <div className="profile__intro">
        <div className="profile__about">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="prose prose--large" data-split>{paragraph}</p>
          ))}
        </div>

        <div className="profile__experience">
          <h3 className="case__label">Experiencia</h3>
          {experience.map((job) => (
            <article key={job.company} className="job" data-fade>
              <header className="job__head">
                <p className="job__role">{job.role}</p>
                <p className="job__company">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    {job.company}
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
                <p className="mono job__period">{job.period}</p>
              </header>
              <ul className="job__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="mono job__stack">{job.stack.join(' · ')}</p>
            </article>
          ))}
        </div>
      </div>

      <ol className="practices">
        {practices.map((practice, i) => (
          <li key={practice.title} data-fade>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <h3>{practice.title}</h3>
            <p>{practice.body}</p>
          </li>
        ))}
      </ol>

      <div className="capabilities">
        <h3 className="case__label">Capacidades</h3>
        <div className="capabilities__grid">
          {capabilities.map((group) => (
            <section key={group.domain} className="capabilities__group" data-fade>
              <h4>{group.domain}</h4>
              <dl>
                {group.items.map((item) => (
                  <div key={item.name} className="capability">
                    <dt>
                      {item.name}
                      <span className="mono capability__level">{item.level}</span>
                    </dt>
                    <dd>{item.evidence}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>

      <div className="certs" ref={certsRef}>
        <div className="certs__head">
          <h3 className="case__label">Formación y certificaciones</h3>
          <p className="mono">{certifications.length} registros</p>
        </div>
        <ol className="certs__list" id="certs-list">
          {visible.map((cert, i) => (
            <li key={cert.title}>
              <span className="mono certs__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="certs__title">{cert.title}</span>
              <span className="certs__inst">{cert.institution}</span>
              <span className="mono certs__kind">{cert.kind}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="button-line"
          aria-expanded={showAll}
          aria-controls="certs-list"
          onClick={() => {
            toggled.current = true;
            setShowAll((value) => !value);
          }}
        >
          {showAll ? 'Mostrar menos' : `Ver los ${certifications.length}`}
        </button>
      </div>
    </section>
  );
}

export default Profile;
