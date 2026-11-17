import LegalPage from '@/components/LegalPage';

export const revalidate = 600;

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of the SoulPath Holiday website and the booking of our travel services.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <LegalPage type="terms" />;
}
