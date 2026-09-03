import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';
import ScrollProgress from './ScrollProgress';
import ViewCursor from './ViewCursor';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ViewCursor />
      <Navbar />
      <main className="pt-16">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}