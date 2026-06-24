/**
 * MemberContext — access-code session.
 * Codes are validated ONLY on the backend. No codes stored in frontend.
 * localStorage stores only the verified code string after backend confirmation.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const MemberContext = createContext(null);

// Storage key — bump version to invalidate all sessions
const STORAGE_KEY = 'btcali_code_v4';

function clearAllLegacyKeys() {
  try {
    const legacyKeys = [
      'btcali_access_code','btcali_member','accessCode','member_access',
      'btcali_code','access_code','student_code','btcali_access',
      'btcali_code_v2','btcali_code_v3',
    ];
    legacyKeys.forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
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
    clearAllLegacyKeys();
    // Re-validate any saved code against the backend on load
    const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } })();
    if (!saved) { setLoading(false); return; }

    base44.functions.invoke('validateAccessCode', { access_code: saved })
      .then(res => {
        const data = res?.data;
        if (data?.valid) {
          setAccessCode(saved);
          setStudentName(data.studentName);
          setIsAdmin(!!data.isAdmin);
        } else {
          try { localStorage.removeItem(STORAGE_KEY); } catch {}
        }
      })
      .catch(() => {
        // Network error — keep session optimistically so user isn't logged out on bad connection
        // We'll still hold the code; worst case they see a program load error
      })
      .finally(() => setLoading(false));
  }, []);

  // Returns a Promise<{ valid, error, studentName, isAdmin }>
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
    } catch (err) {
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