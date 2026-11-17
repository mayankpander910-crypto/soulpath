'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { ArrowRight } from '@/components/Icons';

/**
 * Password recovery — same endpoints as the original:
 *   POST /auth/forgot-password { email } → { expiresAt }
 *   POST /auth/verify-otp      { email, otp, purpose: "forgot-password" } → { verificationToken }
 *   POST /auth/reset-password  { verificationToken, newPassword }
 */
export default function ForgotForm() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const request = async (e) => {
    e?.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
    setBusy(true);
    try {
      await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
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
        body: JSON.stringify({ email: email.trim(), otp: otp.trim(), purpose: 'forgot-password' }),
      });
      setToken(res.verificationToken);
      setStep('password');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setBusy(true);
    try {
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ verificationToken: token, newPassword: password }),
      });
      setStep('success');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const stepIndex = { email: 0, otp: 1, password: 2, success: 2 }[step];

  return (
    <div className="auth__form">
      <div className="auth__steps" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`auth__step${i <= stepIndex ? ' is-done' : ''}`} />
        ))}
      </div>

      <div>
        <span className="eyebrow">Account recovery</span>
        <h1 className="h2" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', marginTop: '0.6rem' }}>
          Reset your password
        </h1>
      </div>

      {step === 'email' && (
        <form onSubmit={request} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="fp-email">Email address</label>
            <input
              id="fp-email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Sending…' : 'Send reset code'} <ArrowRight size={14} />
          </button>
          <p className="auth__switch">
            Remembered it? <Link href="/login">Back to sign in</Link>
          </p>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verify} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="fp-otp">One-time code</label>
            <input
              id="fp-otp"
              className="input otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              required
            />
            <span className="field__hint">Sent to {email}</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Verifying…' : 'Verify code'} <ArrowRight size={14} />
          </button>
          <button type="button" className="chip" onClick={request}>
            Resend code
          </button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={reset} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="fp-password">New password</label>
            <input
              id="fp-password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="fp-confirm">Confirm new password</label>
            <input
              id="fp-confirm"
              type="password"
              className="input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Saving…' : 'Set new password'} <ArrowRight size={14} />
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="form-grid">
          <p className="form-success">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <Link href="/login" className="btn btn--dark">
            Go to sign in <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
