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
import Programs from './pages/Programs';
import CoachingApply from './pages/CoachingApply';
import AdminAnalytics from './pages/AdminAnalytics';
import Dashboard from './pages/Dashboard';
import ProvenResults from './pages/ProvenResults';
import Pricing from './pages/Pricing';
import AICoach from './pages/AICoach';
import CoachDashboard from './pages/CoachDashboard';
import AdminPayments from './pages/AdminPayments';
import ProgramBuilder from './pages/ProgramBuilder';
import Purchase from './pages/Purchase';
import AthleteDiagnostic from './pages/AthleteDiagnostic';
import AdminDiagnostics from './pages/AdminDiagnostics';
import SkillLibraryCategory from './pages/SkillLibraryCategory';
import HandstandGuide from './pages/tutorials/HandstandGuide';
import LSitHandstandGuide from './pages/tutorials/LSitHandstandGuide';
import PlancheGuide from './pages/tutorials/PlancheGuide';
import PlanchePrograms from './pages/programs/PlanchePrograms';
import FrontLeverPrograms from './pages/programs/FrontLeverPrograms';
import BrandIdentity from './pages/BrandIdentity';

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

  // Auth errors ignored — app is publicly accessible
  // if (authError) { ... }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<AthleteDiagnostic />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:tutorialId" element={<TutorialDetail />} />
        <Route path="/tutorials/handstand-beginner-guide" element={<HandstandGuide />} />
        <Route path="/tutorials/l-sit-to-handstand-guide" element={<LSitHandstandGuide />} />
        <Route path="/tutorials/planche-conditioning-guide" element={<PlancheGuide />} />
        <Route path="/programs/planche-programs" element={<PlanchePrograms />} />
        <Route path="/programs/front-lever-programs" element={<FrontLeverPrograms />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/apply" element={<CoachingApply />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<ProvenResults />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ai-coach" element={<AICoach />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/coach/programs" element={<ProgramBuilder />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/diagnostic" element={<AthleteDiagnostic />} />
        <Route path="/skills" element={<SkillLibrary />} />
        <Route path="/skills/:categoryId" element={<SkillLibraryCategory />} />
        <Route path="/admin/diagnostics" element={<AdminDiagnostics />} />
        <Route path="/brand" element={<BrandIdentity />} />
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