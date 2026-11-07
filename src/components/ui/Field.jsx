import './Field.css';

/** Underline text input used across forms and the newsletter block. */
export default function Field({ label, id, as = 'input', options = [], ...rest }) {
  const Tag = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';

  return (
    <label className={`field ${as === 'textarea' ? 'field--area' : ''}`} htmlFor={id}>
      <span className="label field__label">{label}</span>
      <Tag id={id} className="field__control" {...rest}>
        {as === 'select'
          ? options.map((option) => (
              <option key={option.value ?? option} value={option.value ?? option}>
                {option.label ?? option}
              </option>
            ))
          : null}
      </Tag>
    </label>
  );
}
