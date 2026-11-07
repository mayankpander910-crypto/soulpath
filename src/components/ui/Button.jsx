import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Pill button — the reference site's single most recognisable UI element.
 *
 * variants: 'solid' (forest green), 'outline' (hairline), 'ghost' (text + arrow),
 *           'light' (white pill on dark backgrounds)
 */
export default function Button({
  as = 'link',
  to,
  href,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ');

  if (to && as === 'link') {
    return (
      <Link to={to} className={classes} {...rest}>
        <span className="btn__label">{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        <span className="btn__label">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      <span className="btn__label">{children}</span>
    </button>
  );
}
