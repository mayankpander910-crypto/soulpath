import Button from '../components/ui/Button';
import './home.css';

/** Full-bleed photo band with a dark-green concierge panel. */
export default function ConciergeBand() {
  return (
    <section className="band" aria-label="Need help planning your trip">
      <div className="band__media">
        <img src="/assets/images/travelers-enjoying-their-journey.jpg" alt="Travelers enjoying their journey" loading="lazy" />
      </div>

      <div className="band__panel" data-reveal>
        <p className="label band__eyebrow">Happy · Fun · Enjoy</p>
        <h2 className="display display--lg band__title">Need Help Planning Your Trip?</h2>
        <p className="band__copy">
          Our travel experts design itineraries around your dates, your budget and the way you like to travel.
        </p>
        <Button to="/contact" variant="light" size="lg">
          Contact Our Travel Experts
        </Button>
      </div>
    </section>
  );
}
