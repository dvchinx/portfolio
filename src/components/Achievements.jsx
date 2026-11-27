import { Icon } from '../lib/icons';
import { profile } from '../data/profile';
import SectionHead from './SectionHead';
import { useStrings } from '../i18n';

const GRID_SIZE = 3;

function Photo({ item, className, onOpen }) {
  const t = useStrings();
  return (
    <button
      type="button"
      className={`photo-button ${className}`}
      onClick={() => onOpen({ title: `${item.label} · ${item.event}`, src: item.image })}
      aria-label={t.achievements.viewPhoto(item.label)}
    >
      {/* The button's aria-label is what assistive tech reads; alt describes the photo for image search */}
      <img src={item.image} alt={t.achievements.photoAlt(profile.name, item.label, item.event)} loading="lazy" />
    </button>
  );
}

/** One featured result, a grid of cards and the rest as a compact list. */
function Achievements({ intro, items, rankings = [], onOpenFigure }) {
  const t = useStrings();
  const { rankTitle, rankShort } = t.achievements;
  const featured = items.find((item) => item.featured) ?? items[0];
  const rest = items.filter((item) => item !== featured);
  const grid = rest.slice(0, GRID_SIZE);
  const more = rest.slice(GRID_SIZE);

  return (
    <section className="section container" id="logros" aria-labelledby="logros-title">
      <SectionHead id="logros" title={t.achievements.title} intro={intro} />

      {rankings.length > 0 && (
        <ul className="grid grid--2 ranking-list" aria-label={t.achievements.rankings}>
          {rankings.map((item) => (
            <li key={item.id} className="card ranking" data-fade>
              <span className="logo-tile" aria-hidden="true">
                {item.logo ? (
                  <img className="logo-tile__img" src={item.logo} alt="" />
                ) : (
                  <Icon name="trophy" size={20} />
                )}
              </span>
              <div className="ranking__body">
                <h3 className="ranking__title">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.platform}</a>
                  ) : (
                    item.platform
                  )}
                </h3>
                <p className="ranking__text">{t.achievements.ranking(item.scope)}</p>
              </div>
              <span className="rank rank--lg">{item.rank}</span>
            </li>
          ))}
        </ul>
      )}

      <article className="card award-featured" data-fade>
        <Photo item={featured} className="award-featured__photo" onOpen={onOpenFigure} />
        <div className="award-featured__body">
          <span className="rank rank--lg" title={rankTitle(featured.rank)}>{rankShort(featured.rank)}</span>
          <h3 className="award-featured__title">{featured.event}</h3>
          <p className="award-featured__text">
            {t.achievements.featured(rankTitle(featured.rank), featured.label)}
          </p>
          <p className="meta-inline">
            <Icon name="calendar" size={13} />
            {featured.date}
          </p>
        </div>
      </article>

      <ul className="grid grid--3 award-grid">
        {grid.map((item) => (
          <li key={item.id} className="card award-card" data-fade>
            <div className="award-card__top">
              <Photo item={item} className="award-card__thumb" onOpen={onOpenFigure} />
              <div>
                <h3 className="award-card__title">{item.event}</h3>
                <p className="award-card__label">{item.label}</p>
              </div>
            </div>
            <footer className="award-card__foot">
              <span className="meta-inline">
                <Icon name="calendar" size={12} />
                {item.date}
              </span>
              <span className="rank" title={rankTitle(item.rank)}>{rankShort(item.rank)}</span>
            </footer>
          </li>
        ))}
      </ul>

      {more.length > 0 && (
        <>
          <h3 className="subsection-title subsection-title--rule" data-fade>{t.achievements.more}</h3>
          <ul className="grid grid--2 award-list">
            {more.map((item) => (
              <li key={item.id} className="award-row" data-fade>
                <Photo item={item} className="award-row__thumb" onOpen={onOpenFigure} />
                <div>
                  <h4 className="award-row__title">
                    {rankTitle(item.rank)} · {item.event}
                  </h4>
                  <p className="award-row__text">{item.label} · {item.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default Achievements;
