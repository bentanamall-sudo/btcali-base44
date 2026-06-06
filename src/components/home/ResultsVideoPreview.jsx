import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WINS_VIDEOS } from '../../pages/ProvenResults';

// Show first 6 wins videos as silent autoplay previews — click goes to /results
const PREVIEW = WINS_VIDEOS.slice(0, 6);

function PreviewVideo({ src, thumb }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.preload = 'auto';
    const onCanPlay = () => setReady(true);
    v.addEventListener('canplay', onCanPlay, { once: true });
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <Link to="/results" className="relative block rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
      style={{ width: 'clamp(100px, 18vw, 160px)', aspectRatio: '9/16' }}>
      {/* Thumbnail base */}
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
      {/* Silent autoplay video */}
      <video
        ref={ref}
        src={src}
        muted loop playsInline autoPlay preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 2 }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{ border: '1.5px solid hsl(var(--glow-primary)/0.3)' }} />
    </Link>
  );
}

export default function ResultsVideoPreview() {
  return (
    <div className="flex gap-3 justify-center flex-wrap sm:flex-nowrap overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
      {PREVIEW.map((v, i) => (
        <PreviewVideo key={i} src={v.src} thumb={v.thumb} />
      ))}
    </div>
  );
}