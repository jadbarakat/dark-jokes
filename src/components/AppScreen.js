import React from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const NAV_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

export const AppScreen = ({ children }) => {
  const isAndroid = Platform.OS === "android";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: isAndroid ? STATUS_BAR_HEIGHT : 0,
        paddingHorizontal: 8,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
