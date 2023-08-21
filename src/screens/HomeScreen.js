import React, { useEffect, useRef, useState } from "react";
import { Share, View } from "react-native";

import { getDarkJoke } from "../helpers/getDarkJoke";
import { JOKE_FLAGS } from "../helpers/getDarkJoke";

import { JokeCard } from "../components/JokeCard";
import { AppButton } from "../components/AppButton";
import { AppIconButton } from "../components/AppIconButton";
import { AppCheckbox } from "../components/AppCheckbox";
import { AppText } from "../components/AppText";
import { AppBottomSheet } from "../components/AppBottomSheet";

import { Feather } from "@expo/vector-icons";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useNavigation, useTheme } from "@react-navigation/native";
import { AppScreen } from "../components/AppScreen";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

const STATIC_JOKE = {
  setup: "Static setup?",
  delivery: "This is a very funny static delivery.",
};

export const HomeScreen = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === "dark";

  const { colors } = useTheme();

  const [joke, setJoke] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [blacklist, setBlacklist] = useState([]);

  // bottomSheet stuff
  const bottomSheetModalRef = useRef(<BottomSheetModal />);

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = () => {
    setIsLoading(true);
    getDarkJoke(blacklist)
      .then((value) => {
        setJoke({
          jokeId: value.jokeId,
          setup: value.setup,
          delivery: value.delivery,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const shareJoke = async () => {
    const { setup, delivery } = joke;
    try {
      await Share.share({
        message: setup ? `${setup} ${delivery}` : delivery,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const onCheckboxPress = (flag, checked) => {
    if (checked) setBlacklist((prev) => [...prev, flag]);
    if (!checked) setBlacklist((prev) => prev.filter((item) => item !== flag));
  };

  return (
    <>
      <AppScreen>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ paddingRight: 8 }}>
            <AppIconButton
              icon={
                <Feather
                  name={isDark ? "sun" : "moon"}
                  size={24}
                  color={colors.text}
                />
              }
              filled
              onPress={handleChangeTheme}
            />
          </View>
          <AppIconButton
            icon={<Feather name="filter" size={24} color={colors.text} />}
            filled
            onPress={handlePresentModalPress}
          />
        </View>
        <View
          style={{
            flex: 0.9,
            marginTop: 24,
            justifyContent: "flex-start",
            paddingTop: 24,
          }}
        >
          <JokeCard joke={joke} isLoading={isLoading} shareJoke={shareJoke} />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <AppButton
            disabled={isLoading}
            title="Get another joke"
            onPress={getJoke}
          />
        </View>
      </AppScreen>
      <AppBottomSheet sheetRef={bottomSheetModalRef}>
        <View style={{ marginBottom: 8 }}>
          <AppText fontSize={24}>Don't show me jokes that are</AppText>
        </View>
        {JOKE_FLAGS.map((flag, index) => {
          return (
            <AppCheckbox
              text={flag}
              key={index}
              onPress={(checked) => {
                onCheckboxPress(flag, checked);
              }}
              isChecked={blacklist.find((element) => element === flag)}
            />
          );
        })}
      </AppBottomSheet>
    </>
  );
};
