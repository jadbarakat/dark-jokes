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
import { AppSkeletonLoader } from "./AppSkeletonLoader";
import { useState } from "react";
import { showAppToast } from "../helpers/showAppToast";

export const JokeCard = ({ joke, isLoading, shareJoke }) => {
  const { colors } = useTheme();
  const { setup, delivery, jokeId } = joke;
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isAFavourite = favourites.some((fav) => fav.jokeId === jokeId);

  const [viewHeight, setViewHeight] = useState();
  const [setupHeight, setSetupHeight] = useState();
  const [deliveryHeight, setDeliveryHeight] = useState();

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
    if (!delivery) {
      return showAppToast(
        "error",
        "Error",
        "Can't favourite a joke that doesn't exist."
      );
    }
    if (!isAFavourite)
      setFavourites([...favourites, { setup, delivery, jokeId }]);
    if (isAFavourite)
      setFavourites((prev) => prev.filter((fav) => fav.jokeId !== jokeId));
  };

  const LoadingView = () => (
    <View style={{ height: viewHeight, justifyContent: "center" }}>
      {/* <View>
        {setup && (
          <AppSkeletonLoader
            color={colors.border}
            style={{ height: setupHeight }}
          />
        )}
        <View
          style={{
            marginTop: 16,
          }}
        >
          <AppSkeletonLoader color={colors.border} height={deliveryHeight} />
        </View>
      </View>
      <View style={{ marginTop: 24, flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <AppSkeletonLoader color={colors.border} />
        </View>
        <View style={{ flex: 0.2 }}>
          <AppSkeletonLoader color={colors.border} />
        </View>
      </View> */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={colors.text} size="large" />
      </View>
    </View>
  );

  const LoadedView = () => (
    <View onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}>
      {setup?.length + delivery?.length > 243 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {setup && (
            <View onLayout={(e) => setSetupHeight(e.nativeEvent.layout.height)}>
              <AppText fontSize={28}>{setup}</AppText>
            </View>
          )}
          <View
            style={{
              marginTop: setup ? 16 : 0,
            }}
            onLayout={(e) => setDeliveryHeight(e.nativeEvent.layout.height)}
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
