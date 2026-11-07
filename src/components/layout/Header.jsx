import { Link, NavLink } from 'react-router-dom';
import { primaryNav, site } from '../../data/site';
import { useScrolled } from '../../hooks/useScrolled';
import './Header.css';

/** Waldhaus-style header: hairline nav left, centred wordmark, pill actions right. */
export default function Header({ onOpenMenu }) {
  const scrolled = useScrolled(12);

  return (
    <div className={`header-sticky ${scrolled ? 'is-scrolled' : ''}`}>
      <header className="header">
        <nav className="header__nav" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} className="header__link label">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          <span className="wordmark__name">SoulPath</span>
          <span className="wordmark__sub">Holiday</span>
          <span className="wordmark__ornament" aria-hidden="true">
            ◆◆◆◆◆
          </span>
        </Link>

        <div className="header__actions">
          <span className="header__badge label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8.5 13.6 12 12 15.5 10.4 12z" />
            </svg>
            50+ Destinations
          </span>

          <Link className="header__pill label header__pill--solid" to="/packages">
            Packages
          </Link>
          <Link className="header__pill label header__pill--solid" to="/contact">
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="header__burger"
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <span />
          <span />
        </button>
      </header>
    </div>
  );
}
