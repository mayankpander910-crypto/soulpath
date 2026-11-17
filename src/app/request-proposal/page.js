import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { getPackages, getSiteSettings } from '@/lib/api';
import { CONTACT_FALLBACK } from '@/lib/config';
import { Check, Headset, Mail, Phone } from '@/components/Icons';
import ProposalForm from './ProposalForm';

export const metadata = {
  title: 'Plan Your Trip',
  description:
    'Request a free, tailor-made travel proposal from SoulPath Holiday — share your destination, dates and budget and a curator will design the itinerary.',
  alternates: { canonical: '/request-proposal' },
};

const PROMISES = [
  'A real human plans your itinerary — no bots, no templates',
  'Transparent pricing with clear inclusions before you commit',
  'No payment and no obligation to book',
];

export default async function RequestProposalPage({ searchParams }) {
  const sp = await searchParams;
  const first = (v) => (Array.isArray(v) ? v[0] : v) || '';
  const [settings, packages] = await Promise.all([getSiteSettings(), getPackages()]);
  const packageSlug = first(sp.package);
  const matched = packages.find((p) => p.slug === packageSlug);

  const phone = settings?.companyDetails?.phone || CONTACT_FALLBACK.phone;
  const email = settings?.companyDetails?.email || CONTACT_FALLBACK.email;

  return (
    <>
      <PageHero
        eyebrow="Plan your trip"
        title="A journey designed around you"
        sub="Tell us what you're dreaming of. Our curators reply with a personalised itinerary, honest pricing and options that fit your dates."
        crumbs={[{ label: 'Plan Your Trip' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                How it works
              </h2>
              <ul className="inclusion-list" style={{ marginTop: '1.4rem', gap: '0.9rem' }}>
                {PROMISES.map((p) => (
                  <li key={p}>
                    <Check size={15} /> {p}
                  </li>
                ))}
              </ul>

              {matched && (
                <div className="booking-card" style={{ marginTop: '1.6rem' }}>
                  <span className="eyebrow eyebrow--plain">Enquiring about</span>
                  <h3 className="h3">
                    <Link href={`/packages/${matched.slug}`}>{matched.title}</Link>
                  </h3>
                  <p className="small muted">
                    {matched.duration ? `${matched.duration.nights}N / ${matched.duration.days}D · ` : ''}
                    {matched.destination?.name}
                  </p>
                </div>
              )}

              <div className="contact-list" style={{ marginTop: '1.8rem' }}>
                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Phone size={15} />
                  </span>
                  <div>
                    <h4>Prefer to talk?</h4>
                    <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Mail size={15} />
                  </span>
                  <div>
                    <h4>Email us</h4>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Headset size={16} />
                  </span>
                  <div>
                    <h4>Already travelling?</h4>
                    <p>Our operations desk is reachable 24/7 on the number above.</p>
                  </div>
                </div>
              </div>
            </div>

            <ProposalForm
              defaults={{
                package: packageSlug,
                destination: first(sp.destination) || matched?.destination?.name || '',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
