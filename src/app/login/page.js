import { Suspense } from 'react';
import AuthShell from '@/components/AuthShell';
import { getDestinations } from '@/lib/api';
import LoginForm from './LoginForm';

export const revalidate = 600;

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your SoulPath Holiday account to manage bookings and saved destinations.',
  alternates: { canonical: '/login' },
};

export default async function LoginPage() {
  const destinations = await getDestinations();
  return (
    <AuthShell
      image={destinations[2]?.heroImage || destinations[0]?.heroImage}
      quote="The world is wide, and every journey starts with a single yes."
    >
      <Suspense fallback={<div className="auth__form skeleton" style={{ height: 380 }} />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
