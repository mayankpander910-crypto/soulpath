'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getStoredUser } from '@/lib/api';
import { Calendar, Close, Menu as MenuIcon } from './Icons';
import FullscreenMenu from './FullscreenMenu';
import BookDrawer from './BookDrawer';

/**
 * Faith-style floating header:
 *   circular MENU pill (left) · centred wordmark · circular BOOK pill (right)
 * MENU opens the full navigation drawer, BOOK opens the live booking search.
 */
export default function Header({ settings, destinations = [] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [user, setUser] = useState(null);
  const lastY = useRef(0);

  // only the homepage hero is full-bleed behind the header
  const overlay = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen, bookOpen]);

  useEffect(() => {
    setUser(getStoredUser());
    const sync = () => setUser(getStoredUser());
    window.addEventListener('sp-auth-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('sp-auth-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setBookOpen(false);
  }, [pathname]);

  const openMenu = useCallback(() => {
    setBookOpen(false);
    setMenuOpen(true);
  }, []);

  const openBook = useCallback(() => {
    setMenuOpen(false);
    setBookOpen(true);
  }, []);

  const transparent = overlay && !scrolled;
  // the reference keeps the header pinned at all times — it never hides
  const headerClass = ['site-header', transparent ? 'is-transparent' : 'is-solid']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <button
          type="button"
          className="menu-btn menu-btn--left"
          onClick={openMenu}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <MenuIcon size={18} />
          <span>Menu</span>
        </button>

        <Link href="/" className="site-branding" aria-label="SoulPath Holiday — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/soulpath-logo.png" alt="SoulPath Holiday" width="520" height="359" />
        </Link>

        <button type="button" className="menu-btn menu-btn--right" onClick={openBook}>
          <span>Book</span>
          <Calendar size={18} />
        </button>
      </header>

      <FullscreenMenu
        id="site-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenBook={() => {
          setMenuOpen(false);
          setBookOpen(true);
        }}
        user={user}
        contact={
          settings?.companyDetails
            ? {
                phone: settings.companyDetails.phone,
                email: settings.companyDetails.email,
              }
            : undefined
        }
        whatsapp={settings?.whatsappNumber}
      />

      <BookDrawer
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        destinations={destinations}
        user={user}
      />

      <span className="sr-only">
        <Close size={0} />
      </span>
    </>
  );
}
