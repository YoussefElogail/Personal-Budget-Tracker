// Importing necessary React hooks and components
import { createContext, useContext, useState } from 'react';

// Creating a context for managing theme state
const ThemeContext = createContext(null);

// ThemeContextProvider component for providing the theme state to the application
export const ThemeContextProvider = ({ children }) => {
  // Using useState to manage the theme state, initializing it with the value from localStorage or defaulting to "light"
  const [toggleTheme, setToggleTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  // Providing the theme state to the components wrapped inside this context provider
  return (
    <ThemeContext.Provider value={{ toggleTheme, setToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the theme context
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
