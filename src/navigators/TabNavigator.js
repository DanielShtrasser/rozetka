import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import MainScreen from "../screens/MainScreen";
import MapStackNavigator from "./MapStackNavigator";
import ChargingScreen from "../screens/ChargingScreen";
import ProfileStackNavigator from "../navigators/ProfileStackNavigator";

import {
  setActiveSocket,
  setActiveStation,
  getSocketData,
  isChargingToggle,
} from "../store/chargingSlice";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();
  const { stations } = useSelector((state) => state.stations);
  const { isActiveCharge, activeSocketId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // восствновление страницы зарядной сессии при перезагрузке приложения во время зарядки
  useEffect(() => {
    if (isActiveCharge) {
      let activeStation, activeCntr;
      stations.forEach((stn) => {
        stn.Connectors.forEach((cnr) => {
          if (cnr.Id === activeSocketId) {
            activeStation = stn;
            activeCntr = cnr;
          }
        });
      });

      dispatch(setActiveSocket(activeCntr));
      dispatch(setActiveStation(activeStation));
      dispatch(getSocketData(activeCntr.Id));
      dispatch(isChargingToggle());
    }
  }, [isActiveCharge]);

  return (
    <Tab.Navigator
      id="TabNavigator"
      initialRouteName={"Главная"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      <Tab.Screen
        name="Главная"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <FontAwesome
                name={"home"}
                size={(size = focused ? 35 : 25)}
                color={focused ? "#89BD21" : colors.text}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="MapStackNavigator"
        component={MapStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <FontAwesome
                name={"map"}
                size={(size = focused ? 35 : 25)}
                color={focused ? "#0090F0" : colors.text}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ChargingScreen"
        component={ChargingScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <FontAwesome
                name={"bolt"}
                size={(size = focused ? 35 : 25)}
                color={focused ? "red" : colors.text}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <AntDesign
                name={"profile"}
                size={(size = focused ? 35 : 25)}
                color={focused ? "#FFEC15" : colors.text}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
