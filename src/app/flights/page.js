import Link from 'next/link';
import { getDestinations, getPackages } from '@/lib/api';
import { PageHero } from '@/components/ui';
import SearchBar from '@/components/SearchBar';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Check } from '@/components/Icons';

export const revalidate = 300;

export const metadata = {
  title: 'Search Flights',
  description:
    'Search flights with SoulPath Holiday — compare fares across airlines for your holiday and let our team confirm the best available options.',
  alternates: { canonical: '/flights' },
};

const HOW = [
  'Search any route, date and cabin class',
  'Our desk checks live availability and fare rules',
  'You get a confirmed quote with baggage and seat details',
];

export default async function FlightsPage() {
  const [destinations, packages] = await Promise.all([getDestinations(), getPackages()]);
  const heroImage = packages[3]?.heroImage || packages[0]?.heroImage;

  return (
    <>
      <PageHero
        eyebrow="Flights"
        title="Search flights"
        sub="Compare fares across airlines and book with trusted partners — with the same team that plans your holiday."
        image={heroImage}
        crumbs={[{ label: 'Flights' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.2rem, 3vw, 2rem)' }}>
        <div className="container">
          <SearchBar destinations={destinations} defaultTab="flights" variant="page" />

          <div
            style={{
              marginTop: 'clamp(2rem, 4vw, 3rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(1.2rem, 3vw, 2.4rem)',
            }}
          >
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginTop: '0.7rem' }}>
                Fares confirmed by humans
              </h2>
              <ul className="inclusion-list" style={{ marginTop: '1.2rem' }}>
                {HOW.map((h) => (
                  <li key={h}>
                    <Check size={15} /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal className="service-card">
              <h3>Booking a flight with a holiday?</h3>
              <p>
                Bundling flights with a package usually works out cheaper — our team can quote the
                land package and airfare together.
              </p>
              <Link href="/packages" className="link-arrow" style={{ marginTop: '0.6rem' }}>
                See packages <ArrowRight size={13} />
              </Link>
            </Reveal>
            <Reveal className="service-card" delay={80}>
              <h3>Group or corporate travel?</h3>
              <p>
                We hold blocks for 10+ travellers and handle names, seating and invoices for your
                whole team.
              </p>
              <Link href="/corporate-tours" className="link-arrow" style={{ marginTop: '0.6rem' }}>
                Corporate tours <ArrowRight size={13} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
