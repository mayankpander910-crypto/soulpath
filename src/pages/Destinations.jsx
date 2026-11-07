import { useMemo, useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import DestinationCard from '../components/cards/DestinationCard';
import { destinationFilters, destinations } from '../data/destinations';
import './pages.css';

export default function Destinations() {
  const [filter, setFilter] = useState(destinationFilters[0]);

  const visible = useMemo(
    () => (filter === 'All Destinations' ? destinations : destinations.filter((item) => item.region === filter)),
    [filter],
  );

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Explore the World"
        copy="Discover breathtaking destinations curated for unforgettable experiences. Where will your soul take you next?"
        breadcrumb="Destinations"
      />

      <section className="section shell">
        <div className="filter-bar" data-reveal>
          <div className="filter-bar__group" role="tablist" aria-label="Filter by region">
            {destinationFilters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`chip label ${filter === item ? 'is-active' : ''}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="label filter-bar__count">Showing {visible.length} destinations</p>
        </div>

        <div className="grid-cards" data-reveal>
          {visible.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </section>
    </>
  );
}
