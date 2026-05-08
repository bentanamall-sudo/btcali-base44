import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import StatsGrid from '../components/dashboard/StatsGrid';
import SkillsOverview from '../components/dashboard/SkillsOverview';
import DailyMissions from '../components/dashboard/DailyMissions';
import ProgressChart from '../components/dashboard/ProgressChart';

export default function Dashboard() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <User className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Athlete Dashboard</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
          Welcome back, <span className="gradient-text">Athlete</span>
        </h1>
        <p className="text-muted-foreground font-body mt-2">Track your progress and dominate your goals.</p>
      </motion.div>

      <StatsGrid />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <DailyMissions />
        <SkillsOverview />
      </div>

      <div className="mt-6">
        <ProgressChart />
      </div>
    </div>
  );
}