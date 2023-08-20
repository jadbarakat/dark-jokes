import { AppScreen } from "../components/AppScreen";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { Alert, FlatList, Share, View } from "react-native";
import { AppIconButton } from "../components/AppIconButton";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";

import { globalFavourites } from "../state/globalStates";

export const FavouritesScreen = () => {
  const [favourites, setFavourites] = useAtom(globalFavourites);
  const { colors } = useTheme();

  const shareIcon = <Feather name="share" size={24} color={colors.text} />;

  const shareJoke = async (joke) => {
    try {
      await Share.share({
        message: joke.setup ? `${joke.setup} ${joke.delivery}` : joke.delivery,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const removeFromFavourites = (index) => {
    setFavourites(favourites.filter((joke, jokeIndex) => index !== jokeIndex));
  };

  const EmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppCard>
          <AppText>You have no favourite jokes saved</AppText>
        </AppCard>
      </View>
    );
  };

  const FavouritesCard = ({ item, index }) => {
    return (
      <AppCard key={index}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.8 }}>
            {item.setup && <AppText>{item.setup}</AppText>}
            <AppText fontWeight={item.setup ? 700 : 400}>
              {item.delivery}
            </AppText>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
            }}
          >
            <AppIconButton icon={shareIcon} onPress={() => shareJoke(item)} />
          </View>
        </View>
      </AppCard>
    );
  };

  const LoadedView = () => {
    return (
      <FlatList
        data={favourites}
        renderItem={({ item, index }) => (
          <FavouritesCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <AppScreen>
      {favourites.length === 0 ? <EmptyView /> : <LoadedView />}
    </AppScreen>
  );
};

// <AppCard key={index}>
//   <AppText>{fav.setup}</AppText>
//   <AppText>{fav.delivery}</AppText>
// </AppCard>;
