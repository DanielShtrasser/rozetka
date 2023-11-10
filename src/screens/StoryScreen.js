import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import i18next from "../utils/i18next";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";

import { fetchStory } from "../store/storySlice";
import currencyFormatter from "../utils/currencyFormatter";
import StoryListHeader from "../components/StoryListHeader";

const Item = ({ totalCost, totalKWh, startTime, endTime }) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const duration = Math.round((endDate - startDate) / 60000);

  return (
    <View style={styles.item}>
      <View style={styles.item_top}>
        <Text style={styles.item_top_txt}>
          {startDate.toLocaleDateString(i18next.language, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.item_top_txt}>
          {startDate.toLocaleTimeString(i18next.language, { hour12: false })}
        </Text>
      </View>
      <View style={styles.item_bottom}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../../assets/IconEnergy.png")}
            style={styles.icon}
          />
          <Text style={styles.item_bottom_txt}>{`${totalKWh.toFixed(2)} ${t(
            "Квт"
          )}`}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../../assets/IconTime.png")}
            style={styles.icon}
          />
          <Text style={styles.item_bottom_txt}>
            {duration} {t("мин")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../../assets/IconTotalMoney.png")}
            style={styles.icon}
          />
          <Text style={styles.item_bottom_txt}>
            {currencyFormatter.format(totalCost.toFixed(2))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function StoryList() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const story = useSelector((state) => state.story.story);
  const { isAuth } = useSelector((state) => state.auth);
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [periodSessions, setPeriodSessions] = useState([]);
  const [totalCostValue, setTotalCostValue] = useState(0);
  const [totalKWhValue, setTotalKWhValue] = useState(0);
  const { t } = useTranslation();

  function totalConsumption() {
    let cost = 0;
    let kvh = 0;

    periodSessions.map((session) => {
      cost += session.TotalCost;
      kvh += session.TotalKWh;
    });

    if (!periodSessions.length) {
      cost = 0;
      kvh = 0;
    }
    setTotalCostValue(currencyFormatter.format(cost));
    setTotalKWhValue(kvh.toFixed(2));
  }

  useEffect(() => {
    dispatch(fetchStory());
  }, []);

  useEffect(() => {
    if (Object.keys(story).length !== 0) {
      if (story.Status) return;
      setPeriodSessions(
        [...story[year][month]].sort(
          (a, b) => new Date(b.StartTime) - new Date(a.StartTime)
        )
      );
    }
  }, [story, month]);

  useEffect(() => {
    totalConsumption();
  }, [periodSessions]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={isAuth ? periodSessions : [{}]}
        renderItem={
          isAuth
            ? ({ item }) => (
                <Item
                  totalCost={item.TotalCost}
                  totalKWh={item.TotalKWh}
                  startTime={item.StartTime}
                  endTime={item.EndTime}
                />
              )
            : () => (
                <View>
                  <Text style={styles.authWarning}>
                    {t("Для-просмотра-истории-необходимо-авторизоваться")}
                  </Text>
                </View>
              )
        }
        ListHeaderComponent={
          <StoryListHeader
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            setPeriodSessions={setPeriodSessions}
            totalCostValue={totalCostValue}
            totalKWhValue={totalKWhValue}
          />
        }
        keyExtractor={() => uid()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    gap: 6,

    borderColor: "#89BD21",
    borderWidth: 2,
    borderRadius: 10,
  },
  item_top: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    backgroundColor: "#89BD21",
    borderRadius: 10,
  },
  item_top_txt: {
    color: "#fff",
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
  item_bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_bottom_txt: {
    fontFamily: "Inter-Medium",
    fontSize: 20,
    color: "#878787",
  },
  icon: {
    width: 15,
    height: 15,
  },
  title: {
    fontSize: 18,
  },
  authWarning: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    color: "#fff",
    backgroundColor: "#89BD21",
    fontFamily: "Inter-Bold",
    fontSize: 22,
    textAlign: "center",
  },
});
