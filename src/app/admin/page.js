import { redirect } from 'next/navigation';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default function AdminPage() {
  // The admin console continues to run on the existing back-office application.
  redirect('/dashboard');
}
