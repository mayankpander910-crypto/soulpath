import { getPackages } from '@/lib/api';
import { PageHero, SectionHead, StatsStrip } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { CORPORATE_SERVICES, CORPORATE_STATS } from '@/lib/content';
import CorporateForm from './CorporateForm';

export const revalidate = 300;

export const metadata = {
  title: 'Corporate Group Tours',
  description:
    'Corporate travel with SoulPath Holiday — team building trips, company retreats, incentive tours, conference travel, group discounts and fully custom itineraries.',
  alternates: { canonical: '/corporate-tours' },
};

export default async function CorporateToursPage() {
  const packages = await getPackages();
  const heroImage = packages[2]?.heroImage || packages[0]?.heroImage;

  return (
    <>
      <PageHero
        eyebrow="For organisations"
        title="Corporate group tours"
        sub="Transform your corporate events into extraordinary travel experiences — team offsites, incentive trips and conference travel, planned end to end."
        image={heroImage}
        crumbs={[{ label: 'Corporate Tours' }]}
      >
        <a href="#inquiry-form" className="btn btn--light" style={{ marginTop: '0.8rem' }}>
          Request a corporate quote
        </a>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we offer"
            title="Tailored corporate travel solutions"
            sub="From 10-person leadership offsites to 500-person incentive programmes."
          />
          <div className="service-grid">
            {CORPORATE_SERVICES.map((s, i) => (
              <Reveal className="service-card" key={s.title} delay={(i % 3) * 70}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(2.4rem, 5vw, 4rem)' }}>
            <StatsStrip items={CORPORATE_STATS} />
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Get started"
            title="Tell us about your team"
            sub="Share the basics and our corporate desk will come back with a tailored proposal within 24 hours."
          />
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
