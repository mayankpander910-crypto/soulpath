import Link from 'next/link';
import { FOOTER_LINKS, SOCIALS, BRAND, AI_ASSISTANTS } from '@/lib/content';
import { CONTACT_FALLBACK } from '@/lib/config';
import NewsletterForm from './NewsletterForm';
import { ArrowUpRight, Download } from './Icons';

const SERVICES = [
  { label: 'Holiday Packages', href: '/packages' },
  { label: 'Flight Booking', href: '/flights' },
  { label: 'Hotels & Stays', href: '/hotels' },
  { label: 'Corporate Tours', href: '/corporate-tours' },
  { label: 'Travel With Influencers', href: '/travel-with-influencers' },
  { label: 'Request a Proposal', href: '/request-proposal' },
];

export default function Footer({ settings }) {
  const c = settings?.companyDetails || {};
  const phone = c.phone || CONTACT_FALLBACK.phone;
  const altPhone = CONTACT_FALLBACK.altPhone;
  const email = c.email || CONTACT_FALLBACK.email;
  const address = c.address || CONTACT_FALLBACK.address;
  const city = c.city || CONTACT_FALLBACK.city;
  const pincode = c.pincode || CONTACT_FALLBACK.pincode;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-main">
          <h2 className="h1">Let's go somewhere</h2>
          <p className="script script--xl">unforgettable</p>
        </div>

        <div className="footer-grid">
          <div className="footer-info">
            <a href={`tel:${altPhone.replace(/\s/g, '')}`}>{altPhone}</a>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>

            <address>
              {address}
              <br />
              {city} – {pincode}, Gujarat, India
              <br />
              {CONTACT_FALLBACK.businessHours}
            </address>

            <NewsletterForm />

            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
              <a href="https://apps.apple.com/in/app/id6791446840" target="_blank" rel="noopener noreferrer">
                App Store <Download size={12} />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.soulpathholiday.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play <Download size={12} />
              </a>
            </div>
          </div>

          <div className="footer-menus">
            <div>
              <h6>Quick Links</h6>
              {FOOTER_LINKS.quickLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h6>Services</h6>
              {SERVICES.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h6>Resources</h6>
              {FOOTER_LINKS.resources.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h6>Ask AI</h6>
              {AI_ASSISTANTS.map((a) => (
                <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer">
                  {a.name} <ArrowUpRight size={11} style={{ display: 'inline' }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} {BRAND.legalName}. All rights reserved.
          </p>

          <div className="footer-legal">
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <span>Designed &amp; developed by WebNX</span>
          </div>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        SOULPATH
      </div>
    </footer>
  );
}
