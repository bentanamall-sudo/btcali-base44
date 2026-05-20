import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, CheckCircle, Star, Shield, ArrowRight,
  Play, AlertTriangle, Target, RefreshCw, BookOpen, Mail
} from 'lucide-react';

const INCLUDES = [
  'Custom program built around your current front lever level and goals',
  'One in-depth session analysis — send footage from a full workout',
  'Form and technique breakdown from BTCALI',
  'Weakness identification specific to your front lever training',
  'Program adjustments after the analysis session',
  'A clear 4-week goal tailored to where you are now',
  'In-depth tutorials on how to perform every exercise correctly',
  'Same tips and cues given to BTCALI 1-on-1 students',
];

const PROCESS = [
  {
    step: '01',
    title: 'Enquire & Purchase',
    desc: 'Complete the Athlete Scan below and enquire with BTCALI. Pay AUD $50 for your custom Front Lever Program.',
  },
  {
    step: '02',
    title: 'Receive Your Program',
    desc: 'BTCALI builds a custom program around your current front lever level, weaknesses, and goals.',
  },
  {
    step: '03',
    title: 'Session Analysis',
    desc: 'Complete a workout and send footage. BTCALI analyses your form, technique, and activations.',
  },
  {
    step: '04',
    title: 'Program Adjusted',
    desc: 'BTCALI edits the program to make it more specific to you. You receive detailed feedback on everything.',
  },
];

const FL_TUTORIALS = [
  {
    title: 'Scapular Protraction & Retraction',
    videoId: 'QppuGF94PLc',
    isShort: true,
    points: ['Essential for front lever', 'Essential for planche', 'Shoulder health foundation'],
  },
  {
    title: 'Tuck Front Lever Hold',
    videoId: 'R8-9hZOdT0Q',
    isShort: false,
    points: ['Retract and depress scapula', 'Hollow body position', 'Drive elbows toward hips', 'Core tension throughout'],
  },
  {
    title: 'Ice Cream Maker',
    videoId: '3N2UgKeSNwI',
    isShort: false,
    points: ['Lat activation + pulling strength', 'Keep body hollow', 'Control the entire range', 'Key front lever builder'],
  },
];

