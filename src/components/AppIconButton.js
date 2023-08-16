import React from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const SIZE = 56;

export const AppIconButton = ({ icon, onPress, filled }) => {
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
        marginHorizontal: 8,
        borderWidth: 0.5,
        borderColor: colors.border,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};
