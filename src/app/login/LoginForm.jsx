'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiRequest, saveSession } from '@/lib/api';
import { ArrowRight } from '@/components/Icons';

/**
 * Sign-in flow — identical API contract to the original site:
 *   POST /auth/check-user  → { exists, hasPassword }
 *   POST /auth/login       → { token, user }
 *   POST /auth/send-otp    → { expiresAt }   (purpose: "login")
 *   POST /auth/verify-otp  → { token, user }
 */
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect');

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState(params.get('email') || '');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [hasPassword, setHasPassword] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const go = (user) => {
    const target = redirect || (user?.role === 'admin' ? '/admin' : user?.role === 'partner' ? '/partner' : '/dashboard');
    router.push(target);
    router.refresh();
  };

  const checkUser = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) return setError('Please enter your email address.');
    setBusy(true);
    try {
      const res = await apiRequest('/auth/check-user', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res?.exists) {
        const qs = new URLSearchParams({ email: email.trim() });
        if (redirect) qs.set('redirect', redirect);
        router.push(`/register?${qs.toString()}`);
        return;
      }
      setHasPassword(res.hasPassword !== false);
      setStep(res.hasPassword === false ? 'otp' : 'password');
      if (res.hasPassword === false) await sendOtp();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const sendOtp = async () => {
    setError('');
    try {
      await apiRequest('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), purpose: 'login' }),
      });
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    }
  };

  const loginWithPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) return setError('Please enter your password.');
    setBusy(true);
    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      saveSession(res.token, res.user);
      go(res.user);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp.trim()) return setError('Enter the code we emailed you.');
    setBusy(true);
    try {
      const res = await apiRequest('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), otp: otp.trim(), purpose: 'login' }),
      });
      saveSession(res.token, res.user);
      go(res.user);
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const stepIndex = step === 'email' ? 0 : step === 'otp' || step === 'password' ? 1 : 2;

  return (
    <div className="auth__form">
      <div className="auth__steps" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`auth__step${i <= stepIndex ? ' is-done' : ''}`} />
        ))}
      </div>

      <div>
        <span className="eyebrow">Welcome back</span>
        <h1 className="h2" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', marginTop: '0.6rem' }}>
          Sign in to SoulPath
        </h1>
        <p className="small muted" style={{ marginTop: '0.6rem' }}>
          Save destinations, manage enquiries and keep your itineraries in one place.
        </p>
      </div>

      {step === 'email' && (
        <form onSubmit={checkUser} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
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
            {busy ? 'Checking…' : 'Continue'} <ArrowRight size={14} />
          </button>
          <p className="auth__switch">
            New to SoulPath? <Link href={`/register${email ? `?email=${encodeURIComponent(email)}` : ''}`}>Create an account</Link>
          </p>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={loginWithPassword} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <span className="field__hint">Signing in as {email}</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'} <ArrowRight size={14} />
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="button" className="chip" onClick={sendOtp}>
              Email me a code instead
            </button>
            <Link href="/forgot-password" className="auth__switch" style={{ alignSelf: 'center' }}>
              Forgot password?
            </Link>
          </div>
          <button
            type="button"
            className="auth__switch"
            style={{ background: 'none', border: 0, textAlign: 'left' }}
            onClick={() => {
              setStep('email');
              setError('');
            }}
          >
            ← Use a different email
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verifyOtp} className="form-grid" noValidate>
          <div className="field">
            <label htmlFor="login-otp">One-time code</label>
            <input
              id="login-otp"
              className="input otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
            />
            <span className="field__hint">Sent to {email}. Codes expire shortly after sending.</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--dark" disabled={busy}>
            {busy ? 'Verifying…' : 'Verify & sign in'} <ArrowRight size={14} />
          </button>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button type="button" className="chip" onClick={sendOtp}>
              Resend code
            </button>
            {hasPassword && (
              <button type="button" className="chip" onClick={() => setStep('password')}>
                Use password instead
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
