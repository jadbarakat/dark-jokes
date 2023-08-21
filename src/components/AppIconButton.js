import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";

const SIZE = 48;

export const AppIconButton = ({ icon, onPress, filled, noBorder }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: filled ? colors.card : colors.background,
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE,
        alignItems: "center",
        justifyContent: "center",
        // marginHorizontal: 8,
        borderWidth: filled ? (noBorder ? 0 : 0.5) : 0,
        borderColor: colors.border,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};
