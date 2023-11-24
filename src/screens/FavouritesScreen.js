import { useCallback, useState } from "react";
import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { Alert, Platform, ScrollView, View } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { showAppToast } from "../helpers/showAppToast";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { favouritesAscendingAtom, favouritesAtom } from "../state/globalStates";
import { shareJoke } from "../helpers/shareJoke";
import { AppFAB } from "../components/AppFAB";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: figure out if you can animate checkboxes even though only their state is changing

export const FavouritesScreen = ({ isEditing, setIsEditing }) => {
  const { colors } = useTheme();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [favouritesAscending] = useAtom(favouritesAscendingAtom);
  const [favouritesToRemove, setFavouritesToRemove] = useState([]);
  const isAndroid = Platform.OS === "android";
  const { bottom } = useSafeAreaInsets();

  const orderedFavourites = favouritesAscending
    ? favourites.sort((a, b) => a.currentDate - b.currentDate)
    : favourites.sort((a, b) => b.currentDate - a.currentDate);

  // handle what happens when user navigates away from the screen
  useFocusEffect(
    useCallback(() => {
      setIsEditing(false);
      setFavouritesToRemove([]);
    }, [])
  );

  const bulkRemoveFavourites = () => {
    if (favouritesToRemove.length < 1) return null;
    const favouritesClone = [...favourites];
    for (let value of favouritesToRemove) {
      const index = favouritesClone.indexOf(value);
      if (index !== -1) {
        favouritesClone.splice(index, 1);
      }
    }
    removeFavouriteAlert(() => {
      setFavourites(favouritesClone);
      setIsEditing(false);
      showAppToast(
        "success",
        "Success",
        `${
          favouritesToRemove.length === 1
            ? "Favourite removed."
            : "Favourites removed."
        }`
      );
      setFavouritesToRemove([]);
    });
  };

  const removeFavouriteAlert = (removeFavouriteFunction) => {
    const response =
      favouritesToRemove.length === 1
        ? "Are you sure you want to remove this favourite?"
        : "Are you sure you want to remove these favourites?";

    Alert.alert(response, null, [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: removeFavouriteFunction,
        style: "destructive",
      },
    ]);
  };

  // screen components
  const EmptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom: bottom,
        }}
      >
        <AppCard padded>
          <View style={{ paddingVertical: 8 }}>
            <AppText style={{ alignSelf: "center" }}>
              You have no favourite jokes saved.
            </AppText>
          </View>
        </AppCard>
      </View>
    );
  };

  const LoadedView = () => {
    return orderedFavourites.map((favourite, index) =>
      isEditing ? (
        <FavouritesEditingCard item={favourite} key={index} />
      ) : (
        <FavouritesCard item={favourite} key={index} />
      )
    );
  };

  const FavouritesCard = ({ item, disabled }) => {
    return (
      <AppCard
        onPress={() => shareJoke(item)}
        disabled={disabled}
        padded
        rightComponent={
          <Feather
            name={isAndroid ? "share-2" : "share"}
            size={24}
            color={colors.text}
          />
        }
      >
        <View style={{ paddingLeft: 16 }}>
          {item.setup && <AppText>{item.setup}</AppText>}
          <AppText fontWeight={item.setup ? 700 : 400}>{item.delivery}</AppText>
        </View>
      </AppCard>
    );
  };

  const FavouritesEditingCard = ({ item }) => {
    const [isChecked] = useState(
      favouritesToRemove.some((joke) => joke.jokeId === item.jokeId)
    );

    const onCheckboxPress = (item) => {
      if (!isChecked) setFavouritesToRemove((prev) => [...prev, item]);
      if (isChecked)
        setFavouritesToRemove((prev) =>
          prev.filter((joke) => joke.jokeId !== item.jokeId)
        );
    };

    return (
      <AppCard
        onPress={() => onCheckboxPress(item)}
        selected={isChecked}
        padded
        rightComponent={
          isChecked ? (
            <Feather name="check" size={24} color={colors.primary} />
          ) : (
            <Feather name="circle" size={24} color={colors.disabled} />
          )
        }
      >
        <View style={{ paddingLeft: 16 }}>
          {item.setup && <AppText>{item.setup}</AppText>}
          <AppText fontWeight={item.setup ? 700 : 400}>{item.delivery}</AppText>
        </View>
      </AppCard>
    );
  };

  return (
    <AppScreen padded>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom }}
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        scrollEnabled={favourites.length !== 0}
      >
        {favourites.length === 0 ? <EmptyView /> : <LoadedView />}
      </ScrollView>
      <AppFAB
        onPress={bulkRemoveFavourites}
        visible={isEditing}
        disabled={favouritesToRemove.length === 0}
        style={{
          position: "absolute",
          bottom: 24,
          right: 16,
        }}
      />
    </AppScreen>
  );
};
