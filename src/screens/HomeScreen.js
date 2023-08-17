import React, { useContext, useEffect, useRef, useState } from "react";
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

import {
  AppThemeContext,
  AppThemeUpdateContext,
} from "../context/AppThemeContext";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

// import LottieView from "lottie-react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AppScreen } from "../components/AppScreen";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useContext(AppThemeContext);
  const setTheme = useContext(AppThemeUpdateContext);
  const isDark = theme === "dark";

  const { colors } = useTheme();

  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [blacklist, setBlacklist] = useState([]);

  // bottomSheet stuff
  const bottomSheetModalRef = useRef(<BottomSheetModal />);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // theme button lottie stuff
  const changeThemeLottie = require("../../assets/lottie/Sun-Moon-lottie.json");
  const changeThemeLottieAnimation = useRef(null);

  // filter button lottie stuff
  const openFilterLottieLight = require("../../assets/lottie/filter-light.json");
  const openFilterLottieDark = require("../../assets/lottie/filter-dark.json");
  const openFilterLottieAnimation = useRef(null);

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = () => {
    setIsLoading(true);
    getDarkJoke(blacklist)
      .then((value) => {
        setSetup(value.setup);
        setDelivery(value.delivery);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const shareJoke = async () => {
    try {
      await Share.share({
        message: setup ? `${setup} ${delivery}` : delivery,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleChangeTheme = () => {
    theme === "dark"
      ? changeThemeLottieAnimation.current?.play(30, 100) // sun -> moon
      : changeThemeLottieAnimation.current?.play(100, 1000); // moon -> sun

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
            flex: 0.1,
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
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
          <AppIconButton
            icon={<Feather name="filter" size={24} color={colors.text} />}
            filled
            onPress={handlePresentModalPress}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            paddingTop: 80,
            height: "100%",
          }}
        >
          <JokeCard
            setup={setup}
            delivery={delivery}
            isLoading={isLoading}
            shareJoke={shareJoke}
          />
        </View>
        <View
          style={{
            flex: 0.2,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <AppButton title="Get another joke" onPress={getJoke} />
        </View>
      </AppScreen>
      <AppBottomSheet
        // onAnimate={(index) => {
        //   if (index === 0) {
        //     openFilterLottieAnimation.current?.play(50, 100);
        //   }
        //   if (index === -1) {
        //     openFilterLottieAnimation.current?.play(0, 50);
        //   }
        // }}
        sheetRef={bottomSheetModalRef}
      >
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

{
  /* <View
          style={{
            height: "10%",
            // backgroundColor: "olive",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText>Joke themes hidden: </AppText>
          {blacklist.length === 0 ? (
            <AppText>None</AppText>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {blacklist.map((flag, index) => {
                const string = `${flag}, `;

                return (
                  <AppText key={index}>
                    {string.charAt(0).toUpperCase() + string.slice(1)}
                  </AppText>
                );
              })}
            </View>
          )}
        </View> */
}
