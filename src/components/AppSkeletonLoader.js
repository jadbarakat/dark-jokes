import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const AppSkeletonLoader = ({
  color,
  height = 50,
  width = "100%",
  startingOpacity = 0.4,
  duration = 300,
}) => {
  const opacity = useRef(new Animated.Value(startingOpacity));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration,
        }),
        Animated.timing(opacity.current, {
          toValue: startingOpacity,
          useNativeDriver: true,
          duration: duration * 2,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        opacity: opacity.current,
        height,
        width,
        backgroundColor: color,
        borderRadius: 4,
      }}
    ></Animated.View>
  );
};
