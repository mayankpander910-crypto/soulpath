'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenMotionSafe } from '@/lib/motion-ready';

/**
 * Faith's global motion wiring, ported 1:1 from the reference bundle:
 *
 *   const lenis = new Lenis({ ... })
 *   gsap.registerPlugin(ScrollTrigger)
 *   lenis.on('scroll', ScrollTrigger.update)
 *   gsap.ticker.add(time => lenis.raf(time * 1000))
 *   gsap.ticker.lagSmoothing(0)
 *
 * Lenis intercepts the wheel and eases the scroll position, ScrollTrigger reads
 * that position every tick — which is why the pinned hero and the scrubbed
 * parallax feel continuous instead of stepped.
 *
 * `body.scrolled` is toggled past 0 (drives the header's contrast state).
 * Everything is disabled for `prefers-reduced-motion`, where native scrolling
 * takes over and every GSAP timeline is built in "instant" mode.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduce?.matches) {
      const t = setTimeout(
        () => document.documentElement.classList.add('reduced-motion'),
        0
      );
      return () => clearTimeout(t);
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Defer one frame: Lenis writes classes onto <html>, and doing that before
       React has hydrated the tree raises a hydration mismatch on <html>. */
    let lenis;

    const start = () => {
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: 'vertical',
      // never hijack scroll inside menus, modals or horizontally scrollable rails
      prevent: (node) =>
        Boolean(
          node?.closest?.(
            '.menu-overlay, .modal, [data-lenis-prevent], .rail--scroll, .chips, [role="dialog"]'
          )
        ),
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const onScroll = ({ scroll }) => {
      document.body.classList.toggle('scrolled', scroll > 8);
    };
    lenis.on('scroll', onScroll);

    // ScrollTrigger needs to re-measure once fonts/late images settle.
    const refresh = () => ScrollTrigger.refresh();
    t1 = setTimeout(refresh, 400);
    t2 = setTimeout(refresh, 1400);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    };

    let t1;
    let t2;
    const cancelGate = whenMotionSafe(start);

    return () => {
      cancelGate();
      clearTimeout(t1);
      clearTimeout(t2);
      if (!lenis) return;
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(tickerFn);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Lenis keeps its own scroll position across client-side navigations.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
