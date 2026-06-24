import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { AccessProvider } from '@/lib/AccessContext';
import { MemberProvider } from '@/lib/MemberContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import AthleteScan from './pages/AthleteScan';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import SkillLibrary from './pages/SkillLibrary.jsx';
import Programs from './pages/Programs';
import CoachingApply from './pages/CoachingApply.jsx';
import AdminAnalytics from './pages/AdminAnalytics';
import Dashboard from './pages/Dashboard';
import ProvenResults from './pages/ProvenResults.jsx';
import AICoach from './pages/AICoach';
import CoachDashboard from './pages/CoachDashboard';
import AdminPayments from './pages/AdminPayments';
import ProgramBuilder from './pages/ProgramBuilder';
import AthleteDiagnostic from './pages/AthleteDiagnostic';
import AdminDiagnostics from './pages/AdminDiagnostics';
import SkillLibraryCategory from './pages/SkillLibraryCategory';

import PlanchePrograms from './pages/programs/PlanchePrograms';
import FrontLeverPrograms from './pages/programs/FrontLeverPrograms';
import BrandIdentity from './pages/BrandIdentity';
import Members from './pages/Members.jsx';
import SkillLibrarySection from './pages/SkillLibrarySection';
import MyProgram from './pages/MyProgram';
import AdminPrograms from './pages/AdminPrograms';
import ActivateAccount from './pages/ActivateAccount.jsx';
import Login from './pages/Login.jsx';
import AuthGuard from './components/AuthGuard.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<AthleteDiagnostic />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/:tutorialId" element={<TutorialDetail />} />
          {/* Legacy guide routes removed — Skill Library is single source of truth */}
          <Route path="/programs/planche-programs" element={<PlanchePrograms />} />
          <Route path="/programs/front-lever-programs" element={<FrontLeverPrograms />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/apply" element={<CoachingApply />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results" element={<ProvenResults />} />
          <Route path="/pricing" element={<CoachingApply />} />
          <Route path="/1-on-1-coaching" element={<CoachingApply />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/coach/programs" element={<ProgramBuilder />} />
          <Route path="/diagnostic" element={<AthleteDiagnostic />} />
          <Route path="/members" element={<Members />} />
          <Route path="/btcali-members" element={<Members />} />
          <Route path="/skills" element={<SkillLibrary />} />
          <Route path="/skills/free" element={<SkillLibrarySection sectionId="free" />} />
          <Route path="/skills/premium" element={<SkillLibrarySection sectionId="premium" />} />
          <Route path="/skills/:categoryId" element={<SkillLibraryCategory />} />
          <Route path="/admin/diagnostics" element={<AdminDiagnostics />} />
          <Route path="/brand" element={<BrandIdentity />} />
          <Route path="/my-program" element={
            <AuthGuard requireAuth requireMember>
              <MyProgram />
            </AuthGuard>
          } />
          <Route path="/activate" element={<ActivateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AccessProvider>
        <MemberProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </MemberProvider>
      </AccessProvider>
    </AuthProvider>
  )
}

export default App