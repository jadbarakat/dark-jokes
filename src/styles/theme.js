import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const AppLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3B8491",
    background: "#EBEBEB",
    card: "#FFF",
    border: "#DEDFE3",
    text: "#333",
    success: "#0EA300",
    danger: "#BE2323",
    warning: "#DB9B06",
    info: "#467C9B",
    orange: "#F38953",
    skeleton: "#DDE3E3",
    disabled: "#A5ADB6",
    white: "#FFF",
    drawerText: "rgba(51, 51, 51, 0.68)",
  },
};

export const AppDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#3B8491",
    background: "#151D29",
    card: "#27353F",
    border: "#405663",
    text: "#E4EBF1",
    success: "#096600",
    danger: "#AC2020",
    warning: "#DB9B06",
    info: "#467C9B",
    orange: "#EF611A",
    skeleton: "#151D29",
    disabled: "#65707B",
    white: "#FFF",
    drawerText: "rgba(228, 235, 241, 0.68)",
  },
};
