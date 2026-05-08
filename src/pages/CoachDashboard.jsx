import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, BarChart3, Video, MessageSquare, FileText, Bell, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import ProgressBar from '../components/ProgressBar';

const students = [
  { name: 'Marcus K.', email: 'marcus@email.com', skill: 'Planche', progress: 65, lastCheckIn: '2 days ago', status: 'active' },
  { name: 'Sarah L.', email: 'sarah@email.com', skill: 'Handstand', progress: 80, lastCheckIn: '1 day ago', status: 'active' },
  { name: 'James T.', email: 'james@email.com', skill: 'Muscle-Up', progress: 45, lastCheckIn: '3 days ago', status: 'active' },
  { name: 'Mia S.', email: 'mia@email.com', skill: 'Front Lever', progress: 30, lastCheckIn: '5 days ago', status: 'review' },
];

const tabs = [
  { id: 'students', label: 'Students', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'videos', label: 'Video Review', icon: Video },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'programs', label: 'Program Builder', icon: Layers },
];

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Coach Dashboard</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
          Coach <span className="gradient-text">Operating System</span>
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-bg-strong text-primary-foreground glow-primary'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          {students.map((student, i) => (
            <motion.div
              key={student.email}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard glow hover={false} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full gradient-bg-strong flex items-center justify-center">
                    <span className="font-heading font-bold text-primary-foreground">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">{student.name}</div>
                    <div className="text-xs text-muted-foreground font-body">{student.email}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground font-body">{student.skill}</span>
                    <span className="text-xs text-muted-foreground font-body">Last: {student.lastCheckIn}</span>
                  </div>
                  <ProgressBar value={student.progress} size="sm" />
                </div>
                <div className="flex gap-2">
                  <GlowButton variant="secondary" size="sm">
                    <MessageSquare className="w-4 h-4" /> Message
                  </GlowButton>
                  <GlowButton variant="secondary" size="sm">
                    <Bell className="w-4 h-4" />
                  </GlowButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'programs' && (
        <div className="text-center py-8">
          <Link to="/coach/programs">
            <GlowButton size="lg">
              <Layers className="w-5 h-5" /> Open Program Builder
            </GlowButton>
          </Link>
        </div>
      )}

      {activeTab !== 'students' && activeTab !== 'programs' && (
        <GlassCard glow hover={false} className="text-center py-16">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            {tabs.find(t => t.id === activeTab)?.label}
          </h3>
          <p className="text-muted-foreground font-body">This section is being built. Coming soon.</p>
        </GlassCard>
      )}
    </div>
  );
}