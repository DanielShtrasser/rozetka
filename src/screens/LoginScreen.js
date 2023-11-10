import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import { fetchAuth, fetchUser } from "../store/authSlice";
import openLink from "../utils/openLink";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);

  function loginClickHandler() {
    if (phone && phone.startsWith("7") && phone.length == 11) {
      dispatch(fetchAuth(phone));
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

          navigation.goBack();
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
            value={phone}
            onChangeText={setPhone}
            placeholder="enter your phone: 71234567890"
            keyboardType="numeric"
            style={[styles.input, { borderColor: valid ? null : "red" }]}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => {
                openLink(url);
                telegramBotAuthorization();
              }}
            >
              <FontAwesome5 name="telegram" size={50} color="#54a9eb" />
            </TouchableOpacity>

            <TouchableOpacity onPress={loginClickHandler}>
              <View style={styles.logInBtn}>
                <Text style={styles.logInBtnTxt}>Войти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#878787", fontSize: 18 }}>
            New to the app?{" "}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("AuthScreen")}
          >
            <Text style={{ color: "#AD40AF", fontWeight: "700", fontSize: 18 }}>
              Register
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 30,
  },
  logo: {
    alignItems: "center",
    padding: 25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    backgroundColor: "#ecf0ec",
  },
  logInBtn: {
    padding: 15,
    backgroundColor: "#89BD21",
    borderRadius: 5,
  },
  logInBtnTxt: {
    alignSelf: "center",
    fontFamily: "Inter-Medium",
    fontSize: 20,
    color: "#fff",
  },
});
