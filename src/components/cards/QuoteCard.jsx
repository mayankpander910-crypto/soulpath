import './Cards.css';

export default function QuoteCard({ testimonial }) {
  const { quote, name, city } = testimonial;

  return (
    <figure className="quote-card" role="listitem">
      <span className="quote-card__mark" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="quote-card__text">{quote}</blockquote>
      <figcaption className="quote-card__person">
        <span className="quote-card__avatar" aria-hidden="true">
          {name.charAt(0)}
        </span>
        <span>
          <span className="quote-card__name">{name}</span>
          <br />
          <span className="quote-card__city">{city}</span>
        </span>
      </figcaption>
    </figure>
  );
}
