import { Link } from 'react-router-dom';
import Arrow from '../ui/Arrow';
import './Cards.css';

export default function PackageCard({ pkg }) {
  const { slug, title, country, duration, image, included, price, priceOld, popular } = pkg;
  const highlights = included.slice(0, 3);
  const remaining = included.length - highlights.length;

  return (
    <article className="card package-card" role="listitem">
      <Link className="card__media" to={`/packages/${slug}`} aria-label={title}>
        <img src={`/assets/images/${image}`} alt={title} loading="lazy" />
        {popular ? (
          <div className="card__badges">
            <span className="label card__badge">Popular</span>
          </div>
        ) : null}
      </Link>

      <div className="card__body">
        <p className="label card__eyebrow">
          <span>{duration}</span>
          <span>{country}</span>
        </p>

        <h3 className="display display--sm card__title">
          <Link to={`/packages/${slug}`}>{title}</Link>
        </h3>

        <ul className="card__features">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {remaining > 0 ? <li>+{remaining} more</li> : null}
        </ul>

        <div className="card__foot">
          <div className="card__price">
            <span className="card__price-label">Starting from</span>
            <span className="card__amount">
              {priceOld ? <s>{priceOld}</s> : null}
              {price}
            </span>
          </div>
          <Link className="card__cta" to={`/packages/${slug}`}>
            View Details <Arrow size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
