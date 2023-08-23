// imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { Appearance } from "react-native";

// global state for app theme
const colorScheme = Appearance.getColorScheme();
export const themeAtom = atom(colorScheme);

// global state for favourite jokes
const storage = createJSONStorage(() => AsyncStorage);
export const favouritesAtom = atomWithStorage("favourites", [], storage);

// state to show or hide Playground page
export const playgroundAtom = atom(false);
