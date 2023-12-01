import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "@react-navigation/native";

export const AppButton = ({
  title,
  onPress,
  color,
  icon,
  disabled,
  noBorderRadius,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled
          ? colors.card
          : color
          ? color
          : colors.primary,
        height: 50,
        borderRadius: noBorderRadius ? 0 : 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
      }}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <AppText color={disabled ? colors.disabled : colors.white}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
