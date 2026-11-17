'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { CONTACT_SUBJECTS } from '@/lib/content';
import { ArrowRight } from '@/components/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) return setError('Please enter your name.');
    if (!EMAIL_RE.test(form.email)) return setError('Please enter a valid email address.');
    if (!form.subject) return setError('Please select a subject.');
    if (form.message.trim().length < 10)
      return setError('Please tell us a little more (at least 10 characters).');

    setStatus('loading');
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-panel" role="status">
        <h2>Message sent</h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Thank you — our travel team has received your message and will reply within one business
          day. For anything urgent, call us directly.
        </p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={submit} noValidate>
      <h2>Tell us about your trip</h2>
      <p>Share a few details and one of our travel experts will get back to you personally.</p>

      <div className="form-grid">
        <div className="form-row form-row--2">
          <div className="field">
            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email address *</label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="subject">Subject *</label>
          <select id="subject" className="select" value={form.subject} onChange={set('subject')} required>
            <option value="" disabled>
              Select a topic…
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            className="textarea"
            value={form.message}
            onChange={set('message')}
            placeholder="Destinations, travel dates, number of travellers…"
            required
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div>
          <button type="submit" className="btn btn--dark" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send message'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </form>
  );
}
