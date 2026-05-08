import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, Users, Map, ArrowRight } from 'lucide-react';
import GlassCard from '../GlassCard';

const features = [
  {
    icon: BarChart3,
    title: 'Athlete Scan',
    description: 'AI-powered diagnostics analyze your strength, mobility, and skill levels to build your personalized roadmap.',
    cta: 'Take the Scan',
    to: '/scan',
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    icon: BookOpen,
    title: 'Free Tutorials',
    description: 'Master the fundamentals with our free handstand and planche conditioning guides. Zero cost, full value.',
    cta: 'Start Learning',
    to: '/tutorials',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Users,
    title: '1-on-1 Coaching',
    description: 'Train directly with elite coaches. Custom programs, video feedback, and weekly check-ins. Apply now.',
    cta: 'Apply for Coaching',
    to: '/pricing',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Map,
    title: 'Skill Roadmaps',
    description: 'Follow structured progression pathways for handstands, planche, front lever, muscle-ups, and HSPU.',
    cta: 'View Roadmaps',
    to: '/skills',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Your <span className="gradient-text">Complete</span> System
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Everything an elite calisthenics athlete needs. One platform.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={feature.to}>
                <GlassCard glow className="h-full group">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">{feature.title}</h3>
                    <p className="font-body text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                    <span className="font-body text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {feature.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}