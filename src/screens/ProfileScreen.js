import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import { fetchLogOut } from "../store/authSlice";
import { removeValue } from "../utils/asyncStorage";
import currencyFormatter from "../utils/currencyFormatter";
import { socketDisconnect } from "../store/middlewares/chatSocketMiddleware";

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuth, balance, userPhone } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    SafeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 5,
      justifyContent: "space-between",
      backgroundColor: colors.background,
    },

    userData: {
      paddingVertical: 15,
      width: "100%",
      backgroundColor: colors.background,
    },
    userDataRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background,
    },
    userDataTxt: {
      fontFamily: "Inter-Medium",
      fontSize: 20,
      lineHeight: 30,
      textAlign: "center",
      color: colors.text,
    },
    profileMenu: {
      width: "100%",
      gap: 10,
      backgroundColor: colors.background,
    },
    profileMenuTxt: {
      padding: 15,

      fontFamily: "Inter-Regular",
      fontSize: 20,
      lineHeight: 30,
      textAlign: "center",
      color: colors.text,

      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 30,
    },

    btn: {
      paddingVertical: 15,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",

      backgroundColor: colors.primary,
      borderRadius: 30,
    },
    btn_txt: {
      color: colors.background,
      fontFamily: "Inter-Bold",
      fontSize: 24,
    },
  });

  function loginClickHandler() {
    if (!isAuth) {
      navigation.navigate("LoginScreen");
    } else {
      removeValue("userPhone");
      dispatch(fetchLogOut());
      dispatch(socketDisconnect());
    }
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        {isAuth ? (
          <View style={styles.userData}>
            <View style={styles.userDataRow}>
              <Text style={styles.userDataTxt}>{t("пользователь")}:</Text>
              <Text style={styles.userDataTxt}>+{userPhone}</Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userDataTxt}>{t("баланс")}</Text>
              <Text style={styles.userDataTxt}>
                {currencyFormatter.format(balance)}
              </Text>
            </View>
          </View>
        ) : null}

        <View>
          <ScrollView>
            <View style={styles.profileMenu}>
              <Pressable onPress={() => navigation.navigate("ChatScreen")}>
                <Text style={styles.profileMenuTxt} numberOfLines={10}>
                  {t("чат")}
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("StoryScreen")}>
                <Text style={styles.profileMenuTxt}>{t("история")}</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  navigation.navigate("SettingsScreen");
                }}
              >
                <Text style={styles.profileMenuTxt}>{t("настройки")}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={loginClickHandler} style={{ width: "100%" }}>
          <View style={styles.btn}>
            <Text style={styles.btn_txt}>
              {isAuth ? t("выход") : t("вход")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
