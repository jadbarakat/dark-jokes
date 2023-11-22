import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { LaughHubApp } from "./src/LaughHubApp";
import { useTheme } from "@react-navigation/native";

export default function App() {
  const { colors } = useTheme();

  return (
    <Suspense fallback={<ActivityIndicator color={colors.text} size="large" />}>
      <LaughHubApp />
    </Suspense>
  );
}
