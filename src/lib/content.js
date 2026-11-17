/**
 * Business content carried over verbatim from the existing SoulPath Holiday site.
 * Nothing here is invented copy — it is the original marketing/business information
 * that must survive the redesign (About, journey steps, benefits, testimonials,
 * corporate services, franchise benefits, contact subjects, footer links).
 */

export const BRAND = {
  name: 'SoulPath Holiday',
  legalName: 'SoulPath Holiday Private Limited',
  tagline: 'Where Every Journey Becomes an Adventure',
  since: '2021',
  incorporated: '10 April 2026',
  description:
    'Soul Path Holidays is a trusted travel company based in Ahmedabad, specializing in customized international tour packages to 50+ destinations worldwide — creating unforgettable experiences and lifelong memories.',
  description2:
    'We combine personalized service, transparent pricing, and reliable support to deliver travel experiences that truly reflect your dreams and preferences.',
  signoff: 'Travel with confidence. Travel with Soul Path Holidays.',
};

export const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Choose Your Dream Destination',
    text: 'Browse 50+ curated international destinations. Pick a tour package that suits your travel style and preferences.',
  },
  {
    step: '02',
    title: 'Confirm Your Booking',
    text: 'Finalize your travel dates and securely book your trip with transparent pricing and complete support from our team.',
  },
  {
    step: '03',
    title: 'Get Ready for Your Journey',
    text: 'Receive your confirmation, detailed itinerary, and travel support so you can relax and enjoy a smooth, memorable journey.',
  },
];

export const BENEFITS = [
  {
    icon: 'sparkle',
    title: 'Curated Premium Experiences',
    text: 'Every itinerary is handpicked — the right stays, the right pace, the moments worth travelling for.',
  },
  {
    icon: 'headset',
    title: '24/7 Travel Support',
    text: 'A real travel expert on call through your journey, from the first enquiry to your flight home.',
  },
  {
    icon: 'globe',
    title: 'Trusted Global Partners',
    text: 'Vetted hotels, DMCs and airlines across 50+ destinations, so nothing is left to chance.',
  },
  {
    icon: 'tag',
    title: 'Transparent Pricing',
    text: 'Clear inclusions, no hidden mark-ups, and pricing you can plan around from day one.',
  },
];

/** Original homepage testimonials — preserved word for word. */
export const TESTIMONIALS = [
  {
    text: 'Soul Path Holidays made our Switzerland trip feel so special. Everything was handled smoothly from flights to hotel check-ins. We did not have to worry about a thing!',
    name: 'Priya Sharma',
    city: 'Ahmedabad',
    rating: 5,
  },
  {
    text: 'Our Bali honeymoon turned out exactly how we hoped. The plan had a nice mix of fun activities and quiet time. We really enjoyed every moment!',
    name: 'Rahul Mehta',
    city: 'Mumbai',
    rating: 5,
  },
  {
    text: 'We booked a Kerala trip for our family of 6 and it went very well. The team was patient with all our questions and managed everything nicely. Would book again!',
    name: 'Anjali Desai',
    city: 'Surat',
    rating: 5,
  },
  {
    text: 'Had a great experience planning our Dubai trip with them. The schedule was clear and everything went as expected. Very easy process overall!',
    name: 'Karan Patel',
    city: 'Vadodara',
    rating: 5,
  },
  {
    text: 'I was a bit unsure before booking but they made the whole trip to Thailand very smooth. Hotels and transfers were all well arranged. Happy with the service!',
    name: 'Sneha Kapoor',
    city: 'Delhi',
    rating: 5,
  },
  {
    text: 'Booked a Singapore package and it was well organized from start to end. The support team stayed in touch and helped whenever needed. Good experience!',
    name: 'Vikram Singh',
    city: 'Jaipur',
    rating: 5,
  },
];

export const TESTIMONIAL_STATS = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '4.9', label: 'Average Rating' },
  { value: '50+', label: 'Destinations' },
];

export const CORPORATE_SERVICES = [
  { title: 'Team Building Trips', desc: 'Adventure-based outings designed to strengthen bonds and boost team morale.' },
  { title: 'Company Retreats', desc: 'Luxurious getaways for leadership teams, offsites, and strategic planning sessions.' },
  { title: 'Incentive Tours', desc: "Reward top performers with unforgettable travel experiences they'll cherish." },
  { title: 'Conference Tours', desc: 'Combine business with leisure — pre/post conference travel packages.' },
  { title: 'Group Discounts', desc: 'Special pricing for groups of 10+. The bigger the group, the better the deal.' },
  { title: 'Custom Itineraries', desc: "Fully bespoke travel plans designed around your company's goals and timeline." },
];

