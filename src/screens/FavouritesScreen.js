import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { Alert, ScrollView, Share, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { AppButton } from "../components/AppButton";
import { AppCheckbox } from "../components/AppCheckbox";
import { showAppToast } from "../helpers/showAppToast";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { favouritesAtom } from "../state/globalStates";
import { shareJoke } from "../helpers/shareJoke";

// TODO: figure out if you can animate checkboxes even though only their state is changing

export const FavouritesScreen = ({ isEditing, setIsEditing }) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [favouritesToRemove, setFavouritesToRemove] = useState([]);

  // handle what happens when user navigates away from the screen
  useFocusEffect(
    useCallback(() => {
      setIsEditing(false);
      setFavouritesToRemove([]);
    }, [])
  );

  const bulkRemoveFavourites = () => {
    const favouritesClone = [...favourites];
    for (let value of favouritesToRemove) {
      const index = favouritesClone.indexOf(value);
      if (index !== -1) {
        favouritesClone.splice(index, 1);
      }
    }
    deleteAlert(() => {
      setFavourites(favouritesClone);
      setIsEditing(false);
      showAppToast(
        "success",
        "Success",
        `${
          favouritesToRemove.length < 2
            ? "Favourite removed."
            : "Favourites removed."
        }`
      );
    });
  };

  const deleteAlert = (deleteFunction) =>
    Alert.alert("Are you sure you want to do this?", null, [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: deleteFunction,
        style: "destructive",
      },
    ]);

  // screen components
  const EmptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: -headerHeight,
        }}
      >
        <AppCard>
          <AppText>You have no favourite jokes saved.</AppText>
        </AppCard>
      </View>
    );
  };

  const LoadedView = () => {
    return favourites.map((favourite, index) =>
      isEditing ? (
        <FavouritesEditingCard item={favourite} index={index} key={index} />
      ) : (
        <FavouritesCard item={favourite} key={index} />
      )
    );
  };

  const FavouritesCard = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => shareJoke(item)}>
        <View
          style={{
            backgroundColor: colors.card,
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View style={{ flex: 0.1, alignItems: "flex-start" }}>
            <Feather name="share" size={24} color={colors.text} />
          </View>
          <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
            {item.setup && <AppText>{item.setup}</AppText>}
            <AppText fontWeight={item.setup ? 700 : 400}>
              {item.delivery}
            </AppText>
          </View>
        </View>
        <View style={{ height: 4, backgroundColor: colors.background }} />
      </TouchableOpacity>
    );
  };

  const FavouritesEditingCard = ({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPress={() => onCheckboxPress(item)}>
        <View
          style={{
            backgroundColor: colors.card,
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View
            style={{
              flex: 0.1,
            }}
          >
            <AppCheckbox
              key={index}
              onPress={() => {}}
              isChecked={isChecked}
              disabled
            />
          </View>
          <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
            {item.setup && <AppText>{item.setup}</AppText>}
            <AppText fontWeight={item.setup ? 700 : 400}>
              {item.delivery}
            </AppText>
          </View>
        </View>
        <View style={{ height: 4, backgroundColor: colors.background }} />
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        scrollEnabled={favourites.length !== 0}
      >
        {favourites.length === 0 ? <EmptyView /> : <LoadedView />}
      </ScrollView>
      {isEditing && (
        <View
          style={{
            justifyContent: "flex-start",
            paddingBottom: bottom,
          }}
        >
          <AppButton
            title="Delete selected"
            onPress={bulkRemoveFavourites}
            disabled={favouritesToRemove.length === 0}
            noBorderRadius
          />
        </View>
      )}
    </AppScreen>
  );
};
