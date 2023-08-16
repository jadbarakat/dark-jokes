import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const AppThemeContext = createContext();
export const AppThemeUpdateContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);

  useEffect(() => {
    setTheme(scheme);
  }, [scheme]);

  return (
    <AppThemeContext.Provider value={theme}>
      <AppThemeUpdateContext.Provider value={setTheme}>
        {children}
      </AppThemeUpdateContext.Provider>
    </AppThemeContext.Provider>
  );
};
