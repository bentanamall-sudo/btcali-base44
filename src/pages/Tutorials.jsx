import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Play } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { tutorials } from '@/lib/tutorialData';

export default function Tutorials() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Free Training</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Free <span className="gradient-text">Tutorials</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Start your calisthenics journey with our free guides. Master the fundamentals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {Object.values(tutorials).map((tutorial, i) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Link to={`/tutorials/${tutorial.id}`}>
              <GlassCard glow className="group overflow-hidden p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full gradient-bg-strong flex items-center justify-center glow-primary">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">{tutorial.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-body text-muted-foreground">{tutorial.sections.length} sections</span>
                    <span className="text-sm text-primary flex items-center gap-1 font-body group-hover:gap-2 transition-all">
                      Start Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Coaching Promotion */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <GlassCard glow hover={false} className="max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-2xl mb-2 gradient-text">Ready for More?</h3>
          <p className="text-muted-foreground font-body mb-6">
            Unlock premium skill roadmaps, AI coaching, and 1-on-1 training.
          </p>
          <Link to="/pricing">
            <GlowButton>Apply for Coaching <ArrowRight className="w-4 h-4" /></GlowButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}