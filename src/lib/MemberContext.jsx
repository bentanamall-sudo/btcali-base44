/**
 * MemberContext — access-code session.
 * On load:
 *   1. If user is authenticated (Base44 login), check getMemberAccount to restore code.
 *   2. Fall back to localStorage for non-logged-in or cached sessions.
 * Codes are validated ONLY on the backend. No codes stored or compared in frontend.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const MemberContext = createContext(null);
const STORAGE_KEY = 'btcali_code_v4';

function clearLegacyKeys() {
  try {
    [
      'btcali_access_code','btcali_member','accessCode','member_access',
      'btcali_code','access_code','student_code','btcali_access',
      'btcali_code_v2','btcali_code_v3',
    ].forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
    sessionStorage.removeItem('btcali-pending-code');
    sessionStorage.removeItem('btcali_access');
  } catch {}
}

export function MemberProvider({ children }) {
  const [accessCode, setAccessCode] = useState(null);
  const [studentName, setStudentName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearLegacyKeys();
    restore();
  }, []);

  const restore = async () => {
    try {
      // 1. Try to restore from authenticated account first (most secure)
      const isAuthed = await base44.auth.isAuthenticated();
      if (isAuthed) {
        const res = await base44.functions.invoke('getMemberAccount', {});
        const data = res?.data;
        if (data?.is_admin) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }
        if (data?.account?.access_code) {
          const code = data.account.access_code;
          setAccessCode(code);
          setStudentName(data.account.student_name || null);
          try { localStorage.setItem(STORAGE_KEY, code); } catch {}
          setLoading(false);
          return;
        }
      }
    } catch {
      // Auth check failed — fall through to localStorage
    }

    // 2. Fall back to localStorage
    const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } })();
    if (!saved) { setLoading(false); return; }

    try {
      const res = await base44.functions.invoke('validateAccessCode', { access_code: saved });
      const data = res?.data;
      if (data?.valid) {
        setAccessCode(saved);
        setStudentName(data.studentName);
        setIsAdmin(!!data.isAdmin);
      } else {
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
      }
    } catch {
      // Network error — keep session optimistically
    }
    setLoading(false);
  };

  // Returns Promise<{ valid, error, studentName, isAdmin }>
  const login = async (code) => {
    const c = (code || '').trim().toUpperCase();
    if (!c) return { valid: false, error: 'Please enter your access code.' };

    try {
      const res = await base44.functions.invoke('validateAccessCode', { access_code: c });
      const data = res?.data;
      if (!data?.valid) return { valid: false, error: data?.error || 'Invalid access code.' };

      try { localStorage.setItem(STORAGE_KEY, c); } catch {}
      setAccessCode(c);
      setStudentName(data.studentName);
      setIsAdmin(!!data.isAdmin);
      return { valid: true, isAdmin: !!data.isAdmin, studentName: data.studentName };
    } catch {
      return { valid: false, error: 'Could not verify code. Please check your connection and try again.' };
    }
  };

  const logout = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setAccessCode(null);
    setStudentName(null);
    setIsAdmin(false);
  };

  const isMember = isAdmin || !!accessCode;

  return (
    <MemberContext.Provider value={{ accessCode, studentName, isAdmin, isMember, loading, login, logout }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error('useMember must be used within MemberProvider');
  return ctx;
}