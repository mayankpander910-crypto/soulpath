import { redirect } from 'next/navigation';

export const metadata = { title: 'Partner Area', robots: { index: false, follow: false } };

export default function PartnerPage() {
  // The partner console continues to run on the existing back-office application.
  redirect('/dashboard');
}
