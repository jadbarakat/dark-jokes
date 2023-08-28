import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

export const AppText = ({
  children,
  color,
  fontSize = 18,
  fontWeight = 400,
}) => {
  const { colors } = useTheme();

  return (
    <Text style={{ fontSize, fontWeight, color: color ? color : colors.text }}>
      {children}
    </Text>
  );
};
