import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNav } from "./navigation/RootNav";
import { AppDarkTheme, AppLightTheme } from "./styles/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import { themeAtom, tintAtom } from "./state/globalStates";
import { AppTheme } from "./styles/AppTheme";

export const DarkJokesApp = () => {
  const [theme] = useAtom(themeAtom);
  const [tint] = useAtom(tintAtom);
  const isDark = theme === "dark";

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={AppTheme(tint)}>
          <BottomSheetModalProvider>
            <RootNav />
          </BottomSheetModalProvider>
        </NavigationContainer>
        <StatusBar
          translucent
          animated={true}
          style={isDark ? "light" : "dark"}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
