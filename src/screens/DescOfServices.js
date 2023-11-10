import React from "react";
import { SafeAreaView, Pressable, ScrollView } from "react-native";
import { MyHeader, MyText } from "../components/CustomText";
import openLink from "../utils/openLink";

const payment_procedure_web_page_uri =
  "https://www.rozetkaweb.ru/docs/poryadokOplat.pdf";

export default function DescOfServices() {
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <ScrollView style={{ padding: 15 }}>
        <MyHeader>Описание цен и услуг</MyHeader>
        <MyText>
          На нашей платформе предоставляются услуги по зарядке электромобилей.
          Мы обеспечиваем комфортное подключение к зарядным станциям в разных
          локациях. {"\n"}
          {"\n"}
          Цена за зарядку электромобиля зависит от конкретной выбранной зарядной
          станции и указывается на странице выбранной станции. Цена фиксируется
          за 1 кВт*ч потребляемой энергии. Пожалуйста, обратите внимание, что
          цена может варьироваться в зависимости от зарядной станции.{"\n"}
          {"\n"}
          Оплата за зарядку инициируется на нашем сайте. После выбора зарядной
          станции и инициирования зарядной сессии, пользователь переадресуется
          на защищенную платежную систему Модульбанка для завершения процесса
          оплаты. Для более детального ознакомления с процессом оплаты,
          пожалуйста, обратитесь к{" "}
          <Pressable onPress={() => openLink(payment_procedure_web_page_uri)}>
            <MyText color="green">Порядок проведения оплат и возвратов</MyText>
          </Pressable>
        </MyText>
      </ScrollView>
    </SafeAreaView>
  );
}
