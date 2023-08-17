import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { AppThemeContext } from "./context/AppThemeContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNav } from "./navigation/RootNav";

export const DarkJokesApp = () => {
  const theme = useContext(AppThemeContext);
  const isDark = theme === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNav />
      <StatusBar style={isDark ? "light" : "dark"} />
    </GestureHandlerRootView>
  );
};
