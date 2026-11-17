'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { mediaUrl } from '@/lib/config';
import { ArrowUpRight, Search } from '@/components/Icons';

export default function DestinationBrowser({ destinations }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');

  const regions = useMemo(() => {
    const set = new Set(destinations.map((d) => d.region).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [destinations]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchesRegion = region === 'All' || d.region === region;
      const matchesQuery =
        !q ||
        d.name?.toLowerCase().includes(q) ||
        d.country?.toLowerCase().includes(q) ||
        d.region?.toLowerCase().includes(q) ||
        (d.highlights || []).some((h) => String(h).toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
  }, [destinations, query, region]);

  return (
    <>
      <div className="toolbar">
        <div className="toolbar__group regions" role="group" aria-label="Filter by region">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              className={`pill${region === r ? ' is-active' : ''}`}
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="toolbar__group">
          <span className="toolbar__count">
            {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}
          </span>
          <label className="search-inline">
            <Search size={15} />
            <span className="sr-only">Search destinations</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations"
              type="search"
            />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3 className="h3">No destination matches that search</h3>
          <p className="lede">Try a different region, or tell us where you dream of going.</p>
          <Link href="/request-proposal" className="btn btn--dark">
            Plan a custom trip
          </Link>
        </div>
      ) : (
        <div className="split-list">
          {filtered.map((d) => (
            <article className="dest-card" key={d._id}>
              <Link href={`/destinations/${d.slug}`} className="dest-card__media" aria-label={d.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaUrl(d.heroImage)} alt={d.name} loading="lazy" decoding="async" />
              </Link>
              <div className="dest-card__body">
                <span className="eyebrow eyebrow--plain" style={{ fontSize: '0.6rem' }}>
                  {d.region || d.country}
                </span>
                <h3>
                  <Link href={`/destinations/${d.slug}`}>{d.name}</Link>
                </h3>
                {d.description && <p>{d.description}</p>}
                <div className="dest-card__foot">
                  <span>
                    {d.packageCount ? `${d.packageCount} packages` : 'Custom itineraries'}
                    {d.bestTimeToVisit ? ` · ${d.bestTimeToVisit}` : ''}
                  </span>
                  <Link href={`/destinations/${d.slug}`} className="pkg-card__link">
                    Explore <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
