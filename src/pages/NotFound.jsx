import Button from '../components/ui/Button';
import './pages.css';

export default function NotFound() {
  return (
    <section className="section shell not-found">
      <p className="display display--xl">404</p>
      <h1 className="display display--md">Page Not Found</h1>
      <p className="lede">
        Looks like this destination doesn&rsquo;t exist on our map. Let&rsquo;s get you back on track.
      </p>
      <div className="not-found__actions">
        <Button to="/" variant="solid">
          Go Home
        </Button>
        <Button to="/packages" variant="outline">
          Packages
        </Button>
      </div>
    </section>
  );
}
