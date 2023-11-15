import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import RegisterNNPushToken from "native-notify";

import AuthNavigator from "./src/navigators/AuthNavigator";
import { isLoaderNotVisible } from "./src/store/loaderSlice";
import {
  setUserPhoneToStorage,
  getUserPhonefromStorage,
  getInstructionShownFlagFromStorage,
  setInstructionShownFlag,
} from "./src/utils/asyncStorage";
import { fetchUser, fetchAuth } from "./src/store/authSlice";
import { setInstructionIsVisible } from "./src/store/instructionSlice";
import { fetchStations } from "./src/store/stationsSlice";
import InstructionCarousel from "./src/components/InstructionCarousel/InstructionCarousel";
import { socketConnect } from "./src/store/middlewares/chatSocketMiddleware";
import { socketDisconnect } from "./src/store/middlewares/chatSocketMiddleware";

SplashScreen.preventAutoHideAsync();

export default function App() {
  RegisterNNPushToken(11973, "6cCkNdahwDBgyKSPuQ91Fc");
  const dispatch = useDispatch();
  const { isAuth, userPhone } = useSelector((state) => state.auth);
  const { loaderVisible } = useSelector((state) => state.loader);
  const { instructionIsVisible } = useSelector((state) => state.instruction);
  const { isCharging, activeSocketStatus } = useSelector(
    (state) => state.charging
  );
  const { chatConnection } = useSelector((state) => state.chat);

  useEffect(() => {
    if (isAuth && userPhone) dispatch(socketConnect(userPhone));

    return () => {
      if (chatConnection) dispatch(socketDisconnect());
    };
  }, [isAuth, userPhone]);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const authWithAsyncStorage = async () => {
    try {
      const userPhone = await getUserPhonefromStorage("userPhone");

      if (userPhone !== null) {
        dispatch(fetchAuth(userPhone));
      } else {
        console.log("no userPhone in Storage");
      }
    } catch (e) {
      console.log("getUserPhonefromStorage error: ", e);
    }
  };

  const instructionShown = async () => {
    try {
      const shown = await getInstructionShownFlagFromStorage("bb");

      if (shown == null) {
        setInstructionShownFlag();

        dispatch(setInstructionIsVisible());
      }
    } catch (e) {
      console.log("instructionShown error: ", e);
    }
  };

  // отключение лоадера во всех случаях кроме переключения на зарядную сессию
  useEffect(() => {
    setTimeout(() => {
      if (loaderVisible && !isCharging && activeSocketStatus != 2) {
        dispatch(isLoaderNotVisible());
        console.log("isLoaderNotVisible from App.js");
      }
    }, 2000);
  }, [activeSocketStatus]);

  useEffect(() => {
    if (userPhone) {
      const phoneFromStorage = getUserPhonefromStorage("userPhone");
      if (typeof phoneFromStorage !== "string") {
        setUserPhoneToStorage(userPhone);
      }
    }
  }, [userPhone]);

  useEffect(() => {
    if (!userPhone) {
      dispatch(fetchUser());
    }
  }, [isAuth]);

  useEffect(() => {
    instructionShown();

    if (!isAuth) authWithAsyncStorage();
    dispatch(fetchStations());
    const intervalId = setInterval(() => {
      dispatch(fetchStations());
    }, 7000);
    return () => clearInterval(intervalId);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Modal animationType="slide" transparent={true} visible={loaderVisible}>
        <View style={styles.centered}>
          <ActivityIndicator size={100} color="#89BD21" />
        </View>
      </Modal>
      <Modal animationType="slide" visible={instructionIsVisible}>
        <View>
          <InstructionCarousel />
        </View>
      </Modal>

      <AuthNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    opacity: 0.9,
  },
});
