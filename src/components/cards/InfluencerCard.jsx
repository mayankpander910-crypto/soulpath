import Arrow from '../ui/Arrow';
import './Cards.css';

export default function InfluencerCard({ creator }) {
  const { name, image, trips, nextTrip, upcoming, instagram } = creator;

  return (
    <article className="card influencer-card" role="listitem">
      <div className="card__media">
        <img src={`/assets/images/influencers/${image}`} alt={name} loading="lazy" />
      </div>

      <div className="card__body">
        <p className="label card__eyebrow">
          <span>{trips > 0 ? `${trips} ${trips === 1 ? 'Trip' : 'Trips'}` : 'Creator Collabs'}</span>
          {nextTrip ? <span className="influencer-card__trip">{upcoming || nextTrip}</span> : null}
        </p>

        <h3 className="display display--sm card__title">{name}</h3>

        <div className="card__foot">
          <a
            className="card__cta"
            href={instagram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${name} on Instagram`}
          >
            Instagram <Arrow size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
