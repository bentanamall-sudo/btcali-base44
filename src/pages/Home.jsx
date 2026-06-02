import HeroSection from '../components/home/HeroSection';
import FreeTutorialsBanner from '../components/home/FreeTutorialsBanner';
import FooterSection from '../components/home/FooterSection';
import ResultsCarousel from '../components/home/ResultsCarousel';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ResultsCarousel />
      <FreeTutorialsBanner />
      <FooterSection />
    </div>
  );
}