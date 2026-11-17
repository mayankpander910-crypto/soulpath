'use client';

/**
 * Minimal inline icon set (no external icon package = no extra payload).
 * Every icon accepts `size` and inherits `currentColor`.
 */

const S = ({ size = 18, children, fill = 'none', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const ArrowRight = (p) => (
  <S {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </S>
);

export const ArrowUpRight = (p) => (
  <S {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </S>
);

export const ChevronDown = (p) => (
  <S {...p}>
    <path d="M6 9l6 6 6-6" />
  </S>
);

export const ChevronLeft = (p) => (
  <S {...p}>
    <path d="M15 6l-6 6 6 6" />
  </S>
);

export const ChevronRight = (p) => (
  <S {...p}>
    <path d="M9 6l6 6-6 6" />
  </S>
);

export const Menu = (p) => (
  <S {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </S>
);

export const Close = (p) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </S>
);

export const Search = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </S>
);

export const Calendar = (p) => (
  <S {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </S>
);

export const Users = (p) => (
  <S {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
    <path d="M16 5.6a3 3 0 010 5.8M17.5 14.6c2 .6 3.5 2.4 3.5 4.9" />
  </S>
);

export const Plane = (p) => (
  <S {...p}>
    <path d="M10.2 13.8L3 12l2-1.6 5.6 1L15.5 5a1.8 1.8 0 012.6 2.5l-6.2 5 1 5.6L11 20l-1.6-6.2z" />
  </S>
);

export const Swap = (p) => (
  <S {...p}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </S>
);

export const Check = (p) => (
  <S {...p}>
    <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
  </S>
);

export const Minus = (p) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);

export const Plus = (p) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const Star = ({ size = 14, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.6l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.6l6.6-.9z" />
  </svg>
);

export const Whatsapp = ({ size = 22, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.03 2C6.6 2 2.2 6.4 2.2 11.83c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.6a9.8 9.8 0 004.93 1.32h.01c5.42 0 9.83-4.4 9.83-9.83C21.87 6.4 17.46 2 12.03 2zm5.75 13.9c-.24.68-1.4 1.32-1.93 1.38-.5.06-1.1.1-1.77-.11-.4-.13-.92-.3-1.59-.6-2.8-1.2-4.62-4.03-4.76-4.22-.14-.19-1.14-1.5-1.14-2.87 0-1.36.72-2.03.97-2.31.25-.28.54-.35.72-.35l.52.01c.17 0 .39-.06.6.46.22.53.75 1.85.82 1.98.07.14.11.3.02.48-.09.19-.14.3-.28.47-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.23 1.59 1.99 1.1.98 2.02 1.28 2.3 1.42.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.25.09 1.57.74 1.84.88.27.14.45.2.52.32.07.11.07.68-.17 1.36z" />
  </svg>
);

export const Phone = (p) => (
  <S {...p}>
    <path d="M6.2 3.5h2.6l1.5 3.6-1.9 1.3a11.4 11.4 0 005.2 5.2l1.3-1.9 3.6 1.5v2.6c0 1.1-.9 2-2 2A14.7 14.7 0 014.2 5.5c0-1.1.9-2 2-2z" />
  </S>
);

export const Mail = (p) => (
  <S {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3.6 7l8.4 6 8.4-6" />
  </S>
);

export const MapPin = (p) => (
  <S {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </S>
);

export const Clock = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </S>
);

export const Sparkle = (p) => (
  <S {...p}>
    <path d="M12 3.2l1.8 4.8 4.9 1.9-4.9 1.9L12 16.6l-1.8-4.8L5.3 9.9l4.9-1.9z" />
    <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
  </S>
);

export const Headset = (p) => (
  <S {...p}>
    <path d="M3.8 14v-2.1a8.2 8.2 0 0116.4 0V14" />
    <rect x="2.6" y="13" width="4" height="7" rx="1.6" />
    <rect x="17.4" y="13" width="4" height="7" rx="1.6" />
    <path d="M19.4 20v.6a2.4 2.4 0 01-2.4 2.4h-3" />
  </S>
);

export const Globe = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.6 12h16.8M12 3.4c2.6 2.5 2.6 14.7 0 17.2-2.6-2.5-2.6-14.7 0-17.2z" />
  </S>
);

export const Tag = (p) => (
  <S {...p}>
    <path d="M4 11.6V4.8A.8.8 0 014.8 4h6.8l8 8-7.6 7.6z" />
    <circle cx="8.4" cy="8.4" r="1.3" />
  </S>
);

export const Download = (p) => (
  <S {...p}>
    <path d="M12 3.5v11M8 10.5l4 4 4-4M4.5 19.5h15" />
  </S>
);

export const Instagram = (p) => (
  <S {...p}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </S>
);

export const Facebook = (p) => (
  <S {...p}>
    <path d="M14.5 8.5h2.2V5.4h-2.4c-2.2 0-3.5 1.3-3.5 3.6v1.6H8.6v3.1h2.2V21h3.3v-7.3h2.3l.4-3.1h-2.7V9.4c0-.6.2-.9.9-.9z" />
  </S>
);

export const Youtube = (p) => (
  <S {...p}>
    <rect x="2.6" y="6" width="18.8" height="12" rx="3.6" />
    <path d="M10.4 9.6l4.6 2.4-4.6 2.4z" fill="currentColor" stroke="none" />
  </S>
);

export const Shield = (p) => (
  <S {...p}>
    <path d="M12 3l7 2.6v5.6c0 4.4-3 7.6-7 9.2-4-1.6-7-4.8-7-9.2V5.6z" />
    <path d="M9 12l2.2 2.2L15.4 10" />
  </S>
);

export const Heart = (p) => (
  <S {...p}>
    <path d="M12 20s-7.4-4.4-7.4-9.4a4.3 4.3 0 017.4-3 4.3 4.3 0 017.4 3c0 5-7.4 9.4-7.4 9.4z" />
  </S>
);

export const User = (p) => (
  <S {...p}>
    <circle cx="12" cy="8.4" r="3.6" />
    <path d="M4.8 20.4c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2" />
  </S>
);

export const Logout = (p) => (
  <S {...p}>
    <path d="M14.5 4.5H6.8A1.8 1.8 0 005 6.3v11.4A1.8 1.8 0 006.8 19.5h7.7" />
    <path d="M17 8.5l3.5 3.5L17 15.5M9.5 12h11" />
  </S>
);
