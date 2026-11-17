'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiRequest, saveSession } from '@/lib/api';
import { ArrowRight } from '@/components/Icons';

/**
 * Registration flow — same endpoints as the original:
 *   POST /auth/send-otp   { email, purpose: "signup" } → { expiresAt }
 *   POST /auth/verify-otp { email, otp, purpose: "signup" } → { verificationToken }
 *   POST /auth/signup     { verificationToken, name, phone } → { token, user }
 */
export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect');

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState(params.get('email') || '');
  const [otp, setOtp] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async (e) => {
    e?.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
    setBusy(true);
    try {
      await apiRequest('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), purpose: 'signup' }),
      });
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp.trim()) return setError('Enter the code we emailed you.');
    setBusy(true);
    try {
      const res = await apiRequest('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), otp: otp.trim(), purpose: 'signup' }),
      });
      setVerificationToken(res.verificationToken);
      setStep('profile');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const create = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your full name.');
    if (!phone.trim()) return setError('Please enter your phone number.');
    setBusy(true);
    try {
      const res = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ verificationToken, name: name.trim(), phone: phone.trim() }),
      });
      saveSession(res.token, res.user);
      router.push(redirect || '/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const stepIndex = step === 'email' ? 0 : step === 'otp' ? 1 : 2;

  return (
    <div className="auth__form">
      <div className="auth__steps" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`auth__step${i <= stepIndex ? ' is-done' : ''}`} />
        ))}
      </div>

      <div>
        <span className="eyebrow">Join SoulPath</span>
        <h1 className="h2" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', marginTop: '0.6rem' }}>
          Create your account
        </h1>
        <p className="small muted" style={{ marginTop: '0.6rem' }}>
          Save your favourite destinations and manage bookings effortlessly.
        </p>
      </div>

      {step === 'email' && (
        <form onSubmit={sendOtp} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="reg-email">Email address</label>
            <input
              id="reg-email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <span className="field__hint">We&apos;ll send a one-time code to verify it&apos;s you.</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Sending…' : 'Send verification code'} <ArrowRight size={14} />
          </button>
          <p className="auth__switch">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verify} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="reg-otp">One-time code</label>
            <input
              id="reg-otp"
              className="input otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
            />
            <span className="field__hint">Sent to {email}</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Verifying…' : 'Verify email'} <ArrowRight size={14} />
          </button>
          <button type="button" className="chip" onClick={sendOtp}>
            Resend code
          </button>
        </form>
      )}

      {step === 'profile' && (
        <form onSubmit={create} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="reg-name">Full name</label>
            <input
              id="reg-name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="reg-phone">Phone number</label>
            <input
              id="reg-phone"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Creating account…' : 'Create account'} <ArrowRight size={14} />
          </button>
          <p className="auth__switch">
            By signing up you agree to our <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
