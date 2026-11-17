import { getDestinations, getPackages } from '@/lib/api';
import { PageHero } from '@/components/ui';
import PackageBrowser from './PackageBrowser';

export const revalidate = 120;

export const metadata = {
  title: 'Tour Packages',
  description:
    'Browse SoulPath Holiday tour packages — Thailand, Dubai, Singapore, Bali, Vietnam, Bhutan and more. Transparent pricing, real itineraries, tailor-made options.',
  alternates: { canonical: '/packages' },
};

export default async function PackagesPage({ searchParams }) {
  const sp = await searchParams;
  const [packages, destinations] = await Promise.all([getPackages(), getDestinations()]);
  const hero = packages[0];

  const first = (v) => (Array.isArray(v) ? v[0] : v);

  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Journeys, thoughtfully composed"
        sub="Expertly designed itineraries for every type of traveller — and every one of them can be personalised to your dates, pace and budget."
        image={hero?.heroImage}
        crumbs={[{ label: 'Packages' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
        <div className="container">
          <PackageBrowser
            packages={packages}
            destinations={destinations}
            initial={{
              destination: first(sp.destination) || '',
              category: first(sp.category) || '',
              minDays: first(sp.minDays) || '',
              maxDays: first(sp.maxDays) || '',
              price: first(sp.price) || '',
              q: first(sp.q) || '',
            }}
          />
        </div>
      </section>
    </>
  );
}
