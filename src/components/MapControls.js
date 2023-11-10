import { View, Pressable } from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function MapControls({
  zoomIn,
  zoomOut,
  myLocation,
  makeRoute,
}) {
  const { colors } = useTheme();

  return (
    // <View>
    <View
      style={{
        flexDirection: "column",
        gap: 30,
        position: "absolute",
        right: 0,
        bottom: 300,
        backgroundColor: colors.background,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 5,
        opacity: 0.7,
      }}
    >
      <Pressable onPress={zoomIn}>
        <Feather name="zoom-in" size={30} color={colors.text} />
      </Pressable>
      <Pressable onPress={zoomOut}>
        <Feather name="zoom-out" size={30} color={colors.text} />
      </Pressable>
      <Pressable onPress={myLocation}>
        <MaterialIcons name="my-location" size={30} color={colors.text} />
      </Pressable>
      <Pressable style={{ marginTop: 20 }} onPress={makeRoute}>
        <FontAwesome5 name="route" size={30} color={colors.text} />
      </Pressable>
    </View>
  );
}
