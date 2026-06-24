/**
 * MemberContext — stub that always returns non-member state.
 * Authentication has been removed. Premium content is locked visually only.
 */
import { createContext, useContext } from 'react';

const MemberContext = createContext(null);

export function MemberProvider({ children }) {
  return (
    <MemberContext.Provider value={{
      accessCode: null,
      studentName: null,
      isAdmin: false,
      isMember: false,
      loading: false,
      login: async () => ({ valid: false }),
      logout: () => {},
    }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error('useMember must be used within MemberProvider');
  return ctx;
}