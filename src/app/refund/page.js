import LegalPage from '@/components/LegalPage';

export const revalidate = 600;

export const metadata = {
  title: 'Cancellation Policy',
  description:
    'Cancellation, rescheduling and refund rules for SoulPath Holiday bookings, including timelines and applicable charges.',
  alternates: { canonical: '/refund' },
};

export default function RefundPolicyPage() {
  return <LegalPage type="refund" />;
}
