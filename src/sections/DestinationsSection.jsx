import { destinations } from '../data/destinations';
import Carousel from '../components/ui/Carousel';
import DestinationCard from '../components/cards/DestinationCard';
import SectionHead from '../components/ui/SectionHead';
import Button from '../components/ui/Button';
import './home.css';

export default function DestinationsSection() {
  return (
    <section className="section shell" id="destinations">
      <SectionHead
        eyebrow="Destinations"
        title="Breathtaking Destinations"
        copy="From serene beaches to majestic mountains, explore handpicked locations curated for the ultimate travel experience."
      />

      <div data-reveal>
        <Carousel ariaLabel="Destinations">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </Carousel>
      </div>

      <div className="section-cta" data-reveal>
        <Button to="/destinations" variant="outline">
          View All Destinations
        </Button>
      </div>
    </section>
  );
}
