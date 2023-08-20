import React, { useRef } from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { AppHeroText } from "./AppHeroText";
import { AppButton } from "./AppButton";

import { Feather } from "@expo/vector-icons";
import { AppLightTheme } from "../styles/theme";
import { shadow } from "../styles/shadow";

import LottieView from "lottie-react-native";
import { AppCard } from "./AppCard";
import { useAtom } from "jotai";
import { favouritesAtom, themeAtom } from "../state/globalStates";

export const JokeCard = ({ setup, delivery, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const [theme] = useAtom(themeAtom);
  const isDark = theme === "dark";

  const [favourites, setFavourites] = useAtom(favouritesAtom);

  const animation = useRef(null);
  const loaderLight = require("../../assets/lottie/data.json");
  const loaderDark = require("../../assets/lottie/loader-3dots-dark.json");

  const shareIcon = (
    <Feather name="share" size={20} color={AppLightTheme.colors.background} />
  );
  const favouritesIcon = (
    <Feather name="heart" size={20} color={AppLightTheme.colors.background} />
  );

  const addToFavourites = () => {
    setFavourites((prev) => [...prev, { setup, delivery }]);
  };

  const LoadingView = () => {
    return Platform.OS === "android" ? (
      <ActivityIndicator
        color={colors.text}
        size="large
      "
      />
    ) : (
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
        }}
        source={isDark ? loaderDark : loaderLight}
      />
    );
  };

  // const LoadingView = () => <ActivityIndicator color={colors.text} />;

  const LoadedView = () => (
    <View style={{ width: "100%", maxHeight: "98%" }}>
      {/* TODO: figure out a better way to determine "long" jokes */}
      {setup?.length + delivery?.length > 243 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {setup && (
            <View>
              <AppHeroText fontSize={28}>{setup}</AppHeroText>
            </View>
          )}
          <View
            style={{
              marginTop: setup ? 16 : 0,
            }}
          >
            <AppHeroText fontWeight={setup ? 700 : 400} fontSize={30}>
              {delivery}
            </AppHeroText>
          </View>
        </ScrollView>
      ) : (
        <View>
          {setup && (
            <View>
              <AppHeroText fontSize={28}>{setup}</AppHeroText>
            </View>
          )}
          <View
            style={{
              marginTop: setup ? 16 : 0,
            }}
          >
            <AppHeroText fontWeight={setup ? 700 : 400} fontSize={30}>
              {delivery}
            </AppHeroText>
          </View>
        </View>
      )}
      <View style={{ marginTop: 24 }}>
        <AppButton title="Share joke" icon={shareIcon} onPress={shareJoke} />
      </View>
      <View style={{ marginTop: 24 }}>
        <AppButton
          title="Add to favourites"
          icon={favouritesIcon}
          onPress={addToFavourites}
        />
      </View>
    </View>
  );

  return <AppCard big>{isLoading ? <LoadingView /> : <LoadedView />}</AppCard>;
};
