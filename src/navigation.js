import React from "react";
import { useColorScheme } from "react-native";

import History from "./components/History";
import Map from "./components/Map";
import Plug from "./components/Plug";
import Station from "./components/Station";
import Menu from "./components/Menu";
import Auth from "./components/Auth";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
  },
};

const Stack = createNativeStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyDefaultTheme}>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen
          name={"Map"}
          component={Map}
          options={{ title: "Карта" }}
        />
        <Stack.Screen
          name={"Station"}
          component={Station}
          options={{ title: "Станция" }}
        />
        <Stack.Screen
          name={"Plug"}
          component={Plug}
          options={{ title: "Розетка" }}
        />
        <Stack.Screen
          name={"History"}
          component={History}
          options={{ title: "История" }}
        />
        <Stack.Screen
          name={"Menu"}
          component={Menu}
          options={{ title: "Меню" }}
        />
        <Stack.Screen
          name={"Auth"}
          component={Auth}
          options={{ title: "Авторизация" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
