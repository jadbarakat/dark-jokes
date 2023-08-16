import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { HomeScreen } from "./screens/HomeScreen";
import { useContext } from "react";
import { AppThemeContext } from "./context/AppThemeContext";

import { AppDarkTheme, AppLightTheme } from "./styles/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export const DarkJokesApp = () => {
  const theme = useContext(AppThemeContext);
  const isDark = theme === "dark";

  return (
    <NavigationContainer theme={isDark ? AppDarkTheme : AppLightTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <StatusBar style={isDark ? "light" : "dark"} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
