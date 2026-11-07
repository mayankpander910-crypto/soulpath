import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UtilityDock.css';

/** Floating chat + back-to-top controls, mirroring the live site's dock. */
export default function UtilityDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="dock">
      <Link className="dock__btn dock__btn--chat" to="/contact" aria-label="Ask about SoulPath Holiday">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L4 21l1.6-4.4A8.5 8.5 0 1 1 21 12z" />
        </svg>
      </Link>

      <button
        type="button"
        className={`dock__btn dock__btn--top ${visible ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M12 20V4M5 11l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
