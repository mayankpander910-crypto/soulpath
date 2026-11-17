'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { ArrowRight } from '@/components/Icons';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  travellers: '',
  budget: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProposalForm({ defaults = {} }) {
  const [form, setForm] = useState({
    ...EMPTY,
    destination: defaults.destination || '',
    message: defaults.package
      ? `I'm interested in the "${defaults.package}" package. `
      : '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (!EMAIL_RE.test(form.email)) return setError('Please enter a valid email address.');
    if (!form.phone.trim()) return setError('Please enter a phone number.');
    if (!form.destination.trim()) return setError('Where would you like to go?');
    if (!form.travelDate.trim()) return setError('Please share an approximate travel date.');

    setStatus('loading');
    try {
      await apiRequest('/proposal-requests', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          ...(defaults.package ? { packageSlug: defaults.package } : {}),
        }),
      });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(
        err.message ||
          'We could not submit that just now. Please call +91 78610 11063 or email info@soulpathholiday.com.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="form-panel" role="status">
        <h2>Request received</h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Thank you — a travel curator will email you a personalised proposal, usually within one
          business day. Nothing is charged and there is no obligation.
        </p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Plan another trip
        </button>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={submit} noValidate>
      <h2>Tell us where you&apos;re dreaming of</h2>
      <p>The more you share, the sharper the proposal. No payment, no obligation.</p>

      <div className="form-grid">
        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="r-name">Your name *</label>
            <input id="r-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="r-email">Email address *</label>
            <input id="r-email" type="email" className="input" value={form.email} onChange={set('email')} autoComplete="email" required />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="r-phone">Phone number *</label>
            <input id="r-phone" className="input" value={form.phone} onChange={set('phone')} inputMode="tel" required />
          </div>
          <div className="field">
            <label htmlFor="r-destination">Destination *</label>
            <input
              id="r-destination"
              className="input"
              value={form.destination}
              onChange={set('destination')}
              placeholder="e.g. Thailand, Dubai, Europe"
              required
            />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="r-date">Travel dates</label>
            <input
              id="r-date"
              className="input"
              value={form.travelDate}
              onChange={set('travelDate')}
              placeholder="e.g. April 2027 / flexible"
            />
          </div>
          <div className="field">
            <label htmlFor="r-travellers">Travellers</label>
            <input
              id="r-travellers"
              className="input"
              value={form.travellers}
              onChange={set('travellers')}
              placeholder="2 adults, 1 child (6 yrs)"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="r-budget">Budget per person</label>
          <select id="r-budget" className="select" value={form.budget} onChange={set('budget')}>
            <option value="">Not sure yet</option>
            <option value="Under ₹25,000">Under ₹25,000</option>
            <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
            <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
            <option value="₹1,00,000+">₹1,00,000+</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="r-message">Anything else we should know?</label>
          <textarea
            id="r-message"
            className="textarea"
            value={form.message}
            onChange={set('message')}
            placeholder="Travel style, must-dos, dietary needs, celebration…"
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div>
          <button type="submit" className="btn btn--dark" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Get my free proposal'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </form>
  );
}
