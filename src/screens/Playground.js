import { AppScreen } from "../components/AppScreen";

import { ScrollView, View } from "react-native";
import { AppText } from "../components/AppText";
import { useTheme } from "@react-navigation/native";
import { AppButton } from "../components/AppButton";
import { showAppToast } from "../helpers/showAppToast";
import { AppFAB } from "../components/AppFAB";
import { AppCard } from "../components/AppCard";
import { AppCheckbox } from "../components/AppCheckbox";
import { AppBottomSheet } from "../components/AppBottomSheet";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import { tintAtom } from "../state/globalStates";
import { tints } from "../styles/tints";
import { AppIconButton } from "../components/AppIconButton";
import { Feather } from "@expo/vector-icons";

export const Playground = () => {
  const { colors } = useTheme();
  const [appTint, setAppTint] = useAtom(tintAtom);

  console.log(appTint);

  const sheetRef = useRef(<BottomSheetModal />);
  const openModal = () => {
    sheetRef.current?.present();
  };

  const ViewComponent = ({ children, row }) => (
    <View
      style={{
        marginBottom: 16,
        flexDirection: row && "row",
      }}
    >
      {children}
    </View>
  );

  const AppTextDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppText
      </AppText>
      <AppText>This is the AppText component</AppText>
    </ViewComponent>
  );

  const AppToastDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppToast
      </AppText>
      <AppButton
        title="Success"
        onPress={() => showAppToast("success", "Success", "You did the thing.")}
      />
      <AppButton
        title="Info"
        onPress={() =>
          showAppToast("info", "Info", "You enquired about the thing.")
        }
      />
      <AppButton
        title="Error"
        onPress={() =>
          showAppToast("error", "Error", "You fucked the thing up.")
        }
      />
      <AppButton
        title="Warning"
        onPress={() =>
          showAppToast(
            "warning",
            "Warning",
            "You're about to fuck the thing up."
          )
        }
      />
    </ViewComponent>
  );

  const AppFABDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppFAB
      </AppText>
      <ViewComponent row>
        <AppFAB visible />
        <AppFAB visible disabled />
        <AppFAB visible size={42} />
        <AppFAB visible size={36} />
      </ViewComponent>
    </ViewComponent>
  );

  const AppButtonDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppButton
      </AppText>
      <AppButton title="I am a button" />
      <AppButton
        title="I am a different colored button"
        color={colors.warning}
      />
      <AppButton title="I am a disabled button" disabled />
    </ViewComponent>
  );

  const AppCardDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppCard
      </AppText>
      <AppCard padded>
        <AppText fontWeight={500}>I am a card</AppText>
        <AppText fontWeight={300}>
          I can house a lot of cool things and wrap them in a card style
        </AppText>
        <AppButton title="Do action" />
      </AppCard>
    </ViewComponent>
  );

  const AppCheckboxDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppCheckbox
      </AppText>
      <AppCheckbox text="Checkbox" onPress={() => console.log("checked")} />
      <AppCheckbox
        text="Disabled checkbox"
        onPress={() => console.log("checked")}
        disabled
      />
    </ViewComponent>
  );

  const AppBottomSheetDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppBottomSheet
      </AppText>
      <AppButton title="Open bottom sheet" onPress={openModal} />
      <AppBottomSheet sheetRef={sheetRef}>
        <AppText fontWeight={500}>Hello I am a standard Bottom sheet</AppText>
        <AppText>
          My height is calculated automatically according to the content I have
          in me, so you don't need to worry about manually setting the height
        </AppText>
        <AppText fontWeight={400}>
          I also can be dragged with a finger - try it!
        </AppText>
        <AppText fontWeight={300}>
          I can contain any type of content you want, here's an example:
        </AppText>
        <AppButton
          title="Change tint"
          onPress={() => {
            if (appTint.id % 2 === 0) {
              setAppTint(tints[3]);
            } else {
              setAppTint(tints[0]);
            }
          }}
        />
      </AppBottomSheet>
    </ViewComponent>
  );

  const AppIconButtonDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={500} style={{ paddingBottom: 4 }}>
        AppIconButton
      </AppText>
      <ViewComponent row>
        <AppIconButton
          icon={<Feather name="plus" size={24} color={colors.primary} />}
          filled
        />
        <AppIconButton
          icon={<Feather name="award" size={24} color={colors.primary} />}
        />
        <AppIconButton
          icon={<Feather name="airplay" size={24} color={colors.primary} />}
          filled
          disabled
        />
        <AppIconButton
          icon={<Feather name="airplay" size={24} color={colors.primary} />}
          disabled
        />
      </ViewComponent>
    </ViewComponent>
  );

  return (
    <AppScreen padded>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppBottomSheetDemo />
        <AppButtonDemo />
        <AppCardDemo />
        <AppCheckboxDemo />
        <AppFABDemo />
        <AppIconButtonDemo />
        <AppTextDemo />
        <AppToastDemo />
      </ScrollView>
    </AppScreen>
  );
};
