import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { shadow } from "../styles/shadow";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

export const AppCard = ({ children, big }) => {
  const [theme] = useAtom(themeAtom);
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          minHeight: big ? 200 : null,
          borderRadius: 8,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: colors.border,
          paddingVertical: 24,
          paddingHorizontal: 24,
          marginBottom: 16,
        },
        // TODO: had to hide this because LayoutAnimation is doing weird things with it - gotta figure out a way around it
        // theme === "light" ? shadow : null,
      ]}
    >
      {children}
    </View>
  );
};
