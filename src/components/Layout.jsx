import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '@/lib/useTheme';

export default function Layout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-16">
        <Outlet context={{ theme, setTheme }} />
      </main>
    </div>
  );
}