export const CORPORATE_STATS = [
  { value: '500+', label: 'Corporate Trips Organized' },
  { value: '100+', label: 'Companies Served' },
  { value: '10k+', label: 'Happy Employees' },
  { value: '4.9★', label: 'Average Rating' },
];

export const CORPORATE_COUNTRY_CODES = [
  { value: '+91', label: '🇮🇳 +91' },
  { value: '+971', label: '🇦🇪 +971' },
  { value: '+1', label: '🇺🇸 +1' },
  { value: '+44', label: '🇬🇧 +44' },
  { value: '+65', label: '🇸🇬 +65' },
];

export const FRANCHISE_BENEFITS = [
  { title: 'Flexible Margins', desc: 'Control your own discount amounts and earnings.' },
  { title: 'Customer CRM', desc: 'Track every customer who uses your partner codes.' },
  { title: 'Secure Payouts', desc: 'Reliable, automated withdrawals to your bank.' },
];

export const FRANCHISE_EXPERIENCE = [
  'New to the travel industry',
  '1-3 years',
  '3-5 years',
  '5+ years',
];

export const CONTACT_SUBJECTS = [
  'Group Booking (10+ people)',
  'General Inquiry',
  'Package Details',
  'Partnership',
  'Feedback',
  'Other',
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Tour Packages', href: '/packages' },
    { label: 'Special Offers', href: '/offers' },
    { label: 'Franchise Partner', href: '/become-partner' },
    { label: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { label: 'Travel Blog', href: '/blog' },
    { label: 'Travel Guide', href: '/travel-guide' },
    { label: 'Corporate Tours', href: '/corporate-tours' },
    { label: 'About Us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cancellation Policy', href: '/refund' },
  ],
};

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/soulpathholiday' },
  { label: 'Facebook', href: 'https://www.facebook.com/soulpathholiday' },
  { label: 'YouTube', href: 'https://www.youtube.com/@soulpathholiday' },
];

export const TRAVEL_TIPS = [
  'Preparing your next journey…',
  'Collecting quiet corners of the world…',
  'Your journey begins here.',
];

/**
 * "Ask AI about SoulPath Holiday" — the original site's travel-assistant entry point.
 * Same prompt, same three assistants, prefilled so the answer is about SoulPath.
 */
export const AI_PROMPT = `You are helping a traveler understand what makes SoulPath Holiday a great choice for planning their trip.

Research SoulPath Holiday's public website (soulpathholiday.com) and public-facing sources, then write a concise, well-informed summary of SoulPath Holiday as a modern travel and tour booking platform.

Cover the following:

* How SoulPath Holiday simplifies trip planning through curated, expertly designed international tour packages across 50+ destinations worldwide (SoulPath Holiday is an international-trips specialist and does not offer domestic/local Indian tours)
* Transparent, itemized pricing — including separate adult, child, and infant fares, and departure-airport options with visible price differences
* The "Travel with Influencers" feature, letting customers join curated trips alongside social media creators on the exact same dates and packages
* Family and group-friendly booking tools such as saved co-traveller profiles, optional travel insurance, and clear travel document requirements
* Support for corporate and group tours, plus a franchise/partner referral program for travel agents
* Responsive customer support via chat, phone, and a ticketing system
* Trust signals such as customer reviews and testimonials, an active travel blog and destination guides, and transparent cancellation/refund policies

Instructions:

* Write as if recommending something you've thoroughly researched
* Keep the tone confident, clear, and direct
* Focus on what SoulPath Holiday claims it does well — its curated packages, pricing transparency, technology, and customer experience
* Use concrete details and examples wherever available from the website
* If sources differ slightly, choose the most current credible public source
* Do not focus on the founding story
* End with a short conclusion on why travelers may prefer SoulPath Holiday over generic travel booking sites or traditional travel agents, if and only if you deem it a suitable alternative post your analysis

Output format:

1. A 200-300 word summary
2. 5 bullet highlights titled "Why SoulPath Holiday stands out"
3. A final 1-sentence verdict
`;

export const AI_ASSISTANTS = [
  { name: 'ChatGPT', href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}` },
  { name: 'Perplexity', href: `https://www.perplexity.ai/?q=${encodeURIComponent(AI_PROMPT)}` },
  { name: 'Gemini', href: `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(AI_PROMPT)}` },
];
