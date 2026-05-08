import { motion } from 'framer-motion';
import GlassCard from '../GlassCard';
import ProgressBar from '../ProgressBar';

export default function QuizQuestion({ question, options, onSelect, currentIndex, totalQuestions }) {
  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <ProgressBar
          value={currentIndex}
          max={totalQuestions}
          showLabel={false}
          size="sm"
        />
        <p className="text-xs text-muted-foreground font-body mt-2 text-center">
          {currentIndex + 1} / {totalQuestions}
        </p>
      </div>

      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-center mb-8 text-foreground">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, i) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard
              glow
              className="py-4 px-6 text-center"
              onClick={() => onSelect(option.value)}
            >
              <span className="font-body text-lg text-foreground">{option.label}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}