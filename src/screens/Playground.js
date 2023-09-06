import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";
import { useTheme } from "@react-navigation/native";

import { AppSkeletonLoader } from "../components/AppSkeletonLoader";
import { AppCard } from "../components/AppCard";

export const Playground = () => {
  const { colors } = useTheme();

  return (
    <AppScreen padded>
      <AppText>I am the Playground - use me to test stuff out!</AppText>
      <AppCard>
        <AppSkeletonLoader color={colors.background} />
      </AppCard>
    </AppScreen>
  );
};
