import { useState } from 'react';
import { ADMIN_CODE, PROGRAM_CODES, ALL_PROGRAM_IDS } from './accessCodes';

const STORAGE_KEY = 'btcali-access';

function loadAccess() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveAccess(data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useAccessCodes() {
  const [access, setAccess] = useState(loadAccess);

  const isAdmin = access.isAdmin === true;
  const unlockedPrograms = isAdmin
    ? ALL_PROGRAM_IDS
    : (access.unlockedPrograms || []);

  const isProgramUnlocked = (programId) =>
    isAdmin || unlockedPrograms.includes(programId);

  const unlockCode = (code) => {
    const trimmed = code.trim().toUpperCase();

    if (trimmed === ADMIN_CODE) {
      const next = { ...access, isAdmin: true, unlockedPrograms: ALL_PROGRAM_IDS };
      saveAccess(next);
      setAccess(next);
      return 'admin';
    }

    // Check custom user codes (case-insensitive)
    const matchKey = Object.keys(PROGRAM_CODES).find(
      (k) => k.toUpperCase() === trimmed
    );
    if (matchKey) {
      const programs = PROGRAM_CODES[matchKey];
      const existing = access.unlockedPrograms || [];
      const merged = [...new Set([...existing, ...programs])];
      const next = { ...access, unlockedPrograms: merged };
      saveAccess(next);
      setAccess(next);
      return 'user';
    }

    return null;
  };

  return { isAdmin, unlockedPrograms, isProgramUnlocked, unlockCode };
}