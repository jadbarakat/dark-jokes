import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const AppCard = ({ children, big }) => {
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
