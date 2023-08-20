import React, { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import { AppIconButton } from "./AppIconButton";

import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

export const AppBottomSheet = ({ children, sheetRef, onAnimate }) => {
  const { colors } = useTheme();
  const [theme] = useAtom(themeAtom);

  const snapPoints = useMemo(() => ["50%"]);

  const closeModal = () => sheetRef.current?.close();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={theme === "dark" ? 0.8 : 0.3}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handleComponent = () => (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: 24 }}
    >
      <View
        style={{
          height: 4,
          borderRadius: 4,
          width: "15%",
          backgroundColor: colors.text,
        }}
      />
      <View style={{ position: "absolute", right: 16, top: 16 }}>
        <TouchableOpacity activeOpacity={0.85} onPress={closeModal}>
          <Feather name="x" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: colors.card,
      }}
      handleComponent={handleComponent}
      backdropComponent={renderBackdrop}
      onAnimate={onAnimate}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        {children}
      </View>
    </BottomSheetModal>
  );
};
