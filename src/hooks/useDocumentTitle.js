import { useEffect } from 'react';

const TITLES = {
  '/': 'Where Every Journey Becomes an Adventure',
  '/destinations': 'Explore the World',
  '/packages': 'Tour Packages',
  '/travel-with-influencers': 'Travel with Influencers',
  '/offers': 'Irresistible Travel Deals',
  '/about': 'About SoulPath Holiday',
  '/testimonials': 'What Our Travellers Say',
  '/contact': 'Get in Touch',
};

/** Keeps <title> in sync with the active route. */
export function useDocumentTitle(pathname) {
  useEffect(() => {
    const base = 'SoulPath Holiday | Immersive Travel Experiences';
    const match = TITLES[pathname];
    document.title = match ? `${match} | SoulPath Holiday` : base;
  }, [pathname]);
}
