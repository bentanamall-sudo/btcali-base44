/**
 * MemberContext — manages premium member session state.
 * After activation, members log in with email/password via Base44 auth.
 * Their MemberAccount record links: email → access_code → student program.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { callFunction } from '@/lib/callFunction';

const MemberContext = createContext(null);

// Keys used by old access-code-only system — clear them to force re-auth
const OLD_STORAGE_KEYS = [
  'btcali_access_code', 'btcali_member', 'accessCode', 'member_access',
  'btcali_code', 'access_code', 'student_code',
];

export function MemberProvider({ children }) {
  const [memberAccount, setMemberAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    // Always clear old localStorage keys from the legacy system
    try {
      OLD_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
      sessionStorage.removeItem('btcali_access'); // old session key
    } catch {}

    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        setMemberAccount(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const data = await callFunction('getMemberAccount', {});
      setMemberAccount(data?.account || null);
      setIsAdmin(data?.is_admin === true);
    } catch {
      // Network error or not logged in — treat as guest
      setMemberAccount(null);
      setIsAdmin(false);
    }

    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const refresh = () => load();

  const logout = () => {
    setMemberAccount(null);
    setIsAdmin(false);
    // Use hash route origin so we never 404 on the custom domain
    base44.auth.logout(window.location.origin + '/');
  };

  const isMember = isAdmin || !!memberAccount;
  const accessCode = memberAccount?.access_code || null;
  const studentName = memberAccount?.student_name || null;

  return (
    <MemberContext.Provider value={{ memberAccount, isAdmin, isMember, loading, accessCode, studentName, refresh, logout }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error('useMember must be used within MemberProvider');
  return ctx;
}