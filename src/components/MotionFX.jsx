'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenMotionSafe } from '@/lib/motion-ready';

/**
 * The site-wide motion layer — a faithful port of the reference's animation
 * behaviour (AOS fade-ups, scrubbed parallax, velocity-reactive marquees and
 * the diagonal "plane shadow" sweep) rebuilt on GSAP without jQuery.
 *
 * Contract, all opt-in via data attributes so every page can use it:
 *
 *   data-aos="fade-up" + data-aos-delay="150"  → AOS fade-up (opacity 0→1,
 *                                                translate3d(0,100px,0) → 0)
 *   data-parallax="-100"                       → scrubbed y translate
 *   data-marquee data-marquee-speed="4"        → velocity-reactive marquee
 *   data-plane                                 → plane-shadow sweep
 *
 * Everything is skipped under prefers-reduced-motion (elements stay visible,
 * the marquee keeps its CSS drift, parallax stays static).
 */
export default function MotionFX() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduce?.matches) {
      document.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('aos-animate'));
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    let io;
    let ctx;
    let aosRecheck;
    const extraTickers = [];

    const init = () => {
      /* ---------------------- AOS fade-up (exact contract) ------------------- */
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('aos-animate');
            io.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
      );

      const observeAos = () => {
        document.querySelectorAll('[data-aos]:not([data-aos-bound])').forEach((el) => {
          el.setAttribute('data-aos-bound', '');
          io.observe(el);
        });
      };
      observeAos();
      aosRecheck = setTimeout(observeAos, 1200);

      ctx = gsap.context(() => {
        /* -------------------------- scrubbed parallax ------------------------ */
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const y = parseFloat(el.getAttribute('data-parallax')) || 0;
          if (!y) return;
          gsap.fromTo(
            el,
            { y: -y },
            {
              y,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-parallax-scope], section, footer') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });

        /* --------------------- velocity-reactive marquees -------------------- */
        const marquees = [];

        document.querySelectorAll('[data-marquee]').forEach((track) => {
          if (track.dataset.marqueeBound) return;
          track.dataset.marqueeBound = '1';

          // duplicate the content so the wrap at the seam is invisible
          [...track.children].forEach((child) => track.appendChild(child.cloneNode(true)));

          const baseWidth = track.scrollWidth / 2;
          if (!baseWidth) return;

          const wrap = gsap.utils.wrap(-baseWidth, 0);
          const base = parseFloat(track.getAttribute('data-marquee-speed')) || 4;
          const state = { speed: base, x: 0, direction: 1, paused: false };

          state.ticker = () => {
            if (state.paused) return;
            state.x = wrap(state.x - state.speed * state.direction * 0.06);
            gsap.set(track, { x: state.x });
          };
          gsap.ticker.add(state.ticker);

          marquees.push({ state, base });

          ScrollTrigger.create({
            trigger: track.parentElement || track,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => { state.paused = false; },
            onEnterBack: () => { state.paused = false; },
            onLeave: () => { state.paused = true; },
            onLeaveBack: () => { state.paused = true; },
          });
        });

        /* ---------------- scroll velocity → marquee speed ------------------- */
        if (marquees.length) {
          const onTick = () => {
            const lenis = window.__lenis;
            const velocity = Math.abs(lenis?.velocity || 0);
            const dir = lenis?.direction === -1 ? -1 : 1;
            marquees.forEach(({ state, base }) => {
              // reference: speed = clamp(4, 16, |velocity| / 35)
              const target = Math.min(16, base + velocity / 35);
              state.speed += (target - state.speed) * 0.12;
              state.direction = dir;
            });
          };
          gsap.ticker.add(onTick);
          extraTickers.push(onTick);
        }

        /* ------------------------ plane shadow sweep ------------------------ */
        document.querySelectorAll('[data-plane]').forEach((plane) => {
          gsap.fromTo(
            plane,
            { bottom: 0, left: 0, x: '-100%', y: '100%' },
            {
              bottom: '100%',
              left: '100%',
              x: 0,
              y: 0,
              duration: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: plane.parentElement,
                start: 'center center',
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
      // debug handle (also handy for QA scripts)
      window.__ST = ScrollTrigger;
    };

    /* Hydration guard: never write inline styles while React is still
       hydrating the streamed page tree (see src/lib/motion-ready.js). */
    const cancelGate = whenMotionSafe(init);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      cancelGate();
      clearTimeout(aosRecheck);
      window.removeEventListener('resize', onResize);
      io?.disconnect();
      ctx?.revert();
      extraTickers.forEach((fn) => gsap.ticker.remove(fn));
    };
  }, [pathname]);

  return null;
}
