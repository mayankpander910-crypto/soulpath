import Hero from '../sections/Hero';
import Intro from '../sections/Intro';
import DestinationsSection from '../sections/DestinationsSection';
import InfluencersSection from '../sections/InfluencersSection';
import ConciergeBand from '../sections/ConciergeBand';
import JourneySection from '../sections/JourneySection';
import PackagesSection from '../sections/PackagesSection';
import TrustSection from '../sections/TrustSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import AccountSection from '../sections/AccountSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <DestinationsSection />
      <InfluencersSection />
      <ConciergeBand />
      <JourneySection />
      <PackagesSection />
      <TrustSection />
      <TestimonialsSection />
      <AccountSection />
    </>
  );
}
