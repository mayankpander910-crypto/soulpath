'use client';

import { useEffect, useState } from 'react';
import { apiRequest, getToken } from '@/lib/api';
import { Heart } from './Icons';

/**
 * Save / unsave a destination for the signed-in traveller.
 * Uses the existing endpoints: GET/POST/DELETE `/auth/saved-destinations`.
 */
export default function SaveDestinationButton({ destinationId, label = 'Save' }) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!getToken() || !destinationId) {
      setReady(true);
      return;
    }
    apiRequest('/auth/saved-destinations')
      .then((res) => {
        if (!alive) return;
        const ids = (res?.data || []).map((d) => d._id || d);
        setSaved(ids.includes(destinationId));
      })
      .catch(() => {})
      .finally(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, [destinationId]);

  const toggle = async () => {
    if (!getToken()) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setBusy(true);
    try {
      if (saved) {
        await apiRequest(`/auth/saved-destinations/${destinationId}`, { method: 'DELETE' });
        setSaved(false);
      } else {
        await apiRequest('/auth/saved-destinations', {
          method: 'POST',
          body: JSON.stringify({ destinationId }),
        });
        setSaved(true);
      }
    } catch {
      /* keep the previous state — the API is the source of truth */
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`btn btn--outline${saved ? ' is-saved' : ''}`}
      onClick={toggle}
      disabled={busy || !ready}
      aria-pressed={saved}
    >
      <Heart size={15} style={saved ? { fill: 'currentColor' } : undefined} />
      {saved ? 'Saved' : label}
    </button>
  );
}
