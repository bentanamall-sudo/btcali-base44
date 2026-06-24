/**
 * useAccessCodes — stub. Always returns non-member, non-admin state.
 * Authentication has been removed.
 */
export function useAccessCodes() {
  return {
    isAdmin: false,
    isMember: false,
    unlockCode: () => false,
  };
}