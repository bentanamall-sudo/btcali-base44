import { useEffect, useRef } from 'react';

/**
 * Trail cursor — a tapering, fading orange ribbon drawn on a full-screen
 * canvas that follows the pointer, with a glowing head dot.
 * Disabled on touch / coarse-pointer devices.
 */
export default function ViewCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const points = [];
    const MAX = 28;
    let mx = w / 2;
    let my = h / 2;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      points.push({ x: mx, y: my });
      if (points.length > MAX) points.shift();

      // tapering ribbon — thin/faint at the tail, thick/bright at the head
      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const prev = points[i - 1];
        const t = i / points.length;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 77, 0, ${t * 0.85})`;
        ctx.lineWidth = t * 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      // glowing head
      if (points.length) {
        const head = points[points.length - 1];
        ctx.beginPath();
        ctx.fillStyle = '#FF4D00';
        ctx.shadowColor = '#FF4D00';
        ctx.shadowBlur = 14;
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}