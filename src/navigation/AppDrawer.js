import React from "react";
import { Text, View } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AppText } from "../components/AppText";
import { useTheme } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

export const AppDrawer = (props) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === "dark";
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView contentContainerStyle={{}} {...props}>
      <DrawerItemList {...props} />
      <View
        style={{
          height: 2,
          backgroundColor: colors.border,
          marginTop: 8,
        }}
      ></View>
      <DrawerItem
        label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        icon={({ color }) =>
          isDark ? (
            <Feather name="sun" size={24} color={color} />
          ) : (
            <Feather name="moon" size={24} color={color} />
          )
        }
        labelStyle={{ fontSize: 16, marginLeft: -16 }}
        onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        pressColor={null}
      />
    </DrawerContentScrollView>
  );
};
