import Link from 'next/link';
import { getPolicy } from '@/lib/api';
import { PageHero } from './ui';
import { formatDate } from '@/lib/api';
import { ArrowRight } from './Icons';

const META = {
  privacy: { title: 'Privacy Policy', subtitle: 'How we collect, use and protect your information' },
  terms: { title: 'Terms of Service', subtitle: 'The agreement between you and SoulPath Holiday' },
  refund: {
    title: 'Cancellation Policy',
    subtitle: 'Cancellation, rescheduling and refund rules',
  },
};

/**
 * Renders the legal content stored in the existing CMS (`/policies/:type`).
 * The copy is never rewritten or trimmed — it is the same text the live site serves.
 */
export default async function LegalPage({ type }) {
  const meta = META[type];
  const policy = await getPolicy(type);

  return (
    <>
      <PageHero eyebrow="Legal" title={meta.title} sub={meta.subtitle} crumbs={[{ label: meta.title }]} />

      <section className="section" style={{ paddingTop: 'clamp(1.2rem, 3vw, 2rem)' }}>
        <div className="container">
          <div className="legal">
            <p className="legal__meta">
              Last updated: {policy?.updatedAt ? formatDate(policy.updatedAt) : 'see current policy'}
            </p>

            {policy?.content ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: policy.content }} />
            ) : (
              <div className="empty-state">
                <h3 className="h3">This policy is being updated</h3>
                <p className="lede" style={{ textAlign: 'center' }}>
                  Please check back soon, or reach out to our support team for any urgent questions.
                </p>
                <Link href="/contact" className="btn btn--dark">
                  Contact support <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <div
              style={{
                marginTop: '2.4rem',
                paddingTop: '1.4rem',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: '1.2rem',
                flexWrap: 'wrap',
                fontSize: '0.8rem',
              }}
            >
              <Link href="/privacy" className="pkg-card__link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="pkg-card__link">
                Terms of Service
              </Link>
              <Link href="/refund" className="pkg-card__link">
                Cancellation Policy
              </Link>
              <Link href="/contact" className="pkg-card__link">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
