'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { mediaUrl } from '@/lib/config';
import { ArrowUpRight } from '@/components/Icons';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function TravelGuideBrowser({ guides }) {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const [month, setMonth] = useState(MONTHS.includes(currentMonth) ? currentMonth : 'January');

  const filtered = useMemo(
    () => guides.filter((g) => (g.bestMonths || []).includes(month)),
    [guides, month]
  );

  const shown = filtered.length
    ? filtered
    : guides.filter((g) => !g.bestMonths?.length).slice(0, 6);

  return (
    <>
      <div className="month-grid" role="group" aria-label="Choose a month">
        {MONTHS.map((m) => (
          <button
            key={m}
            type="button"
            className={`month-btn${month === m ? ' is-active' : ''}`}
            onClick={() => setMonth(m)}
            aria-pressed={month === m}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      <p className="toolbar__count" style={{ marginTop: '1.2rem' }}>
        {shown.length} destinations ideal for {month}
      </p>

      {shown.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '1rem' }}>
          <h3 className="h3">No guide for {month} yet</h3>
          <p className="lede">
            Tell us where you want to go and we&apos;ll advise on the best window for that destination.
          </p>
          <Link href="/request-proposal" className="btn btn--dark">
            Plan my trip
          </Link>
        </div>
      ) : (
        <div className="guide-grid">
          {shown.map((g) => (
            <article className="guide-card" key={g._id || g.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(g.heroImage)} alt={g.name} loading="lazy" />
              <div className="guide-card__body">
                <span className="eyebrow eyebrow--plain" style={{ color: 'rgba(248,245,239,0.75)' }}>
                  {g.region || g.country} {g.season ? `· ${g.season}` : ''}
                </span>
                <h3>{g.name}</h3>
                {g.tagline && <p>{g.tagline}</p>}
                {g.bestTime && (
                  <p style={{ fontSize: '0.76rem', opacity: 0.78 }}>{g.bestTime}</p>
                )}
                <Link
                  href={
                    g.bookable
                      ? `/destinations/${g.slug}`
                      : `/request-proposal?destination=${g.slug}`
                  }
                  className="pkg-card__link"
                  style={{ color: 'var(--ivory)', borderColor: 'rgba(248,245,239,0.4)' }}
                >
                  {g.bookable ? 'View packages' : 'Plan this trip'} <ArrowUpRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
