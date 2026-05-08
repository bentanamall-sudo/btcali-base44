import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Circle, RotateCcw, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import ProgressBar from '../components/ProgressBar';
import { tutorials } from '@/lib/tutorialData';

const STORAGE_KEY = 'btcali-tutorial-progress';

function loadProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function TutorialDetail() {
  const { tutorialId } = useParams();
  const tutorial = tutorials[tutorialId];
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    const progress = loadProgress();
    setCompletedSections(progress[tutorialId] || {});
  }, [tutorialId]);

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Tutorial not found.</p>
      </div>
    );
  }

  const totalSections = tutorial.sections.length;
  const completedCount = Object.values(completedSections).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSections) * 100);

  const toggleSection = (sectionId) => {
    const updated = { ...completedSections, [sectionId]: !completedSections[sectionId] };
    setCompletedSections(updated);
    const allProgress = loadProgress();
    allProgress[tutorialId] = updated;
    saveProgress(allProgress);
  };

  const resetProgress = () => {
    setCompletedSections({});
    const allProgress = loadProgress();
    allProgress[tutorialId] = {};
    saveProgress(allProgress);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/tutorials" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tutorials
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3 text-foreground">
          {tutorial.title}
        </h1>
        <p className="text-muted-foreground font-body mb-6">{tutorial.description}</p>

        {/* Progress */}
        <GlassCard hover={false} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-semibold text-foreground">Your Progress</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-body">{completedCount}/{totalSections} complete</span>
              <button onClick={resetProgress} className="text-muted-foreground hover:text-foreground transition-colors" title="Reset progress">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <ProgressBar value={progressPercent} size="lg" />
        </GlassCard>
      </motion.div>

      {/* Roadmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <h2 className="font-heading font-semibold text-xl mb-4 gradient-text">Progression Roadmap</h2>
        <div className="flex flex-wrap gap-2">
          {tutorial.roadmap.map((stage, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="glass px-3 py-1.5 rounded-lg">
                <span className="text-xs font-body text-foreground/80">{stage.name}</span>
              </div>
              {i < tutorial.roadmap.length - 1 && (
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {tutorial.sections.map((section, i) => {
          const isComplete = completedSections[section.id];
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <GlassCard glow={isComplete} hover={false}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">{section.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">{section.description}</p>
                  </div>
                  {isComplete && <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />}
                </div>

                {/* Video Embed */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted/30">
                  <iframe
                    src={`https://www.youtube.com/embed/${section.videoId}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={section.title}
                  />
                </div>

                {/* Steps */}
                <ul className="space-y-2 mb-4">
                  {section.steps.map((step, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                      <Circle className="w-3 h-3 text-primary flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>

                {/* Mark Complete Button */}
                <GlowButton
                  variant={isComplete ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => toggleSection(section.id)}
                  className="w-full sm:w-auto"
                >
                  {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                  {!isComplete && <CheckCircle className="w-4 h-4" />}
                </GlowButton>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <GlassCard glow hover={false} className="text-center">
          <h3 className="font-heading font-bold text-xl mb-2 gradient-text">Want to Go Further?</h3>
          <p className="text-muted-foreground font-body text-sm mb-4">
            Unlock premium coaching, advanced programs, and personalized feedback.
          </p>
          <Link to="/pricing">
            <GlowButton>Apply for Premium Coaching <ArrowRight className="w-4 h-4" /></GlowButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}