import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { DarkJokesApp } from "./src/DarkJokesApp";
import { useTheme } from "@react-navigation/native";

import * as Updates from "expo-updates";

export default function App() {
  const { colors } = useTheme();

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Suspense fallback={<ActivityIndicator color={colors.text} size="large" />}>
      <DarkJokesApp />
    </Suspense>
  );
}
