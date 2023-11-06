import { useRef } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppBottomSheet } from "../components/AppBottomSheet";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppCheckbox } from "../components/AppCheckbox";
import { AppFAB } from "../components/AppFAB";
import { AppIconButton } from "../components/AppIconButton";
import { AppScreen } from "../components/AppScreen";
import { AppText } from "../components/AppText";
import { showAppToast } from "../helpers/showAppToast";
import { tintAtom } from "../state/globalStates";
import { tints } from "../styles/tints";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import { AppSeparator } from "../components/AppSeparator";

export const Playground = () => {
  const { colors } = useTheme();
  const [appTint, setAppTint] = useAtom(tintAtom);

  const sheetRef = useRef(<BottomSheetModal />);
  const openModal = () => sheetRef.current?.present();

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

  const AppBottomSheetDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppBottomSheet
      </AppText>
      <AppButton title="Open bottom sheet" onPress={openModal} />
      <AppBottomSheet sheetRef={sheetRef}>
        <AppText style={{ paddingBottom: 8 }} fontWeight={500} fontSize={20}>
          Hello I am a standard Bottom sheet
        </AppText>
        <AppText style={{ paddingBottom: 8 }}>
          My height is calculated automatically according to the content I have
          in me, so you don't need to worry about manually setting it.
        </AppText>
        <AppText style={{ paddingBottom: 8 }} fontWeight={400}>
          I also can be dragged with a finger to either make me full screen or
          close me - try it! (it doesn't hurt)
        </AppText>
        <AppText style={{ paddingBottom: 8 }}>
          Also, tapping outside of me closes me 🙂
        </AppText>
        <AppText style={{ paddingBottom: 8 }} fontWeight={300}>
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

  const AppButtonDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppButton
      </AppText>
      <AppButton title="I am a button" />
      <AppButton
        title="I am a different colored button"
        color={colors.warning}
      />
      <AppButton title="I aM a DiSaBLed bUTTon" disabled />
    </ViewComponent>
  );

  const AppCardDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppCard
      </AppText>
      <AppCard padded>
        <AppText fontWeight={500} style={{ paddingBottom: 8 }}>
          I am a card
        </AppText>
        <AppText fontWeight={300} style={{ paddingBottom: 8 }}>
          I can house a lot of cool things and wrap them in a card style
        </AppText>
        <AppButton title="Do action" />
      </AppCard>
    </ViewComponent>
  );

  const AppCheckboxDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppCheckbox
      </AppText>
      <AppCheckbox text="I am a checkbox" onPress={() => {}} />
      <AppCheckbox
        text="I aM a DiSaBLed ChecKBoX"
        onPress={() => {}}
        disabled
      />
    </ViewComponent>
  );

  const AppFABDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
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

  const AppIconButtonDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
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

  const AppSeparatorDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppSeparator
      </AppText>
      <AppSeparator />
      <AppSeparator color={colors.primary} />
      <AppSeparator height={5} />
    </ViewComponent>
  );

  const AppTextDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
        AppText
      </AppText>
      <AppText>This is Apptext</AppText>
      <AppText fontSize={16}>This is AppText but smaller</AppText>
      <AppText fontSize={14}>This is AppText but even smaller</AppText>
      <AppText fontWeight={800}>This is Apptext with more weight</AppText>
      <AppText color={colors.primary}>
        This is Apptext in a different color
      </AppText>
    </ViewComponent>
  );

  const AppToastDemo = () => (
    <ViewComponent>
      <AppText fontSize={20} fontWeight={600} style={{ paddingBottom: 4 }}>
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

  return (
    <AppScreen padded>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <AppBottomSheetDemo />
        <AppButtonDemo />
        <AppCardDemo />
        <AppCheckboxDemo />
        <AppFABDemo />
        <AppIconButtonDemo />
        <AppSeparatorDemo />
        <AppTextDemo />
        <AppToastDemo />
      </ScrollView>
    </AppScreen>
  );
};
