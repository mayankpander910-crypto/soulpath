'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard } from '@/components/ui';
import { Search } from '@/components/Icons';

const DURATIONS = [
  { label: 'Any duration', value: '' },
  { label: 'Up to 3 nights', value: '0-3' },
  { label: '4 – 5 nights', value: '4-5' },
  { label: '6 – 7 nights', value: '6-7' },
  { label: '8+ nights', value: '8-' },
];

const BUDGETS = [
  { label: 'Any budget', value: '' },
  { label: 'Under ₹25,000', value: '0-25000' },
  { label: '₹25,000 – ₹50,000', value: '25000-50000' },
  { label: '₹50,000 – ₹1,00,000', value: '50000-100000' },
  { label: '₹1,00,000 – ₹2,00,000', value: '100000-200000' },
  { label: '₹2,00,000+', value: '200000-' },
];

const SORTS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Longest first', value: 'duration-desc' },
];

const inRange = (value, range) => {
  if (!range) return true;
  const [minRaw, maxRaw] = String(range).split('-');
  const min = minRaw ? Number(minRaw) : null;
  const max = maxRaw ? Number(maxRaw) : null;
  if (min !== null && value < min) return false;
  if (max !== null && value > max) return false;
  return true;
};

const priceOf = (p) => p.pricing?.offerPrice || p.pricing?.basePrice || 0;

export default function PackageBrowser({ packages, destinations, initial = {} }) {
  const router = useRouter();
  const [query, setQuery] = useState(initial.q || '');
  const [destination, setDestination] = useState(initial.destination || '');
  const [category, setCategory] = useState(initial.category || '');
  const [duration, setDuration] = useState(
    initial.minDays || initial.maxDays ? `${initial.minDays || ''}-${initial.maxDays || ''}` : ''
  );
  const [price, setPrice] = useState(initial.price || '');
  const [sort, setSort] = useState('recommended');

  const categories = useMemo(() => {
    const set = new Set(packages.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [packages]);

  // keep the URL shareable (same query-parameter names the original used)
  useEffect(() => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (category && category !== 'All') params.set('category', category);
    if (duration) {
      const [minDays, maxDays] = duration.split('-');
      if (minDays) params.set('minDays', minDays);
      if (maxDays) params.set('maxDays', maxDays);
    }
    if (price) params.set('price', price);
    const qs = params.toString();
    router.replace(`/packages${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [destination, category, duration, price, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = packages.filter((p) => {
      const matchQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.destination?.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);
      const matchDestination =
        !destination || p.destination?.slug === destination || p.destination?._id === destination;
      const matchCategory = !category || category === 'All' || p.category === category;
      const nights = p.duration?.nights || 0;
      return (
        matchQuery &&
        matchDestination &&
        matchCategory &&
        inRange(nights, duration) &&
        inRange(priceOf(p), price)
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return priceOf(a) - priceOf(b);
      if (sort === 'price-desc') return priceOf(b) - priceOf(a);
      if (sort === 'duration-desc') return (b.duration?.nights || 0) - (a.duration?.nights || 0);
      return Number(Boolean(b.featured || b.popular)) - Number(Boolean(a.featured || a.popular));
    });
    return list;
  }, [packages, query, destination, category, duration, price, sort]);

  const reset = () => {
    setQuery('');
    setDestination('');
    setCategory('');
    setDuration('');
    setPrice('');
    setSort('recommended');
  };

  return (
    <>
      <div className="toolbar">
        <div className="toolbar__group pills" role="group" aria-label="Filter by travel style">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`pill${(category || 'All') === c ? ' is-active' : ''}`}
              onClick={() => setCategory(c === 'All' ? '' : c)}
              aria-pressed={(category || 'All') === c}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-inline">
          <Search size={15} />
          <span className="sr-only">Search packages</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages or destinations"
            type="search"
          />
        </label>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.8rem',
          marginBottom: '1.4rem',
        }}
      >
        <div className="field">
          <label htmlFor="f-destination">Destination</label>
          <select
            id="f-destination"
            className="select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">All destinations</option>
            {destinations.map((d) => (
              <option key={d._id} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-duration">Duration</label>
          <select
            id="f-duration"
            className="select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-budget">Budget</label>
          <select id="f-budget" className="select" value={price} onChange={(e) => setPrice(e.target.value)}>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-sort">Sort by</label>
          <select id="f-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="toolbar" style={{ borderTop: 0, marginTop: 0 }}>
        <span className="toolbar__count">
          {filtered.length} {filtered.length === 1 ? 'journey' : 'journeys'} found
        </span>
        <button type="button" className="chip" onClick={reset}>
          Clear filters
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3 className="h3">No packages match those filters</h3>
          <p className="lede">
            We can build this trip from scratch — tell us what you have in mind and we&apos;ll send a
            tailored proposal.
          </p>
          <a href="/request-proposal" className="btn btn--dark">
            Request a custom quote
          </a>
        </div>
      ) : (
        <div className="pkg-grid">
          {filtered.map((pkg, i) => (
            <PackageCard key={pkg._id} pkg={pkg} delay={(i % 3) * 60} />
          ))}
        </div>
      )}
    </>
  );
}
