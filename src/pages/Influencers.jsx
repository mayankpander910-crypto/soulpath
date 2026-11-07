import PageHeader from '../components/ui/PageHeader';
import InfluencerCard from '../components/cards/InfluencerCard';
import { influencers } from '../data/content';
import './pages.css';

export default function Influencers() {
  return (
    <>
      <PageHeader
        eyebrow="Creator Collabs"
        title="Travel with Influencers"
        copy="Join your favourite creators on their next getaway — same trip, same dates, unforgettable memories together."
        breadcrumb="Travel with Influencers"
      />

      <section className="section shell">
        <div className="grid-cards" data-reveal>
          {influencers.map((creator) => (
            <InfluencerCard key={creator.slug} creator={creator} />
          ))}
        </div>
      </section>
    </>
  );
}
