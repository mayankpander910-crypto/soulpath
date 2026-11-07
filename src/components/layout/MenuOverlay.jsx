import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuNav, site } from '../../data/site';
import { useBodyLock } from '../../hooks/useBodyLock';
import './MenuOverlay.css';

export default function MenuOverlay({ open, onClose }) {
  useBodyLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu-overlay__bar">
        <span className="label">Menu</span>
        <button type="button" className="menu-overlay__close" onClick={onClose} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 1l18 18M19 1L1 19" />
          </svg>
        </button>
      </div>

      <div className="menu-overlay__grid">
        <nav className="menu-overlay__nav" aria-label="Full menu">
          {menuNav.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="menu-overlay__link"
              style={{ transitionDelay: `${open ? 120 + index * 45 : 0}ms` }}
              onClick={onClose}
            >
              <span className="menu-overlay__index label">{String(index + 1).padStart(2, '0')}</span>
              <span className="display display--md">{item.label}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M4 20 20 4M9 4h11v11" />
              </svg>
            </Link>
          ))}
        </nav>

        <aside className="menu-overlay__aside">
          <div>
            <p className="label text-forest">Contact</p>
            <p className="menu-overlay__address">
              {site.contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="menu-overlay__address">
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </div>

          <div>
            <p className="label text-forest">Follow</p>
            <ul className="menu-overlay__socials">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="menu-overlay__note">Ask AI about SoulPath Holiday</p>
        </aside>
      </div>
    </div>
  );
}
