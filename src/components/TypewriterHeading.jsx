import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * A heading that typewriter-animates when it enters the viewport.
 * Re-triggers each time it enters (once=false).
 * tag: 'h1'|'h2'|'h3' etc. className applied to the element.
 */
export default function TypewriterHeading({
  text,
  tag: Tag = 'h2',
  className = '',
  speed = 38,
  highlightWords = [], // words to wrap in gradient-text
  cursor = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    timerRef.current = setTimeout(tick, 80);
    return () => clearTimeout(timerRef.current);
  }, [inView, text, speed]);

  // Highlight specific words in gradient-text
  const renderText = (str) => {
    if (!highlightWords.length) return str;
    const parts = str.split(new RegExp(`(${highlightWords.join('|')})`, 'g'));
    return parts.map((part, i) =>
      highlightWords.includes(part)
        ? <span key={i} className="gradient-text">{part}</span>
        : part
    );
  };

  return (
    <Tag ref={ref} className={className}>
      {renderText(displayed)}
      {cursor && !done && (
        <span
          className="inline-block w-0.5 h-[0.85em] ml-0.5 align-middle rounded-sm"
          style={{
            background: '#4F9DFF',
            animation: 'cursorBlink 0.75s step-end infinite',
            verticalAlign: 'middle',
          }}
        />
      )}
    </Tag>
  );
}