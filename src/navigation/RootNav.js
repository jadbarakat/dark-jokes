import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer, useTheme } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { FavouritesScreen } from "../screens/FavouritesScreen";
import { AppThemeContext } from "../context/AppThemeContext";
import { AppDarkTheme, AppLightTheme } from "../styles/theme";
import { AppHeader } from "./AppHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const RootNav = () => {
  const theme = useContext(AppThemeContext);
  const isDark = theme === "dark";

  return (
    <NavigationContainer theme={isDark ? AppDarkTheme : AppLightTheme}>
      <BottomSheetModalProvider>
        <Drawer.Navigator screenOptions={{ header: () => <AppHeader /> }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Favourites" component={FavouritesScreen} />
        </Drawer.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
