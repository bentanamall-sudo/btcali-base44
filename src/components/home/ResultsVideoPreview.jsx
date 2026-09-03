import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WINS_VIDEOS } from '../../pages/ProvenResults';

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
    <Link to="/results" className="relative block overflow-hidden cursor-pointer group flex-shrink-0"
      style={{ width: 'clamp(100px, 18vw, 160px)', aspectRatio: '9/16', border: '1px solid #D1D1CB' }}
      data-view-cursor>
      <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" style={{ zIndex: 1 }} />
      <video
        ref={ref}
        src={src}
        muted loop playsInline autoPlay preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 2 }}
      />
      <div className="absolute inset-0 group-hover:bg-black/10 transition-colors z-10" />
    </Link>
  );
}

export default function ResultsVideoPreview() {
  return (
    <div className="flex gap-2 justify-center flex-wrap sm:flex-nowrap overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
      {PREVIEW.map((v, i) => (
        <PreviewVideo key={i} src={v.src} thumb={v.thumb} />
      ))}
    </div>
  );
}