export const site = {
  name: 'SoulPath Holiday',
  legalName: 'SoulPath Holiday Private Limited',
  tagline: 'Immersive Travel Experiences',
  founded: 2021,
  description:
    'Crafting immersive, extraordinary travel experiences. From curated packages to seamless bookings, your journey begins here.',
  contact: {
    address: ['E 919, Ganesh Glory 11, Jagatpur Road', 'Ahmedabad, Maharashtra - 382470'],
    phone: '+91 98982 11063',
    phoneHref: 'tel:+919898211063',
    email: 'info@soulpathholiday.com',
    hours: 'Mon-Sat, 10 AM - 6:30 PM (IST)',
  },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/happiest_anand_20' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
  stats: [
    { value: '500+', label: 'HAPPY TRAVELLERS' },
    { value: '4.9', label: 'AVERAGE RATING' },
    { value: '50+', label: 'DESTINATIONS' },
  ],
};

/** Primary navigation — mirrors the live site's header. */
export const primaryNav = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'Offers', to: '/offers' },
  { label: 'Travel with Influencers', to: '/travel-with-influencers' },
];

/** Secondary navigation for the full-screen MENU overlay. */
export const menuNav = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Tour Packages', to: '/packages' },
  { label: 'Special Offers', to: '/offers' },
  { label: 'Travel with Influencers', to: '/travel-with-influencers' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export const footerLinks = {
  quickLinks: [
    { label: 'Destinations', to: '/destinations' },
    { label: 'Tour Packages', to: '/packages' },
    { label: 'Special Offers', to: '/offers' },
    { label: 'Franchise Partner', to: '/contact' },
    { label: 'Contact Us', to: '/contact' },
  ],
  resources: [
    { label: 'Travel Blog', to: '/offers' },
    { label: 'Travel Guide', to: '/destinations' },
    { label: 'Corporate Tours', to: '/contact' },
    { label: 'About Us', to: '/about' },
    { label: 'Testimonials', to: '/testimonials' },
  ],
  legal: [
    { label: 'Privacy Policy', href: 'https://soulpathholiday.com/privacy' },
    { label: 'Terms of Service', href: 'https://soulpathholiday.com/terms' },
    { label: 'Cancellation Policy', href: 'https://soulpathholiday.com/terms' },
  ],
};

export const announcement = {
  eyebrow: 'Special Offers',
  text: 'Handpicked offers on our most popular destinations. Book your dream vacation now before these limited-time packages are gone!',
  cta: { label: 'View Offers', to: '/offers' },
};
