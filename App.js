import { NavigationContainer } from "@react-navigation/native";
import {
  AppThemeContext,
  AppThemeProvider,
} from "./src/context/AppThemeContext";
import { DarkJokesApp } from "./src/DarkJokesApp";
import { useContext } from "react";
import { AppDarkTheme, AppLightTheme } from "./src/styles/theme";

export default function App() {
  return (
    <AppThemeProvider>
      <DarkJokesApp />
    </AppThemeProvider>
  );
}
