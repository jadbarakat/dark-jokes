import { useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { AppHeader } from "./AppHeader";
import { AppDrawer } from "./AppDrawer";
import { HomeScreen } from "../screens/HomeScreen";
import { FavouritesScreen } from "../screens/FavouritesScreen";
import { Playground } from "../screens/Playground";
import { AppToast } from "../components/AppToast";
import { AppIconButton } from "../components/AppIconButton";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import { favouritesAtom, playgroundAtom } from "../state/globalStates";

const Drawer = createDrawerNavigator();

export const RootNav = () => {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [playgroundShown, setPlaygroundShown] = useAtom(playgroundAtom);
  const [favourites] = useAtom(favouritesAtom);

  // bottomSheet stuff
  const bottomSheetModalRef = useRef(<BottomSheetModal />);
  const openModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const cancelIcon = (
    <AppIconButton
      icon={<Feather name="x" size={24} color={colors.text} />}
      onPress={() => setIsEditing(false)}
    />
  );

  const trashIcon = (
    <AppIconButton
      icon={<Feather name="trash-2" size={24} color={colors.text} />}
      onPress={() => setIsEditing(true)}
    />
  );

  const filterIcon = (
    <AppIconButton
      icon={<Feather name="filter" size={24} color={colors.text} />}
      onPress={openModal}
    />
  );

  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <AppDrawer {...props} />}>
        <Drawer.Screen
          name="home"
          options={{
            title: "Jokes",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="laugh" color={color} size={size} />
            ),
            header: () => <AppHeader iconRight={filterIcon} />,
            drawerActiveTintColor: colors.primary,
            drawerType: "slide",
            drawerLabelStyle: {
              fontSize: 16,
              marginLeft: -16,
            },
          }}
        >
          {() => <HomeScreen bottomSheetModalRef={bottomSheetModalRef} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="favourites"
          options={{
            title: "Favourites",
            drawerIcon: ({ color, size }) => (
              <Feather name="star" color={color} size={size} />
            ),
            header: () => (
              <AppHeader
                labelShown
                iconRight={
                  favourites.length < 1
                    ? null
                    : isEditing
                    ? cancelIcon
                    : trashIcon
                }
              />
            ),
            drawerActiveTintColor: colors.primary,
            drawerType: "slide",
            drawerLabelStyle: {
              fontSize: 16,
              marginLeft: -16,
            },
          }}
        >
          {() => (
            <FavouritesScreen
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
        </Drawer.Screen>
        {playgroundShown && (
          <Drawer.Screen
            component={Playground}
            name="playground"
            options={{
              title: "Playground",
              drawerIcon: ({ color, size }) => (
                <Feather
                  name="dribbble"
                  color={colors.orange}
                  size={size}
                  onPress={() => setPlaygroundShown(false)}
                />
              ),
              header: () => <AppHeader labelShown />,
              drawerActiveTintColor: colors.primary,
              drawerType: "slide",
              drawerLabelStyle: {
                fontSize: 16,
                marginLeft: -16,
                color: colors.orange,
              },
            }}
          />
        )}
      </Drawer.Navigator>
      <AppToast />
    </>
  );
};
