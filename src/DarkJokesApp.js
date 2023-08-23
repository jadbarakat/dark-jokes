import { StatusBar } from "expo-status-bar";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNav } from "./navigation/RootNav";
import { NavigationContainer } from "@react-navigation/native";
import { AppDarkTheme, AppLightTheme } from "./styles/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";

import { themeAtom } from "./state/globalStates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const DarkJokesApp = () => {
  const [theme] = useAtom(themeAtom);
  const isDark = theme === "dark";

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={isDark ? AppDarkTheme : AppLightTheme}>
          <BottomSheetModalProvider>
            <RootNav />
          </BottomSheetModalProvider>
        </NavigationContainer>
        <StatusBar style={isDark ? "light" : "dark"} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
