import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { callFunction } from '@/lib/callFunction';
import { useMember } from '@/lib/MemberContext';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, BookOpen, Target, ClipboardList, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProgramTable from '@/components/program/ProgramTable';
import GoalsTab from '@/components/program/GoalsTab';
import WorkoutLogTab from '@/components/program/WorkoutLogTab';
import GeneralTutorialsTab from '@/components/program/GeneralTutorialsTab';
import TrainingRulesCard from '@/components/program/TrainingRulesCard';
import HomeButton from '@/components/HomeButton';

function AccessGate() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 sm:p-12 border border-primary/30 max-w-md w-full text-center glow-border">
        <div className="w-16 h-16 rounded-2xl gradient-bg-strong glow-primary flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          My <span className="gradient-text">Program</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
          Log in or activate your account to access your personalised program.
        </p>
        <Link to="/activate">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
            Activate Account (First Time)
          </motion.button>
        </Link>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => base44.auth.redirectToLogin(window.location.origin + '/#/my-program')}
          className="w-full py-3.5 rounded-xl glass border border-primary/40 text-primary font-heading font-bold text-sm">
          Log In → Open My Program
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function MyProgram() {
  const { isMember, isAdmin, accessCode, loading: memberLoading, studentName: memberStudentName, logout } = useMember();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [activeSection, setActiveSection] = useState('program');

  const studentName = program?.student_name || memberStudentName || 'Athlete';

  useEffect(() => {
    if (!isMember && !isAdmin) { setLoading(false); return; }

    const code = accessCode?.toUpperCase();
    if (!code) { setLoading(false); return; }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('Request timed out after 5 seconds')), 5000));
        const data = await Promise.race([
          callFunction('getStudentProgram', { access_code: code }),
          timeout,
        ]);
        if (!cancelled) {
          const prog = data?.program || null;
          console.log('[MyProgram] loaded for', code, '→', prog ? `${prog.tabs?.length} tabs` : 'null (program being prepared)');
          setProgram(prog);
          setLoading(false);
        }
      } catch (err) {
        console.error('[MyProgram] load error for', code, ':', err?.message || err);
        if (!cancelled) {
          setLoadError(err?.message || 'Failed to load program');
          setProgram(null);
          setLoading(false);
        }
      }
    };

    load();

    return () => { cancelled = true; };
  }, [isMember, isAdmin, accessCode]);

  if (!isMember && !isAdmin) return <AccessGate />;

  // Admin without a student access code — redirect them to admin panel
  if (isAdmin && !accessCode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-3">Admin Program Manager</h2>
          <p className="text-sm text-muted-foreground mb-5">Use the Admin panel to manage all student programs.</p>
          <Link to="/admin/programs">
            <button className="px-6 py-3 rounded-xl gradient-bg-strong text-primary-foreground font-heading font-bold text-sm">
              Go to Program Manager →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'program', label: 'My Program', icon: ClipboardList },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'log', label: 'Workout Log', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-primary/50">BTCALI</span>
            <span className="text-xs text-muted-foreground/40">•</span>
            <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-muted-foreground/40 font-mono">{accessCode}</span>
          </div>
          <div className="flex items-center gap-2">
            <HomeButton />
            <button onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-border/30 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all font-heading font-semibold text-xs">
              Log Out
            </button>
          </div>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-4xl text-foreground">
          Welcome back, <span className="gradient-text">{studentName}</span>
        </h1>
      </motion.div>

      {/* Coach message banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-4 sm:p-5 mb-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(79,157,255,0.08) 0%, rgba(94,235,255,0.05) 100%)',
          border: '1px solid rgba(79,157,255,0.25)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,157,255,0.5), transparent)' }} />
        <div className="flex items-start gap-3">
          <Bell className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: '#A6D4FF' }}>
            Remember to send every set to BTCALI for feedback. I will respond as soon as I am available, usually between <strong>4:00pm – 6:00pm NSW time</strong>. Keep recording your sets so I can help correct technique and update your program as you improve.
          </p>
        </div>
      </motion.div>

      {/* Training Rules Card */}
      <TrainingRulesCard />

      {/* Section tabs — horizontally scrollable on mobile */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all border whitespace-nowrap flex-shrink-0 ${
              activeSection === s.id
                ? 'gradient-bg-strong text-primary-foreground border-primary/40'
                : 'glass border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}>
            <s.icon className="w-3.5 h-3.5" />
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'program' && (
        loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : loadError ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <ClipboardList className="w-10 h-10 text-destructive/40 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">Could not load your program</h2>
            <p className="text-sm font-body text-muted-foreground mb-4">{loadError}</p>
            <p className="text-xs font-body text-muted-foreground/50">Try refreshing the page. If this keeps happening, contact BTCALI.</p>
          </motion.div>
        ) : !program || !program.tabs || program.tabs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <ClipboardList className="w-10 h-10 text-primary/40 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">Your personalised program is being prepared.</h2>
            <p className="text-sm font-body text-muted-foreground">Check back soon. Your coach will have it ready for your next session.</p>
          </motion.div>
        ) : (
          <ProgramTable program={program} readOnly />
        )
      )}

      {activeSection === 'tutorials' && <GeneralTutorialsTab />}
      {activeSection === 'goals' && <GoalsTab accessCode={accessCode} studentName={studentName} />}
      {activeSection === 'log' && <WorkoutLogTab accessCode={accessCode} studentName={studentName} />}
    </div>
  );
}