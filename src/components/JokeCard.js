import React, { useRef } from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { AppHeroText } from "./AppHeroText";
import { AppButton } from "./AppButton";

import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AppLightTheme } from "../styles/theme";

import LottieView from "lottie-react-native";
import { AppCard } from "./AppCard";
import { useAtom } from "jotai";
import { favouritesAtom, themeAtom } from "../state/globalStates";
import { AppIconButton } from "./AppIconButton";

export const JokeCard = ({ joke, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const { setup, delivery, jokeId } = joke;
  const [theme] = useAtom(themeAtom);
  const isDark = theme === "dark";

  const [favourites, setFavourites] = useAtom(favouritesAtom);

  const isAFavourite = favourites.some((fav) => fav.jokeId === jokeId);

  const animation = useRef(null);
  const loaderLight = require("../../assets/lottie/loader-3dots-light.json");
  const loaderDark = require("../../assets/lottie/loader-3dots-dark.json");

  const shareIcon = (
    <Feather name="share" size={20} color={AppLightTheme.colors.background} />
  );
  const favouritesIcon = (
    <FontAwesome
      name={isAFavourite ? "star" : "star-o"}
      size={30}
      color={isAFavourite ? colors.warning : colors.text}
    />
  );

  const toggleFavourite = () => {
    if (!isAFavourite)
      setFavourites([...favourites, { setup, delivery, jokeId }]);
    if (isAFavourite)
      setFavourites((prev) => prev.filter((fav) => fav.jokeId !== jokeId));
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
      <View style={{ marginTop: 24, flexDirection: "row" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <AppButton title="Share joke" icon={shareIcon} onPress={shareJoke} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <AppIconButton
            icon={favouritesIcon}
            filled
            noBorder
            onPress={toggleFavourite}
          />
        </View>
      </View>
    </View>
  );

  return <AppCard big>{isLoading ? <LoadingView /> : <LoadedView />}</AppCard>;
};
