import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Activity, Shield, Eye } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';

const ADMIN_EMAIL = 'ben.tanamall@gmail.com';

export default function AdminAnalytics() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const me = await base44.auth.me();
    if (me?.email === ADMIN_EMAIL) {
      setAuthorized(true);
      loadData();
    }
    setChecking(false);
  };

  const loadData = async () => {
    const data = await base44.entities.AthleteProfile.list('-updated_date', 100);
    setProfiles(data);
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard glow hover={false} className="text-center max-w-sm">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground font-body text-sm">This section is restricted to BTCALI admins only.</p>
        </GlassCard>
      </div>
    );
  }

  const totalUsers = profiles.length;
  const activeToday = profiles.filter(p => {
    if (!p.last_active_date) return false;
    const d = new Date(p.last_active_date);
    const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const quizCompleted = profiles.filter(p => p.quiz_completed).length;
  const avgXP = totalUsers > 0 ? Math.round(profiles.reduce((acc, p) => acc + (p.xp || 0), 0) / totalUsers) : 0;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Admin Only</span>
        </div>
        <h1 className="font-heading font-bold text-3xl text-foreground">
          User <span className="gradient-text">Analytics</span>
        </h1>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Users', value: totalUsers, icon: Users, color: 'text-blue-400' },
          { label: 'Active (7 days)', value: activeToday, icon: Activity, color: 'text-green-400' },
          { label: 'Scan Completed', value: quizCompleted, icon: BarChart3, color: 'text-primary' },
          { label: 'Avg XP', value: avgXP, icon: TrendingUp, color: 'text-amber-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard glow hover={false} className="text-center py-4">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className="font-heading font-bold text-2xl gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-body mt-1">{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* User table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      ) : profiles.length === 0 ? (
        <GlassCard hover={false} className="text-center py-12">
          <p className="text-muted-foreground font-body">No user profiles yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {profiles.map((profile, i) => {
            const tutorials = Object.keys(profile.tutorial_progress || {}).length;
            const skills = Object.keys(profile.skill_progress || {}).length;
            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassCard hover={false} className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full gradient-bg-strong flex-shrink-0 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary-foreground text-sm">
                        {(profile.display_name || profile.user_email || '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-semibold text-foreground truncate">
                        {profile.display_name || 'Anonymous'}
                      </div>
                      <div className="text-xs text-muted-foreground font-body truncate">{profile.user_email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 flex-1 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground font-body mb-1">Scan</div>
                      <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full ${profile.quiz_completed ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                        {profile.quiz_completed ? 'Done' : 'Pending'}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body mb-1">Tutorials</div>
                      <div className="font-heading font-bold text-sm gradient-text">{tutorials}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body mb-1">XP</div>
                      <div className="font-heading font-bold text-sm gradient-text">{profile.xp || 0}</div>
                    </div>
                  </div>

                  <div className="w-32">
                    <div className="text-xs text-muted-foreground font-body mb-1">Workouts</div>
                    <ProgressBar value={Math.min((profile.total_workouts || 0) * 5, 100)} size="sm" showLabel={false} />
                    <div className="text-xs text-muted-foreground font-body mt-1">{profile.total_workouts || 0} sessions</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-body">Last active</div>
                    <div className="text-xs text-foreground font-body">
                      {profile.last_active_date || profile.updated_date
                        ? new Date(profile.last_active_date || profile.updated_date).toLocaleDateString()
                        : 'Unknown'}
                    </div>
                    <span className={`text-xs font-heading font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                      profile.rank === 'Legend' ? 'bg-amber-500/20 text-amber-400' :
                      profile.rank === 'Elite' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-muted text-muted-foreground'
                    }`}>{profile.rank || 'Recruit'}</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}