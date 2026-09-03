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
import Floating3DWords from '../components/home/Floating3DWords';

function Divider() {
  return <div className="section-rule" />;
}

export default function Home() {
  return (
    <div>
      <Floating3DWords>
        <HeroSection />
      </Floating3DWords>
      <Divider />
      <SocialProofCounter />
      <Divider />
      <WhyAthletesFail />
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