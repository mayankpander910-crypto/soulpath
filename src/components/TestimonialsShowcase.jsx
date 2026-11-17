'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/content';
import { ChevronLeft, ChevronRight, Star } from './Icons';

/**
 * Testimonials — full-bleed "the feeling" block from the reference:
 * one oversized quote at a time, script attribution, hairline progress dots.
 */
export default function TestimonialsShowcase({ items = TESTIMONIALS, showLink = false }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  if (!items.length) return null;
  const current = items[active % items.length];

  return (
    <section
      className="testimonials"
      id="testimonials"
      aria-label="Traveller testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="testimonials__inner">
          <span className="testimonials__stars" aria-hidden="true">
            {Array.from({ length: current.rating || 5 }).map((_, i) => (
              <Star key={i} size={14} />
            ))}
          </span>

          <blockquote className="testimonials__quote" aria-live="polite">
            “{current.text}”
          </blockquote>

          <span className="testimonials__author">{current.name}</span>
          <span className="testimonials__city">
            {current.city}
            {current.trip ? ` · ${current.trip}` : ''}
          </span>

          <div className="testimonials__nav">
            <button
              type="button"
              className="testimonials__arrow"
              onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }} role="tablist" aria-label="Testimonials">
              {items.slice(0, 8).map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  role="tab"
                  aria-selected={i === active % items.length}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`testimonials__dot${i === active % items.length ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="testimonials__arrow"
              onClick={() => setActive((i) => (i + 1) % items.length)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {showLink && (
            <Link href="/testimonials" className="btn btn--link" style={{ color: 'var(--c-tertiary)' }}>
              Read all traveller stories
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
