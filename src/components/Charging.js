import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from "react-native-cool-speedometer";

import { endCharging, getActiveSocketData } from "../store/chargingSlice";
import { fetchStory } from "../store/storySlice";
import { fetchStations } from "../store/stationsSlice";
import currencyFormatter from "../utils/currencyFormatter";
import { isLoaderVisible, isLoaderNotVisible } from "../store/loaderSlice";

export default function Charging() {
  const { colors } = useTheme();
  const [timer, setTimer] = useState(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: colors.background,
    },
    status: {
      color: "red",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
      alignItems: "center",
      width: "100%",
      height: 60,
      padding: 10,
      borderRadius: 10,
    },
    currentKwt: {
      marginBottom: 10,
      alignSelf: "center",
      fontSize: 32,
      color: colors.text,
    },
    data: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    dataItems: {
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,

      paddingVertical: 15,
      width: "30%",
      minHeight: 140,

      borderColor: "#89BD21",
      borderWidth: 1,
      borderRadius: 10,
    },
    dataItems_img: {
      width: 25,
      height: 25,
    },
    dataItemsTxtBig: {
      fontFamily: "Inter-Bold",
      fontSize: 20,
      textAlign: "center",
      color: "#CC0605",
    },
    dataItemsTxtSmall: {
      fontFamily: "Inter-Bold",
      fontSize: 14,
      textAlign: "center",
      color: colors.text,
    },
    btnTxt: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    btn: {
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      backgroundColor: "#CC0605",
    },
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    duration,
    currentKwt,
    power,
    voltage,
    currentTotal,
    activeSocketStatus,
    activeSocket,
  } = useSelector((state) => state.charging);

  useEffect(() => {
    let timerId;
    if (duration && timer < Math.floor(duration))
      setTimer(Math.round(duration));

    timerId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  useEffect(() => {
    dispatch(fetchStations(activeSocket.Id));

    const intervalId = setInterval(() => {
      dispatch(getActiveSocketData(activeSocket.Id));
    }, 3000);

    return () => {
      clearInterval(intervalId);
      dispatch(fetchStations());
      dispatch(fetchStory());
      navigation.jumpTo("MapStackNavigator");
    };
  }, []);

  useEffect(() => {
    if (activeSocketStatus === 2) dispatch(isLoaderNotVisible());
  }, [activeSocketStatus]);

  function turnOfClickHandler() {
    dispatch(endCharging(activeSocket.Id));
    dispatch(isLoaderVisible());
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.status}>{t("идет-зарядка")}</Text>

        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Speedometer
              width={340}
              height={210}
              value={power}
              min={0}
              max={8}
              accentColor={"red"}
              angle={180}
            >
              <Background color={colors.primary} angle={200} />
              <Arc color={colors.primary} arcWidth={4} />
              <Needle circleRadius={10} />
              <Progress />
              <Marks step={0.5} />
            </Speedometer>
          </View>

          <Text style={styles.currentKwt}>{power ? power.toFixed(2) : 0}</Text>
          <View
            style={{
              paddingHorizontal: 3,
              width: "100%",
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 22, color: colors.text }}>
                {t("продолжительность")}
              </Text>
              <Text style={{ fontSize: 22, color: colors.text }}>
                {timer} с.
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 22, color: colors.text }}>
                {t("потреблено")}
              </Text>
              <Text style={{ fontSize: 22, color: colors.text }}>
                {currentKwt ? currentKwt.toFixed(2) : 0} кВт
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.data}>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/type.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>
              {currencyFormatter.format(currentTotal)}
            </Text>
            <Text style={styles.dataItemsTxtSmall}>
              {t("фактическая-стоимость")}
            </Text>
          </View>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/IconEnergy.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>{voltage}</Text>
            <Text style={styles.dataItemsTxtSmall}>{t(`вольтаж`)}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/battery-bolt-alt.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>
              {power ? power.toFixed(2) : 0} кВт
            </Text>
            <Text style={styles.dataItemsTxtSmall}>
              {t("текущая-мощность")}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={turnOfClickHandler}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>{t("остановить-зарядку")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
