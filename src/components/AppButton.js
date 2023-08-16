import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "@react-navigation/native";
import { AppLightTheme } from "../styles/theme";

export const AppButton = ({
  title,
  onPress,
  primary,
  icon,
  disabled,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        height: 50,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
      }}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
      {...props}
    >
      {icon && <View style={{ marginRight: 4 }}>{icon}</View>}
      <AppText color={AppLightTheme.colors.background}>{title}</AppText>
    </TouchableOpacity>
  );
};
