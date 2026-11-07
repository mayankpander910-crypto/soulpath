import { useEffect } from 'react';

/**
 * Reveals every [data-reveal] element once it scrolls into view.
 * Re-scans whenever `key` changes (i.e. on every route change) so newly
 * mounted sections are observed too.
 */
export function useReveal(key = '') {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]:not(.is-visible)');

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);
}
