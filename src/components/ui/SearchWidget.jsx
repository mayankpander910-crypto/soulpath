import { useState } from 'react';
import './SearchWidget.css';

const TABS = [
  { id: 'flights', label: 'Flights' },
  { id: 'packages', label: 'Holiday Packages' },
];

/**
 * Restrained, hairline-led travel search panel.
 * Presentational only — wire the submit handler to your booking engine.
 */
export default function SearchWidget() {
  const [tab, setTab] = useState('flights');

  return (
    <div className="search">
      <div className="search__tabs" role="tablist" aria-label="Search type">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`search__tab label ${tab === item.id ? 'is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form className="search__form" onSubmit={(event) => event.preventDefault()}>
        <div className="search__fields">
        <div className="search__field">
          <label className="label search__label" htmlFor="from-city">
            {tab === 'flights' ? 'From city' : 'Destination'}
          </label>
          <input id="from-city" className="search__input" placeholder={tab === 'flights' ? 'Ahmedabad' : 'Thailand'} />
        </div>

        {tab === 'flights' ? (
          <div className="search__field">
            <label className="label search__label" htmlFor="to-city">
              To city
            </label>
            <input id="to-city" className="search__input" placeholder="Anywhere" />
          </div>
        ) : null}

        <div className="search__field">
          <label className="label search__label" htmlFor="departure">
            Departure
          </label>
          <input id="departure" className="search__input" type="date" />
        </div>

        {tab === 'flights' ? (
          <div className="search__field">
            <label className="label search__label" htmlFor="return">
              Return
            </label>
            <input id="return" className="search__input" type="date" />
          </div>
        ) : null}

        <div className="search__field search__field--select">
          <label className="label search__label" htmlFor="traveller">
            Traveller
          </label>
          <select id="traveller" className="search__input">
            <option>1 traveller</option>
            <option>2 travellers</option>
            <option>3 travellers</option>
            <option>4 travellers</option>
              <option>5+ travellers</option>
          </select>
          </div>
        </div>

        <button type="submit" className="search__submit" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4.2-4.2" />
          </svg>
          <span className="label">Search</span>
        </button>
      </form>

      <div className="search__meta">
        <span className="label">Round trip</span>
        <span className="label">Economy</span>
        <span className="label">GST inclusive</span>
      </div>
    </div>
  );
}
