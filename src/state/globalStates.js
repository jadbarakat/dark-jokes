// imports
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => AsyncStorage);

const deviceTheme = Appearance.getColorScheme();

// global state for app theme
export const themeAtom = atomWithStorage("theme", deviceTheme, storage);

// global state for favourite jokes
export const favouritesAtom = atomWithStorage("favourites", [], storage);

// global state for blacklist
export const blacklistAtom = atomWithStorage("blacklist", [], storage);

// global state for app tint color
export const tintAtom = atomWithStorage(
  "appTint",
  { id: 0, name: "munsell", color: "#3B8491" },
  storage
);

// global state for sorting favourite jokes
export const favouritesAscendingAtom = atomWithStorage(
  "favouritesAscending",
  false,
  storage
);

// global state for minimal mode
export const minimalModeAtom = atomWithStorage("minimal", false, storage);

// global state to show or hide Playground page
export const playgroundAtom = atom(false);
