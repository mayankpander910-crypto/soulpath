import { useState } from 'react';
import { journeySteps } from '../data/content';
import Button from '../components/ui/Button';
import './home.css';

/** Numbered accordion rows — the "rooms" pattern from the reference site. */
export default function JourneySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section shell" id="how-it-works">
      <div className="journey">
        <div className="journey__lead" data-reveal>
          <p className="label text-forest">How Your Journey Begins</p>
          <h2 className="display display--lg journey__title">Plan your perfect trip in 3 simple steps</h2>
          <div className="journey__actions">
            <Button to="/packages" variant="solid">
              Explore Packages
            </Button>
          </div>
        </div>

        <ol className="journey__list" data-reveal>
          {journeySteps.map((step, index) => {
            const isOpen = active === index;
            return (
              <li key={step.title} className={`journey__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="journey__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setActive(isOpen ? -1 : index)}
                >
                  <span className="label journey__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="display display--sm journey__step-title">{step.title}</span>
                  <span className="journey__icon" aria-hidden="true">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
                <div className="journey__panel">
                  <p className="body-copy">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
