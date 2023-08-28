import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

export const AppBottomSheet = ({ children, sheetRef, onAnimate }) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const [theme] = useAtom(themeAtom);
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT", "95%"]);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handleCloseModal = () => sheetRef.current?.close();

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

  const customHandleComponent = () => (
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
        <TouchableOpacity activeOpacity={0.85} onPress={handleCloseModal}>
          <Feather name="x" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backgroundStyle={{
        backgroundColor: colors.card,
      }}
      handleComponent={customHandleComponent}
      backdropComponent={renderBackdrop}
      onAnimate={onAnimate}
    >
      <BottomSheetView
        style={{
          padding: 16,
          paddingBottom: bottom + 16,
        }}
        onLayout={handleContentLayout}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};
