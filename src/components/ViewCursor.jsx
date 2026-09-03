import { useEffect, useRef } from 'react';

/**
 * Trailing circular "View" badge cursor.
 * Appears over elements with the `data-view-cursor` attribute.
 * Desktop pointer only — disabled on touch devices.
 */
export default function ViewCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Skip on touch / small screens
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const el = e.target.closest('[data-view-cursor]');
      if (el && !cursor.classList.contains('active')) {
        cursor.classList.add('active');
      } else if (!el && cursor.classList.contains('active')) {
        cursor.classList.remove('active');
      }
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={cursorRef} className="view-cursor" aria-hidden="true">
      View
    </div>
  );
}