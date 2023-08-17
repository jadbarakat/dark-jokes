import React, { useContext } from "react";
import { View } from "react-native";
import { AppThemeContext } from "../context/AppThemeContext";
import { useTheme } from "@react-navigation/native";
import { shadow } from "../styles/shadow";

export const AppCard = ({ children }) => {
  const theme = useContext(AppThemeContext);
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          minHeight: 200,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          paddingVertical: 24,
          paddingHorizontal: 24,
        },
        theme === "light" ? shadow : null,
      ]}
    >
      {children}
    </View>
  );
};
