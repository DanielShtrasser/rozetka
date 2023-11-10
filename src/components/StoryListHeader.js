import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "../utils/i18next";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function StoryListHeader({
  month,
  year,
  setMonth,
  setYear,
  totalCostValue,
  totalKWhValue,
}) {
  const { t } = useTranslation();
  const story = useSelector((state) => state.story.story);
  const [period, setPeriod] = useState("");

  const dateFormatter = new Intl.DateTimeFormat(i18next.language, {
    year: "numeric",
    month: "long",
  });

  let currentPeriod = new Date().toLocaleDateString(i18next.language, {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    setPeriod(dateFormatter.format(new Date(year, month)));
  }, [month, year, i18next.language]);

  function monthIncrement() {
    if (story.Status || period === currentPeriod) return;
    if (month === 11) {
      setYear((year) => year + 1);
      setMonth(0);
      return;
    }
    setMonth((month) => month + 1);
  }

  function monthDecrement() {
    if (story.Status) return;
    if (month === 0) {
      setYear((year) => year - 1);
      setMonth(11);
      return;
    }
    setMonth((month) => month - 1);
  }

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={monthDecrement}>
          <Ionicons name="arrow-back-outline" size={42} color="#89BD21" />
        </TouchableOpacity>
        <View>
          <Text style={styles.period}>{period}</Text>
        </View>
        <TouchableOpacity
          onPress={monthIncrement}
          style={{ opacity: currentPeriod === period ? 0.2 : 1 }}
        >
          <Ionicons name="arrow-forward-outline" size={42} color="#89BD21" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",

          borderBottomWidth: 1,
          borderBottomColor: "#89BD21",
          borderTopWidth: 1,
          borderTopColor: "#89BD21",
        }}
      >
        <View style={styles.total}>
          <Text style={styles.totalTxt}>
            {t("общее-количество-потребленной-энергии")} {"\n"}{" "}
            <Text style={{ fontFamily: "Inter-Bold", color: "red" }}>
              {totalKWhValue} {t("Квт")}
            </Text>{" "}
          </Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalTxt}>
            {t("общая-стоимость-потребленной-энергии")} {"\n"}
            <Text style={{ fontFamily: "Inter-Bold", color: "red" }}>
              {totalCostValue}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  period: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "#89BD21",
  },
  total: {
    width: "45%",
    paddingVertical: 10,
  },
  totalTxt: {
    fontFamily: "Inter-Medium",
    lineHeight: 25,
    textAlign: "center",
    fontSize: 17,
    color: "#878787",
  },
  arrow: {
    width: 50,
    height: 50,
  },
});
