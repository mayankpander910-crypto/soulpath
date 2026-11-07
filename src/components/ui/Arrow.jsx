/** Thin diagonal arrow — the reference site's recurring "go" glyph. */
export default function Arrow({ size = 18, stroke = 1, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 19 19 5" />
      <path d="M9 5h10v10" />
    </svg>
  );
}
