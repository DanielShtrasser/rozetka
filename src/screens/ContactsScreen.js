import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import { MyHeader, MyText } from "../components/CustomText";

export default function ContactsScreen() {
  return (
    <SafeAreaView style={{ padding: 15 }}>
      <MyHeader>Контактная информация:</MyHeader>
      <MyText>
        Тех. отдел: +79016671000 - Станислав Олегович {"\n"}
        Директор: +79148991499 -Максим Борисович{"\n"}
      </MyText>
      <MyHeader>Адрес:</MyHeader>
      <MyText>
        Иркутский район, поселок Изумрудный, улица Спортивная, 2 {"\n"}
      </MyText>
      <MyHeader>Реквизиты:</MyHeader>
      <MyText>
        АКЦИОНЕРНОЕ ОБЩЕСТВО "БАЙКАЛЬСКАЯ БАТАРЕЯ" {"\n"}
        ИНН: 3808277922 КПП: 380801001 {"\n"}
        Банк: МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК" БИК: 044525092{"\n"}
        к/с №:30101810645250000092{"\n"}
        Счёт №: 40702810470010342857
      </MyText>
    </SafeAreaView>
  );
}
