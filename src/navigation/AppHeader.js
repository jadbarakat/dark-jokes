import React from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { AppText } from "../components/AppText";
import { AppIconButton } from "../components/AppIconButton";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const AppHeader = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const isAndroid = Platform.OS === "android";

  return (
    <SafeAreaView
      style={{
        paddingTop: isAndroid ? STATUS_BAR_HEIGHT : 0,
      }}
    >
      <AppIconButton
        icon={<Feather name="menu" size={24} color={colors.text} />}
        onPress={() => navigation.openDrawer()}
      />
    </SafeAreaView>
  );
};
