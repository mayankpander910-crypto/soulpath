'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { CORPORATE_COUNTRY_CODES } from '@/lib/content';
import { ArrowRight } from '@/components/Icons';

const EMPTY = {
  companyName: '',
  contactName: '',
  phone: '',
  countryCode: '+91',
  email: '',
  numberOfPeople: '',
  destination: '',
  travelDates: '',
  requirements: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CorporateForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.companyName.trim()) return setError('Please enter your company name.');
    if (!form.contactName.trim()) return setError('Please enter a contact name.');
    if (!form.phone.trim()) return setError('Please enter a phone number.');
    if (!EMAIL_RE.test(form.email)) return setError('Please enter a valid email address.');
    if (!form.numberOfPeople) return setError('Please tell us how many people are travelling.');

    setStatus('loading');
    try {
      await apiRequest('/corporate-inquiries', {
        method: 'POST',
        body: JSON.stringify({ ...form, numberOfPeople: parseInt(form.numberOfPeople, 10) || 1 }),
      });
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-panel" id="inquiry-form" role="status">
        <h2>Enquiry received</h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Thank you for choosing SoulPath Holiday. Our corporate travel team is reviewing your
          requirements and will contact you within 24 hours with a customised proposal.
        </p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form-panel" id="inquiry-form" onSubmit={submit} noValidate>
      <h2>Request a corporate quote</h2>
      <p>Fields marked * are required. We reply within 24 hours.</p>

      <div className="form-grid">
        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="companyName">Company name *</label>
            <input id="companyName" className="input" value={form.companyName} onChange={set('companyName')} required />
          </div>
          <div className="field">
            <label htmlFor="contactName">Contact name *</label>
            <input id="contactName" className="input" value={form.contactName} onChange={set('contactName')} required />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="phone">Phone number *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                className="select"
                style={{ maxWidth: 120 }}
                value={form.countryCode}
                onChange={set('countryCode')}
                aria-label="Country code"
              >
                {CORPORATE_COUNTRY_CODES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input id="phone" className="input" value={form.phone} onChange={set('phone')} inputMode="tel" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-email">Email address *</label>
            <input id="c-email" type="email" className="input" value={form.email} onChange={set('email')} required />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="numberOfPeople">Number of people *</label>
            <input
              id="numberOfPeople"
              type="number"
              min="1"
              className="input"
              value={form.numberOfPeople}
              onChange={set('numberOfPeople')}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="destination">Preferred destination</label>
            <input id="destination" className="input" value={form.destination} onChange={set('destination')} placeholder="e.g. Bali, Dubai, Vietnam" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="travelDates">Travel dates</label>
          <input id="travelDates" className="input" value={form.travelDates} onChange={set('travelDates')} placeholder="e.g. 12–16 March 2027" />
        </div>

        <div className="field">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            className="textarea"
            value={form.requirements}
            onChange={set('requirements')}
            placeholder="Team size, budget per head, goals for the offsite…"
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div>
          <button type="submit" className="btn btn--dark" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Request corporate quote'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </form>
  );
}
