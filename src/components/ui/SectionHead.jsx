import './SectionHead.css';

/**
 * Editorial section header: huge serif title on the left, support copy on the
 * right — the core rhythm of the reference layout.
 */
export default function SectionHead({
  eyebrow,
  title,
  copy,
  align = 'split',
  action,
  as: Tag = 'h2',
  id,
}) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      <div className="section-head__lead">
        {eyebrow ? <p className="label section-head__eyebrow">{eyebrow}</p> : null}
        <Tag className="display display--lg section-head__title">{title}</Tag>
      </div>
      {(copy || action) && (
        <div className="section-head__aside">
          {copy ? <p className="lede section-head__copy">{copy}</p> : null}
          {action ? <div className="section-head__action">{action}</div> : null}
        </div>
      )}
      {id ? <span id={id} className="visually-hidden" /> : null}
    </header>
  );
}
