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
    grey: "#AAACB0",
    success: "#0EA300",
    danger: "#BE2323",
    warning: "#F2BE3A",
    info: "#467C9B",
    orange: "#F38953",
  },
};

export const AppDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#3B8491",
    background: "#151D29",
    highlight: "rgba(21, 29, 41, 0.8)",
    card: "#27353F",
    border: "#405663",
    text: "#E4EBF1",
    grey: "#AAACB0",
    success: "#096600",
    danger: "#AC2020",
    warning: "#F2BE3A",
    info: "#467C9B",
    orange: "#EF611A",
  },
};
