import { useState } from 'react';
import { Link } from 'react-router-dom';
import { announcement } from '../../data/site';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <aside className="announce" role="region" aria-label="Special offers announcement">
      <div className="announce__inner">
        <div className="announce__copy">
          <p className="announce__title">{announcement.eyebrow}</p>
          <p className="announce__text">{announcement.text}</p>
        </div>
        <Link className="announce__link label" to={announcement.cta.to}>
          {announcement.cta.label}
        </Link>
        <button
          type="button"
          className="announce__close"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 1l16 16M17 1L1 17" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
