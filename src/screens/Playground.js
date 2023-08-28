import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";
import { AppButton } from "../components/AppButton";
import { useTheme } from "@react-navigation/native";
import { showAppToast } from "../helpers/showAppToast";

export const Playground = () => {
  const { colors } = useTheme();

  return (
    <AppScreen padded>
      <AppText>I am the Playground - use me to test stuff out!</AppText>
      <AppButton
        title="Show success toast"
        onPress={() =>
          showAppToast(
            "success",
            "Success",
            "I am a success message - well done!"
          )
        }
      />
      <AppButton
        title="Show error toast"
        onPress={() =>
          showAppToast("error", "Error", "I am an error message - screw you!")
        }
      />
      <AppButton
        title="Show info toast"
        onPress={() =>
          showAppToast("info", "Info", "I am an info message - be informed.")
        }
      />
      <AppButton
        title="Show warning toast"
        onPress={() =>
          showAppToast(
            "warning",
            "Warning",
            "I am a warning message - be warned!"
          )
        }
      />
    </AppScreen>
  );
};
