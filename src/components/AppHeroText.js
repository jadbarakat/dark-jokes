import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export const AppHeroText = ({ children, fontWeight = 400, fontSize = 32 }) => {
  const { colors } = useTheme();

  return (
    <Text style={{ fontSize, fontWeight, color: colors.text }}>{children}</Text>
  );
};
