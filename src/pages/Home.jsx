import HeroSection from '../components/home/HeroSection';
import MarqueeSection from '../components/home/MarqueeSection';
import WhyAthletesFail from '../components/home/WhyAthletesFail';
import SocialProofCounter from '../components/home/SocialProofCounter';
import MyStory from '../components/home/MyStory';
import BTCALIServicesSection from '../components/home/BTCALIServicesSection';
import BTCALIProjectsSection from '../components/home/BTCALIProjectsSection';
import PricingSection from '../components/home/PricingSection';
import FAQSection from '../components/home/FAQSection';
import FooterSection from '../components/home/FooterSection';

export default function Home() {
  return (
    <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <WhyAthletesFail />
      <SocialProofCounter />
      <MyStory />
      <BTCALIServicesSection />
      <BTCALIProjectsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}