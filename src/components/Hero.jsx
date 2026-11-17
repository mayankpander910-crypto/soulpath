'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenMotionSafe } from '@/lib/motion-ready';
import { mediaUrl, SITE_ORIGIN } from '@/lib/config';
import { ArrowRight, Sparkle } from './Icons';

/**
 * Cinematic arch hero — the reference's signature composition and motion.
 *
 * a near-full-height arch of video/photo, bottom-anchored, with a centred
 * two-line headline (one serif line + one script line) and a scroll ring.
 * Media is SoulPath's own hero video / poster from the existing site settings.
 *
 * Motion (ported 1:1 from the reference's hero timeline):
 *   - the section is PINNED for one extra viewport of scroll
 *   - the media scales .8 → 1 over the first 100px of scroll
 *   - the arch widens to 110vw (100vh in portrait) while the veil darkens
 *     (--bg-opacity .75 → .5)
 *   - the text rises and grows: scale .75 → 1, y 100 → 0 (175 in portrait)
 *   - the scroll ring's dot bobs forever on a power2.out loop
 */
export default function Hero({ settings, destinations = [] }) {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const wrapRef = useRef(null);
  const [videoOk, setVideoOk] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  const poster = settings?.homepageHeroImage
    ? mediaUrl(settings.homepageHeroImage)
    : '/uploads/hero-poster.jpg';

  const videoSrc = settings?.homepageHeroVideo
    ? mediaUrl(settings.homepageHeroVideo)
    : `${SITE_ORIGIN}/videos/hero-banner-soulpath.mp4`;

  const fallbackImg = destinations[0]?.heroImage ? mediaUrl(destinations[0].heroImage) : poster;

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(conn?.saveData);
    const slow = /(^|-)2g$|(^|-)3g$/.test(conn?.effectiveType || '');
    setAllowVideo(!reduce && !saveData && !slow);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowVideo) return;
    v.play().catch(() => setVideoFailed(true));
  }, [allowVideo]);

  /* ----------------------- reference hero timeline ----------------------- */
  useEffect(() => {
    const el = heroRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx;
    let refreshTimer;

    const build = () => {
    ctx = gsap.context(() => {
      const gate = el.querySelector('.hero__gate');
      const media = el.querySelector('.hero__media');
      const text = el.querySelector('.hero__text');
      const scroll = el.querySelector('.hero__scroll');

      const mm = gsap.matchMedia();

      mm.add(
        {
          landscape: '(min-aspect-ratio: 1/1)',
          portrait: '(max-aspect-ratio: 1/1)',
        },
        (context) => {
          const { landscape, portrait } = context.conditions;

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              // the hero is held by `position: sticky` inside .hero-wrap, so it
              // behaves exactly like the reference's pinned hero without
              // ScrollTrigger having to move the element in the DOM
              trigger: wrap,
              scrub: 1,
              start: 'top top',
              end: 'bottom bottom',
            },
          });

          tl.addLabel('start');

          // veil darkens as the arch fills the screen
          tl.to(gate, { '--bg-opacity': 0.5 }, 'start');


          // media pushes in over roughly the first 100px of the pinned scroll
          // (a short slice of the timeline — a second ScrollTrigger on the
          //  pinned element would fight the pin's own transform)
          tl.fromTo(media, { scale: 0.8 }, { scale: 1, duration: 0.03, ease: 'none' }, 'start');

          // the arch widens (110vw desktop / 100vh portrait)
          tl.to(gate, { width: landscape ? '110vw' : '100vh' }, 'start');

          // copy rises + grows into place. The portrait start value mirrors
          // the CSS resting state so there is no jump on init.
          const restY = portrait ? Math.min(175, window.innerHeight * 0.1) : 100;
          tl.fromTo(text, { scale: 0.75, y: restY }, { scale: 1, y: 0 }, 'start');

          if (portrait && scroll) tl.to(scroll, { y: 0 }, 'start');

          // headline children fade in, last line first (reference order)
          el.querySelectorAll('.hero__text > *').forEach((child) => {
            tl.to(child, { opacity: 1 }, 'start');
          });

          const mark = el.querySelector('.hero__mark');
          if (mark) {
            tl.to(mark, { opacity: 1 }, 'start');
            // the mark sits on the photo once the arch expands → invert it
            tl.to(mark, { color: '#ffffff' }, 'start');
          }
        }
      );



      /* scroll ring: the dot travels down the ring, forever */
      const icon = el.querySelector('.hero__scroll-icon');
      if (icon) {
        gsap
          .timeline({ repeat: -1, ease: 'power2.out' })
          .to(icon, { '--top': '30%', delay: 0.8, duration: 0.5 })
          .to(icon, { '--top': '70%', delay: 1, duration: 1 })
          .to(icon, { '--top': '50%', delay: 1, duration: 1 });
      }

      return () => mm.revert();
    }, el);

    // late layout shifts (fonts, video metadata) move the pin: re-measure
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);
    };

    /* Deferred until React has hydrated the page (see lib/motion-ready). */
    const cancelGate = whenMotionSafe(build);

    return () => {
      cancelGate();
      clearTimeout(refreshTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <div className="hero-wrap" ref={wrapRef}>
    <section
      className="hero"
      ref={heroRef}
      aria-label="SoulPath Holiday — journeys that stay with you"
    >
      <div className="hero__gate">
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt="SoulPath Holiday destination"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = fallbackImg;
            }}
          />
          {allowVideo && !videoFailed && (
            <video
              ref={videoRef}
              className={videoOk ? 'is-playing' : ''}
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={() => setVideoOk(true)}
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>
        <span className="hero__tint" aria-hidden="true" />
        <span className="hero__grain" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <h1>Not just a holiday</h1>
          <p className="cursive">a journey that stays</p>
          <p className="hero__sub">
            Handcrafted international escapes to 50+ destinations — flights, stays, transfers and
            the good bits in between, curated from Ahmedabad since 2021.
          </p>
          <div className="hero__cta">
            <Link href="/packages" className="btn--solid btn btn--w-icon">
              Explore holidays
              <ArrowRight size={15} />
            </Link>
            <Link href="/request-proposal" className="btn btn--outline">
              Plan your trip
            </Link>
          </div>
        </div>

        <a className="hero__scroll" href="#discover" aria-label="Scroll to discover">
          {/* curved label — the reference bends this text on a 60px arc */}
          <span className="hero__scroll-arc" aria-hidden="true">
            <svg viewBox="0 0 170 62" focusable="false">
              <path
                id="hero-arc-path"
                d="M 12 56 A 73 73 0 0 1 158 56"
                fill="none"
                stroke="none"
              />
              <text>
                <textPath href="#hero-arc-path" startOffset="50%" textAnchor="middle">
                  SCROLL TO DISCOVER
                </textPath>
              </text>
            </svg>
          </span>
          <span className="visually-hidden">Scroll to discover</span>
          <span className="hero__scroll-icon" aria-hidden="true" />
        </a>
      </div>

      <div className="hero__mark">
        <Sparkle size={22} />
        <span>Handcrafted in Ahmedabad · since 2021</span>
      </div>
    </section>
    </div>
  );
}
