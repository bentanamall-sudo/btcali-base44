import CinemaHero from '@/components/cinema/CinemaHero';
import ProofSection from '@/components/cinema/ProofSection';
import StickyStory from '@/components/cinema/StickyStory';
import ProblemSolution from '@/components/cinema/ProblemSolution';
import SkillJourney from '@/components/cinema/SkillJourney';
import ResultsGallery from '@/components/cinema/ResultsGallery';
import StackingCards from '@/components/cinema/StackingCards';
import CoachingAnalysis from '@/components/cinema/CoachingAnalysis';
import HowCoachingWorks from '@/components/cinema/HowCoachingWorks';
import WhoCoachingIsFor from '@/components/cinema/WhoCoachingIsFor';
import CoachingBenefits from '@/components/cinema/CoachingBenefits';
import CinemaPricing from '@/components/cinema/CinemaPricing';
import EditorialFAQ from '@/components/cinema/EditorialFAQ';
import FinalCTA from '@/components/cinema/FinalCTA';
import CinemaFooter from '@/components/cinema/CinemaFooter';

export default function Home() {
  return (
    <div className="relative">
      {/* Chapter: Intro */}
      <CinemaHero />

      {/* Chapter: Proof */}
      <ProofSection />

      {/* Chapter: Journey */}
      <StickyStory />

      {/* Chapter: Method */}
      <ProblemSolution />
      <SkillJourney />
      <CoachingAnalysis />

      {/* Chapter: Results */}
      <ResultsGallery />
      <StackingCards />

      {/* Chapter: Coaching */}
      <HowCoachingWorks />
      <WhoCoachingIsFor />
      <CoachingBenefits />

      {/* Chapter: Apply */}
      <CinemaPricing />
      <EditorialFAQ />
      <FinalCTA />

      {/* Footer */}
      <CinemaFooter />
    </div>
  );
}