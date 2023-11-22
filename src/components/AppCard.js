import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppText } from "./AppText";

export const AppCard = ({
  children,
  padded,
  disabled,
  selected,
  rightComponent,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled ? disabled : !onPress}
      activeOpacity={0.85}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 8,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.border,
          padding: padded ? 16 : 0,
          marginBottom: 8,
          flexDirection: "row",
        },
      ]}
    >
      <View style={{ flex: rightComponent ? 0.9 : 1 }}>{children}</View>
      {rightComponent && (
        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 8,
          }}
        >
          {rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );
};
