import React from "react";
import { View } from "react-native";

export const AppScreen = ({ children, fullWidth }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: fullWidth ? 0 : 24,
      }}
    >
      {children}
    </View>
  );
};
