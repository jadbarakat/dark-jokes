import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { DarkJokesApp } from "./src/DarkJokesApp";
import { useTheme } from "@react-navigation/native";

import * as Updates from "expo-updates";

export default function App() {
  const { colors } = useTheme();

  // const onFetchUpdateAsync = async () => {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();

  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     alert(`Error fetching latest Expo update: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   onFetchUpdateAsync();
  // });

  return (
    <Suspense fallback={<ActivityIndicator color={colors.text} size="large" />}>
      <DarkJokesApp />
    </Suspense>
  );
}
