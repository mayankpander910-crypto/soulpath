'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * <Reveal> — the reference's AOS fade-up, as a component.
 *
 * It renders the same attributes the WordPress theme does
 * (`data-aos="fade-up"` + `data-aos-delay`), and the site-wide MotionFX layer
 * adds `.aos-animate` when the element scrolls into view. That keeps the
 * markup, the CSS transition and the timing identical to faithibiza.com while
 * staying a single IntersectionObserver for the whole page.
 *
 * `prefers-reduced-motion` is handled in CSS (the element is simply visible).
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'fade-up',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={className}
      data-aos={variant}
      {...(delay ? { 'data-aos-delay': String(Math.round(delay)) } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts up to a numeric target once it scrolls into view (e.g. "50+" → "50+"). */
export function Counter({ value, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * Legacy hook kept for compatibility — the GSAP parallax in MotionFX now
 * handles `[data-parallax]` elements, so this simply returns a ref.
 */
export function useParallax() {
  return useRef(null);
}
