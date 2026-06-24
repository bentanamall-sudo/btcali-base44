/**
 * AuthGuard — route protection wrapper.
 *
 * requireAuth=true  → unauthenticated users → /login
 * requireMember=true → authenticated but no access code → /activate
 *
 * While MemberContext is still loading, shows a spinner (avoids flash redirects).
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useMember } from '@/lib/MemberContext';
import { base44 } from '@/api/base44Client';

export default function AuthGuard({ children, requireAuth = false, requireMember = false }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { isMember, isAdmin, loading: memberLoading } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth || memberLoading) return;

    if (requireAuth && !isAuthenticated) {
      base44.auth.redirectToLogin(window.location.origin + '/#/my-program');
      return;
    }

    if (requireMember && isAuthenticated && !isMember && !isAdmin) {
      navigate('/activate', { replace: true });
    }
  }, [isLoadingAuth, memberLoading, isAuthenticated, isMember, isAdmin, requireAuth, requireMember]);

  if (isLoadingAuth || memberLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // While redirecting, render nothing
  if (requireAuth && !isAuthenticated) return null;
  if (requireMember && isAuthenticated && !isMember && !isAdmin) return null;

  return children;
}