import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPackage, packagePrice } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero } from '@/components/ui';
import { ArrowRight, Check } from '@/components/Icons';

export const revalidate = 60;

export const metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

/**
 * Booking checkout entry point (route preserved from the original site).
 * Payment capture happens with our travel desk, so this page confirms the
 * package a traveller arrived with and hands over to a human — no fake
 * "booking confirmed" state is ever shown.
 */
export default async function CheckoutPage({ params }) {
  const { id } = await params;
  const pkg = await getPackage(id);
  if (!pkg) notFound();

  const price = packagePrice(pkg);

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={pkg.title}
        sub="Confirm your journey with our travel desk — no payment is taken on this page."
        image={pkg.heroImage}
        crumbs={[{ label: 'Packages', href: '/packages' }, { label: pkg.title }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <div className="detail">
            <div className="detail__main">
              <div className="detail__block">
                <h2>How booking works</h2>
                <ul className="inclusion-list" style={{ marginTop: '0.8rem' }}>
                  <li><Check size={15} /> Sign in so we can attach the booking to your account.</li>
                  <li><Check size={15} /> Our travel desk confirms availability and shares a payment link.</li>
                  <li><Check size={15} /> Final vouchers are issued within 15 days of departure.</li>
                </ul>
              </div>
              <div className="detail__block">
                <h2>Continue your booking</h2>
                <p>
                  Choose how you&apos;d like to proceed — both routes reach the same team and preserve
                  your package selection.
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                  <Link href={`/login?redirect=${encodeURIComponent(`/checkout/${pkg.slug}`)}`} className="btn btn--dark">
                    Sign in to continue <ArrowRight size={14} />
                  </Link>
                  <Link href={`/request-proposal?package=${pkg.slug}`} className="btn btn--outline">
                    Request a quote instead
                  </Link>
                  <Link href={`/packages/${pkg.slug}`} className="btn btn--outline">
                    Back to package
                  </Link>
                </div>
              </div>
            </div>

            <aside className="detail__aside">
              <div className="booking-card">
                <div className="booking-card__media" style={{ overflow: 'hidden', borderRadius: 3 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl(pkg.heroImage)} alt={pkg.title} style={{ width: '100%' }} />
                </div>
                <div className="booking-card__price">
                  <small>{price.custom ? 'Tailor-made' : 'Starting from'}</small>
                  {price.text}
                </div>
                <div className="booking-card__meta">
                  {pkg.duration && (
                    <div>
                      <span>Duration</span>
                      <b>{pkg.duration.nights}N / {pkg.duration.days}D</b>
                    </div>
                  )}
                  {pkg.destination?.name && (
                    <div>
                      <span>Destination</span>
                      <b>{pkg.destination.name}</b>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
