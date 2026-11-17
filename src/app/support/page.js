import Link from 'next/link';
import { getSiteSettings } from '@/lib/api';
import { CONTACT_FALLBACK } from '@/lib/config';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Clock, Mail, Phone, Whatsapp } from '@/components/Icons';

export const revalidate = 300;

export const metadata = {
  title: 'Help & Support',
  description:
    'Help and support for SoulPath Holiday travellers — reach our operations desk by phone, WhatsApp or email, before or during your trip.',
  alternates: { canonical: '/support' },
};

const FAQS = [
  {
    q: 'How do I get my final travel documents?',
    a: 'Final travel documents (air tickets, hotel vouchers and tour vouchers) are issued within 15 days prior to your date of journey, once the balance payment is received.',
  },
  {
    q: 'What are the transfer timings?',
    a: 'Private transfers are point-to-point and drivers wait a maximum of 15 minutes at each pickup. Please be in your hotel lobby at least 15 minutes before any scheduled tour or transfer.',
  },
  {
    q: 'Who do I contact while travelling?',
    a: 'Our operations team sends day-wise tour details and remains your primary contact for assistance during travel. The number is shared in your travel documents.',
  },
  {
    q: 'Can I customise a package?',
    a: 'Yes — every itinerary can be adjusted for dates, hotels, pace and add-ons. Request a proposal and a curator will send options.',
  },
];

export default async function SupportPage() {
  const settings = await getSiteSettings();
  const phone = settings?.companyDetails?.phone || CONTACT_FALLBACK.phone;
  const email = settings?.companyDetails?.email || CONTACT_FALLBACK.email;
  const hours = settings?.businessHours || CONTACT_FALLBACK.businessHours;
  const wa = String(settings?.whatsappNumber || CONTACT_FALLBACK.whatsapp).replace(/\D/g, '');

  return (
    <>
      <PageHero
        eyebrow="Help & support"
        title="We're with you, before and during the trip"
        sub="Answers to the questions we get most, plus every way to reach a real person."
        crumbs={[{ label: 'Support' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Talk to us
              </h2>
              <div className="contact-list" style={{ marginTop: '1.4rem' }}>
                <div className="contact-item">
                  <span className="contact-item__icon"><Phone size={15} /></span>
                  <div>
                    <h4>Phone</h4>
                    <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon"><Mail size={15} /></span>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon"><Clock size={15} /></span>
                  <div>
                    <h4>Office hours</h4>
                    <p>{hours}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent('Hi SoulPath Holiday, I need help with my trip.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--dark"
                >
                  <Whatsapp size={16} /> WhatsApp support
                </a>
                <Link href="/contact" className="btn btn--outline">
                  Contact form <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1.2rem' }}>
                Frequently asked
              </h2>
              <div className="itinerary">
                {FAQS.map((f, i) => (
                  <Reveal className="itin-day" key={f.q} delay={i * 50}>
                    <div className="itin-day__num">
                      FAQ <b>{String(i + 1).padStart(2, '0')}</b>
                    </div>
                    <div>
                      <h3>{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
