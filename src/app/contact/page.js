import Link from 'next/link';
import { getSiteSettings } from '@/lib/api';
import { CONTACT_FALLBACK } from '@/lib/config';
import { PageHero } from '@/components/ui';
import { Clock, Mail, MapPin, Phone, Whatsapp } from '@/components/Icons';
import ContactForm from './ContactForm';

export const revalidate = 300;

export const metadata = {
  title: 'Contact Us',
  description:
    'Talk to SoulPath Holiday — E 919, Ganesh Glory 11, Jagatpur Road, Ahmedabad 382470. Call +91 78610 11063 or email info@soulpathholiday.com.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const c = settings?.companyDetails || {};
  const phone = c.phone || CONTACT_FALLBACK.phone;
  const altPhone = CONTACT_FALLBACK.altPhone;
  const email = c.email || CONTACT_FALLBACK.email;
  const address = c.address || CONTACT_FALLBACK.address;
  const city = c.city || CONTACT_FALLBACK.city;
  const state = c.state || 'Gujarat';
  const pincode = c.pincode || CONTACT_FALLBACK.pincode;
  const hours = settings?.businessHours || CONTACT_FALLBACK.businessHours;
  const wa = String(settings?.whatsappNumber || CONTACT_FALLBACK.whatsapp).replace(/\D/g, '');
  const mapQuery = encodeURIComponent(`${address}, ${city}, ${state} ${pincode}, India`);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan something extraordinary"
        sub="Questions about a package, a group trip or a custom itinerary? Our Ahmedabad-based team replies personally — usually within a business day."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Reach the team
              </h2>

              <div className="contact-list" style={{ marginTop: '1.6rem' }}>
                <div className="contact-item">
                  <span className="contact-item__icon">
                    <MapPin size={17} />
                  </span>
                  <div>
                    <h4>Visit us</h4>
                    <p>
                      {address}
                      <br />
                      {city} – {pincode}
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Phone size={16} />
                  </span>
                  <div>
                    <h4>Call us</h4>
                    <p>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                      <br />
                      <a href={`tel:${altPhone.replace(/\s/g, '')}`}>{altPhone}</a>
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Mail size={16} />
                  </span>
                  <div>
                    <h4>Email us</h4>
                    <p>
                      <a href={`mailto:${email}`}>{email}</a>
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-item__icon">
                    <Clock size={16} />
                  </span>
                  <div>
                    <h4>Business hours</h4>
                    <p>{hours}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent('Hi SoulPath Holiday, I have a question about a trip.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--dark"
                >
                  <Whatsapp size={16} /> Chat on WhatsApp
                </a>
                <Link href="/request-proposal" className="btn btn--outline">
                  Request a proposal
                </Link>
              </div>

              <div className="map-frame">
                <iframe
                  title="SoulPath Holiday office location"
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
