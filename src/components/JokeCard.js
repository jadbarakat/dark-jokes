import React, { useContext, useRef } from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { AppHeroText } from "./AppHeroText";
import { AppButton } from "./AppButton";

import { Ionicons } from "@expo/vector-icons";
import { AppLightTheme } from "../styles/theme";
import { AppThemeContext } from "../context/AppThemeContext";
import { shadow } from "../styles/shadow";

import LottieView from "lottie-react-native";
import { AppCard } from "./AppCard";

export const JokeCard = ({ setup, delivery, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const theme = useContext(AppThemeContext);
  const isDark = theme === "dark";

  const animation = useRef(null);
  const loaderLight = require("../../assets/lottie/data.json");
  const loaderDark = require("../../assets/lottie/loader-3dots-dark.json");

  const shareIcon = (
    <Ionicons
      name="share-outline"
      size={24}
      color={AppLightTheme.colors.background}
    />
  );

  // const LoadingView = () => <ActivityIndicator color={colors.primary} />;
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
    </View>
  );

  return <AppCard>{isLoading ? <LoadingView /> : <LoadedView />}</AppCard>;
};
