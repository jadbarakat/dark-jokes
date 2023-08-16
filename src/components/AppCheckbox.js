import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AppText } from "./AppText";

export const AppCheckbox = ({ text, onPress, isChecked }) => {
  const { colors } = useTheme();

  return (
    <BouncyCheckbox
      textComponent={
        <View style={{ marginLeft: 8 }}>
          <AppText>{text}</AppText>
        </View>
      }
      onPress={(checked) => onPress(checked)}
      fillColor={colors.primary}
      innerIconStyle={{ borderRadius: 4 }}
      iconStyle={{ borderRadius: 4 }}
      size={24}
      style={{ marginVertical: 8 }}
      isChecked={isChecked}
    />
  );
};
