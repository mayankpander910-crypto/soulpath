import Button from '../components/ui/Button';
import './home.css';

/** Account prompt, restyled as a full-bleed forest-green panel. */
export default function AccountSection() {
  return (
    <section className="account" aria-labelledby="account-title">
      <div className="account__inner">
        <div data-reveal>
          <p className="label account__eyebrow">Members</p>
          <h2 className="display display--lg account__title" id="account-title">
            Join SoulPath Holiday
          </h2>
        </div>

        <div className="account__body" data-reveal>
          <p className="lede account__copy">
            Create an account to save your favorite destinations and manage your bookings effortlessly.
          </p>
          <div className="account__actions">
            <Button to="/contact" variant="light">
              Create Free Account
            </Button>
            <Button to="/contact" variant="outline-light">
              Sign In to Existing Account
            </Button>
          </div>
          <p className="account__note">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
