import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanLine, Trophy, Users } from 'lucide-react';

// Full standing holographic human body scanner — like the reference image
function HolographicScanner() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 420;
    const H = canvas.height = 600;

    // Standing human body keypoints (x: 0-1, y: 0-1)
    const JOINTS = [
      { id: 'head',    x: 0.50, y: 0.07, r: 16 },
      { id: 'neck',    x: 0.50, y: 0.14, r: 5  },
      { id: 'lsho',    x: 0.38, y: 0.20, r: 7  },
      { id: 'rsho',    x: 0.62, y: 0.20, r: 7  },
      { id: 'lelb',    x: 0.30, y: 0.33, r: 5  },
      { id: 'relb',    x: 0.70, y: 0.33, r: 5  },
      { id: 'lwri',    x: 0.25, y: 0.46, r: 4  },
      { id: 'rwri',    x: 0.75, y: 0.46, r: 4  },
      { id: 'chest',   x: 0.50, y: 0.25, r: 5  },
      { id: 'core',    x: 0.50, y: 0.35, r: 5  },
      { id: 'lhip',   x: 0.42, y: 0.50, r: 6  },
      { id: 'rhip',   x: 0.58, y: 0.50, r: 6  },
      { id: 'lkne',   x: 0.40, y: 0.67, r: 5  },
      { id: 'rkne',   x: 0.60, y: 0.67, r: 5  },
      { id: 'lank',   x: 0.39, y: 0.82, r: 4  },
      { id: 'rank',   x: 0.61, y: 0.82, r: 4  },
      { id: 'lfoo',   x: 0.37, y: 0.91, r: 4  },
      { id: 'rfoo',   x: 0.63, y: 0.91, r: 4  },
    ];

    const BONES = [
      ['head','neck'],['neck','lsho'],['neck','rsho'],['neck','chest'],
      ['lsho','lelb'],['rsho','relb'],['lelb','lwri'],['relb','rwri'],
      ['chest','core'],['core','lhip'],['core','rhip'],['lhip','rhip'],
      ['lhip','lkne'],['rhip','rkne'],['lkne','lank'],['rkne','rank'],
      ['lank','lfoo'],['rank','rfoo'],
    ];
    const jMap = Object.fromEntries(JOINTS.map(j => [j.id, j]));



    // Particles
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 213 : 188,
    }));

    // Data labels — right side only so they don't bleed outside canvas
    const DATA_LABELS = [
      { text: 'CHEST',     jx: 0.50, jy: 0.25, ox: 0.24, oy: -0.02 },
      { text: 'CORE',      jx: 0.50, jy: 0.35, ox: 0.24, oy: 0 },
      { text: 'SHOULDERS', jx: 0.62, jy: 0.20, ox: 0.20, oy: -0.04 },
      { text: 'LEGS',      jx: 0.60, jy: 0.67, ox: 0.22, oy: 0 },
    ];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.013;

      const breathe = Math.sin(t * 0.7) * 0.008;

      // === GROUND RINGS ===
      const gx = W * 0.5, gy = H * 0.95;
      for (let i = 3; i >= 0; i--) {
        const rx = 60 + i * 28, ry = 10 + i * 4;
        const alpha = (0.5 - i * 0.1) * (0.6 + Math.sin(t * 1.2 + i) * 0.2);
        ctx.beginPath();
        ctx.ellipse(gx, gy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(213,100%,65%,${alpha})`;
        ctx.lineWidth = i === 0 ? 1.5 : 0.8;
        ctx.stroke();
      }
      // ground glow
      const groundGlow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 80);
      groundGlow.addColorStop(0, 'hsla(213,100%,65%,0.18)');
      groundGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(gx, gy, 80, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = groundGlow;
      ctx.fill();

      // Body outline removed — skeleton only, no filled silhouette

      // === HORIZONTAL SCAN LINES across body ===
      for (let ly = 0.04; ly < 0.96; ly += 0.04) {
        const lineAlpha = 0.04 + Math.sin(t * 2 + ly * 20) * 0.02;
        ctx.beginPath();
        ctx.moveTo(W * 0.2, (ly + breathe) * H);
        ctx.lineTo(W * 0.8, (ly + breathe) * H);
        ctx.strokeStyle = `hsla(213,100%,65%,${lineAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // === SCAN LINE (moving) ===
      const scanProgress = (Math.sin(t * 0.6) * 0.5 + 0.5);
      const scanY = H * (0.04 + scanProgress * 0.88);
      const scanGrad = ctx.createLinearGradient(0, scanY - 3, 0, scanY + 3);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'hsla(188,100%,72%,0.7)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(W * 0.15, scanY - 3, W * 0.7, 6);
      // scan glow horizontal
      const scanHGlow = ctx.createLinearGradient(0, 0, W, 0);
      scanHGlow.addColorStop(0, 'transparent');
      scanHGlow.addColorStop(0.15, 'transparent');
      scanHGlow.addColorStop(0.5, `hsla(188,100%,72%,0.15)`);
      scanHGlow.addColorStop(0.85, 'transparent');
      scanHGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = scanHGlow;
      ctx.fillRect(0, scanY - 8, W, 16);

      // === BONES ===
      BONES.forEach(([aId, bId]) => {
        const a = jMap[aId], b = jMap[bId];
        if (!a || !b) return;
        const ax = a.x * W, ay = (a.y + breathe) * H;
        const bx = b.x * W, by = (b.y + breathe) * H;
        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, 'hsla(213,100%,65%,0.5)');
        grad.addColorStop(0.5, 'hsla(188,100%,72%,0.75)');
        grad.addColorStop(1, 'hsla(213,100%,65%,0.5)');
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'hsla(188,100%,72%,0.4)';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // === JOINTS ===
      JOINTS.forEach((pt, idx) => {
        const px = pt.x * W, py = (pt.y + breathe) * H;
        const pulse = 1 + Math.sin(t * 2 + idx * 0.7) * 0.2;
        const r = pt.r * pulse;

        // outer glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        glow.addColorStop(0, 'hsla(188,100%,72%,0.2)');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();

        // core
        const core = ctx.createRadialGradient(px, py, 0, px, py, r);
        core.addColorStop(0, 'hsla(200,100%,95%,1)');
        core.addColorStop(0.3, 'hsla(188,100%,72%,0.9)');
        core.addColorStop(1, 'hsla(213,100%,60%,0.2)');
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = core; ctx.fill();
      });

      // === DATA LABELS ===
      DATA_LABELS.forEach((lbl, i) => {
        const jx = lbl.jx * W, jy = (lbl.jy + breathe) * H;
        const tx = (lbl.jx + lbl.ox) * W, ty = (lbl.jy + lbl.oy + breathe) * H;
        const alpha = 0.5 + Math.sin(t * 0.8 + i * 1.1) * 0.2;

        // connector line
        ctx.beginPath();
        ctx.moveTo(jx, jy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = `hsla(213,100%,65%,${alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // dot at end
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(188,100%,72%,${alpha})`;
        ctx.fill();

        // label text
        ctx.font = `bold 9px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = `hsla(188,100%,78%,${alpha})`;
        ctx.letterSpacing = '0.1em';
        ctx.fillText(lbl.text, tx + (lbl.ox > 0 ? 6 : -ctx.measureText(lbl.text).width - 6), ty + 3);
      });

      // === PARTICLES ===
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const a = p.alpha * (0.4 + Math.sin(t + p.x * 0.05) * 0.3);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${a})`; ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative" style={{ width: '100%', maxWidth: 420 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
      {/* Status panel — overlaid top-right */}
      <div className="absolute top-8 right-0 flex flex-col gap-2 pointer-events-none" style={{ minWidth: 110 }}>
        {[
          { label: 'BODY STATUS', value: 'OPTIMAL', color: '#5EEBFF', big: true },
          { label: 'STRENGTH', value: '94%', color: '#4F9DFF' },
          { label: 'MOBILITY', value: '91%', color: '#4F9DFF' },
          { label: 'RECOVERY', value: '87%', color: '#4F9DFF' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            className="px-2.5 py-1.5 rounded-lg"
            style={{
              background: 'rgba(0,8,20,0.75)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${item.color}25`,
            }}
          >
            <p className="text-[8px] font-heading font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(166,212,255,0.5)' }}>{item.label}</p>
            <p className={`font-heading font-black ${item.big ? 'text-sm' : 'text-base'}`} style={{ color: item.color, textShadow: `0 0 12px ${item.color}80` }}>{item.value}</p>
          </motion.div>
        ))}
        {/* Mini chart bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="px-2.5 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,8,20,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79,157,255,0.15)' }}
        >
          <p className="text-[8px] font-heading font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: 'rgba(166,212,255,0.4)' }}>OUTPUT</p>
          <div className="flex items-end gap-0.5 h-6">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0, 0.7].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.8 + i * 0.06, duration: 0.4 }}
                style={{
                  width: 5, height: `${h * 24}px`,
                  background: `linear-gradient(to top, #4F9DFF, #5EEBFF)`,
                  borderRadius: 2, transformOrigin: 'bottom',
                  opacity: 0.7 + h * 0.3,
                  boxShadow: `0 0 4px rgba(79,157,255,0.5)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const parallaxX = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const parallaxY = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx);
    mouseY.set(ny);
    parallaxX.set((nx - 0.5) * 30);
    parallaxY.set((ny - 0.5) * 20);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-60" />
        {/* Aurora waves */}
        <motion.div
          animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            top: '-20%', left: '-10%', width: '70%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(79,157,255,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            bottom: '-10%', right: '-5%', width: '60%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(94,235,255,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(79,157,255,0.3) 50%, transparent 95%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 20% 3%))' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">

          {/* LEFT — Typography */}
          <div className="min-w-0 relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(79,157,255,0.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#5EEBFF' }} />
              <span className="text-xs font-heading font-semibold tracking-[0.18em] uppercase" style={{ color: '#A6D4FF' }}>
                Elite 1-on-1 Calisthenics Coaching
              </span>
            </motion.div>

            {/* Main heading — 3D layered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading font-black leading-[0.93] tracking-tight mb-6" style={{ perspective: 800 }}>
                {['MASTER', 'CALISTHENICS', 'SKILLS'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`block text-5xl sm:text-6xl lg:text-[5.5rem] ${i === 1 ? 'gradient-text gold-glow' : 'text-white'}`}
                    style={{
                      textShadow: i === 1
                        ? '0 0 40px rgba(79,157,255,0.4), 0 4px 20px rgba(0,0,0,0.5)'
                        : '0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08)',
                      transformOrigin: 'left center',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-medium italic"
                  style={{ color: 'rgba(191,201,217,0.6)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                >
                  for every level
                </motion.span>
              </h1>
            </motion.div>

            {/* Sublines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-10 space-y-1.5"
            >
              {[
                'Personalised programming.',
                'Expert video feedback.',
                'Real results that speak for themselves.',
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.72 + i * 0.1 }}
                  className="font-body text-lg font-medium flex items-center gap-2.5"
                  style={{ color: '#BFC9D9' }}
                >
                  <span className="w-5 h-px rounded-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #4F9DFF, #5EEBFF)' }} />
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {['1-ON-1 COACHING', 'VIDEO ANALYSIS', 'PROVEN RESULTS', 'SKILL MASTERY'].map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.07 }}
                  className="flex items-center gap-1.5 text-[10px] font-heading font-bold tracking-[0.15em]"
                  style={{ color: 'rgba(166,212,255,0.7)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/diagnostic">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 50px rgba(79,157,255,0.5), 0 8px 30px rgba(79,157,255,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-bold text-base gradient-bg-strong btn-shine relative overflow-hidden"
                  style={{
                    color: 'white',
                    boxShadow: '0 0 28px rgba(79,157,255,0.35), 0 4px 20px rgba(79,157,255,0.18)',
                  }}
                >
                  <ScanLine className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Athlete Scan</span>
                  <span className="relative z-10 text-sm opacity-70">→</span>
                </motion.button>
              </Link>

              <Link to="/results">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(79,157,255,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-heading font-medium text-base transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#BFC9D9',
                  }}
                >
                  <Trophy className="w-4 h-4 flex-shrink-0" style={{ color: '#4F9DFF' }} />
                  View Results
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { value: '40+', label: 'Athletes Coached' },
                { value: '100+', label: 'Skills Unlocked' },
                { value: '$40/wk', label: 'Starting From' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex flex-col cursor-default"
                >
                  <span className="font-heading font-black text-2xl" style={{ color: '#4F9DFF', textShadow: '0 0 20px rgba(79,157,255,0.5)' }}>{stat.value}</span>
                  <span className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.5)' }}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Holographic Scanner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center relative overflow-hidden"
          >
            {/* Outer ambient glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-96 h-96 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(79,157,255,0.2) 0%, transparent 65%)', filter: 'blur(30px)' }}
              />
            </div>

            <HolographicScanner />

            {/* Floating skill labels */}
            {[
              { text: 'PLANCHE', top: '10%', left: '8%', delay: 1.4 },
              { text: 'MUSCLE UP', top: '28%', right: '2%', delay: 1.6 },
              { text: 'FRONT LEVER', bottom: '38%', left: '8%', delay: 1.8 },
              { text: 'HSPU', bottom: '20%', right: '2%', delay: 2.0 },
            ].map((chip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: chip.delay, duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: chip.top, bottom: chip.bottom,
                  left: chip.left, right: chip.right,
                  background: 'rgba(0,8,24,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(79,157,255,0.25)',
                  borderRadius: 8, padding: '4px 10px',
                  color: '#A6D4FF', fontSize: 10,
                  fontFamily: 'var(--font-heading)', fontWeight: 700,
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(79,157,255,0.6)',
                  boxShadow: '0 0 12px rgba(79,157,255,0.15)',
                }}
              >
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  style={{ display: 'block' }}
                >
                  {chip.text}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ background: '#4F9DFF' }}
          />
        </div>
      </motion.div>
    </section>
  );
}