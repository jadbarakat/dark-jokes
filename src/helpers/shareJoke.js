import { Alert, Share } from "react-native";
import { showAppToast } from "./showAppToast";

export const shareJoke = async (joke) => {
  const { setup, delivery } = joke;

  if (!delivery) {
    return showAppToast(
      "error",
      "Error",
      "Can't share a joke that doesn't exist."
    );
  }

  try {
    await Share.share({
      message: setup ? `${setup} ${delivery}` : delivery,
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};
