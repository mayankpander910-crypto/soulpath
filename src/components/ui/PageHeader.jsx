import { Link } from 'react-router-dom';
import './PageHeader.css';

/** Editorial page opener used by every interior page. */
export default function PageHeader({ eyebrow, title, copy, breadcrumb, media }) {
  return (
    <header className={`page-header ${media ? 'has-media' : ''}`}>
      {media ? (
        <div className="page-header__media">
          <img src={media} alt="" aria-hidden="true" />
        </div>
      ) : null}

      <div className="page-header__inner shell">
        <nav className="page-header__crumbs label" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{breadcrumb || title}</span>
        </nav>

        {eyebrow ? <p className="label text-forest page-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="display display--xl page-header__title">{title}</h1>
        {copy ? <p className="lede page-header__copy">{copy}</p> : null}
      </div>
    </header>
  );
}
