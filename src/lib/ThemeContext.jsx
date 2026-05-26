import { createContext, useContext, useState, useEffect } from 'react';

const THEME_KEY = 'btcali-theme';

// True-transparent PNG logos — exact uploads
export const THEME_LOGOS = {
  carbon: 'https://media.base44.com/images/public/69fd635623a9368c153045ad/52e275c9b_ChatGPTImageMay26202610_06_47AM.png',
  neon:   'https://media.base44.com/images/public/69fd635623a9368c153045ad/2a285b96a_btcali-purple-true-transparent.png',
  ice:    'https://media.base44.com/images/public/69fd635623a9368c153045ad/707977bbc_btcali-light-true-transparent.png',
};

const themeClasses = {
  carbon: '',
  neon: 'theme-neon',
  ice: 'theme-ice',
};

export const themes = [
  { id: 'carbon', name: 'Elite Gold',   icon: '🥇' },
  { id: 'neon',   name: 'Futuristic',   icon: '🟣' },
  { id: 'ice',    name: 'Light',        icon: '🤍' },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    // remap old 'gold' key to 'carbon'
    return (saved === 'gold' ? 'carbon' : saved) || 'carbon';
  });

  const setTheme = (t) => {
    setThemeState(t);
    const root = document.documentElement;
    Object.values(themeClasses).forEach(cls => { if (cls) root.classList.remove(cls); });
    const cls = themeClasses[t];
    if (cls) root.classList.add(cls);
    localStorage.setItem(THEME_KEY, t);
  };

  // Apply on mount
  useEffect(() => {
    const root = document.documentElement;
    Object.values(themeClasses).forEach(cls => { if (cls) root.classList.remove(cls); });
    const cls = themeClasses[theme];
    if (cls) root.classList.add(cls);
  }, []);

  // Preload all logos
  useEffect(() => {
    Object.values(THEME_LOGOS).forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, logoSrc: THEME_LOGOS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}