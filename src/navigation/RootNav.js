import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { FavouritesScreen } from "../screens/FavouritesScreen";
import { AppHeader } from "./AppHeader";

import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { AppIconButton } from "../components/AppIconButton";

const Drawer = createDrawerNavigator();

export const RootNav = () => {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const cancelIcon = (
    <AppIconButton
      icon={<Feather name="x" size={24} color={colors.text} />}
      onPress={() => setIsEditing(false)}
    />
  );

  const editIcon = (
    <AppIconButton
      icon={<Feather name="trash-2" size={24} color={colors.text} />}
      onPress={() => setIsEditing(true)}
    />
  );

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="laugh" color={color} size={size} />
          ),
          header: () => <AppHeader />,
          drawerActiveTintColor: colors.primary,
          drawerType: "slide",
          drawerLabelStyle: {
            fontSize: 16,
            marginLeft: -16,
          },
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="favourites"
        options={{
          title: "Favourites",
          drawerIcon: ({ color, size }) => (
            <Feather name="star" color={color} size={size} />
          ),
          header: () => (
            <AppHeader
              headerShown
              iconRight={isEditing ? cancelIcon : editIcon}
            />
          ),
          drawerActiveTintColor: colors.primary,
          drawerType: "slide",
          drawerLabelStyle: {
            fontSize: 16,
            marginLeft: -16,
          },
        }}
      >
        {() => (
          <FavouritesScreen isEditing={isEditing} setIsEditing={setIsEditing} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
