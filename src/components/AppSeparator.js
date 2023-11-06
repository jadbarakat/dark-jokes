import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const AppSeparator = ({ height = 3, color }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height,
        backgroundColor: color ? color : colors.card,
        marginVertical: 8,
      }}
    />
  );
};
