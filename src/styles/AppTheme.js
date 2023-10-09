import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useAtom } from "jotai";
import { themeAtom } from "../state/globalStates";

export const AppTheme = (tint) => {
  const [theme] = useAtom(themeAtom);
  const isDark = theme === "dark";

  const AppLightTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: tint.color,
      background: "#EBEBEB",
      card: "#FFF",
      border: "#DEDFE3",
      text: "#333",
      success: "#22A06B",
      danger: "#BE2323",
      warning: "#DB9B06",
      info: "#467C9B",
      orange: "#F38953",
      disabled: "#A5ADB6",
      white: "#FFF",
      drawerText: "rgba(51, 51, 51, 0.68)",
    },
  };

  const AppDarkTheme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: tint.color,
      background: "#161A1D",
      card: "#2C333A",
      border: "#22272B",
      text: "#DEE4EA",
      success: "#216E4E",
      danger: "#AE2A19",
      warning: "#B38600",
      info: "#206B74",
      orange: "#974F0C",
      disabled: "#738496",
      white: "#FFF",
      yellow: "#DB9B06",
      drawerText: "rgba(228, 235, 241, 0.68)",
    },
  };
  // const AppDarkTheme = {
  //   dark: true,
  //   colors: {
  //     ...DarkTheme.colors,
  //     primary: tint,
  //     background: "#151D29",
  //     card: "#27353F",
  //     border: "#405663",
  //     text: "#E4EBF1",
  //     success: "#096600",
  //     danger: "#AC2020",
  //     warning: "#DB9B06",
  //     info: "#467C9B",
  //     orange: "#EF611A",
  //     disabled: "#65707B",
  //     white: "#FFF",
  //     drawerText: "rgba(228, 235, 241, 0.68)",
  //   },
  // };

  return isDark ? AppDarkTheme : AppLightTheme;
};
