import AuthShell from '@/components/AuthShell';
import { getDestinations } from '@/lib/api';
import ForgotForm from './ForgotForm';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset the password for your SoulPath Holiday account using a one-time code.',
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  const destinations = await getDestinations();
  return (
    <AuthShell
      image={destinations[4]?.heroImage || destinations[0]?.heroImage}
      quote="A good journey leaves you changed — and already planning the next one."
    >
      <ForgotForm />
    </AuthShell>
  );
}
