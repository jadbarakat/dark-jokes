import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const AppScreen = ({ children, padded }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: padded ? 16 : 0,
      }}
    >
      {children}
    </View>
  );
};
