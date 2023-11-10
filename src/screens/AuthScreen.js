import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import openLink from "../utils/openLink";
import { fetchAuth, fetchUser } from "../store/authSlice";

// import CreditCard from "react-native-credit-card-form-ui";

export default function AuthScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { colors } = useTheme();

  function registerClickHandler() {
    if (name && phone) {
      navigation.goBack();
    } else {
      setValid(false);
    }
  }

  function generateRandomHash(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const hash = generateRandomHash();
  const url = `https://t.me/baikalbatterybot?start=${hash}`;

  function telegramBotAuthorization() {
    fetch(`https://rozetkaweb.ru/api/User/LoginTelegramBot?hash=${hash}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Success) {
          console.log(
            "telegramBotAuthorization: Success received, stopping requests"
          );
          dispatch(fetchUser());

          navigation.navigate("ProfileScreen");
        } else {
          setTimeout(telegramBotAuthorization, 5000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setTimeout(telegramBotAuthorization, 3000);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../../assets/LogoBB_circle.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View style={{ gap: 25, marginBottom: 50 }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="enter your name"
            style={styles.input}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="enter your phone: 71234567890"
            keyboardType="numeric"
            style={[styles.input, { borderColor: valid ? null : "red" }]}
          />
          <TouchableOpacity onPress={registerClickHandler}>
            <View style={styles.registerBtn}>
              <Text style={styles.registerBtnTxt}>РЕГИСТРАЦИЯ</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", gap: 15, justifyContent: "center" }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontFamily: "Inter-Medium",
              alignSelf: "center",
            }}
          >
            ИЛИ
          </Text>

          <TouchableOpacity
            onPress={() => {
              openLink(url);
              telegramBotAuthorization();
            }}
          >
            <FontAwesome5 name="telegram" size={50} color="#54a9eb" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 15,
  },
  logo: {
    alignItems: "center",
    padding: 25,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
  },
  cardBtnTxt: {
    alignSelf: "center",
    fontFamily: "Inter-Medium",
    fontSize: 20,
  },
  registerBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "#89BD21",
    borderRadius: 5,
  },
  registerBtnTxt: {
    alignSelf: "center",
    fontFamily: "Inter-Medium",
    fontSize: 20,
    color: "#fff",
  },
  modal: {
    alignSelf: "center",
    marginTop: "30%",
    paddingVertical: 50,
    width: "80%",
    borderRadius: 5,
    gap: 25,
  },
  modalBtns: {
    flexDirection: "row",
    gap: 25,
    alignSelf: "center",
  },
  modalBtn: {
    padding: 15,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#89BD21",
    backgroundColor: "#fff",
  },
  modalBtnTxt: {
    alignSelf: "center",
    fontFamily: "Inter-Medium",
    fontSize: 20,
    color: "#89BD21",
  },
});
