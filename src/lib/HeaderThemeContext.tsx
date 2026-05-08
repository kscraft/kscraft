'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface HeaderThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const HeaderThemeContext = createContext<HeaderThemeContextType | undefined>(undefined);

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return (
    <HeaderThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const context = useContext(HeaderThemeContext);
  if (context === undefined) {
    throw new Error('useHeaderTheme must be used within a HeaderThemeProvider');
  }
  return context;
}
