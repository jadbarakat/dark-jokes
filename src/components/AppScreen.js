import React from "react";
import { View } from "react-native";

export const AppScreen = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
      }}
    >
      {children}
    </View>
  );
};
