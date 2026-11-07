import { useMemo, useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import PackageCard from '../components/cards/PackageCard';
import { packages } from '../data/packages';
import './pages.css';

const CATEGORIES = ['All', 'Adventure', 'Romantic', 'Family', 'Cultural', 'Luxury', 'Budget'];

export default function Packages() {
  const [category, setCategory] = useState('All');

  const visible = useMemo(
    () => (category === 'All' ? packages : packages.filter((pkg) => pkg.category === category)),
    [category],
  );

  return (
    <>
      <PageHeader
        eyebrow="Tour Packages"
        title="Handcrafted itineraries"
        copy="Handcrafted itineraries designed to give you the perfect balance of adventure and relaxation."
        breadcrumb="Packages"
      />

      <section className="section shell">
        <div className="filter-bar" data-reveal>
          <div className="filter-bar__group" role="tablist" aria-label="Filter by travel style">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={`chip label ${category === item ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="label filter-bar__count">
            Showing {visible.length} {visible.length === 1 ? 'package' : 'packages'}
          </p>
        </div>

        <div className="grid-cards" data-reveal>
          {visible.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>
    </>
  );
}
