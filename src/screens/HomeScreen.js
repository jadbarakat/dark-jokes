import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBottomSheet } from "../components/AppBottomSheet";
import { AppCheckbox } from "../components/AppCheckbox";
import { AppScreen } from "../components/AppScreen";
import { AppText } from "../components/AppText";
import { getDarkJoke } from "../helpers/getDarkJoke";
import { JOKE_FLAGS } from "../helpers/getDarkJoke";
import { capitalizeString } from "../helpers/capitalizeString";
import { showAppToast } from "../helpers/showAppToast";
import { shareJoke } from "../helpers/shareJoke";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
  blacklistAtom,
  favouritesAtom,
  minimalModeAtom,
} from "../state/globalStates";
import { useTheme } from "@react-navigation/native";
import Swiper from "react-native-swiper";

export const HomeScreen = ({ bottomSheetModalRef }) => {
  const [joke, setJoke] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [blacklist, setBlacklist] = useState([]);
  const { bottom } = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";

  const [minimalMode] = useAtom(minimalModeAtom);

  const { colors } = useTheme();

  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isAFavourite = favourites.some((fav) => fav.jokeId === joke.jokeId);

  useEffect(() => {
    getJoke();
  }, []);

  // functions
  const getJoke = () => {
    setIsLoading(true);
    getDarkJoke(blacklist)
      .then((value) => {
        setJoke({
          jokeId: value.jokeId,
          setup: value.setup,
          delivery: value.delivery,
        });
        setIsLoading(false);
      })
      .catch(() => {
        showAppToast("error", "Error", "Something went wrong, try again.");
        setIsLoading(false);
      });
  };

  const toggleFavourite = () => {
    const currentDate = Date.now();

    if (!joke.delivery) {
      return showAppToast(
        "error",
        "Error",
        "Can't favourite a joke that doesn't exist."
      );
    }
    if (!isAFavourite) {
      const { setup, delivery, jokeId } = joke;
      setFavourites([...favourites, { setup, delivery, jokeId, currentDate }]);
    }
    if (isAFavourite)
      setFavourites((prev) => prev.filter((fav) => fav.jokeId !== joke.jokeId));
  };

  const handleCheckboxPress = (flag, checked) => {
    if (checked) setBlacklist((prev) => [...prev, flag]);
    if (!checked) setBlacklist((prev) => prev.filter((item) => item !== flag));
  };

  // components
  const ActionButton = ({ icon, onPress, label, primary }) => (
    <TouchableOpacity
      style={{
        alignItems: "center",
        flex: 1 / actionButtons.length,
      }}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      {primary ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 24,
          }}
        >
          {icon}
          {!minimalMode && (
            <AppText
              color={isLoading ? colors.disabled : colors.text}
              fontWeight={primary ? 600 : 400}
              style={{ marginTop: 4 }}
            >
              {label}
            </AppText>
          )}
        </View>
      ) : (
        <>
          {icon}
          {!minimalMode && (
            <AppText
              color={isLoading ? colors.disabled : colors.text}
              fontWeight={primary ? 600 : 400}
              style={{ marginTop: 4 }}
            >
              {label}
            </AppText>
          )}
        </>
      )}
    </TouchableOpacity>
  );

  const actionButtons = [
    {
      id: 0,
      label: "Share",
      icon: isAndroid ? (
        <Feather
          name="share-2"
          size={24}
          color={isLoading ? colors.disabled : colors.text}
        />
      ) : (
        <Feather
          name="share"
          size={24}
          color={isLoading ? colors.disabled : colors.text}
        />
      ),
      onPress: () => shareJoke(joke),
    },
    {
      id: 1,
      label: "New joke",
      icon: (
        <Feather
          name="refresh-cw"
          size={24}
          color={isLoading ? colors.disabled : colors.text}
        />
      ),
      onPress: getJoke,
      primary: true,
    },

    {
      id: 2,
      label: "Favourite",
      icon: (
        <FontAwesome
          name={isLoading ? "star-o" : isAFavourite ? "star" : "star-o"}
          size={24}
          color={
            isLoading
              ? colors.disabled
              : isAFavourite
              ? colors.warning
              : colors.text
          }
        />
      ),
      onPress: toggleFavourite,
    },
  ];

  const JokeComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 24,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : (
        <>
          {joke.setup && (
            <View>
              <AppText fontSize={30}>{joke.setup}</AppText>
            </View>
          )}
          <View
            style={{
              marginTop: joke.setup ? 16 : 0,
            }}
          >
            <AppText fontWeight={joke.setup ? 700 : 400} fontSize={32}>
              {joke.delivery}
            </AppText>
          </View>
        </>
      )}
    </View>
  );

  return (
    <>
      <AppScreen padded>
        <Swiper showsPagination={false}>
          <JokeComponent />
          <JokeComponent />
          <JokeComponent />
        </Swiper>
        <View
          style={{
            flex: 0.1,
            paddingBottom: bottom + 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {actionButtons.map((button) => (
            <ActionButton
              key={button.id}
              label={button.label}
              onPress={button.onPress}
              icon={button.icon}
              primary={button.primary}
            />
          ))}
        </View>
      </AppScreen>
      <AppBottomSheet sheetRef={bottomSheetModalRef}>
        <View style={{ marginBottom: 8 }}>
          <AppText fontSize={24}>Don't show me jokes that are</AppText>
        </View>
        {JOKE_FLAGS.map((flag, index) => {
          return (
            <AppCheckbox
              text={flag === "nsfw" ? "NSFW" : capitalizeString(flag)}
              key={index}
              onPress={(checked) => {
                handleCheckboxPress(flag, checked);
              }}
              isChecked={blacklist.find((element) => element === flag)}
            />
          );
        })}
      </AppBottomSheet>
    </>
  );
};
