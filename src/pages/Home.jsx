import HeroSection from '../components/home/HeroSection';
import FreeTutorialsBanner from '../components/home/FreeTutorialsBanner';
import FooterSection from '../components/home/FooterSection';
import ResultsTeaser from '../components/home/ResultsTeaser';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ResultsTeaser />
      <FreeTutorialsBanner />
      <FooterSection />
    </div>
  );
}