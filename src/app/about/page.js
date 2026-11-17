import Link from 'next/link';
import { getDestinations, getSiteSettings } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero, SectionHead, StatsStrip } from '@/components/ui';
import { Reveal, Counter } from '@/components/Reveal';
import { ArrowRight, Check } from '@/components/Icons';
import { BENEFITS, BRAND } from '@/lib/content';

export const revalidate = 300;

export const metadata = {
  title: 'About Us',
  description:
    'SoulPath Holiday is an Ahmedabad-based travel company specialising in personalised international holidays to 50+ destinations, with transparent pricing and 24/7 support.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  'Personalised itineraries — never a template',
  'Transparent pricing with clear inclusions',
  'Vetted hotels, transfers and local partners',
  'A single point of contact from enquiry to return',
];

export default async function AboutPage() {
  const [settings, destinations] = await Promise.all([getSiteSettings(), getDestinations()]);
  const c = settings?.companyDetails || {};
  const heroImage = destinations[1]?.heroImage || destinations[0]?.heroImage;

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Travel, planned with care"
        sub="SoulPath Holiday is an Ahmedabad-based travel company crafting personalised international journeys since 2021."
        image={heroImage}
        crumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <div className="container">
          <div className="about">
            <div className="about__copy">
              <span className="eyebrow">Our story</span>
              <h2 className="h2">
                Your trusted travel partner <em>since {BRAND.since}</em>
              </h2>
              <p>{BRAND.description}</p>
              <p>{BRAND.description2}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--olive)' }}>
                {BRAND.signoff}
              </p>

              <ul className="inclusion-list" style={{ marginTop: '0.4rem' }}>
                {VALUES.map((v) => (
                  <li key={v}>
                    <Check size={15} /> {v}
                  </li>
                ))}
              </ul>

              <div className="about__stats">
                <div className="about__stat">
                  <b>
                    <Counter value={50} suffix="+" />
                  </b>
                  <span>Destinations</span>
                </div>
                <div className="about__stat">
                  <b>
                    <Counter value={500} suffix="+" />
                  </b>
                  <span>Travellers hosted</span>
                </div>
                <div className="about__stat">
                  <b>
                    <Counter value={24} suffix="/7" />
                  </b>
                  <span>On-trip support</span>
                </div>
              </div>
            </div>

            <div className="about__collage">
              {destinations.slice(0, 3).map((d) => (
                <figure key={d._id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl(d.heroImage)} alt={d.name} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Company information"
            title="Who you're travelling with"
            sub="A small, specialist team in Ahmedabad — real people you can call before, during and after your trip."
          />
          <div className="service-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { label: 'Legal name', value: c.legalName || BRAND.legalName },
              { label: 'Incorporated', value: BRAND.incorporated },
              { label: 'Headquarters', value: 'Ahmedabad, Gujarat, India' },
              { label: 'Team', value: 'Travel designers + on-trip support' },
              { label: 'Languages', value: 'English, Hindi, Gujarati' },
            ]
              .filter((x) => x.value)
              .map((x, i) => (
                <Reveal className="service-card" key={x.label} delay={i * 50}>
                  <span className="eyebrow eyebrow--plain" style={{ fontSize: '0.6rem' }}>
                    {x.label}
                  </span>
                  <p style={{ fontSize: '0.98rem', color: 'var(--charcoal)' }}>{x.value}</p>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="section section--olive">
        <div className="container">
          <SectionHead
            eyebrow="Why travel with us"
            title="The way we work"
            sub="Four promises that shape every itinerary we send."
            light
          />
          <div className="benefits">
            {BENEFITS.map((b, i) => (
              <Reveal className="benefit" key={b.title} delay={i * 70}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <StatsStrip items={[{ value: '2021', label: 'Founded' }, { value: '4.9/5', label: 'Guest rating' }, { value: '50+', label: 'Destinations' }]} />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <Link href="/packages" className="btn btn--light">
              Explore packages <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn btn--ghost-light">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
