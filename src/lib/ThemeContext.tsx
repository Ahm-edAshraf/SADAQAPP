'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { highContrastTheme, theme } from './theme';

type ThemeContextType = {
  isAccessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isAccessibilityMode: false,
  toggleAccessibilityMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem('accessibilityMode');
    if (storedPreference === 'true') {
      setIsAccessibilityMode(true);
      document.documentElement.setAttribute('data-accessibility-mode', 'high-contrast');
    }
  }, []);

  const toggleAccessibilityMode = () => {
    setIsAccessibilityMode((prev) => {
      const newValue = !prev;
      // Store preference
      localStorage.setItem('accessibilityMode', String(newValue));
      
      // Update data attribute for CSS
      if (newValue) {
        document.documentElement.setAttribute('data-accessibility-mode', 'high-contrast');
      } else {
        document.documentElement.removeAttribute('data-accessibility-mode');
      }
      
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
      <ThemeProvider theme={isAccessibilityMode ? highContrastTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 