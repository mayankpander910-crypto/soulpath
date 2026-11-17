import { mediaUrl } from '@/lib/config';

export default function AuthShell({ image, quote, children }) {
  return (
    <div className="auth">
      <div className="auth__visual" aria-hidden={image ? undefined : true}>
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={mediaUrl(image)} alt="" />
        )}
        {quote && <p className="auth__quote">“{quote}”</p>}
      </div>
      <div className="auth__panel">{children}</div>
    </div>
  );
}
