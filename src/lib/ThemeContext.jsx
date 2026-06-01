// Theme system simplified — single gold/bronze theme only.
// Logo and theme context kept for backwards compatibility.

import { createContext, useContext } from 'react';

export const LOGO_URL = 'https://media.base44.com/images/public/69fd635623a9368c153045ad/ed73dd1f3_ChatGPTImageJun2202609_10_56AM.png';

const ThemeContext = createContext({ theme: 'carbon', logoSrc: LOGO_URL });

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme: 'carbon', logoSrc: LOGO_URL }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const themes = [{ id: 'carbon', name: 'Elite Gold', icon: '🥇' }];