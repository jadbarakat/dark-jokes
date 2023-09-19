import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../components/AppText";
import { AppIconButton } from "../components/AppIconButton";
import { capitalizeString } from "../helpers/capitalizeString";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { playgroundAtom } from "../state/globalStates";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const AppHeader = ({ labelShown, icons }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const isAndroid = Platform.OS === "android";
  const [headerPressCount, setHeaderPressCount] = useState(0);
  const [playgroundShown, setPlaygroundShown] = useAtom(playgroundAtom);

  useEffect(() => {
    headerPressCount === 5
      ? (setPlaygroundShown(true), setHeaderPressCount(0))
      : null;
  }, [headerPressCount]);

  return (
    <SafeAreaView
      style={{
        paddingTop: isAndroid ? STATUS_BAR_HEIGHT : 0,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <AppIconButton
          icon={<Feather name="menu" size={24} color={colors.text} />}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View
        style={{
          marginLeft: 8,
          alignItems: isAndroid ? "flex-start" : "center",
          justifyContent: "center",
        }}
      >
        {labelShown && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setHeaderPressCount((prev) => prev + 1)}
          >
            <AppText fontSize={22} fontWeight={600}>
              {capitalizeString(route.name)}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",

          paddingRight: 4,
        }}
      >
        {icons && icons.map((icon, index) => <View key={index}>{icon}</View>)}
      </View>
    </SafeAreaView>
  );
};
