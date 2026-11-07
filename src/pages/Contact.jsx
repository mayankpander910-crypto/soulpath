import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import { site } from '../data/site';
import './pages.css';

const TOPICS = ['Group Booking (10+ people)', 'General Inquiry', 'Package Details', 'Partnership / B2B'];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        copy="Have questions about a destination or a custom group itinerary? Our travel experts are here to help."
        breadcrumb="Contact Us"
      />

      <section className="section shell contact">
        <div className="contact__info" data-reveal>
          <h2 className="display display--md">Contact Information</h2>
          <p className="body-copy">
            Reach out to us through any of the channels below or fill out the form, and our team will get back to you
            within 24 hours.
          </p>

          <dl className="contact__list">
            <div>
              <dt className="label">Our Headquarters</dt>
              <dd>
                {site.contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label">Phone Support</dt>
              <dd>
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
                <span className="contact__muted">{site.contact.hours}</span>
              </dd>
            </div>
            <div>
              <dt className="label">Email Address</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact__form-wrap" data-reveal>
          <h2 className="display display--md">Send an Inquiry</h2>
          <p className="body-copy">Fill out the form below and we&rsquo;ll connect you with the right travel expert.</p>

          {sent ? (
            <p className="contact__success" role="status">
              Thank you. Our team will get back to you within 24 hours.
            </p>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <Field label="Full Name" id="name" name="name" placeholder="Your name" required />
                <Field label="Email Address" id="email" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <Field label="Subject" id="subject" name="subject" as="select" options={['Select a topic...', ...TOPICS]} />
              <Field label="Message" id="message" name="message" as="textarea" placeholder="Tell us about your trip" />
              <Button as="button" type="submit" variant="solid" size="lg">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
