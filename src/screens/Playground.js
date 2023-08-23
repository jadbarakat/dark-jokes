import React from "react";
import { Text, View } from "react-native";

import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";

export const Playground = () => {
  return (
    <AppScreen>
      <AppText>I am the Playground - use me to test stuff out!</AppText>
    </AppScreen>
  );
};
