/**
 * MemberContext — pure access-code-only member session.
 * No email/password. No backend auth. Code stored in localStorage.
 */
import { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext(null);

// Storage key bumped to v4 — forces everyone to re-enter their code
const STORAGE_KEY = 'btcali_code_v4';
const ADMIN_CODE = 'BTCALI-ADMIN-P7X92M';

// All valid student access codes → student name
const VALID_CODES = {
  'HENRY-Q8M47Z':     'Henry',
  'HAEJUN-L3X92V':    'Haejun',
  'ANDEAS-P6T81K':    'Andeas',
  'TANUSH-V9R24M':    'Tanush',
  'RYAN-N5C73Q':      'Ryan',
  'JULIAN-K2W68P':    'Julian',
  'MACK-Z7H31L':      'Mack',
  'MARCUS-T4N95X':    'Marcus',
  'ALISTAIR-B8Q52R':  'Alistair',
  'JAYDEN-X6P19V':    'Jayden',
  'LUKE-M3Z84K':      'Luke',
  'GAON-R7L26T':      'Gaon',
  'SEAN-W9C45N':      'Sean',
  'DANIEL-H2V68Q':    'Daniel',
  'MATHEW-K5X93L':    'Mathew',
  'HAYDEN-P8M41Z':    'Hayden',
  'HUGO-C6T72R':      'Hugo',
  'CEDRICK-L9N35V':   'Cedrick',
  'LENNON-Z4Q86P':    'Lennon',
};

// All permanently disabled/compromised codes
const OLD_CODES = new Set([
  // Generation 1 — original codes
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128',
  'JULIAN194','MACK136','MARCUS181','ALISTAIR149','JAYDEN165',
  'LUKE121','GAON176','SEAN138','DANIEL192','MATHEW154',
  'HAYDEN167','HUGO144','CEDRICK185','LENNON184','BTCALI999',
  // Generation 2 — compromised batch 1
  'RYAN-K8Q52M',
  // Generation 3 — compromised batch 2 (publicly leaked)
  'HENRY-X7K91P','HAEJUN-M4R82Q','ANDEAS-T9V61L','TANUSH-P3N74X',
  'RYAN-V5J38W','JULIAN-W6H93R','MACK-F2T81Z','MARCUS-L7P64N',
  'ALISTAIR-D5X29K','JAYDEN-R8M41V','LUKE-B9Q73T','GAON-H4K86P',
  'SEAN-Z2N58L','DANIEL-Y7R34M','MATHEW-C8P61Q','HAYDEN-J5V92T',
  'HUGO-N4T87X','CEDRICK-Q6L53R','LENNON-X9M72K',
  'BTCALI-ADMIN-84X7P',
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