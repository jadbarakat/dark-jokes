import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const AppLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3B8491",
    background: "#F4F6F6",
    highlight: "rgba(233, 237, 237, 0.5)",
    card: "#FFF",
    border: "#DEDFE3",
    text: "#333",
  },
};

// export const AppDarkTheme = {
//   dark: true,
//   colors: {
//     ...DarkTheme.colors,
//     background: "#141414",
//     card: "#292929",
//     border: "#1F1F1F",
//     text: "#F5F5F5",
//   },
// };
export const AppDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#3B8491",
    background: "#151D29",
    highlight: "rgba(21, 29, 41, 0.8)",
    card: "#27353F",
    border: "#405663",
    text: "#CAD8E3",
    grey: "#AAACB0",
    success: "#0FB800",
    successTwo: "#679436",
    danger: "#A30000",
    warning: "#F2BE3A",
    info: "#10ADBC",
  },
};
