import PageHeader from '../components/ui/PageHeader';
import QuoteCard from '../components/cards/QuoteCard';
import Button from '../components/ui/Button';
import { testimonials } from '../data/content';
import { site } from '../data/site';
import './pages.css';

export default function Testimonials() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="What Our Travellers Say"
        copy="Real stories from real adventurers. Discover why thousands of travellers trust SoulPath Holiday for their dream vacations."
        breadcrumb="Testimonials"
      />

      <section className="section shell">
        <div className="stat-band" data-reveal>
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-band__value display">{stat.value}</p>
              <p className="label stat-band__label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="quote-grid" data-reveal>
          {testimonials.map((testimonial) => (
            <QuoteCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="section shell closing-cta" data-reveal>
        <h2 className="display display--lg">Ready to Create Your Story?</h2>
        <p className="lede">
          Join hundreds of happy travellers who have trusted us with their dream vacations. Your next adventure is just
          a click away.
        </p>
        <div className="closing-cta__actions">
          <Button to="/packages" variant="solid">
            Explore Packages
          </Button>
        </div>
      </section>
    </>
  );
}
