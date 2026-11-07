import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { coreValues } from '../data/content';
import './pages.css';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About SoulPath Holiday"
        title="Crafting extraordinary travel experiences"
        copy="Crafting extraordinary travel experiences with soul, passion, and purpose."
        breadcrumb="About Us"
        media="/assets/images/travelers-enjoying-their-journey.jpg"
      />

      <section className="section shell about-story">
        <div className="about-story__lead" data-reveal>
          <p className="label text-forest">Our Story</p>
          <h2 className="display display--lg">Built by Travelers, for Travelers</h2>
        </div>

        <div className="about-story__body" data-reveal>
          <p className="lede">
            SoulPath Holiday was born from a simple belief — that travel should be more than just visiting places. It
            should be about discovering cultures, building connections, and creating memories that last a lifetime.
          </p>
          <p className="body-copy">
            Founded with a passion for immersive travel, we set out to bridge the gap between typical tourism and
            meaningful exploration. Today, we curate handcrafted itineraries across the globe, ensuring every journey is
            as unique as the traveler embarking on it.
          </p>
          <p className="body-copy">
            From the backwaters of Kerala to the peaks of the Swiss Alps, from the temples of Bali to the deserts of
            Dubai — every destination we offer has been personally explored and curated by our team.
          </p>
        </div>
      </section>

      <section className="section shell section--tinted" aria-labelledby="values-title">
        <div className="values">
          <header data-reveal>
            <p className="label text-forest">What Drives Us</p>
            <h2 className="display display--lg" id="values-title">
              Our Core Values
            </h2>
          </header>

          <ul className="values__grid">
            {coreValues.map((value) => (
              <li key={value.title} data-reveal>
                <h3 className="display display--sm">{value.title}</h3>
                <p className="body-copy">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section shell closing-cta" data-reveal>
        <h2 className="display display--lg">Ready to Start Your Journey?</h2>
        <p className="lede">Browse our curated packages or get in touch to plan your dream trip.</p>
        <div className="closing-cta__actions">
          <Button to="/packages" variant="solid">
            Explore Packages
          </Button>
          <Button to="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
