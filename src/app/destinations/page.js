import { getDestinations } from '@/lib/api';
import { PageHero } from '@/components/ui';
import DestinationBrowser from './DestinationBrowser';

export const revalidate = 120;

export const metadata = {
  title: 'Explore Destinations',
  description:
    'Browse 50+ handpicked international destinations with SoulPath Holiday — Asia, Europe, the Middle East and beyond, with region filters and curated packages.',
  alternates: { canonical: '/destinations' },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  const featured = destinations.find((d) => d.featured) || destinations[0];

  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Destinations worth crossing the world for"
        sub="From serene beaches to majestic mountains, explore handpicked locations curated for the ultimate travel experience."
        image={featured?.heroImage}
        crumbs={[{ label: 'Destinations' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
        <div className="container">
          <DestinationBrowser destinations={destinations} />
        </div>
      </section>
    </>
  );
}
