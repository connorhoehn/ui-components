import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', toggleTheme: () => {} });

const STORAGE_KEY = 'wsg-theme';

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch { /* noop */ }
    return 'light';
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Memoised so a re-render of whatever renders <ColorSchemeProvider> (a
  // router transition, a parent state change) doesn't hand every
  // `useColorScheme()` consumer a fresh object and re-render all of them.
  // `toggleTheme` is already identity-stable, so this only changes when
  // `theme` actually changes — which is exactly when consumers must re-render.
  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorScheme() {
  return useContext(ThemeContext);
}
