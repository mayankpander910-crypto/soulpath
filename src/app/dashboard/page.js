import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'My Account',
  description: 'Your SoulPath Holiday account — saved destinations and enquiries.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
