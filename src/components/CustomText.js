import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";

export function MyHeader({ children, color = "#565656" }) {
  return (
    <Text
      style={{
        fontSize: 24,
        fontFamily: "Inter-Medium",
        color: color,
        lineHeight: 45,
        // textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
}

export function MyText({ children, color = "#565656" }) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontFamily: "Inter-Regular",
        color: color,
        textAlign: "justify",
      }}
    >
      {children}
    </Text>
  );
}
