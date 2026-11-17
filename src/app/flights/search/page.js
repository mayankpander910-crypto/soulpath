import Link from 'next/link';
import { getDestinations, getSiteSettings } from '@/lib/api';
import { CABIN_CLASSES, CONTACT_FALLBACK } from '@/lib/config';
import { PageHero } from '@/components/ui';
import SearchBar from '@/components/SearchBar';
import { ArrowRight, Plane, Whatsapp } from '@/components/Icons';

export const metadata = {
  title: 'Flight Search',
  description:
    'Your flight search summary — share the route with the SoulPath Holiday desk and receive confirmed fares and fare rules.',
  robots: { index: false, follow: true },
};

const first = (v) => (Array.isArray(v) ? v[0] : v) || '';

export default async function FlightSearchPage({ searchParams }) {
  const sp = await searchParams;
  const [destinations, settings] = await Promise.all([getDestinations(), getSiteSettings()]);
  const wa = String(settings?.whatsappNumber || CONTACT_FALLBACK.whatsapp).replace(/\D/g, '');

  const type = first(sp.type) || 'round';
  const from = first(sp.from);
  const to = first(sp.to);
  const depart = first(sp.depart);
  const ret = first(sp.return);
  const adults = first(sp.adults) || '1';
  const children = first(sp.children) || '0';
  const infants = first(sp.infants) || '0';
  const cabin = CABIN_CLASSES.find((c) => c.value === (first(sp.cabin) || 'Y'))?.label || 'Economy';

  let legs = [];
  try {
    legs = first(sp.legs) ? JSON.parse(first(sp.legs)) : [];
  } catch {
    legs = [];
  }

  const hasSearch = type === 'multi' ? legs.length > 0 : Boolean(from && to && depart);

  const summary =
    type === 'multi'
      ? legs.map((l) => `${l.from?.city} → ${l.to?.city} (${l.date})`).join(' · ')
      : `${from} → ${to}${depart ? ` · ${depart}` : ''}${ret ? ` · return ${ret}` : ''}`;

  const waText = encodeURIComponent(
    `Hi SoulPath Holiday, please share fares for: ${summary}. Travellers: ${adults} adult(s), ${children} child(ren), ${infants} infant(s). Cabin: ${cabin}.`
  );

  return (
    <>
      <PageHero
        eyebrow="Flights"
        title="Your flight search"
        sub="Review your search below and send it to our travel desk — we reply with confirmed fares, baggage rules and alternatives."
        crumbs={[{ label: 'Flights', href: '/flights' }, { label: 'Search' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.2rem, 3vw, 2rem)' }}>
        <div className="container">
          {hasSearch ? (
            <div className="flight-summary">
              <span className="eyebrow eyebrow--plain">Search summary</span>
              <div className="flight-summary__row">
                <strong>
                  <Plane size={15} style={{ display: 'inline', verticalAlign: '-2px' }} /> {summary}
                </strong>
                <span>
                  {adults} adult{Number(adults) > 1 ? 's' : ''}
                  {Number(children) > 0 ? `, ${children} child${Number(children) > 1 ? 'ren' : ''}` : ''}
                  {Number(infants) > 0 ? `, ${infants} infant${Number(infants) > 1 ? 's' : ''}` : ''}
                </span>
                <span>{cabin}</span>
                <span style={{ textTransform: 'capitalize' }}>
                  {type === 'multi' ? 'Multi city' : type === 'oneway' ? 'One way' : 'Round trip'}
                </span>
              </div>
              <p className="flight-summary__note">
                Live fare inventory is confirmed by our airline desk rather than shown as an
                unverified online price — so you always get a fare that can actually be issued. Send
                this search across and we&apos;ll come back with options, usually within a few hours.
              </p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${wa}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--dark"
                >
                  <Whatsapp size={16} /> Send to travel desk
                </a>
                <Link href="/request-proposal" className="btn btn--outline">
                  Request a full quote <ArrowRight size={14} />
                </Link>
                <Link href="/flights" className="btn btn--outline">
                  Edit search
                </Link>
              </div>
            </div>
          ) : (
            <div className="empty-state" style={{ marginBottom: '2rem' }}>
              <h3 className="h3">Start a new search</h3>
              <p className="lede" style={{ textAlign: 'center' }}>
                Enter your route and dates below — or plan the whole trip with one of our curators.
              </p>
            </div>
          )}

          <SearchBar destinations={destinations} defaultTab="flights" variant="page" />
        </div>
      </section>
    </>
  );
}
