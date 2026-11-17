import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="coming" style={{ minHeight: '80vh', paddingTop: 'calc(var(--header-h) + 4rem)' }}>
      <div className="container coming__inner">
        <span className="coming__badge">404</span>
        <h1 className="page-title" style={{ textAlign: 'center' }}>
          Page not found
        </h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          Looks like this destination doesn&apos;t exist on our map. Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn btn--dark">
            Go home <ArrowRight size={14} />
          </Link>
          <Link href="/destinations" className="btn btn--outline">
            Destinations
          </Link>
          <Link href="/packages" className="btn btn--outline">
            Packages
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Support
          </Link>
        </div>
      </div>
    </section>
  );
}
