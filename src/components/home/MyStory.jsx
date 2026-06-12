import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const PARAGRAPHS = [
  "Two years ago I could only do around 10 pull-ups.",
  "No planche. No front lever. No handstand push-ups. No coaching business. No real understanding of how to structure training.",
  "Over the last two years I've spent thousands of hours learning calisthenics, overcoming plateaus, refining technique, managing injuries, and figuring out what actually works.",
  "After 1.5 years of dedicated training I unlocked the full planche. Along the way I also unlocked front lever, handstand push-ups, muscle-ups, bent arm press, L-sit to handstand and many other advanced skills.",
  "The biggest thing I learned is that most athletes don't fail because they aren't working hard enough. They fail because they don't know what to focus on next.",
  "I've been through the plateaus. I've dealt with injuries. I've made the mistakes. Now I help athletes avoid those mistakes and progress faster through structured programming, personalised coaching, proper foundations and technique feedback.",
  "Whether your goal takes a few weeks or a few months, the objective is always the same: find the fastest path forward.",
];

export default function MyStory() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-heading font-bold text-muted-foreground/50 uppercase tracking-[0.25em] mb-3 text-center">
            Behind BTCALI
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-10 text-center leading-tight">
            My <span className="gradient-text">Story</span>
          </h2>

          <div className="glass rounded-2xl p-7 border border-border/30 mb-8 space-y-4">
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="font-body text-sm text-foreground/80 leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/results">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-base glow-primary"
              >
                <Trophy className="w-5 h-5" /> View Student Results
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}