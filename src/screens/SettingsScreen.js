import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>НАСТРОЙКИ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },
  languageBtn: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "#6258e8",
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
