'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { FRANCHISE_EXPERIENCE } from '@/lib/content';
import { ArrowRight } from '@/components/Icons';

const EMPTY = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  city: '',
  experience: '',
  reason: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PartnerForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim()) return setError('Please enter your full name.');
    if (!EMAIL_RE.test(form.email)) return setError('Please enter a valid email address.');
    if (!form.phone.trim()) return setError('Please enter your phone number.');
    if (!form.city.trim()) return setError('Please tell us your city.');
    if (!form.experience) return setError('Please select your experience level.');

    setStatus('loading');
    try {
      await apiRequest('/partner-applications', {
        method: 'POST',
        body: JSON.stringify(form),
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
      <div className="form-panel" role="status">
        <h2>Application received</h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Thank you for your interest in partnering with SoulPath Holiday. Our partnerships team will
          review your application and get in touch with the next steps.
        </p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={submit} noValidate>
      <h2>Franchise partner application</h2>
      <p>* indicates required fields.</p>

      <div className="form-grid">
        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="fullName">Full name *</label>
            <input id="fullName" className="input" value={form.fullName} onChange={set('fullName')} required />
          </div>
          <div className="field">
            <label htmlFor="businessName">Business / agency name</label>
            <input id="businessName" className="input" value={form.businessName} onChange={set('businessName')} />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="p-email">Email address *</label>
            <input id="p-email" type="email" className="input" value={form.email} onChange={set('email')} required />
          </div>
          <div className="field">
            <label htmlFor="p-phone">Phone number *</label>
            <input id="p-phone" className="input" value={form.phone} onChange={set('phone')} inputMode="tel" required />
          </div>
        </div>

        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="city">City / location *</label>
            <input id="city" className="input" value={form.city} onChange={set('city')} required />
          </div>
          <div className="field">
            <label htmlFor="experience">Experience in travel *</label>
            <select id="experience" className="select" value={form.experience} onChange={set('experience')} required>
              <option value="" disabled>
                — Select your experience —
              </option>
              {FRANCHISE_EXPERIENCE.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="reason">Why do you want to become a franchise partner?</label>
          <textarea id="reason" className="textarea" value={form.reason} onChange={set('reason')} />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div>
          <button type="submit" className="btn btn--dark" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Submit application'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </form>
  );
}
