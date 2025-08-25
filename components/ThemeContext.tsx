'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme, setTheme: (t: Theme) => void }>({ theme: 'dark', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('abc-theme');
    if (stored === 'dark' || stored === 'light') setTheme(stored);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('abc-theme', theme);
    document.body.style.background = theme === 'dark' ? '#191921' : '#f6f7fb';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
