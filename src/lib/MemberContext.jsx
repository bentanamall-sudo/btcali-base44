/**
 * MemberContext — replaces the old localStorage-only AccessContext for premium access.
 * After activation, members log in with email/password via Base44 auth.
 * Their MemberAccount record links their email → access_code → student program.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { callFunction } from '@/lib/callFunction';

const MemberContext = createContext(null);

export function MemberProvider({ children }) {
  const [memberAccount, setMemberAccount] = useState(null); // { access_code, student_name, ... }
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) { setLoading(false); return; }

      const data = await callFunction('getMemberAccount', {});
      setMemberAccount(data?.account || null);
      setIsAdmin(data?.is_admin === true);
    } catch {
      // not logged in or network error — stay as guest
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const refresh = () => load();

  const logout = () => {
    setMemberAccount(null);
    setIsAdmin(false);
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