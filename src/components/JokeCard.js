import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppCard } from "./AppCard";
import { AppIconButton } from "./AppIconButton";
import { AppText } from "./AppText";
import { useTheme } from "@react-navigation/native";
import { AppLightTheme } from "../styles/theme";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { favouritesAtom, themeAtom } from "../state/globalStates";

export const JokeCard = ({ joke, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const { setup, delivery, jokeId } = joke;
  const isAndroid = Platform.OS === "android";
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isAFavourite = favourites.some((fav) => fav.jokeId === jokeId);

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

  const LoadingView = () => (
    <ActivityIndicator
      color={colors.text}
      size={isAndroid ? "large" : "small"}
    />
  );

  const LoadedView = () => (
    <View style={{ width: "100%", maxHeight: "98%" }}>
      {/* TODO: figure out a better way to determine "long" jokes */}
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
