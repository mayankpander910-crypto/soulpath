import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import MotionFX from '@/components/MotionFX';
import { getDestinations, getSiteSettings } from '@/lib/api';
import { mediaUrl, SITE_ORIGIN, SITE_URL } from '@/lib/config';
import { BRAND } from '@/lib/content';
import '@/styles/globals.css';
import '@/styles/home.css';
import '@/styles/pages.css';

/* The reference's real typefaces, self-hosted (no third-party requests). */
const display = localFont({
  src: '../fonts/Dream_Orphans.woff',
  variable: '--font-display',
  weight: '400',
  display: 'swap',
  fallback: ['Times New Roman', 'Georgia', 'serif'],
});

const body = localFont({
  src: [
    { path: '../fonts/AfacadFlux-latin.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

const cursive = localFont({
  src: '../fonts/Eastern_Harrogate.otf',
  variable: '--font-cursive',
  weight: '400',
  display: 'swap',
  fallback: ['Segoe Script', 'Bradley Hand', 'cursive'],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SoulPath Holiday | Immersive Travel Experiences',
    template: '%s | SoulPath Holiday',
  },
  description:
    'SoulPath Holiday crafts customised international tour packages to 50+ destinations — flights, hotels, transfers and 24/7 support from our Ahmedabad-based travel experts.',
  keywords: [
    'SoulPath Holiday',
    'international tour packages',
    'Ahmedabad travel agency',
    'holiday packages',
    'flight booking',
    'luxury travel India',
  ],
  authors: [{ name: BRAND.legalName }],
  openGraph: {
    type: 'website',
    siteName: 'SoulPath Holiday',
    title: 'SoulPath Holiday | Immersive Travel Experiences',
    description:
      'Handcrafted holidays to 50+ destinations. Flights, stays and experiences curated by SoulPath Holiday, Ahmedabad.',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/soulpath-logo.png',
  },
};

export const viewport = {
  themeColor: '#eeebe4',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const [settings, destinations] = await Promise.all([getSiteSettings(), getDestinations()]);
  const poster = settings?.homepageHeroImage
    ? mediaUrl(settings.homepageHeroImage)
    : '/uploads/hero-poster.jpg';
  const heroVideo = settings?.homepageHeroVideo
    ? mediaUrl(settings.homepageHeroVideo)
    : `${SITE_ORIGIN}/videos/hero-banner-soulpath.mp4`;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'SoulPath Holiday',
    legalName: settings?.companyDetails?.legalName || BRAND.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/soulpath-logo.png`,
    description: BRAND.description,
    telephone: settings?.companyDetails?.phone || '+91 78610 11063',
    email: settings?.companyDetails?.email || 'info@soulpathholiday.com',
    foundingDate: BRAND.since,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.companyDetails?.address || 'E 919, Ganesh Glory 11, Jagatpur Road',
      addressLocality: settings?.companyDetails?.city || 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: settings?.companyDetails?.pincode || '382470',
      addressCountry: 'IN',
    },
    sameAs: ['https://www.instagram.com/soulpathholiday'],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${cursive.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <MotionFX />
        <Preloader posterSrc={poster} videoSrc={heroVideo} />
        <Header settings={settings} destinations={destinations} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <FloatingActions whatsapp={settings?.whatsappNumber} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
