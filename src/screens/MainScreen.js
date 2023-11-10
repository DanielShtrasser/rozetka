import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StatusBar,
  ScrollView,
  Appearance,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import i18next, { languageResources } from "../utils/i18next";
import { useTranslation } from "react-i18next";
import {
  MaterialIcons,
  FontAwesome5,
  AntDesign,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";

import languagesList from "../utils/languagesList.json";
import { setInstructionIsVisible } from "../store/instructionSlice";

export default function MainScreen() {
  const { colors, dark } = useTheme();
  let theme = Appearance.getColorScheme();

  function colorThemeToggle() {
    theme == "dark"
      ? Appearance.setColorScheme("light")
      : Appearance.setColorScheme("dark");
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: "row",
      alignContent: "stretch",
      gap: 5,
      backgroundColor: colors.background,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 15,
    },
    list: {
      gap: 10,
      padding: 10,
      width: "100%",
    },
    itemIcon: {
      padding: 10,

      alignItems: "center",
      justifyContent: "center",

      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#89BD21",
    },
    itemDesc: {
      flex: 1,
      padding: 10,

      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#89BD21",
    },
    headerTxt: {
      fontSize: 18,
      fontFamily: "Inter-Bold",
      color: colors.text,
      lineHeight: 25,
    },
    rightHeaderTxt: {
      textAlign: "right",
    },
    descTxt: {
      fontSize: 14,
      color: colors.text,
    },
    rightDescTxt: {
      textAlign: "right",
    },
    languagesList: {
      flex: 0.6,
      width: "80%",
      padding: 10,

      alignSelf: "center",
      marginTop: "20%",
      borderWidth: 2,
      borderColor: "#89BD21",
      borderRadius: 5,
      backgroundColor: colors.background,
    },
    languageBtn: {
      padding: 10,
      borderBottomColor: "#89BD21",
      borderBottomWidth: 1,
    },
    lngName: {
      fontFamily: "Inter-Medium",
      fontSize: 20,
      color: colors.text,
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  function changeLng(lng) {
    i18next.changeLanguage(lng);
    setVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />

      <ScrollView style={{ width: "100%" }}>
        <Modal
          visible={visible}
          onRequestClose={() => setVisible(false)}
          transparent={true}
        >
          <View style={styles.languagesList}>
            <Pressable
              onPress={() => setVisible(false)}
              style={{
                alignItems: "flex-end",
              }}
            >
              <MaterialIcons name="close" size={40} color={colors.text} />
            </Pressable>
            <FlatList
              data={Object.keys(languageResources)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => changeLng(item)}
                  style={styles.languageBtn}
                >
                  <Text style={styles.lngName}>
                    {languagesList[item].nativeName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/LogoBB_circle.png")}
            style={styles.logo}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Pressable onPress={() => setVisible(true)}>
              <MaterialIcons name="language" size={40} color="lightblue" />
            </Pressable>
            <Pressable onPress={colorThemeToggle}>
              {dark ? (
                <Fontisto name="day-sunny" size={40} color="gold" />
              ) : (
                <MaterialIcons
                  name="nightlight-round"
                  size={30}
                  color={"black"}
                />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.list}>
          <Pressable
            style={styles.row}
            onPress={() => dispatch(setInstructionIsVisible())}
          >
            <View style={styles.itemIcon}>
              <FontAwesome5
                name="chalkboard-teacher"
                size={40}
                color="#FD18FF"
              />
            </View>
            <View style={styles.itemDesc}>
              <Text style={[styles.headerTxt]}>{t("как-это-работает")}</Text>
              <Text style={[styles.descTxt, styles.rightDescTxt]}>
                {t("просмотреть-инструкцию")}
              </Text>
            </View>
          </Pressable>

          <View>
            <Pressable
              style={styles.row}
              onPress={() => navigation.jumpTo("MapStackNavigator")}
            >
              <View style={styles.itemDesc}>
                <Text style={[styles.headerTxt, styles.rightHeaderTxt]}>
                  {t("как-найти-зарядную-станцию")}
                </Text>
                <Text style={styles.descTxt}>
                  {t("перейти-на-карту-выбрать-станцию-выбрать-розетку")}
                </Text>
              </View>
              <View style={styles.itemIcon}>
                <FontAwesome5 name="map" size={40} color="#0090F0" />
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable
              style={styles.row}
              onPress={() =>
                navigation.navigate("ProfileStackNavigator", {
                  screen: "StoryScreen",
                  initial: false,
                })
              }
            >
              <View style={styles.itemIcon}>
                <Entypo name="back-in-time" size={40} color="#79553D" />
              </View>
              <View style={styles.itemDesc}>
                <Text style={styles.headerTxt}>
                  {t(
                    "где-ознакомиться-с-информацией-по-прошлым-зарядным-сессиям"
                  )}
                </Text>
                <Text style={[styles.descTxt, styles.rightDescTxt]}>
                  {t("перейти-на-страницу-истории")}
                </Text>
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable
              style={styles.row}
              onPress={() =>
                navigation.jumpTo("ProfileStackNavigator", {
                  screen: "ProfileScreen",
                })
              }
            >
              <View style={styles.itemDesc}>
                <Text style={[styles.headerTxt, styles.rightHeaderTxt]}>
                  {t("профиль")}
                </Text>
                <Text style={styles.descTxt}>
                  {t("перейти-на-страницу-профиля")}
                </Text>
              </View>

              <View style={styles.itemIcon}>
                <AntDesign name={"profile"} size={40} color={"#FFEC15"} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
