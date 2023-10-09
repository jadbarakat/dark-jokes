import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const AppCard = ({ children, padded }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 8,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: colors.border,
          padding: padded ? 24 : 0,
          marginBottom: 8,
        },
        // TODO: had to hide this because LayoutAnimation is doing weird things with it - gotta figure out a way around it
        // theme === "light" ? shadow : null,
      ]}
    >
      {children}
    </View>
  );
};
