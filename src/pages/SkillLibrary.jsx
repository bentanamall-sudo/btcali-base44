import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';
import { skills } from '@/lib/skillsData';

export default function SkillLibrary() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Map className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Skill Library</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Skill <span className="gradient-text">Roadmaps</span>
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Follow structured progression pathways to master elite calisthenics skills.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SkillCard skill={skill} progress={0} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}