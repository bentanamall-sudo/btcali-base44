import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ScanLine, Trophy, Users } from 'lucide-react';

// Holographic athlete built from Three.js-style canvas particles
function HolographicAthlete() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 440;
    const H = canvas.height = 520;

    // Planche-like body keypoints (normalized 0-1)
    const BODY = [
      // head
      { x: 0.5, y: 0.08, r: 14, type: 'head' },
      // shoulders
      { x: 0.35, y: 0.22, r: 7, type: 'joint' },
      { x: 0.65, y: 0.22, r: 7, type: 'joint' },
      // torso
      { x: 0.5, y: 0.3, r: 5, type: 'core' },
      // hips
      { x: 0.42, y: 0.42, r: 6, type: 'joint' },
      { x: 0.58, y: 0.42, r: 6, type: 'joint' },
      // arms extended (planche lean)
      { x: 0.18, y: 0.32, r: 5, type: 'joint' },
      { x: 0.82, y: 0.32, r: 5, type: 'joint' },
      { x: 0.08, y: 0.44, r: 5, type: 'joint' }, // hands
      { x: 0.92, y: 0.44, r: 5, type: 'joint' },
      // legs extended back (planche)
      { x: 0.38, y: 0.62, r: 5, type: 'joint' },
      { x: 0.62, y: 0.62, r: 5, type: 'joint' },
      { x: 0.35, y: 0.82, r: 4, type: 'joint' },
      { x: 0.65, y: 0.82, r: 4, type: 'joint' },
      { x: 0.32, y: 0.96, r: 4, type: 'foot' },
      { x: 0.68, y: 0.96, r: 4, type: 'foot' },
    ];

    const CONNECTIONS = [
      [1,2],[1,3],[2,3],[3,6],[3,7],[6,8],[7,9],[3,4],[4,5],
      [5,10],[5,11],[10,12],[11,13],[12,14],[13,15],[0,1],[0,2]
    ];

    // Floating particles around the body
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.5 ? 213 : 188,
    }));

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      // Subtle breathing animation
      const breathe = Math.sin(t * 0.8) * 0.012;

      // Draw connections
      CONNECTIONS.forEach(([a, b]) => {
        const pa = BODY[a], pb = BODY[b];
        const ax = pa.x * W, ay = (pa.y + breathe) * H;
        const bx = pb.x * W, by = (pb.y + breathe) * H;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, `hsla(213,100%,65%,0.55)`);
        grad.addColorStop(0.5, `hsla(188,100%,68%,0.7)`);
        grad.addColorStop(1, `hsla(213,100%,65%,0.55)`);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw joints / glow nodes
      BODY.forEach((pt, idx) => {
        const px = pt.x * W;
        const py = (pt.y + breathe) * H;
        const pulse = 1 + Math.sin(t * 1.5 + idx * 0.6) * 0.18;
        const radius = pt.r * pulse;

        // Outer glow ring
        const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 3.5);
        glow.addColorStop(0, `hsla(188,100%,70%,0.18)`);
        glow.addColorStop(1, `hsla(213,100%,65%,0)`);
        ctx.beginPath();
        ctx.arc(px, py, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        const core = ctx.createRadialGradient(px, py, 0, px, py, radius);
        core.addColorStop(0, `hsla(200,100%,90%,0.95)`);
        core.addColorStop(0.4, `hsla(188,100%,68%,0.85)`);
        core.addColorStop(1, `hsla(213,100%,55%,0.3)`);
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      });

      // Orbiting energy rings
      for (let i = 0; i < 3; i++) {
        const cx = W * 0.5, cy = H * 0.45;
        const orbitR = 95 + i * 45;
        const angle = t * (0.4 - i * 0.1) + (i * Math.PI * 0.66);
        const dotX = cx + Math.cos(angle) * orbitR;
        const dotY = cy + Math.sin(angle) * orbitR * 0.35;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3 - i * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${i === 1 ? 188 : 213},100%,68%,${0.7 - i * 0.15})`;
        ctx.fill();

        // Ring arc
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbitR, orbitR * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(213,100%,65%,${0.08 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,68%,${p.alpha * (0.5 + Math.sin(t + p.x) * 0.25)})`;
        ctx.fill();
      });

      // Energy scan line
      const scanY = H * ((Math.sin(t * 0.5) * 0.5 + 0.5));
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'hsla(188,100%,72%,0.35)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 2, W, 4);

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 'auto', maxWidth: 440 }}
      className="opacity-90"
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid + ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-100" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 90% 60% at 60% 50%, rgba(79,157,255,0.06) 0%, transparent 60%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(94,235,255,0.03) 0%, transparent 60%)',
        }} />
        {/* Top edge line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(79,157,255,0.25) 50%, transparent 95%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 20% 3%))' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div>
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

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading font-black leading-[0.96] tracking-tight mb-6">
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">MASTER</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl gradient-text gold-glow">CALISTHENICS</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">SKILLS</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium" style={{ color: 'rgba(191,201,217,0.7)' }}>
                  FOR EVERY LEVEL
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-10"
            >
              <div className="space-y-1.5">
                {['Personalised programming.', 'Expert feedback.', 'Real results.'].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.1 }}
                    className="font-body text-lg font-medium flex items-center gap-2"
                    style={{ color: '#BFC9D9' }}
                  >
                    <span className="w-4 h-px rounded-full" style={{ background: 'linear-gradient(90deg, #4F9DFF, #5EEBFF)' }} />
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/diagnostic">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-bold text-base gradient-bg-strong btn-shine relative overflow-hidden"
                  style={{
                    color: 'white',
                    boxShadow: '0 0 28px rgba(79,157,255,0.3), 0 4px 20px rgba(79,157,255,0.15)',
                  }}
                >
                  <ScanLine className="w-4.5 h-4.5 relative z-10" />
                  <span className="relative z-10">Start Athlete Scan</span>
                </motion.button>
              </Link>

              <Link to="/results">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-heading font-medium text-base transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#BFC9D9',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,157,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <Trophy className="w-4 h-4" style={{ color: '#4F9DFF' }} />
                  View Results
                </motion.button>
              </Link>

              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-heading font-medium text-base transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#BFC9D9',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,157,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <Users className="w-4 h-4" style={{ color: '#4F9DFF' }} />
                  View Coaching
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-6 flex-wrap"
            >
              {[
                { value: '40+', label: 'Athletes Coached' },
                { value: '100+', label: 'Skills Unlocked' },
                { value: '$40/wk', label: 'Starting From' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-heading font-black text-xl" style={{ color: '#4F9DFF' }}>{stat.value}</span>
                  <span className="text-xs font-body" style={{ color: 'rgba(191,201,217,0.5)' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Holographic Athlete */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Glow rings behind athlete */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(79,157,255,0.1) 0%, transparent 65%)' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full animate-pulse-glow"
                style={{ border: '1px solid rgba(79,157,255,0.06)', background: 'transparent' }} />
            </div>

            <HolographicAthlete />

            {/* Floating data chips */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 right-4 px-3 py-2 rounded-xl text-xs font-heading font-semibold"
              style={{
                background: 'rgba(79,157,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(79,157,255,0.2)',
                color: '#A6D4FF',
              }}
            >
              ⚡ Planche Protocol
            </motion.div>
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-20 left-4 px-3 py-2 rounded-xl text-xs font-heading font-semibold"
              style={{
                background: 'rgba(94,235,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(94,235,255,0.2)',
                color: '#5EEBFF',
              }}
            >
              ▲ Form Analysis Active
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
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