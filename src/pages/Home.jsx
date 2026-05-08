import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingPreview from '../components/home/PricingPreview';
import FooterSection from '../components/home/FooterSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
      <PricingPreview />
      <FooterSection />
    </div>
  );
}