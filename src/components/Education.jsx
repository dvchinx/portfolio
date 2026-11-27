import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, scrollToTarget } from '../lib/motion';
import { Icon } from '../lib/icons';
import SectionHead from './SectionHead';
import { useStrings } from '../i18n';

const VISIBLE_CERTIFICATIONS = 8;

// Degrees get their own cards; everything else goes to the list
const DEGREE_KIND = 'Título';
// Unknown kinds go after the known ones
const KIND_ORDER = ['Diplomado', 'Certificación', 'Curso', 'Badge'];
// These institutions close the list, in this order, whatever their kind
const INSTITUTIONS_LAST = ['Cisco Networking Academy', 'MongoDB', 'Platzi'];

function groupRank({ kind, institution }) {
  const last = INSTITUTIONS_LAST.indexOf(institution);
  if (last >= 0) return KIND_ORDER.length + 1 + last;
  return KIND_ORDER.includes(kind) ? KIND_ORDER.indexOf(kind) : KIND_ORDER.length;
}

/**
 * Orders by kind (diplomas, then certifications, then courses), with
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

const initials = (institution) =>
  institution
    .split(' ')
    .filter((word) => /^[A-ZÁÉÍÓÚ]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

function Education({ certifications }) {
  const t = useStrings().education;
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);
  const toggled = useRef(false);
  const degrees = certifications.filter((cert) => cert.kind === DEGREE_KIND);
  const sorted = sortCertifications(certifications.filter((cert) => cert.kind !== DEGREE_KIND));
  const visible = showAll ? sorted : sorted.slice(0, VISIBLE_CERTIFICATIONS);

  // Reveals below measured their start with the shorter list
  useEffect(() => {
    if (!toggled.current) return;
    ScrollTrigger.refresh();
    if (!showAll) scrollToTarget(listRef.current);
  }, [showAll]);

  return (
    <section className="section container" id="formacion" aria-labelledby="formacion-title">
      <SectionHead id="formacion" title={t.title} />

      <ul className="card degrees" data-fade>
        {degrees.map((degree) => (
          <li key={degree.title} className="degree">
            <span className="logo-tile logo-tile--lg" aria-hidden="true">
              {degree.logo ? (
                <img className="logo-tile__img" src={degree.logo} alt="" />
              ) : (
                initials(degree.institution)
              )}
            </span>
            <div>
              <span className="badge">{t.kinds[degree.kind] ?? degree.kind}</span>
              <h3 className="degree__institution">{degree.institution}</h3>
              <p className="degree__title">{degree.title}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="certs" ref={listRef}>
        <div className="certs__head">
          <h3 className="subsection-title">{t.certifications}</h3>
          <p className="certs__count">{t.count(sorted.length)}</p>
        </div>
        <ul className="grid grid--2 certs__list" id="certs-list">
          {visible.map((cert) => (
            <li key={cert.title} className="cert">
              <span className="logo-tile logo-tile--sm" aria-hidden="true">
                <Icon name="award" size={14} />
              </span>
              <div>
                <p className="cert__title">{cert.title}</p>
                <p className="cert__institution">{cert.institution}</p>
              </div>
              <span className="badge">{t.kinds[cert.kind] ?? cert.kind}</span>
            </li>
          ))}
        </ul>
        {sorted.length > VISIBLE_CERTIFICATIONS && (
          <button
            type="button"
            className="button"
            aria-expanded={showAll}
            aria-controls="certs-list"
            onClick={() => {
              toggled.current = true;
              setShowAll((value) => !value);
            }}
          >
            {showAll ? t.showLess : t.showAll(sorted.length)}
            <Icon name={showAll ? 'up' : 'chevron'} size={14} />
          </button>
        )}
      </div>
    </section>
  );
}

export default Education;
