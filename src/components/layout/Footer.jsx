import { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, site } from '../../data/site';
import Button from '../ui/Button';
import Arrow from '../ui/Arrow';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer__news">
        <h2 className="display display--lg footer__news-title">Exclusive Deals</h2>
        <div className="footer__news-body">
          <p className="lede">Sign up and get early access to special curated destination deals.</p>
          <form className="footer__form" onSubmit={handleSubmit}>
            <label className="footer__input-wrap" htmlFor="newsletter-email">
              <span className="visually-hidden">Email address</span>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="footer__input"
              />
            </label>
            <Button as="button" type="submit" variant="outline" size="md">
              Sign up
            </Button>
          </form>
          <p className="footer__form-note" role="status">
            {sent ? 'Thank you — you are on the list.' : 'By signing up, you agree to our Terms of Service and Privacy Policy.'}
          </p>
        </div>
      </div>

      <hr className="rule" />

      {/* Directory */}
      <div className="footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__wordmark">
            <span className="wordmark__name">SoulPath</span>
            <span className="wordmark__sub">Holiday</span>
          </Link>
          <p className="footer__tagline">{site.description}</p>
          <ul className="footer__socials">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="footer__stores">
            <a href="#" aria-label="Download on the App Store">
              <img src="/assets/app-store.svg" alt="Download on the App Store" />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img src="/assets/google-play.svg" alt="Get it on Google Play" />
            </a>
          </div>
          <p className="footer__ai">Ask AI about SoulPath Holiday</p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h3 className="label footer__col-title">Quick Links</h3>
          <ul>
            {footerLinks.quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Resources">
          <h3 className="label footer__col-title">Resources</h3>
          <ul>
            {footerLinks.resources.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__contact">
          <h3 className="label footer__col-title">Contact Us</h3>
          <address>
            {site.contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <p className="footer__hours">{site.contact.hours}</p>
          <Link className="footer__plan" to="/contact">
            Plan your trip <Arrow size={14} />
          </Link>
        </div>
      </div>

      <div className="footer__legal">
        <p>
          © 2026 {site.legalName}. All rights reserved. <span className="footer__sep">|</span> Designed &amp; Developed by
          WebNX
        </p>
        <ul>
          {footerLinks.legal.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
