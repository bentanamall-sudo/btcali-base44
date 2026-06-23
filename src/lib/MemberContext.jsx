/**
 * MemberContext — pure access-code-only member session.
 * No email/password. No backend auth. Code stored in localStorage.
 */
import { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext(null);

const STORAGE_KEY = 'btcali_code_v2';
const ADMIN_CODE = 'BTCALI-ADMIN-84X7P';

// All valid student access codes → student name
const VALID_CODES = {
  'HENRY-X7K91P':    'Henry',
  'HAEJUN-M4R82Q':   'Haejun',
  'ANDEAS-T9V61L':   'Andeas',
  'TANUSH-P3N74X':   'Tanush',
  'RYAN-K8Q52M':     'Ryan',
  'JULIAN-W6H93R':   'Julian',
  'MACK-F2T81Z':     'Mack',
  'MARCUS-L7P64N':   'Marcus',
  'ALISTAIR-D5X29K': 'Alistair',
  'JAYDEN-R8M41V':   'Jayden',
  'LUKE-B9Q73T':     'Luke',
  'GAON-H4K86P':     'Gaon',
  'SEAN-Z2N58L':     'Sean',
  'DANIEL-Y7R34M':   'Daniel',
  'MATHEW-C8P61Q':   'Mathew',
  'HAYDEN-J5V92T':   'Hayden',
  'HUGO-N4T87X':     'Hugo',
  'CEDRICK-Q6L53R':  'Cedrick',
  'LENNON-X9M72K':   'Lennon',
};

// Old codes that are permanently disabled
const OLD_CODES = new Set([
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128',
  'JULIAN194','MACK136','MARCUS181','ALISTAIR149','JAYDEN165',
  'LUKE121','GAON176','SEAN138','DANIEL192','MATHEW154',
  'HAYDEN167','HUGO144','CEDRICK185','LENNON184','BTCALI999',
]);

export function validateCode(code) {
  const c = (code || '').trim().toUpperCase();
  if (!c) return { valid: false, error: 'Please enter your access code.' };
  if (OLD_CODES.has(c)) return { valid: false, error: 'This code is no longer valid. Contact BTCALI for your new secure code.' };
  if (c === ADMIN_CODE) return { valid: true, isAdmin: true, studentName: 'Admin', accessCode: c };
  if (VALID_CODES[c]) return { valid: true, isAdmin: false, studentName: VALID_CODES[c], accessCode: c };
  return { valid: false, error: 'Invalid access code. Check your code and try again.' };
}

function clearAllLegacyKeys() {
  try {
    const legacyKeys = [
      'btcali_access_code','btcali_member','accessCode','member_access',
      'btcali_code','access_code','student_code','btcali_access',
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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const result = validateCode(saved);
        if (result.valid) {
          setAccessCode(result.accessCode);
          setStudentName(result.studentName);
          setIsAdmin(result.isAdmin);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {}
    setLoading(false);
  }, []);

  const login = (code) => {
    const result = validateCode(code);
    if (!result.valid) return result;
    try { localStorage.setItem(STORAGE_KEY, result.accessCode); } catch {}
    setAccessCode(result.accessCode);
    setStudentName(result.studentName);
    setIsAdmin(result.isAdmin);
    return result;
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