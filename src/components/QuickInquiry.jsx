'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { ArrowRight } from './Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Compact inquiry form used in the homepage's closing block. */
export default function QuickInquiry() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', when: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please tell us your name.');
    if (!EMAIL_RE.test(form.email)) return setError('Please enter a valid email address.');
    if (form.message.trim().length < 10) return setError('Tell us a little more about the trip you have in mind.');

    setStatus('loading');
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Holiday enquiry',
          message: `${form.message}\n\nPhone: ${form.phone || '—'}\nTravelling: ${form.when || '—'}`,
        }),
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', when: '', message: '' });
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Something went wrong — please try again or call us.');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status" style={{ display: 'grid', gap: '0.8rem' }}>
        <strong>Thank you — your enquiry is with our travel team.</strong>
        <span>We reply within one business day. For anything urgent, call +91 98982 11063.</span>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={submit} noValidate>
      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor="qi-name">Your name</label>
          <input id="qi-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="qi-email">Email</label>
          <input
            id="qi-email"
            type="email"
            className="input"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor="qi-phone">Phone / WhatsApp</label>
          <input id="qi-phone" className="input" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="qi-when">Travelling when?</label>
          <select id="qi-when" className="select" value={form.when} onChange={set('when')}>
            <option value="">Select a window</option>
            <option>Next 1–2 months</option>
            <option>In 3–6 months</option>
            <option>Later this year</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="qi-message">Where would you like to go?</label>
        <textarea
          id="qi-message"
          className="textarea"
          value={form.message}
          onChange={set('message')}
          placeholder="Two of us, ten days, somewhere warm with good food…"
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" className="btn btn--solid btn--w-icon" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Start my journey'}
          <ArrowRight size={15} />
        </button>
        <Link href="/request-proposal" className="btn--link btn">
          Build a detailed proposal
        </Link>
      </div>

      <p className="small muted" style={{ margin: 0 }}>
        By submitting you agree to our{' '}
        <Link href="/terms" style={{ textDecoration: 'underline' }}>
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/privacy" style={{ textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
