import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { quizQuestions, analyzeResults } from '@/lib/quizData';
import QuizQuestion from '../components/scan/QuizQuestion';
import AnalyzingScreen from '../components/scan/AnalyzingScreen';
import ResultsScreen from '../components/scan/ResultsScreen';

export default function AthleteScan() {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('quiz'); // quiz | analyzing | results
  const [results, setResults] = useState(null);

  // Filter questions based on conditions
  const activeQuestions = quizQuestions.filter(
    (q) => !q.condition || q.condition(answers)
  );

  const currentQuestion = activeQuestions[currentIndex];

  const handleSelect = useCallback((value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Recalculate active questions with new answers
    const nextActiveQuestions = quizQuestions.filter(
      (q) => !q.condition || q.condition(newAnswers)
    );

    if (currentIndex + 1 >= nextActiveQuestions.length) {
      setPhase('analyzing');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [answers, currentIndex, currentQuestion]);

  const handleAnalysisComplete = useCallback(() => {
    const analyzed = analyzeResults(answers);
    setResults(analyzed);
    setPhase('results');
  }, [answers]);

  return (
    <div className="min-h-screen py-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'quiz' && currentQuestion && (
            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              onSelect={handleSelect}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
              multiSelect={currentQuestion.multiSelect || false}
            />
          )}
        </AnimatePresence>

        {phase === 'analyzing' && (
          <AnalyzingScreen onComplete={handleAnalysisComplete} />
        )}

        {phase === 'results' && results && (
          <ResultsScreen results={results} />
        )}
      </div>
    </div>
  );
}