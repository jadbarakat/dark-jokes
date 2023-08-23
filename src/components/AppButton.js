import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "@react-navigation/native";
import { AppLightTheme } from "../styles/theme";

export const AppButton = ({
  title,
  onPress,
  icon,
  disabled,
  noBorderRadius,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled ? colors.border : colors.primary,
        height: 50,
        borderRadius: noBorderRadius ? 0 : 4,
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
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <AppText color={disabled ? colors.card : AppLightTheme.colors.background}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
