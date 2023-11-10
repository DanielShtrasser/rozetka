import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";

import { sendedMessage } from "../store/middlewares/chatSocketMiddleware";

export default function ChatScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    chatWindow: {
      flex: 2,
      backgroundColor: colors.background,
      borderRadius: 5,
    },
    message: {
      width: "70%",
      padding: 15,
      marginVertical: 8,
      borderWidth: 2,
      borderRadius: 5,
    },
    input: {
      flex: 1,
      minHeight: 40,

      backgroundColor: "#ccc",
      padding: 10,

      fontSize: 18,
      color: colors.background,
      borderWidth: 1,
      borderColor: "#89BD21",
      borderRadius: 5,
    },
    btn: {
      padding: 10,
      backgroundColor: "#89BD21",
      borderRadius: 5,
    },
    btnTxt: {
      color: colors.text,
      fontFamily: "Inter-Medium",
      fontSize: 18,
    },
  });

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.auth);
  const flRef = useRef();
  const { t } = useTranslation();

  function sendHandler() {
    if (message) {
      dispatch(sendedMessage(message));
      setMessage("");
    }
  }

  function Message({ text, fromUserId }) {
    return (
      <View
        style={[
          styles.message,
          {
            borderColor: fromUserId == userId ? "#89BD21" : "#ffff00",
            alignSelf: fromUserId == userId ? "flex-end" : "flex-start",
          },
        ]}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: "Inter-Medium",
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ alignItems: "center", padding: 15, flex: 1 }}>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles.chatWindow}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message text={item.Message} fromUserId={item.FromUserId} />
            )}
            keyExtractor={(item) => item.Id}
            ref={flRef}
            onContentSizeChange={() =>
              flRef.current.scrollToEnd({ animated: false })
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "100%",
          }}
        >
          <TextInput
            style={[styles.input]}
            onChangeText={setMessage}
            value={message}
            placeholder={t("введите-текст")}
          />
          <Pressable onPress={() => sendHandler()}>
            <View style={styles.btn}>
              <Feather name="send" size={30} color={colors.background} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
