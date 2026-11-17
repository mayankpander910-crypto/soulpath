'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { ArrowRight } from './Icons';

/**
 * Newsletter capture. The original build exposed no dedicated newsletter route,
 * so this posts to `/newsletter` and, if the backend does not expose it, tells
 * the visitor exactly how to reach the team instead of pretending it worked.
 */
export default function NewsletterForm({ variant = 'light' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ state: 'loading', message: '' });
    try {
      await apiRequest('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setStatus({ state: 'success', message: 'You’re on the list — curated deals are on the way.' });
      setEmail('');
    } catch {
      setStatus({
        state: 'error',
        message: 'Online sign-up is unavailable right now — write to info@soulpathholiday.com and we’ll add you.',
      });
    }
  };

  return (
    <div>
      <form onSubmit={submit} className={variant === 'light' ? 'footer-newsletter' : undefined} noValidate>
        <label htmlFor={`newsletter-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${variant}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          required
        />
        <button type="submit" aria-label="Subscribe" disabled={status.state === 'loading'}>
          <ArrowRight size={16} />
        </button>
      </form>
      {status.state === 'success' && <p className="form-success">{status.message}</p>}
      {status.state === 'error' && <p className="form-error">{status.message}</p>}
    </div>
  );
}
