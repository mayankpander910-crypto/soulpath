'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Close } from './Icons';
import { CONTACT_FALLBACK } from '@/lib/config';
import { SOCIALS } from '@/lib/content';

/** The 13 primary destinations of the site — one elegant, complete list. */
const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Holiday Packages', href: '/packages' },
  { label: 'Special Offers', href: '/offers' },
  { label: 'Travel With Influencers', href: '/travel-with-influencers' },
  { label: 'Travel Guides', href: '/travel-guide' },
  { label: 'Blogs', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Corporate Tours', href: '/corporate-tours' },
  { label: 'Franchise Partner', href: '/become-partner' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Login', href: '/login' },
];

const SECONDARY = [
  { label: 'Flights', href: '/flights' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Request a Proposal', href: '/request-proposal' },
  { label: 'Help & Support', href: '/support' },
];

export default function FullscreenMenu({ id, open, onClose, onOpenBook, contact, whatsapp, user }) {
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
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

  const phone = contact?.phone || CONTACT_FALLBACK.phone;
  const email = contact?.email || CONTACT_FALLBACK.email;
  const wa = whatsapp || CONTACT_FALLBACK.whatsapp;

  return (
    <div
      id={id}
      className={`nav-shell${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="nav-hover"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
      />

      <div className="nav-drawer" ref={drawerRef}>
        <div className="nav-inner">
          <div className="nav-actions">
            <button type="button" className="close-btn" onClick={onClose} ref={closeRef}>
              <Close size={18} />
              <span>Close</span>
            </button>
            <button type="button" className="btn btn--light btn--sm" onClick={onOpenBook}>
              <span>Book a trip</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <nav className="nav-menu" aria-label="Main">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={pathname === item.href ? 'page' : undefined}
                style={{ '--i': i }}
              >
                <span className="roller">
                  <span className="roller__text">{item.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="nav-foot">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.4rem' }}>
              {SECONDARY.map((l) => (
                <Link key={l.href} href={l.href} onClick={onClose}>
                  {l.label}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link href="/dashboard" onClick={onClose}>
                  Admin
                </Link>
              )}
            </div>

            <div style={{ display: 'grid', gap: '0.3rem' }}>
              <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                WhatsApp <ArrowUpRight size={12} style={{ display: 'inline' }} />
              </a>
            </div>

            <div className="nav-foot__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>

            <p style={{ opacity: 0.6, fontSize: '0.75rem', textTransform: 'none', letterSpacing: 0 }}>
              © {new Date().getFullYear()} SoulPath Holiday Private Limited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
