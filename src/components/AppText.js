import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export const AppText = ({ children, color, fontSize = 18 }) => {
  const { colors } = useTheme();

  return (
    <Text style={{ fontSize, color: color ? color : colors.text }}>
      {children}
    </Text>
  );
};
