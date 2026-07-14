import { Outlet } from 'react-router-dom';
import CinemaNavbar from '@/components/cinema/CinemaNavbar';
import ErrorBoundary from './ErrorBoundary';
import ScrollProgress from '@/lib/motion/ScrollProgress';
import SmoothScroll from '@/lib/motion/SmoothScroll';
import CustomCursor from '@/lib/motion/CustomCursor';

export default function Layout() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <CustomCursor />
        <ScrollProgress />
        <CinemaNavbar />
        <main>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </SmoothScroll>
  );
}