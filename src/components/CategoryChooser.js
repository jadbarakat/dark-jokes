import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import {
  JOKE_CATEGORIES,
  JOKE_CATEGORIES_ANDROID,
  JOKE_CATEGORIES_IOS,
} from "../helpers/getJoke";
import { categoriesAtom } from "../state/globalStates";
import { useAtom } from "jotai";
import { AppCard } from "./AppCard";
import { capitalizeString } from "../helpers/capitalizeString";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export const CategoryChooser = () => {
  const { colors } = useTheme();
  const [categories, setCategories] = useAtom(categoriesAtom);

  const isAndroid = Platform.OS === "android";

  const JOKE_CATEGORIES = isAndroid
    ? JOKE_CATEGORIES_ANDROID
    : JOKE_CATEGORIES_IOS;

  const isNoneSelected = categories.length === 0;
  const isAllSelected = categories.length === JOKE_CATEGORIES.length;

  const selectAllIcon = (
    <Feather name="check-circle" size={24} color={colors.text} />
  );

  const handleCheckboxPress = (category, selected) => {
    if (!selected) setCategories(() => [...categories, category]);
    if (selected)
      setCategories(() => categories.filter((item) => item !== category));
  };

  const handleSelectAll = () => {
    setCategories(JOKE_CATEGORIES);
  };

  return (
    <View>
      <View
        style={{
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <AppText fontSize={24}>Choose a category</AppText>
        </View>
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "flex-end",
            paddingBottom: 2,
          }}
          activeOpacity={0.85}
          onPress={handleSelectAll}
          disabled={isAllSelected}
        >
          <AppText color={isAllSelected ? colors.disabled : colors.primary}>
            Select all
          </AppText>
        </TouchableOpacity>
      </View>
      {JOKE_CATEGORIES.map((category, index) => {
        const selected = categories.find((element) => element === category);

        return (
          <AppCard
            key={index}
            selected={selected}
            onPress={() => handleCheckboxPress(category, selected)}
            rightComponent={
              selected ? (
                <Feather name="check" size={24} color={colors.primary} />
              ) : (
                <Feather name="plus" size={24} color={colors.disabled} />
              )
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
                <AppText>
                  {category === "misc"
                    ? "Miscellaneous"
                    : capitalizeString(category)}
                </AppText>
              </View>
            </View>
          </AppCard>
        );
      })}
      {isNoneSelected && (
        <View style={{ height: 50, paddingTop: 8 }}>
          <AppText style={{ textAlign: "center" }} color={colors.danger}>
            Please choose at least one category
          </AppText>
        </View>
      )}
    </View>
  );
};
