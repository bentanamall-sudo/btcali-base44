import { useState, useEffect } from 'react';

const THEME_KEY = 'btcali-theme';

const themeClasses = {
  carbon: '',
  neon: 'theme-neon',
  gold: 'theme-gold',
  ice: 'theme-ice',
};

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'carbon';
  });

  useEffect(() => {
    const root = document.documentElement;
    Object.values(themeClasses).forEach(cls => {
      if (cls) root.classList.remove(cls);
    });
    const cls = themeClasses[theme];
    if (cls) root.classList.add(cls);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return { theme, setTheme: setThemeState };
}

export const themes = [
  { id: 'carbon', name: 'BTCALI Elite', icon: '🥇' },
  { id: 'neon',   name: 'Futuristic',   icon: '🟣' },
  { id: 'gold',   name: 'Matte Black',  icon: '⚫' },
  { id: 'ice',    name: 'Light',        icon: '🤍' },
];