import Swiper from "react-native-swiper";
import { AppScreen } from "../components/AppScreen";

import { View } from "react-native";
import { AppText } from "../components/AppText";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { AppButton } from "../components/AppButton";
import { showAppToast } from "../helpers/showAppToast";

export const Playground = () => {
  const { colors } = useTheme();

  return (
    <AppScreen padded>
      <AppButton
        title="Success"
        onPress={() => showAppToast("success", "Success", "You did the thing.")}
      />
      <AppButton
        title="Info"
        onPress={() =>
          showAppToast("info", "Info", "You enquired about the thing.")
        }
      />
      <AppButton
        title="Error"
        onPress={() =>
          showAppToast("error", "Error", "You fucked the thing up.")
        }
      />
      <AppButton
        title="Warning"
        onPress={() =>
          showAppToast(
            "warning",
            "Warning",
            "You're about to fuck the thing up."
          )
        }
      />
    </AppScreen>
  );
};
