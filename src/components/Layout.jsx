import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollIndicator />
      <main className="pt-16">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}