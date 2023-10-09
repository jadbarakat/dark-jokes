import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AppFAB = ({ size = 56, visible, onPress }) => {
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
          style={{
            height: size,
            width: size,
            borderRadius: size,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: bottom + 24,
            right: 16,
          }}
          activeOpacity={0.9}
          onPress={onPress}
        >
          <Feather name="trash-2" color={colors.white} size={24} />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};
