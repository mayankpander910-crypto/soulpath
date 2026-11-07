import { Link } from 'react-router-dom';
import Arrow from '../ui/Arrow';
import './Cards.css';

export default function DestinationCard({ destination }) {
  const { name, country, packages, image } = destination;

  return (
    <article className="card destination-card" role="listitem">
      <Link className="card__media" to="/destinations" aria-label={`${name} — ${packages} packages`}>
        <img src={`/assets/images/${image}`} alt={name} loading="lazy" />
        <div className="card__badges">
          <span className="label card__badge">
            {packages} {packages === 1 ? 'Package' : 'Packages'}
          </span>
        </div>
      </Link>

      <div className="card__body">
        <p className="label card__eyebrow">
          <span>{country}</span>
        </p>
        <h3 className="display display--sm card__title">
          <Link to="/destinations">{name}</Link>
        </h3>
        <p className="card__note">{destination.note}</p>
        <div className="card__foot">
          <Link className="card__cta" to="/packages">
            View Packages <Arrow size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
