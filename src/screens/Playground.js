import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";
import { AppButton } from "../components/AppButton";
import { useTheme } from "@react-navigation/native";
import { showAppToast } from "../helpers/showAppToast";

export const Playground = () => {
  const { colors } = useTheme();

  return (
    <AppScreen>
      <AppText>I am the Playground - use me to test stuff out!</AppText>
      <AppButton
        title="Show success toast"
        onPress={() =>
          showAppToast("success", "Success", "Favourites removed.")
        }
      />
      <AppButton
        title="Show error toast"
        onPress={() => showAppToast("error", "Error", "Favourites removed.")}
      />
      <AppButton
        title="Show info toast"
        onPress={() => showAppToast("info", "Info", "Favourites removed.")}
      />
    </AppScreen>
  );
};
