import { Suspense } from 'react';
import AuthShell from '@/components/AuthShell';
import { getDestinations } from '@/lib/api';
import RegisterForm from './RegisterForm';

export const revalidate = 600;

export const metadata = {
  title: 'Create Account',
  description:
    'Create a free SoulPath Holiday account to save favourite destinations and manage your travel enquiries.',
  alternates: { canonical: '/register' },
};

export default async function RegisterPage() {
  const destinations = await getDestinations();
  return (
    <AuthShell
      image={destinations[1]?.heroImage || destinations[0]?.heroImage}
      quote="Collect moments, not things — and let someone else handle the logistics."
    >
      <Suspense fallback={<div className="auth__form skeleton" style={{ height: 380 }} />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
