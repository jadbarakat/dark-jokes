import { Platform, Switch, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAtom } from "jotai";
import { minimalModeAtom, themeAtom, tintAtom } from "../state/globalStates";
import { AppText } from "../components/AppText";
import { tints } from "../styles/tints";
import { capitalizeString } from "../helpers/capitalizeString";

export const AppDrawer = (props) => {
  const { colors } = useTheme();
  const [theme, setTheme] = useAtom(themeAtom);
  const [appTint, setAppTint] = useAtom(tintAtom);
  const [minimalMode, setMinimalMode] = useAtom(minimalModeAtom);
  const isDark = theme === "dark";
  const isAndroid = Platform.OS === "android";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const toggleMinimalMode = () => setMinimalMode(!minimalMode);
  const changeTint = (selectedTint) => setAppTint(selectedTint);

  const Separator = () => (
    <View
      style={{
        height: 3,
        backgroundColor: colors.border,
        marginTop: 8,
      }}
    />
  );

  return (
    <DrawerContentScrollView contentContainerStyle={{}} {...props}>
      <DrawerItemList {...props} />
      <Separator />
      <View
        style={{
          marginVertical: isAndroid ? 8 : 4,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 17,
            paddingVertical: isAndroid ? 0 : 8,
          }}
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <AppText fontSize={16} fontWeight={500} color={colors.drawerText}>
            Dark mode
          </AppText>
          <Switch
            value={isDark}
            onChange={toggleTheme}
            thumbColor={colors.white}
            trackColor={{ true: colors.primary, false: colors.disabled }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: isAndroid ? 0 : 8,
            paddingHorizontal: 17,
          }}
          onPress={toggleMinimalMode}
          activeOpacity={0.8}
        >
          <AppText fontSize={16} fontWeight={500} color={colors.drawerText}>
            Minimal mode
          </AppText>
          <Switch
            value={minimalMode}
            onChange={toggleMinimalMode}
            thumbColor={colors.white}
            trackColor={{ true: colors.primary, false: colors.disabled }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 17, paddingTop: 14 }}>
          <View style={{ flexDirection: "row" }}>
            <AppText
              fontSize={16}
              fontWeight={500}
              color={colors.drawerText}
              style={{ paddingBottom: 12 }}
            >
              {`Tint color: `}
            </AppText>
            <AppText
              fontSize={16}
              fontWeight={500}
              color={colors.primary}
              style={{ paddingBottom: 12 }}
            >
              {capitalizeString(appTint.name)}
            </AppText>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {tints.map((tint) => {
              const SIZE = 30;
              const isActive = tint.id === appTint.id;

              return (
                <TouchableOpacity
                  key={tint.id}
                  style={{
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE,
                    backgroundColor: tint.color,
                    marginRight: 16,
                    marginBottom: 8,
                    borderColor: colors.text,
                    borderWidth: isActive ? 2 : 0,
                  }}
                  activeOpacity={0.85}
                  onPress={() => changeTint(tint)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
