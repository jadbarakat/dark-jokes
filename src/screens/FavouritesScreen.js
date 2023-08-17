import React from "react";
import { Text, View } from "react-native";

import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";

export const FavouritesScreen = () => {
  const EmptyView = () => {
    return (
      <AppCard>
        <AppText>You have no favourite jokes yet.</AppText>
      </AppCard>
    );
  };

  return (
    <AppScreen>
      <EmptyView />
    </AppScreen>
  );
};
