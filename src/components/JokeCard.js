import { ActivityIndicator, ScrollView, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppCard } from "./AppCard";
import { AppIconButton } from "./AppIconButton";
import { AppText } from "./AppText";
import { useTheme } from "@react-navigation/native";
import { AppLightTheme } from "../styles/theme";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { favouritesAtom } from "../state/globalStates";
import { useState } from "react";
import { showAppToast } from "../helpers/showAppToast";

export const JokeCard = ({ joke, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const { setup, delivery, jokeId } = joke;
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isAFavourite = favourites.some((fav) => fav.jokeId === jokeId);

  const [viewHeight, setViewHeight] = useState();

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
    const currentDate = Date.now();

    if (!delivery) {
      return showAppToast(
        "error",
        "Error",
        "Can't favourite a joke that doesn't exist."
      );
    }
    if (!isAFavourite)
      setFavourites([...favourites, { setup, delivery, jokeId, currentDate }]);
    if (isAFavourite)
      setFavourites((prev) => prev.filter((fav) => fav.jokeId !== jokeId));
  };

  const LoadingView = () => (
    <View style={{ justifyContent: "center", height: viewHeight }}>
      <ActivityIndicator size="large" color={colors.text} />
    </View>
  );

  const LoadedView = () => (
    <View onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}>
      {setup?.length + delivery?.length > 243 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {setup && (
            <View>
              <AppText fontSize={28}>{setup}</AppText>
            </View>
          )}
          <View
            style={{
              marginTop: setup ? 16 : 0,
            }}
          >
            <AppText fontWeight={setup ? 700 : 400} fontSize={30}>
              {delivery}
            </AppText>
          </View>
        </ScrollView>
      ) : (
        <View>
          {setup && (
            <View>
              <AppText fontSize={28}>{setup}</AppText>
            </View>
          )}
          <View
            style={{
              marginTop: setup ? 16 : 0,
            }}
          >
            <AppText fontWeight={setup ? 700 : 400} fontSize={30}>
              {delivery}
            </AppText>
          </View>
        </View>
      )}
    </View>
  );

  return <AppCard>{isLoading ? <LoadingView /> : <LoadedView />}</AppCard>;
};
