import {createContext, useContext, useState } from 'react';
import { light, dark, mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      <ApplicationProvider theme={theme === 'light' ? light : dark} mapping={mapping}> 
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};
