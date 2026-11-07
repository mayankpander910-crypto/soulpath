import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { packages } from '../data/packages';
import Button from '../components/ui/Button';
import Arrow from '../components/ui/Arrow';
import PackageCard from '../components/cards/PackageCard';
import NotFound from './NotFound';
import './PackageDetail.css';

export default function PackageDetail() {
  const { slug } = useParams();
  const pkg = packages.find((item) => item.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!pkg) return <NotFound />;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const related = packages.filter((item) => item.category === pkg.category && item.slug !== pkg.slug).slice(0, 4);

  return (
    <article className="pkg">
      {/* Opener ---------------------------------------------------- */}
      <header className="pkg__head">
        <div className="pkg__head-media">
          <img src={`/assets/images/${pkg.image}`} alt={pkg.title} />
        </div>

        <div className="pkg__head-inner shell">
          <nav className="label pkg__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/packages">Packages</Link>
            <span aria-hidden="true">/</span>
            <span>{pkg.country}</span>
          </nav>

          <p className="label pkg__meta">
            <span>{pkg.duration}</span>
            <span>{pkg.country}</span>
            {pkg.popular ? <span>Popular</span> : null}
          </p>

          <h1 className="display display--xl pkg__title">{pkg.title}</h1>
        </div>
      </header>

      <div className="shell pkg__layout">
        <div className="pkg__main">
          <section className="pkg__block" data-reveal>
            <h2 className="label text-forest">Tour Overview</h2>
            <p className="pkg__overview">{pkg.overview}</p>
          </section>

          <section className="pkg__block" data-reveal>
            <h2 className="label text-forest">What&rsquo;s Included</h2>
            <div className="pkg__lists">
              <div>
                <h3 className="pkg__list-title">Included in Base Price</h3>
                <ul className="pkg__list pkg__list--yes">
                  {pkg.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="pkg__list-title">Not Included</h3>
                <ul className="pkg__list pkg__list--no">
                  {pkg.notIncluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="pkg__block" data-reveal>
            <div className="pkg__itinerary-head">
              <h2 className="display display--md">Day-by-Day Itinerary</h2>
              <a className="pkg__pdf label" href="#" onClick={(event) => event.preventDefault()}>
                Download Itinerary <Arrow size={13} />
              </a>
            </div>

            <ol className="pkg__days">
              {pkg.itinerary.map((day) => (
                <li key={day.day} className="pkg__day">
                  <span className="label pkg__day-index">D{day.day}</span>
                  <div className="pkg__day-body">
                    <h3 className="display display--sm pkg__day-title">{day.title}</h3>
                    <ul className="pkg__day-items">
                      {day.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Booking panel ------------------------------------------- */}
        <aside className="pkg__aside">
          <div className="pkg__panel">
            <p className="label pkg__panel-label">Price per person starting from</p>
            <p className="pkg__price">
              {pkg.priceOld ? <s>{pkg.priceOld}</s> : null}
              {pkg.price}
            </p>
            <p className="pkg__price-note">excl. taxes</p>

            <ul className="pkg__assurances">
              <li>Secure Payment</li>
              <li>Partner discount codes accepted</li>
              <li>Flexible rescheduling options</li>
            </ul>

            <Button to="/contact" variant="solid" className="btn--block">
              Proceed to Booking
            </Button>
            <Button to="/contact" variant="outline" className="btn--block pkg__panel-secondary">
              Request Custom Proposal
            </Button>

            <div className="pkg__share">
              <p className="label pkg__panel-label">Share this itinerary</p>
              <div className="pkg__share-row">
                <button type="button" className="pkg__share-btn label" onClick={copyLink}>
                  {copied ? 'Link Copied' : 'Copy Link'}
                </button>
                <a
                  className="pkg__share-btn label"
                  href={`https://wa.me/?text=${encodeURIComponent(pkg.title)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Share Tour
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="section shell">
          <h2 className="display display--lg pkg__related-title">More {pkg.category} journeys</h2>
          <div className="grid-cards">
            {related.map((item) => (
              <PackageCard key={item.slug} pkg={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
