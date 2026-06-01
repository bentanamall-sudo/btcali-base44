import HeroSection from '../components/home/HeroSection';
import FreeTutorialsBanner from '../components/home/FreeTutorialsBanner';
import FooterSection from '../components/home/FooterSection';
import AIChatWidget from '../components/home/AIChatWidget';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FreeTutorialsBanner />
      <FooterSection />
      <AIChatWidget />
    </div>
  );
}