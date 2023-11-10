import React from "react";
import { useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

import MapScreen from "../screens/MapScreen";
import StationScreen from "../screens/StationScreen";
import SocketScreen from "../screens/SocketScreen";

const Stack = createNativeStackNavigator();

export default function MapStackNavigator() {
  const { colors, dark } = useTheme();
  const { stations } = useSelector((state) => state.stations);

  return (
    <Stack.Navigator
      id="MapStackNavigator"
      initialRouteName="MapScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name={"MapScreen"}
        // component={MapScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      >
        {(props) => <MapScreen {...props} stations={stations} dark={dark} />}
      </Stack.Screen>
      <Stack.Screen
        name={"StationScreen"}
        component={StationScreen}
        options={({ route }) => ({
          title: `${route.params.stn.Name}. ${route.params.stn.Address}`,
        })}
      />
      <Stack.Screen
        name={"SocketScreen"}
        component={SocketScreen}
        options={({ route }) => ({
          title: ``,
        })}
      />
    </Stack.Navigator>
  );
}
