import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Arrow from '../components/ui/Arrow';
import './pages.css';

const FILTERS = ['All Offers', 'Seasonal', 'Festival', 'Honeymoon', 'Group', 'Early Bird', 'Last Minute'];

export default function Offers() {
  return (
    <>
      <PageHeader
        eyebrow="Exclusive Deals"
        title="Irresistible Travel Deals"
        copy="Handpicked offers on our most popular destinations. Book your dream vacation now before these limited-time packages are gone!"
        breadcrumb="Offers"
      />

      <section className="section shell">
        <div className="filter-bar" data-reveal>
          <div className="filter-bar__group" role="tablist" aria-label="Offer categories">
            {FILTERS.map((item, index) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={index === 0}
                className={`chip label ${index === 0 ? 'is-active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="empty-state" data-reveal>
          <p className="display display--md">No Offers Right Now</p>
          <p className="lede">
            Our travel experts are currently cooking up some amazing new deals. Check back soon or browse our regular
            packages!
          </p>
          <Button to="/packages" variant="solid">
            Browse All Packages
          </Button>
        </div>
      </section>

      <section className="concierge" data-reveal>
        <div className="shell concierge__inner">
          <h2 className="display display--lg">Can&rsquo;t find the perfect deal?</h2>
          <p className="lede">
            Let our travel concierge create a custom itinerary with exclusive, unpublished pricing just for you and
            your group.
          </p>
          <Button to="/contact" variant="light">
            Request Custom Quote <Arrow size={14} />
          </Button>
        </div>
      </section>
    </>
  );
}
