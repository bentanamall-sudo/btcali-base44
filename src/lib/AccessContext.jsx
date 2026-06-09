import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ADMIN_CODE, MEMBER_CODES, ALL_PROGRAM_IDS } from './accessCodes';

const STORAGE_KEY = 'btcali-access';

function loadAccess() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveAccess(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const AccessContext = createContext(null);

export function AccessProvider({ children }) {
  const [access, setAccess] = useState(loadAccess);

  useEffect(() => {
    const handler = () => setAccess(loadAccess());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const isAdmin = access.isAdmin === true;
  const unlockedPrograms = isAdmin ? ALL_PROGRAM_IDS : (access.unlockedPrograms || []);
  const isMember = isAdmin || unlockedPrograms.length > 0;

  const isProgramUnlocked = useCallback(
    (programId) => isAdmin || unlockedPrograms.includes(programId),
    [isAdmin, unlockedPrograms]
  );

  const unlockCode = useCallback((code) => {
    const trimmed = code.trim().toUpperCase();

    if (trimmed === ADMIN_CODE.toUpperCase()) {
      const next = { ...access, isAdmin: true, unlockedPrograms: ALL_PROGRAM_IDS };
      saveAccess(next);
      setAccess(next);
      return 'admin';
    }

    if (MEMBER_CODES.map(c => c.toUpperCase()).includes(trimmed)) {
      const next = { ...access, unlockedPrograms: ALL_PROGRAM_IDS, memberCode: trimmed };
      saveAccess(next);
      setAccess(next);
      return 'member';
    }

    return null;
  }, [access]);

  return (
    <AccessContext.Provider value={{ isAdmin, isMember, unlockedPrograms, isProgramUnlocked, unlockCode }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccessCodes() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccessCodes must be used within AccessProvider');
  return ctx;
}