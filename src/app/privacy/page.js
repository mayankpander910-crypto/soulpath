import LegalPage from '@/components/LegalPage';

export const revalidate = 600;

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How SoulPath Holiday collects, uses and protects your personal information when you browse or book with us.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  return <LegalPage type="privacy" />;
}
