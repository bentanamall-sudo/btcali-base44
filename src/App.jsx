import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import AthleteScan from './pages/AthleteScan';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import SkillLibrary from './pages/SkillLibrary';
import Dashboard from './pages/Dashboard';
import ProvenResults from './pages/ProvenResults';
import Pricing from './pages/Pricing';
import AICoach from './pages/AICoach';
import CoachDashboard from './pages/CoachDashboard';
import AdminPayments from './pages/AdminPayments';
import ProgramBuilder from './pages/ProgramBuilder';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<AthleteScan />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:tutorialId" element={<TutorialDetail />} />
        <Route path="/skills" element={<SkillLibrary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<ProvenResults />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ai-coach" element={<AICoach />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/coach/programs" element={<ProgramBuilder />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App