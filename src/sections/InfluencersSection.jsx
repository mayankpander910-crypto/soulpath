import { influencers } from '../data/content';
import Carousel from '../components/ui/Carousel';
import InfluencerCard from '../components/cards/InfluencerCard';
import SectionHead from '../components/ui/SectionHead';
import Button from '../components/ui/Button';
import './home.css';

export default function InfluencersSection() {
  return (
    <section className="section shell section--tinted" id="influencers">
      <SectionHead
        eyebrow="Creator Collabs"
        title="Travel with Influencers"
        copy="Join your favourite creators on their next getaway — same trip, same dates, and unforgettable memories together."
      />

      <div data-reveal>
        <Carousel ariaLabel="Influencers">
          {influencers.map((creator) => (
            <InfluencerCard key={creator.slug} creator={creator} />
          ))}
        </Carousel>
      </div>

      <div className="section-cta" data-reveal>
        <Button to="/travel-with-influencers" variant="outline">
          View All Influencers
        </Button>
      </div>
    </section>
  );
}
