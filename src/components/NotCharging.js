import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export default function NotCharging() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, textAlign: "center", color: colors.text }}>
        {t("зарядной-сессии-заглушка")}
      </Text>
    </SafeAreaView>
  );
}
