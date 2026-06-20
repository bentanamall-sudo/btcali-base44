import { useState, useEffect } from 'react';

/**
 * TypewriterText — renders text character by character.
 * @param {string} text - Full text to type
 * @param {string} className - CSS classes on the wrapper span
 * @param {number} delay - Seconds before typing starts (default 0)
 * @param {number} speed - Ms per character (default 42)
 * @param {boolean} showCursor - Show blinking cursor (default true)
 */
export default function TypewriterText({ text, className = '', delay = 0, speed = 42, showCursor = true }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!active) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && (
        <span
          className="inline-block w-[2px] h-[0.85em] align-middle ml-0.5 rounded-sm"
          style={{
            background: 'hsl(44 85% 52%)',
            animation: 'cursorBlink 0.8s ease-in-out infinite',
            boxShadow: '0 0 6px hsl(44 85% 52% / 0.6)',
          }}
        />
      )}
    </span>
  );
}