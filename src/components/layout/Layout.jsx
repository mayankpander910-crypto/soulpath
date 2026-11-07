import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import SideRails from './SideRails';
import MenuOverlay from './MenuOverlay';
import Footer from './Footer';
import UtilityDock from './UtilityDock';

/** App shell: announcement bar, header, side rails, overlays, footer. */
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Reset scroll on route change, but respect in-page anchors.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <SideRails onOpenMenu={() => setMenuOpen(true)} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <UtilityDock />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
