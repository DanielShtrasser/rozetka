import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

import ProfileScreen from "../screens/ProfileScreen";
import ContactsScreen from "../screens/ContactsScreen";
import DescOfServices from "../screens/DescOfServices";
import ChatScreen from "../screens/ChatScreen";
import StoryScreen from "../screens/StoryScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      id="StackNavigator"
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleAlign: "center",
        headerTintColor: "#565656",
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ContactsScreen"}
        component={ContactsScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={"DescOfServices"}
        component={DescOfServices}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={"ChatScreen"}
        component={ChatScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="StoryScreen"
        component={StoryScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
