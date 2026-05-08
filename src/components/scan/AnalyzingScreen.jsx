import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const steps = [
  'Evaluating foundational strength...',
  'Evaluating balance control...',
  'Evaluating overhead pressing...',
  'Analyzing pulling mechanics...',
  'Generating progression pathways...',
];

export default function AnalyzingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Scan animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full gradient-bg-strong opacity-20 animate-ping" />
          <div className="absolute inset-2 rounded-full gradient-bg-strong opacity-30 animate-pulse" />
          <div className="absolute inset-4 rounded-full glass flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-2 text-foreground">
          Analyzing Athlete Profile...
        </h2>
        <p className="text-muted-foreground font-body mb-8">Please wait while we process your data</p>

        <div className="max-w-md mx-auto space-y-3">
          {steps.map((step, i) => (
            <AnimatePresence key={step}>
              {i <= currentStep && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: i === currentStep ? 1 : 0.5, x: 0 }}
                  className="flex items-center gap-3 text-sm font-body"
                >
                  {i < currentStep ? (
                    <div className="w-5 h-5 rounded-full gradient-bg-strong flex items-center justify-center">
                      <span className="text-xs text-primary-foreground">✓</span>
                    </div>
                  ) : (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  <span className={i === currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                    {step}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </motion.div>
    </div>
  );
}