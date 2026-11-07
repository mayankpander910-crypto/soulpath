import { useEffect } from 'react';

/** Freezes page scroll while an overlay is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [locked]);
}
