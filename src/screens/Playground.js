import { AppText } from "../components/AppText";
import { AppScreen } from "../components/AppScreen";
import { useTheme } from "@react-navigation/native";

import DraggableFlatList from "react-native-draggable-flatlist";
import { AppCard } from "../components/AppCard";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const DATA = [
  { id: 1, firstName: "Jad", lastName: "Barakat" },
  { id: 2, firstName: "Aiden", lastName: "Barakat" },
  { id: 3, firstName: "Jad", lastName: "Barakat" },
];

export const Playground = () => {
  const [data, setData] = useState(DATA);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <AppCard>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <AppText>{item.firstName}</AppText>
          <AppText>{item.lastName}</AppText>
        </TouchableOpacity>
      </AppCard>
    );
  };

  return (
    <AppScreen padded>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setData(data)}
      />
    </AppScreen>
  );
};
