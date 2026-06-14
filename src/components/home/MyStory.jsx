import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const PARAGRAPHS = [
  "Two years ago I could only do around 10 pull-ups.",
  "No Planche. No Front Lever. No Handstand Push-Ups. No Muscle-Up. I also had no real understanding of how to structure my training or what I should focus on to progress efficiently.",
  "Over the last two years I've spent thousands of hours learning calisthenics, overcoming plateaus, refining technique, managing injuries and figuring out what actually works.",
  "Along the way I also received coaching and guidance from some of the best athletes in the world. That's one of the biggest reasons I started BTCALI Coaching — because I know firsthand how much coaching can accelerate progress. Before receiving guidance myself, I spent months stuck making slow progress and repeating the same mistakes.",
  "After roughly 1.5 years of dedicated training I unlocked the Full Planche. Along the way I also achieved Front Lever Pull-Ups, No Dip Muscle-Ups, 90 Degree Handstand Push-Ups, Bent Arm Press, L-Sit to Handstand, Handstand Push-Ups and many other advanced skills.",
  "The biggest lesson I learned is that most athletes don't fail because they aren't working hard enough. They fail because they don't know what to focus on next.",
  "I've been through the plateaus. I've dealt with injuries. I've made the mistakes. Now I know how to help athletes avoid those same mistakes and progress faster through structured programming, personalised coaching, proper foundations and detailed technique feedback.",
  "This is why I started BTCALI Coaching. To help athletes avoid the mistakes that slow progress, achieve skills faster and do it safely. My goal is to help transform as many athletes as possible.",
  "Whether you're a beginner trying to go from 0–5 pull-ups, an intermediate athlete working towards skills such as the L-Sit to Handstand and Handstand Push-Up, or a stronger athlete wanting to progress from Handstand Push-Ups into Planche, or build your pull-up foundation into a Full Front Lever and Muscle-Up — my coaching is built to help you achieve those goals.",
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