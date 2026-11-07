import { packages } from '../data/packages';
import Carousel from '../components/ui/Carousel';
import PackageCard from '../components/cards/PackageCard';
import SectionHead from '../components/ui/SectionHead';
import Button from '../components/ui/Button';
import './home.css';

const FEATURED = packages.slice(0, 10);

export default function PackagesSection() {
  return (
    <section className="section shell" id="packages">
      <SectionHead
        eyebrow="Tour Packages"
        title="Popular Tour Packages"
        copy="Expertly designed itineraries for every type of traveler."
      />

      <div data-reveal>
        <Carousel ariaLabel="Popular tour packages">
          {FEATURED.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </Carousel>
      </div>

      <div className="section-cta" data-reveal>
        <Button to="/packages" variant="outline">
          View All Packages
        </Button>
      </div>
    </section>
  );
}
