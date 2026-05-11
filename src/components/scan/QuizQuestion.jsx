import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import ProgressBar from '../ProgressBar';

export default function QuizQuestion({ question, options, onSelect, currentIndex, totalQuestions, multiSelect }) {
  const [selected, setSelected] = useState([]);

  const handleClick = (value) => {
    if (!multiSelect) {
      onSelect(value);
      return;
    }
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleConfirm = () => {
    if (selected.length > 0) onSelect(selected);
  };

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
        <ProgressBar value={currentIndex} max={totalQuestions} showLabel={false} size="sm" />
        <p className="text-xs text-muted-foreground font-body mt-2 text-center">
          {currentIndex + 1} / {totalQuestions}
        </p>
      </div>

      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-center mb-3 text-foreground">
        {question}
      </h2>
      {multiSelect && (
        <p className="text-center text-sm text-muted-foreground font-body mb-6">Select all that apply</p>
      )}

      <div className="space-y-3">
        {options.map((option, i) => {
          const isSelected = multiSelect && selected.includes(option.value);
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div
                onClick={() => handleClick(option.value)}
                className={`rounded-xl glass py-4 px-6 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  isSelected ? 'glow-border ring-1 ring-primary/50' : 'hover:bg-muted/20'
                }`}
              >
                <span className="font-body text-lg text-foreground">{option.label}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {multiSelect && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          disabled={selected.length === 0}
          className="mt-6 w-full gradient-bg-strong text-primary-foreground font-heading font-semibold py-4 rounded-xl glow-primary disabled:opacity-40 transition-all"
        >
          Confirm Selection ({selected.length})
        </motion.button>
      )}
    </motion.div>
  );
}