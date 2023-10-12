import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Toast, { BaseToast } from "react-native-toast-message";
import { Feather, AntDesign } from "@expo/vector-icons";

export const AppToast = () => {
  const { colors } = useTheme();
  const textColor = colors.white;

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.success,
          backgroundColor: colors.success,
          height: "auto",
          width: "95%",
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: colors.success,
        }}
        text1Style={{
          fontSize: 18,
          marginTop: -2,
          fontWeight: 600,
          color: textColor,
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: 400,
          color: textColor,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: colors.success,
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              paddingRight: 16,
            }}
          >
            <Feather name="check-circle" size={24} color={textColor} />
          </View>
        )}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.danger,
          width: "95%",
          height: "auto",
          backgroundColor: colors.background,
        }}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: colors.danger,
        }}
        text1Style={{
          fontSize: 18,
          fontWeight: 600,
          marginTop: -2,
          color: textColor,
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: 400,
          color: textColor,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: colors.danger,
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              paddingRight: 16,
            }}
          >
            <Feather name="x-circle" size={24} color={textColor} />
          </View>
        )}
      />
    ),
    info: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.info,
          width: "95%",
          height: "auto",
          backgroundColor: colors.info,
        }}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: colors.info,
        }}
        text1Style={{
          fontSize: 18,
          fontWeight: 600,
          marginTop: -2,
          color: textColor,
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: 400,
          color: textColor,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: colors.info,
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              paddingRight: 16,
            }}
          >
            <Feather name="info" size={24} color={textColor} />
          </View>
        )}
      />
    ),
    warning: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.warning,
          width: "95%",
          height: "auto",
          backgroundColor: colors.warning,
        }}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: colors.warning,
        }}
        text1Style={{
          fontSize: 18,
          fontWeight: 600,
          marginTop: -2,
          color: textColor,
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: 400,
          color: textColor,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: colors.warning,
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              paddingRight: 16,
            }}
          >
            <AntDesign name="exclamationcircleo" size={24} color={textColor} />
          </View>
        )}
      />
    ),
  };

  return <Toast position="bottom" config={toastConfig} visibilityTime={3000} />;
};
