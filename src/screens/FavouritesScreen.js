import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { Alert, FlatList, Share, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";

import { favouritesAtom } from "../state/globalStates";
import { AppButton } from "../components/AppButton";
import { useCallback, useState } from "react";
import { AppCheckbox } from "../components/AppCheckbox";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export const FavouritesScreen = ({ isEditing, setIsEditing }) => {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [favouritesToRemove, setFavouritesToRemove] = useState([]);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setIsEditing(false);
      setFavouritesToRemove([]);
    }, [])
  );

  const shareJoke = async (joke) => {
    const { setup, delivery } = joke;
    try {
      await Share.share({
        message: setup ? `${setup} ${delivery}` : delivery,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const removeFromFavourites = (index) => {
    deleteAlert(() =>
      setFavourites(favourites.filter((joke, jokeIndex) => index !== jokeIndex))
    );
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
    });
  };

  const EmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppCard>
          <AppText>You have no favourite jokes saved.</AppText>
        </AppCard>
      </View>
    );
  };

  const FavouritesCard = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            backgroundColor: colors.card,
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View style={{ flex: 0.1, alignItems: "flex-start" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => shareJoke(item)}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <Feather name="share" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.9, paddingHorizontal: 8 }}>
            {item.setup && <AppText>{item.setup}</AppText>}
            <AppText fontWeight={item.setup ? 700 : 400}>
              {item.delivery}
            </AppText>
          </View>
          {/* <View style={{ flex: 0.1 }}>
            <TouchableOpacity
              onPress={() => removeFromFavourites(index)}
              onLongPress={() => setIsEditing((prev) => !prev)}
              activeOpacity={0.8}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Feather name="trash" size={24} color={colors.text} />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ height: 4, backgroundColor: colors.background }} />
      </>
    );
  };

  const FavouritesEditingCard = ({ item, index }) => {
    const isChecked = favouritesToRemove.some(
      (joke) => joke.jokeId === item.jokeId
    );

    const onCheckboxPress = (item) => {
      if (!isChecked) setFavouritesToRemove((prev) => [...prev, item]);
      if (isChecked)
        setFavouritesToRemove((prev) =>
          prev.filter((joke) => joke.jokeId !== item.jokeId)
        );
    };

    return (
      <>
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
              onPress={() => onCheckboxPress(item)}
              isChecked={isChecked}
            />
          </View>
          <View style={{ flex: 0.8, paddingHorizontal: 8 }}>
            {item.setup && <AppText>{item.setup}</AppText>}
            <AppText fontWeight={item.setup ? 700 : 400}>
              {item.delivery}
            </AppText>
          </View>
          <View style={{ flex: 0.1 }}></View>
        </View>
        <View style={{ height: 4, backgroundColor: colors.background }} />
      </>
    );
  };

  const LoadedView = () => {
    return (
      <FlatList
        data={favourites}
        renderItem={({ item, index }) => {
          return isEditing ? (
            <FavouritesEditingCard item={item} index={index} />
          ) : (
            <FavouritesCard item={item} index={index} />
          );
        }}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 8 }}
      />
    );
  };

  return (
    <AppScreen fullWidth>
      <View style={{ flex: 1 }}>
        {favourites.length === 0 ? <EmptyView /> : <LoadedView />}
      </View>
      {isEditing && (
        <View
          style={{
            justifyContent: "flex-start",
            paddingBottom: insets.bottom,
          }}
        >
          <AppButton
            title="Delete selected"
            onPress={bulkRemoveFavourites}
            disabled={favouritesToRemove.length === 0}
          />
        </View>
      )}
    </AppScreen>
  );
};
