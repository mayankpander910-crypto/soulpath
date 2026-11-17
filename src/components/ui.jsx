import Link from 'next/link';
import { mediaUrl } from '@/lib/config';
import { packagePrice } from '@/lib/api';
import { Reveal } from './Reveal';
import { ArrowRight, ArrowUpRight, Star } from './Icons';

/* ------------------------------- section head ----------------------------- */

export function SectionHead({ eyebrow, title, sub, action, center = false, light = false }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      <div className="section-head__text">
        {eyebrow && (
          <span className="eyebrow" style={light ? { color: 'rgba(217,201,181,0.9)' } : undefined}>
            {eyebrow}
          </span>
        )}
        {title && <h2 className="h2" dangerouslySetInnerHTML={{ __html: title }} />}
        {sub && <p className="lede" style={light ? { color: 'rgba(248,245,239,0.75)' } : undefined}>{sub}</p>}
      </div>
      {action && (
        <Link href={action.href} className={`link-arrow${light ? ' link-arrow--light' : ''}`}>
          {action.label} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

/* --------------------------------- page hero ------------------------------ */

export function PageHero({ eyebrow, title, sub, image, video, children, crumbs }) {
  const hasMedia = Boolean(image || video);
  return (
    <section className={`page-hero${hasMedia ? ' page-hero--media' : ''}`}>
      {hasMedia && (
        <div className="page-hero__bg" aria-hidden="true">
          {video ? (
            <video src={mediaUrl(video)} poster={image ? mediaUrl(image) : undefined} autoPlay muted loop playsInline preload="metadata" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaUrl(image)} alt="" fetchPriority="high" />
          )}
        </div>
      )}
      {crumbs && (
        <nav className="container breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
              <span aria-hidden="true">/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="container page-hero__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-hero__sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------- package card ----------------------------- */

export function PackageCard({ pkg, delay = 0, showSave = false }) {
  const price = packagePrice(pkg);
  const image = mediaUrl(pkg.heroImage);
  const href = `/packages/${pkg.slug}`;
  const destination = pkg.destination?.name;
  const highlights = (pkg.compulsoryInclusions || []).map((i) => i.name).filter(Boolean);
  const inclusions = highlights.length ? highlights : pkg.inclusions || [];

  return (
    <Reveal className="pkg-card" delay={delay}>
      <div className="pkg-card__media">
        <Link href={href} aria-label={pkg.title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={pkg.title} loading="lazy" decoding="async" />
        </Link>
        <div className="pkg-card__flags">
          {pkg.category && <span className="tag">{pkg.category}</span>}
          {pkg.popular && <span className="tag">Popular</span>}
          {pkg.hasOffer && pkg.pricing?.offerPrice ? <span className="tag">Offer</span> : null}
        </div>
      </div>

      <div className="pkg-card__top">
        <h3 className="pkg-card__title">
          <Link href={href}>{pkg.title}</Link>
        </h3>
      </div>

      <div className="pkg-card__meta">
        {pkg.duration?.nights ? (
          <span>
            {pkg.duration.nights}N / {pkg.duration.days}D
          </span>
        ) : null}
        {destination && <span>{destination}</span>}
        {pkg.rating > 0 && (
          <span>
            <Star size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {pkg.rating}
          </span>
        )}
      </div>

      {inclusions.length > 0 && <p className="pkg-card__inc">{inclusions.slice(0, 4).join(' · ')}</p>}

      <div className="pkg-card__foot">
        <div className="pkg-card__price">
          <small>{price.custom ? 'Tailor-made' : 'Starting from'}</small>
          {price.text}
          {price.strike && <s>{price.strike}</s>}
        </div>
        <Link href={href} className="pkg-card__link">
          View details <ArrowUpRight size={13} />
        </Link>
      </div>
    </Reveal>
  );
}

/* ----------------------------- destination tile --------------------------- */

export function DestTile({ destination, size = 'default', delay = 0 }) {
  const cls = `dest-tile${size === 'hero' ? ' dest-tile--hero' : size === 'tall' ? ' dest-tile--tall' : ''}`;
  return (
    <Reveal as="div" className={cls} delay={delay}>
      <Link href={`/destinations/${destination.slug}`} aria-label={`Explore ${destination.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="dest-tile__img"
          src={mediaUrl(destination.heroImage)}
          alt={destination.name}
          loading="lazy"
          decoding="async"
        />
        <span className="dest-tile__scrim" aria-hidden="true" />
        <span className="dest-tile__body">
          <span className="dest-tile__region">{destination.region || destination.country}</span>
          <span className="dest-tile__name">{destination.name}</span>
          {typeof destination.packageCount === 'number' && (
            <span className="dest-tile__meta">
              {destination.packageCount} {destination.packageCount === 1 ? 'package' : 'packages'}
            </span>
          )}
          <span className="dest-tile__go">
            Explore <ArrowUpRight size={13} />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/* -------------------------------- empty state ----------------------------- */

export function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <h3 className="h3">{title}</h3>
      <p className="lede" style={{ textAlign: 'center' }}>
        {text}
      </p>
      {action && (
        <Link href={action.href} className="btn btn--dark">
          {action.label} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

/* ---------------------------------- stats -------------------------------- */

export function StatsStrip({ items }) {
  return (
    <div className="stats-strip">
      {items.map((s) => (
        <div key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
