import { Link } from 'react-router-dom';
import './SideRails.css';

/**
 * Fixed vertical rails on the left/right edges — a signature detail of the
 * reference site. Hidden on small screens.
 */
export default function SideRails({ onOpenMenu }) {
  return (
    <>
      <button type="button" className="rail rail--left" onClick={onOpenMenu} aria-label="Open menu">
        <span className="rail__text label">Menu</span>
      </button>
      <Link className="rail rail--right" to="/contact">
        <span className="rail__text label">Contact</span>
      </Link>
    </>
  );
}
