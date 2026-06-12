import HeroSection from '../components/home/HeroSection';
import WhyAthletesFail from '../components/home/WhyAthletesFail';
import SocialProofCounter from '../components/home/SocialProofCounter';
import ResultsTeaser from '../components/home/ResultsTeaser';
import WhoThisIsFor from '../components/home/WhoThisIsFor';
import MyStory from '../components/home/MyStory';
import BeforeAfterOutcomes from '../components/home/BeforeAfterOutcomes';
import HowCoachingWorks from '../components/home/HowCoachingWorks';
import PricingSection from '../components/home/PricingSection';
import FAQSection from '../components/home/FAQSection';
import FreeTutorialsBanner from '../components/home/FreeTutorialsBanner';
import FooterSection from '../components/home/FooterSection';

function Divider() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)/0.5), transparent)' }} />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhyAthletesFail />
      <Divider />
      <SocialProofCounter />
      <Divider />
      <ResultsTeaser />
      <Divider />
      <WhoThisIsFor />
      <Divider />
      <MyStory />
      <Divider />
      <BeforeAfterOutcomes />
      <Divider />
      <HowCoachingWorks />
      <Divider />
      <PricingSection />
      <Divider />
      <FAQSection />
      <Divider />
      <FreeTutorialsBanner />
      <FooterSection />
    </div>
  );
}