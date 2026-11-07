import { testimonials } from '../data/content';
import Carousel from '../components/ui/Carousel';
import QuoteCard from '../components/cards/QuoteCard';
import SectionHead from '../components/ui/SectionHead';
import Button from '../components/ui/Button';
import './home.css';

export default function TestimonialsSection() {
  return (
    <section className="section shell section--tinted" id="testimonials">
      <SectionHead
        eyebrow="Testimonials"
        title="What Our Travelers Say"
        copy="Real stories from real travelers who explored the world with us."
      />

      <div data-reveal>
        <Carousel ariaLabel="Traveller testimonials">
          {testimonials.map((testimonial) => (
            <QuoteCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>

      <div className="section-cta" data-reveal>
        <Button to="/testimonials" variant="outline">
          Read All Testimonials
        </Button>
      </div>
    </section>
  );
}
