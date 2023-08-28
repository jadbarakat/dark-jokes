import React from "react";
import { View } from "react-native";

export const AppScreen = ({ children, padded }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: padded ? 16 : 0,
      }}
    >
      {children}
    </View>
  );
};
