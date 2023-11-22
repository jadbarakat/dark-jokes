import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNav } from "./navigation/RootNav";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import { isDarkAtom, isOnboardingAtom, tintAtom } from "./state/globalStates";
import { AppTheme } from "./styles/AppTheme";
import { AppOnboarding } from "./components/AppOnboarding";

export const LaughHubApp = () => {
  const [isDark] = useAtom(isDarkAtom);
  const [tint] = useAtom(tintAtom);
  const [isOnboarding, setIsOnBoarding] = useAtom(isOnboardingAtom);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={AppTheme(tint)}>
          <BottomSheetModalProvider>
            {isOnboarding ? <AppOnboarding /> : <RootNav />}
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
