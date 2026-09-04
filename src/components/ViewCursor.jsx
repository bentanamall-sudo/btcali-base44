import { useEffect, useRef } from 'react';

/**
 * Precision reticle cursor — a volt dot that tracks the pointer 1:1
 * and a larger carbon ring that lags behind with eased lerp motion.
 * The ring expands and turns volt over interactive elements.
 * Disabled on touch / coarse-pointer devices.
 */
export default function ViewCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;
    let visible = false;

    const render = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    render();

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.classList.add('visible');
        ring.classList.add('visible');
      }
      const el = e.target.closest('a, button, [data-view-cursor], [role="button"]');
      if (el) {
        ring.classList.add('is-hover');
        dot.classList.add('is-hover');
      } else {
        ring.classList.remove('is-hover');
        dot.classList.remove('is-hover');
      }
    };

    const onLeave = () => {
      visible = false;
      dot.classList.remove('visible');
      ring.classList.remove('visible');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}