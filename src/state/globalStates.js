// imports
import { atom } from "jotai";
import { Appearance } from "react-native";

// global state for app theme
const colorScheme = Appearance.getColorScheme();
export const globalTheme = atom(colorScheme);

// global state for favourite jokes
export const globalFavourites = atom([]);
