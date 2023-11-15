import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Pressable,
  Appearance,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import i18next, { languageResources } from "../utils/i18next";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccDel,
  fetchUsedConnector,
  fetchLogOut,
} from "../store/authSlice";

import languagesList from "../utils/languagesList.json";

export default function SettingsScreen() {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userPhone, isAuth } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  let theme = Appearance.getColorScheme();

  function colorThemeToggle() {
    theme == "dark"
      ? Appearance.setColorScheme("light")
      : Appearance.setColorScheme("dark");
  }

  function accDelHandler() {
    dispatch(fetchAccDel(userPhone));
    // убрать dispatch(fetchLogOut()) после того, как Стас напишет скрипт удаления аккаунта
    dispatch(fetchLogOut());
    setModalVisible(false);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: "space-between",
      backgroundColor: colors.background,
    },
    modalCentered: {
      flex: 1,
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      opacity: 0.9,
    },
    modalTxt: { color: colors.text, fontSize: 20, fontFamily: "Inter-Medium" },
    modalBtnGoup: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    modalBtn: {
      width: 100,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: colors.text,
    },
    modalBtnTxt: {
      color: colors.background,
      fontSize: 24,
      fontFamily: "Inter-Medium",
    },
    delBtn: {
      paddingVertical: 15,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",

      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: "#d20606",
      borderRadius: 30,
    },
    delBtn_txt: {
      color: "#d20606",
      fontFamily: "Inter-Bold",
      fontSize: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalCentered}>
          <Text style={styles.modalTxt}>{t("хотите_удалить_аккаунт")}</Text>
          <View style={styles.modalBtnGoup}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalBtn}
            >
              <Text style={styles.modalBtnTxt}>{t("нет")}</Text>
            </Pressable>
            <Pressable onPress={() => accDelHandler()} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>{t("да")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          alignItems: "center",
          gap: 30,
        }}
      >
        <Pressable onPress={colorThemeToggle} style={{ alignSelf: "stretch" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: 15,
              borderWidth: 1,
              borderColor: colors.text,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>
              {t("поменять_цвет_приложения")}
            </Text>
            {dark ? (
              <Fontisto name="day-sunny" size={40} color="gold" />
            ) : (
              <MaterialIcons
                name="nightlight-round"
                size={30}
                color={"black"}
              />
            )}
          </View>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.text,
            borderRadius: 30,
          }}
        >
          <SelectDropdown
            data={Object.keys(languageResources)}
            onSelect={(selectedItem) => {
              i18next.changeLanguage(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return `${t("язык_интерфейса")} ${
                languagesList[selectedItem]["name"]
              }`;
            }}
            defaultButtonText="Язык интерфейса: Russian"
            rowTextForSelection={(item) => {
              return languagesList[item]["name"];
            }}
            buttonStyle={{ backgroundColor: colors.background, width: "95%" }}
            buttonTextStyle={{ color: colors.text }}
          />
        </View>

        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.text,
            borderRadius: 30,
          }}
        >
          <SelectDropdown
            data={[
              "-",
              "Socket",
              "GBT",
              "Type1",
              "Type2",
              "CCS1",
              "CCS2",
              "CHAdeMO",
            ]}
            onSelect={(selectedItem) => {
              const connectorIndex = {
                "-": 0,
                Socket: 1,
                Type1: 2,
                Type2: 3,
                CCS1: 4,
                CCS2: 5,
                CHAdeMO: 6,
                GBT: 7,
              };

              dispatch(fetchUsedConnector(connectorIndex[selectedItem]));
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return `${t("Используемый_разъем")} ${selectedItem}`;
            }}
            defaultButtonText={`${t("Используемый_разъем")} -`}
            buttonStyle={{ backgroundColor: colors.background, width: "95%" }}
            buttonTextStyle={{ color: colors.text }}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={!isAuth}
        onPress={() => setModalVisible(true)}
        style={{ width: "100%" }}
      >
        <View style={styles.delBtn}>
          <Text style={styles.delBtn_txt}>{t("удаление_аккаунта")}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
