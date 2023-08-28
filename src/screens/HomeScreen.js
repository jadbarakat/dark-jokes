import { useEffect, useState } from "react";
import { Share, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBottomSheet } from "../components/AppBottomSheet";
import { AppButton } from "../components/AppButton";
import { AppCheckbox } from "../components/AppCheckbox";
import { AppScreen } from "../components/AppScreen";
import { AppText } from "../components/AppText";
import { JokeCard } from "../components/JokeCard";
import { getDarkJoke } from "../helpers/getDarkJoke";
import { JOKE_FLAGS } from "../helpers/getDarkJoke";
import { capitalizeString } from "../helpers/capitalizeString";

export const HomeScreen = ({ bottomSheetModalRef }) => {
  const [joke, setJoke] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [blacklist, setBlacklist] = useState([]);
  const { bottom } = useSafeAreaInsets();

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
      .catch((error) => {
        console.error(error);
      });
  };

  const shareJoke = async () => {
    const { setup, delivery } = joke;
    try {
      await Share.share({
        message: setup ? `${setup} ${delivery}` : delivery,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleCheckboxPress = (flag, checked) => {
    if (checked) setBlacklist((prev) => [...prev, flag]);
    if (!checked) setBlacklist((prev) => prev.filter((item) => item !== flag));
  };

  return (
    <>
      <AppScreen padded>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <JokeCard joke={joke} isLoading={isLoading} shareJoke={shareJoke} />
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            paddingBottom: bottom + 16,
          }}
        >
          <AppButton
            disabled={isLoading}
            title="Get another joke"
            onPress={getJoke}
          />
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
