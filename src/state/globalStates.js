import { Appearance } from "react-native";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tints } from "../styles/tints";

const storage = createJSONStorage(() => AsyncStorage);
const deviceTheme = Appearance.getColorScheme();

export const isDarkAtom = atomWithStorage(
  "isDark",
  deviceTheme === "dark",
  storage
);

export const favouritesAtom = atomWithStorage("favourites", [], storage);

export const tintAtom = atomWithStorage("appTint", tints[0], storage);

export const favouritesAscendingAtom = atomWithStorage(
  "favouritesAscending",
  false,
  storage
);

export const categoriesAtom = atomWithStorage("categories", [], storage);

export const minimalModeAtom = atomWithStorage("minimal", false, storage);

export const playgroundAtom = atom(false);
