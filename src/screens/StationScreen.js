import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import getSocketConnectorString from "../utils/getSocketConnectorString";
import getSocketStatusString from "../utils/getSocketStatusString";
import getSocketStatusColor from "../utils/getSocketStatusColor";

const Item = ({ item, onPress }) => {
  const { colors } = useTheme();
  const { connectors } = useSelector((state) => state.stations);
  const { t } = useTranslation();

  const { Price: price, Type: type, Id: id } = item;
  const { Status: status } = connectors.find((c) => c.Id == id);

  const socketConnectorString = getSocketConnectorString(type);
  const socketStatusString = getSocketStatusString(status);
  const socketStatusColor = getSocketStatusColor(status);

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <Image
          source={require("../../assets/IconEnergy.png")}
          width={30}
          height={30}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontFamily: "Inter-Bold", color: colors.text }}>
            {socketConnectorString}
          </Text>
          <Text style={{ fontFamily: "Inter-Bold", color: colors.text }}>
            {price}R / kWt * H
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: socketStatusColor,
          },
        ]}
      >
        <Text
          style={[
            styles.statusBadgeTxt,
            {
              color:
                socketStatusColor == "#89BD21" || "#FF0000"
                  ? "#fff"
                  : colors.text,
            },
          ]}
        >
          {t(socketStatusString)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function StationScreen({ navigation, route }) {
  const { colors } = useTheme();

  const { Connectors } = route.params.stn;

  function renderItem({ item }) {
    function onItemPress() {
      navigation.navigate("SocketScreen", {
        cntr: item,
        stn: route.params.stn,
      });
    }

    return <Item item={item} onPress={onItemPress} />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/MCharging3.png")}
          style={styles.stationPhoto}
        />
      </View>
      <View>
        <FlatList
          data={Connectors}
          renderItem={renderItem}
          key={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",

    gap: 10,
    paddingHorizontal: 10,
  },
  list: {},
  item: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    padding: 15,
    marginVertical: 5,

    borderColor: "#89BD21",
    borderWidth: 1,
    borderRadius: 10,
  },
  stationPhoto: {
    width: 250,
    height: 250,
  },
  statusBadge: {
    width: 150,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadgeTxt: {
    fontFamily: "Inter-Medium",
    fontWeight: "bold",
    fontSize: 20,
  },
});
