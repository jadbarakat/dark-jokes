import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { FavouritesScreen } from "../screens/FavouritesScreen";
import { AppHeader } from "./AppHeader";

import { Feather } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export const RootNav = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <AppHeader />,
        drawerActiveTintColor: colors.primary,
        drawerType: "slide",
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerIcon: ({ focused, color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="favourites"
        options={{
          title: "Favourites",
          drawerIcon: ({ focused, color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
        component={FavouritesScreen}
      />
    </Drawer.Navigator>
  );
};
