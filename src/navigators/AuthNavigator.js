import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";

import AuthScreen from "../../src/screens/AuthScreen";
import LoginScreen from "../../src/screens/LoginScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { isAuth } = useSelector((state) => state.auth);

  const { colors } = useTheme();
  const scheme = useColorScheme();
  const { t } = useTranslation();

  const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#89BD21",
      background: "#ecf0ec",
      text: "#061b12",
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#89BD21",
      background: "#061b12",
      text: "#ecf0ec",
    },
  };

  useEffect(() => {
    if (!isAuth)
      Toast.show({
        type: "info",
        text1: t("вы_не_авторизованы"),
      });
  }, [isAuth]);

  return (
    <>
      <NavigationContainer
        theme={scheme === "dark" ? MyDarkTheme : MyDefaultTheme}
        onReady={() => console.log("Navigation container is ready")}
      >
        <Stack.Navigator
          id="AuthNavigator"
          initialRouteName="TabNavigator"
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#89BD21",
            headerTitleStyle: {
              fontFamily: "Inter-Bold",
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name={"TabNavigator"}
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"LoginScreen"}
            component={LoginScreen}
            options={{
              backgroundColor: colors.background,
              title: "Вход",
            }}
          />
          <Stack.Screen
            name={"AuthScreen"}
            component={AuthScreen}
            options={{
              backgroundColor: colors.background,
              title: "Регистрация",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
