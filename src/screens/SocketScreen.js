import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import {
  setActiveSocket,
  setActiveStation,
  getSocketData,
  startCharging,
} from "../store/chargingSlice";
import getSocketStatusString from "../utils/getSocketStatusString";
import getSocketConnectorString from "../utils/getSocketConnectorString";
import getSocketStatusIcon from "../utils/getSocketStatusIcon";
import getSocketStatusColor from "../utils/getSocketStatusColor";
import { isLoaderVisible } from "../store/loaderSlice";

export default function SocketScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      backgroundColor: colors.background,
    },
    status: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      height: 60,
      width: "100%",
      padding: 15,

      borderColor: "#89BD21",
      borderWidth: 1.1,
      borderRadius: 20,
    },
    status_txt: {
      fontFamily: "Inter-Bold",
      fontSize: 20,
      color: colors.text,
    },
    status_value: {
      flexDirection: "row",
      alignItems: "center",
    },
    status_icon: {
      width: 35,
      height: 35,
    },
    data: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dataItems: {
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 5,

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
      fontSize: 18,
      textAlign: "center",
      color: colors.text,
    },
    dataItemsTxtSmall: {
      fontFamily: "Inter-Bold",
      fontSize: 14,
      textAlign: "center",
      color: colors.text,
    },
    stationPhoto: {
      width: 250,
      height: 250,
    },
    btn: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
  });

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isCharging, status, activeSocket } = useSelector(
    (state) => state.charging
  );
  const { isAuth } = useSelector((state) => state.auth);
  const { Id, Type, Price, Status } = route.params.cntr;
  const { Address } = route.params.stn;

  const statusColor = status
    ? getSocketStatusColor(status)
    : getSocketStatusColor(Status);
  let socketConnectorString = getSocketConnectorString(Type);
  let socketStatusString = status
    ? getSocketStatusString(status)
    : getSocketStatusString(Status);
  let socketStatusIcon = status
    ? getSocketStatusIcon(status)
    : getSocketStatusIcon(Status);

  useEffect(() => {
    socketStatusString = getSocketStatusString(status);
    socketStatusIcon = getSocketStatusIcon(status);
  }, [status]);

  useEffect(() => {
    dispatch(getSocketData(Id));

    const intervalId = setInterval(() => {
      dispatch(getSocketData(Id));
    }, 5000);

    navigation.setOptions({
      title: `${Address}`,
    });

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activeSocket && activeSocket.Id == Id)
      navigation.jumpTo("ChargingScreen");
  }, [status]);

  function turnOnClickHandler() {
    if (!isAuth) {
      navigation.navigate("LoginScreen");
      return;
    }
    dispatch(startCharging(Id));
    dispatch(setActiveSocket(route.params.cntr));
    dispatch(setActiveStation(route.params.stn));
    dispatch(isLoaderVisible());
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.status}>
          <Text style={styles.status_txt}>{t("статус")}</Text>
          <View style={styles.status_value}>
            <Text style={styles.status_txt}>{t(socketStatusString)}</Text>
            <Image source={socketStatusIcon} style={styles.status_icon} />
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/adapter.png")}
            style={styles.stationPhoto}
          />
        </View>

        <View style={styles.data}>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/type.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>{socketConnectorString}</Text>
            <Text style={styles.dataItemsTxtSmall}>{`\nТип разъема`}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/IconEnergy.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>{Type}</Text>
            <Text style={styles.dataItemsTxtSmall}>
              {t("максимальная-мощность")}
            </Text>
          </View>
          <View style={styles.dataItems}>
            <Image
              source={require("../../assets/wallet.png")}
              style={styles.dataItems_img}
            />
            <Text style={styles.dataItemsTxtBig}>{Price}</Text>
            <Text style={styles.dataItemsTxtSmall}>Цена за киловатт</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={turnOnClickHandler}
          disabled={isCharging || status ? status != 1 : Status != 1}
          style={{
            width: "100%",
            backgroundColor: statusColor,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.btn}>{t("включить")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
