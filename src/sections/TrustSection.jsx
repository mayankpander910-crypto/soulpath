import { valueProps } from '../data/content';
import Button from '../components/ui/Button';
import Arrow from '../components/ui/Arrow';
import './home.css';

const GALLERY = ['langkawi-and-kuala-lumpur-delight.jpg', 'singapore-with-resorts-world-sentosa.jpg', 'beautiful-azerbaijan.jpg'];

export default function TrustSection() {
  return (
    <section className="section shell trust">
      <div className="trust__lead" data-reveal>
        <p className="label text-forest">Our promise</p>
        <h2 className="display display--lg trust__title">Your Trusted Travel Partner Since 2021</h2>
        <p className="lede">
          We combine personalized service, transparent pricing, and reliable support to deliver travel experiences
          that truly reflect your dreams and preferences.
        </p>
        <p className="lede">Travel with confidence. Travel with Soul Path Holidays.</p>

        <ul className="trust__values">
          {valueProps.map((value) => (
            <li key={value}>
              <span>{value}</span>
              <Arrow size={13} />
            </li>
          ))}
        </ul>

        <div className="trust__actions">
          <Button to="/destinations" variant="solid">
            Explore Destinations
          </Button>
        </div>
      </div>

      <div className="trust__gallery" data-reveal>
        <figure className="trust__figure trust__figure--tall">
          <img src={`/assets/images/${GALLERY[0]}`} alt="Langkawi and Kuala Lumpur" loading="lazy" />
        </figure>
        <figure className="trust__figure">
          <img src={`/assets/images/${GALLERY[1]}`} alt="Sri Lanka" loading="lazy" />
        </figure>
        <figure className="trust__figure trust__figure--wide">
          <img src={`/assets/images/${GALLERY[2]}`} alt="Baku" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
