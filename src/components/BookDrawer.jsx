'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { Close, Headset, Phone } from './Icons';
import { CONTACT_FALLBACK } from '@/lib/config';

/**
 * BOOK — the real booking interface, surfaced as a full-width drawer.
 * It hosts the same <SearchBar /> component used on the homepage and the
 * /flights & /packages routes, so every search actually hits the live API.
 */
export default function BookDrawer({ open, onClose, destinations = [], user }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, onClose]);

  return (
    <div
      className={`book-shell${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search flights and holidays"
      aria-hidden={!open}
      inert={!open ? '' : undefined}
      ref={panelRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="book-panel">
        <div className="book-panel__head">
          <div>
            <span className="label--cursive" style={{ display: 'block' }}>
              Where to next?
            </span>
            <p className="h2" style={{ marginTop: '0.2rem' }}>
              Search &amp; book
            </p>
          </div>
          <button
            type="button"
            className="book-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close search"
          >
            <Close size={18} />
          </button>
        </div>

        <SearchBar destinations={destinations} />

        <div className="search-meta" style={{ marginTop: '1.4rem' }}>
          <Headset size={14} />
          <span>Talk to a human on {CONTACT_FALLBACK.altPhone}</span>
          <span aria-hidden="true">·</span>
          <Link href="/request-proposal" onClick={onClose} style={{ textDecoration: 'underline' }}>
            Or request a custom proposal
          </Link>
          <span aria-hidden="true">·</span>
          <Link href={user ? '/dashboard' : '/login'} onClick={onClose} style={{ textDecoration: 'underline' }}>
            {user ? 'My bookings' : 'Sign in'}
          </Link>
          <span aria-hidden="true">·</span>
          <a href={`tel:${CONTACT_FALLBACK.phone.replace(/\s/g, '')}`} aria-label="Call SoulPath Holiday">
            <Phone size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
