import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AppFAB = ({ size = 56, visible, onPress, style, disabled }) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const opacity = useState(new Animated.Value(visible ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    visible && (
      <Animated.View style={{ opacity }}>
        <TouchableOpacity
          style={[
            {
              height: size,
              width: size,
              borderRadius: size,
              backgroundColor: disabled ? colors.disabled : colors.primary,
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
          activeOpacity={0.9}
          onPress={onPress}
          disabled={disabled}
        >
          <Feather
            name="trash-2"
            color={disabled ? colors.card : colors.white}
            size={24}
          />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};
