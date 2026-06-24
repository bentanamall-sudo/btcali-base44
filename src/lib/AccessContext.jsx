/**
 * AccessContext — legacy stub. Code validation has moved to MemberContext + backend.
 * This remains only so existing imports don't break.
 */
import { createContext, useContext } from 'react';
import { ALL_PROGRAM_IDS } from './accessCodes';

const AccessContext = createContext(null);

export function AccessProvider({ children }) {
  return (
    <AccessContext.Provider value={{
      isAdmin: false,
      isMember: false,
      accessCode: null,
      unlockedPrograms: [],
      isProgramUnlocked: () => false,
      unlockCode: () => null,
      clearAccess: () => {},
    }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccessCodes() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccessCodes must be used within AccessProvider');
  return ctx;
}