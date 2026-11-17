import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { ArrowRight } from '@/components/Icons';

export const metadata = {
  title: 'Hotels',
  description:
    'Hotel bookings across our destinations — curated stays with the same eye we bring to our holiday packages.',
  alternates: { canonical: '/hotels' },
};

export default function HotelsPage() {
  return (
    <>
      <PageHero eyebrow="Coming soon" title="Hotels" crumbs={[{ label: 'Hotels' }]} />
      <section className="coming">
        <div className="container coming__inner">
          <span className="coming__badge">In development</span>
          <h2 className="h2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Search and book stays across our destinations
          </h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            We are working on this. In the meantime our team can arrange it for you directly.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn--dark">
              Talk to our team <ArrowRight size={14} />
            </Link>
            <Link href="/packages" className="btn btn--outline">
              Browse holiday packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