function TutorialModal({ tutorial, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full glass rounded-2xl overflow-hidden border border-cyan-500/30 ${tutorial.isShort ? 'max-w-sm' : 'max-w-2xl'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
          <h3 className="font-heading font-bold text-sm text-foreground truncate">{tutorial.title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted/40 transition-colors ml-2 flex-shrink-0">
            <span className="text-muted-foreground text-lg leading-none">×</span>
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: tutorial.isShort ? '177.78%' : '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1&rel=0`}
            title={tutorial.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function SmallTutorialCard({ tutorial, index }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07 }}
        className="rounded-2xl border border-cyan-500/20 bg-card/60 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px hsl(200 90% 50% / 0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-transparent" />
        <div className="p-4">
          <h4 className="font-heading font-bold text-sm text-foreground mb-2">{tutorial.title}</h4>
          <ul className="space-y-1 mb-4">
            {tutorial.points.map((p, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs font-body text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0 mt-1.5" />
                {p}
              </li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center gap-2 text-xs font-heading font-bold text-white"
          >
            <Play className="w-3 h-3" /> Watch
          </motion.button>
        </div>
      </motion.div>
      {open && <TutorialModal tutorial={tutorial} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function FrontLeverPrograms() {
  const handleEnquire = () => {
    const subject = encodeURIComponent('BTCALI Custom Front Lever Program — AUD $50');
    const body = encodeURIComponent(`Hi BTCALI,\n\nI want to enquire about the custom Front Lever Program (AUD $50).\n\nName:\nInstagram:\nCurrent Front Lever Level:\nGoals:\n\n[I have completed / plan to complete the Athlete Scan]`);
    window.location.href = `mailto:btcalisw@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">

      {/* Back */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Programs
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-cyan-500/30">
          <Star className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-body text-muted-foreground">Custom Program</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
          Custom <span className="text-cyan-400">Front Lever</span> <span className="gradient-text">Program</span>
        </h1>
        <p className="text-muted-foreground font-body text-base max-w-xl mx-auto mb-6">
          A fully personalized front lever program built around your current level, weaknesses, and goals — with a real session analysis included.
        </p>

        {/* Price hero */}
        <div className="inline-block glass rounded-2xl px-8 py-5 border border-cyan-500/40 relative overflow-hidden mb-2">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 pointer-events-none" />
          <div className="relative">
            <p className="text-xs font-heading text-cyan-400 uppercase tracking-widest font-bold mb-1">One-Time Investment</p>
            <div className="font-heading font-bold text-5xl text-cyan-400">AUD $50</div>
            <p className="text-sm text-muted-foreground font-body mt-1">~4 weeks · Less than $2/day</p>
          </div>
        </div>
      </motion.div>

      {/* Value callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5 mb-8 border border-cyan-500/20 text-center"
      >
        <p className="font-body text-foreground/85 leading-relaxed text-sm">
          For less than <strong className="text-cyan-400">$2 per day</strong>, you get a program built specifically around <strong className="text-foreground">your level, your weaknesses, and your goals</strong> — not a generic template. After purchase, you also get a direct 1-on-1 session analysis where BTCALI reviews your footage and adjusts the program to fit you even better.
        </p>
      </motion.div>

      {/* What's included */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4">
          What's <span className="gradient-text">Included</span>
        </h2>
        <div className="glass rounded-2xl p-6 border border-border/30">
          <div className="grid sm:grid-cols-2 gap-3">
            {INCLUDES.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-body text-foreground/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Session analysis callout */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-foreground">Session Analysis — Built In</h3>
          </div>
          <p className="text-sm font-body text-foreground/80 leading-relaxed mb-3">
            After you receive your program, complete a full workout and send footage to BTCALI. BTCALI will analyze your form, technique, and activations — then edit and adjust your program so it becomes even more specific to you.
          </p>
          <p className="text-sm font-body text-foreground/80 leading-relaxed">
            You receive detailed feedback on your form, technique, muscle activations, and exactly how to perform each front lever movement correctly.
          </p>
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-cyan-400/70" />
              <p className="text-sm font-body text-muted-foreground">
                Want another full workout analysis and program adjustment later? Only <strong className="text-foreground">AUD $10 extra</strong> — so your program keeps adapting as you get stronger.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Process */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl p-5 border border-cyan-500/20"
            >
              <div className="font-heading font-bold text-3xl text-cyan-400 mb-2">{p.step}</div>
              <h4 className="font-heading font-bold text-sm text-foreground mb-1">{p.title}</h4>
              <p className="text-xs font-body text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tutorials */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Front Lever <span className="text-cyan-400">Tutorials</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground font-body mb-4">The program includes in-depth tutorials on every exercise. Here's a preview:</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {FL_TUTORIALS.map((t, i) => <SmallTutorialCard key={t.title} tutorial={t} index={i} />)}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-xl px-5 py-4 border border-destructive/20 bg-destructive/5 mb-10">
        <AlertTriangle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-body text-muted-foreground leading-relaxed">
          <span className="text-destructive/80 font-semibold">Disclaimer: </span>
          BTCALI is not responsible for any injuries or damages caused while attempting these exercises. Perform all movements at your own risk.
        </p>
      </div>

      {/* Apply / Enquiry CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden"
        style={{ boxShadow: '0 0 40px hsl(200 90% 50% / 0.12)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              <span className="text-cyan-400">Read everything above before applying.</span>
            </h2>
          </div>
          <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">
            To get a program tailored to you, complete the <strong className="text-foreground">Athlete Scan</strong> below so BTCALI understands your exact level, strengths, weaknesses, and goals. Then enquire via email.
          </p>

          <div className="glass rounded-xl p-4 mb-5 border border-cyan-500/20">
            <p className="text-xs font-heading font-bold text-cyan-400 uppercase tracking-wider mb-2">Why complete the Athlete Scan first?</p>
            <p className="text-xs font-body text-muted-foreground leading-relaxed">
              The scan gives BTCALI everything needed to build your program correctly from day one. Without it, the program cannot be personalized properly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnquire}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-heading font-bold text-sm"
              style={{ boxShadow: '0 0 20px hsl(200 90% 50% / 0.3)' }}
            >
              <Mail className="w-4 h-4" /> Enquire with BTCALI
            </motion.button>
            <Link to="/scan" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl glass border border-cyan-500/40 text-foreground font-heading font-bold text-sm hover:border-cyan-500/70 transition-all"
              >
                <ArrowRight className="w-4 h-4 text-cyan-400" /> Start Athlete Scan First
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}