'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiRequest, clearSession, getStoredUser, getToken } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { ArrowRight, Heart, Logout } from '@/components/Icons';

export default function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login?redirect=/dashboard');
      return;
    }
    setUser(getStoredUser());
    apiRequest('/auth/saved-destinations')
      .then((res) => setSaved(res?.data || []))
      .catch((err) => setError(err.message || 'Could not load your saved destinations.'))
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    clearSession();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingBlock: '4rem' }}>
        <div className="skeleton" style={{ height: 32, width: 240, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 220 }} />
      </div>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(var(--header-h) + 3rem)' }}>
      <div className="container">
        <div className="account">
          <div className="account__head">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="account__avatar" aria-hidden="true">
                {(user?.name || user?.email || 'S')[0].toUpperCase()}
              </span>
              <div>
                <h1 className="h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>
                  {user?.name || 'Your account'}
                </h1>
                <p className="small muted">{user?.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/packages" className="btn btn--dark btn--sm">
                Browse packages
              </Link>
              <button type="button" className="btn btn--outline btn--sm" onClick={logout}>
                <Logout size={14} /> Sign out
              </button>
            </div>
          </div>

          <div>
            <h2 className="h3" style={{ marginBottom: '0.4rem' }}>
              Saved destinations
            </h2>
            <p className="small muted" style={{ marginBottom: '1.4rem' }}>
              Everything you&apos;ve bookmarked while browsing.
            </p>

            {error && <p className="form-error">{error}</p>}

            {saved.length === 0 ? (
              <div className="empty-state">
                <Heart size={20} style={{ color: 'var(--brown)' }} />
                <h3 className="h3">Nothing saved yet</h3>
                <p className="lede" style={{ textAlign: 'center' }}>
                  Tap “Save destination” on any destination page and it will appear here.
                </p>
                <Link href="/destinations" className="btn btn--dark">
                  Explore destinations <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="saved-grid">
                {saved.map((d) => (
                  <Link className="dest-card" key={d._id} href={`/destinations/${d.slug}`}>
                    <div className="dest-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaUrl(d.heroImage)} alt={d.name} loading="lazy" />
                    </div>
                    <div className="dest-card__body">
                      <h3>{d.name}</h3>
                      <p className="small">{d.region || d.country}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {(user?.role === 'admin' || user?.role === 'partner') && (
            <p className="form-success">
              You are signed in with the <b>{user.role}</b> role. Operational dashboards
              (partner/admin) continue to run on the existing back-office application.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
