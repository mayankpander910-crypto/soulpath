'use client';

import { useEffect, useState } from 'react';

/**
 * Branded preloader — "YOUR JOURNEY BEGINS HERE".
 *
 *  • preloads the REAL above-the-fold assets (logo + hero poster + hero video)
 *  • resolves on error as well, so a slow/failed asset never traps the visitor
 *  • hard 3.2s ceiling: the site can never be stuck behind it
 *  • shown once per browser session
 *  • skipped entirely for prefers-reduced-motion
 */
export default function Preloader({ posterSrc, videoSrc }) {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem('sp-preloaded'));
    } catch {
      seen = false;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduce) {
      setDone(true);
      return;
    }

    setVisible(true);
    document.body.classList.add('is-locked');

    const started = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - started;
      const ceiling = Math.min(92, (elapsed / 1600) * 92);
      setProgress((p) => (p < ceiling ? ceiling : p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      const elapsed = performance.now() - started;
      setTimeout(
        () => {
          setProgress(100);
          setTimeout(() => {
            document.body.classList.remove('is-locked');
            setDone(true);
            try {
              sessionStorage.setItem('sp-preloaded', '1');
            } catch {
              /* private mode */
            }
          }, 420);
        },
        Math.max(0, 700 - elapsed)
      );
    };

    const timeout = setTimeout(finish, 3200);

    const assets = ['/soulpath-logo.png', posterSrc].filter(Boolean);
    let pending = assets.length;

    if (pending === 0) finish();

    assets.forEach((src) => {
      const img = new Image();
      const settle = () => {
        pending -= 1;
        if (pending <= 0) finish();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
      if (img.complete) settle();
    });

    // the hero video is warmed in the background (metadata only) and never
    // blocks the reveal
    if (videoSrc) {
      const warm = document.createElement('video');
      warm.preload = 'metadata';
      warm.muted = true;
      warm.src = videoSrc;
    }

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      document.body.classList.remove('is-locked');
    };
  }, [posterSrc, videoSrc]);

  if (done || !visible) return null;

  return (
    <div
      className={`preloader${progress >= 100 ? ' is-done' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading SoulPath Holiday"
    >
      <div className="preloader__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="preloader__logo" src="/soulpath-logo.png" alt="SoulPath Holiday" />
        <span className="preloader__msg">Your journey begins here</span>
        <span className="preloader__arc" aria-hidden="true">
          <span style={{ width: `${Math.round(progress)}%` }} />
        </span>
        <span className="preloader__sub">handcrafted escapes, since 2021</span>
      </div>
    </div>
  );
}
