/**
 * AuthGuard — route protection.
 * requireAuth=true  → unauthenticated → platform login (returns to /activate)
 * requireMember=true → authenticated but no code → /activate
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

  const stillLoading = isLoadingAuth || memberLoading;

  useEffect(() => {
    if (stillLoading) return;

    if (requireAuth && !isAuthenticated) {
      // Return to /activate after login — activate auto-skips to /my-program if already linked
      base44.auth.redirectToLogin(window.location.origin + '/#/activate');
      return;
    }

    if (requireMember && isAuthenticated && !isMember && !isAdmin) {
      navigate('/activate', { replace: true });
    }
  }, [stillLoading, isAuthenticated, isMember, isAdmin]);

  if (stillLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return null;
  if (requireMember && isAuthenticated && !isMember && !isAdmin) return null;

  return children;
}