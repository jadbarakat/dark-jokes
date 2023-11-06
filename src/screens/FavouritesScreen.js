import { useCallback, useState } from "react";
import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { AppCheckbox } from "../components/AppCheckbox";
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
  const headerHeight = useHeaderHeight();
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
      setFavouritesToRemove([]);
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
          marginBottom: headerHeight,
        }}
      >
        <AppCard padded>
          <AppText>You have no favourite jokes saved.</AppText>
        </AppCard>
      </View>
    );
  };

  const LoadedView = () => {
    return orderedFavourites.map((favourite, index) =>
      isEditing ? (
        <FavouritesEditingCard item={favourite} index={index} key={index} />
      ) : (
        <FavouritesCard item={favourite} key={index} />
      )
    );
  };

  const FavouritesCard = ({ item, onLongPress, disabled }) => {
    return (
      <AppCard>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => shareJoke(item)}
          onLongPress={onLongPress}
          disabled={disabled}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
            }}
          >
            <View style={{ flex: 0.1, alignItems: "flex-start" }}>
              <Feather
                name={isAndroid ? "share-2" : "share"}
                size={24}
                color={colors.text}
              />
            </View>
            <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
              {item.setup && <AppText>{item.setup}</AppText>}
              <AppText fontWeight={item.setup ? 700 : 400}>
                {item.delivery}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      </AppCard>
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
      <AppCard selected={isChecked}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onCheckboxPress(item)}
        >
          <View
            style={{
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
                onPress={() => onCheckboxPress(item)}
                isChecked={isChecked}
              />
            </View>
            <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
              {item.setup && <AppText>{item.setup}</AppText>}
              <AppText fontWeight={item.setup ? 700 : 400}>
                {item.delivery}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
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
