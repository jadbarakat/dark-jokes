import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const AppCard = ({ children, padded, selected }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 8,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.border,
          padding: padded ? 24 : 0,
          marginBottom: 8,
        },
      ]}
    >
      {children}
    </View>
  );
};
