import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppText } from "./AppText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const AppCheckbox = ({
  text,
  onPress,
  isChecked,
  disabled,
  checkboxRef,
}) => {
  const { colors } = useTheme();

  return (
    <BouncyCheckbox
      textComponent={
        <View style={{ marginLeft: 8 }}>
          <AppText>{text}</AppText>
        </View>
      }
      onPress={(checked) => onPress(checked)}
      fillColor={colors.primary}
      innerIconStyle={{ borderRadius: 4 }}
      iconStyle={{ borderRadius: 4 }}
      size={24}
      style={{ marginVertical: 8 }}
      isChecked={isChecked}
      disabled={disabled}
      ref={checkboxRef}
    />
  );
};
