import HeroSection from '../components/home/HeroSection';
import FreeTutorialsBanner from '../components/home/FreeTutorialsBanner';
import FooterSection from '../components/home/FooterSection';
import AIChatWidget from '../components/home/AIChatWidget';
import ScrollingResultsStrip from '../components/home/ScrollingResultsStrip';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ScrollingResultsStrip />
      <FreeTutorialsBanner />
      <FooterSection />
      <AIChatWidget />
    </div>
  );
}