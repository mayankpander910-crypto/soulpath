import { PageHero, SectionHead } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { FRANCHISE_BENEFITS } from '@/lib/content';
import PartnerForm from './PartnerForm';

export const metadata = {
  title: 'Become a Franchise Partner',
  description:
    'Join the SoulPath Holiday franchise network — flexible margins, a customer CRM, secure payouts and premium travel inventory to sell under your own brand.',
  alternates: { canonical: '/become-partner' },
};

export default function BecomePartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise partner"
        title="Grow your travel business with us"
        sub="Join our exclusive network of franchise partners and earn lucrative commissions. Set your own margins, track your referrals, and scale your business with our premium inventory."
        crumbs={[{ label: 'Franchise Partner' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <div className="service-grid" style={{ marginBottom: 'clamp(2.4rem, 5vw, 4rem)' }}>
            {FRANCHISE_BENEFITS.map((b, i) => (
              <Reveal className="service-card" key={b.title} delay={i * 70}>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </Reveal>
            ))}
          </div>

          <SectionHead
            eyebrow="Apply now"
            title="Partner application"
            sub="Tell us about you and your business — our partnerships team reviews every application personally."
          />

          <PartnerForm />
        </div>
      </section>
    </>
  );
}
