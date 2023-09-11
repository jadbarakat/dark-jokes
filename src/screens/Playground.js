import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";
import { useTheme } from "@react-navigation/native";

export const Playground = () => {
  const { colors } = useTheme();

  return (
    <AppScreen padded>
      <AppText>EA Sports, it's in the game.</AppText>
    </AppScreen>
  );
};
