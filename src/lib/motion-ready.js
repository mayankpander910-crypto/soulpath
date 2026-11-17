'use client';

/**
 * Fires `cb` only once the document has finished loading *and* React has
 * hydrated the streamed page tree.
 *
 * Why: GSAP writes inline `transform` styles and Lenis writes classes on
 * <html>. If either happens while React is still hydrating a streamed
 * Suspense boundary, React reports a hydration mismatch and throws the
 * subtree away. Gating on the load event (with an idle fallback) makes the
 * motion layer start after hydration is complete — a few dozen milliseconds
 * later, and invisible to the user.
 */
export function whenMotionSafe(cb) {
  let cancelled = false;

  const run = () => {
    if (cancelled) return;
    // one more frame so React's commit + effects for the page subtree finish
    requestAnimationFrame(() => {
      if (cancelled) return;
      cb();
    });
  };

  if (typeof document === 'undefined') return () => {};

  if (document.readyState === 'complete') {
    const t = setTimeout(run, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }

  const onLoad = () => run();
  window.addEventListener('load', onLoad, { once: true });

  // safety net: never stall the page if `load` is blocked by a slow asset
  const fallback = setTimeout(() => {
    if (document.readyState !== 'complete') run();
  }, 4000);

  return () => {
    cancelled = true;
    clearTimeout(fallback);
    window.removeEventListener('load', onLoad);
  };
}
