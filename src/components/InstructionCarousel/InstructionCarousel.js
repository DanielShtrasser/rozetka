import React, { useState, useRef } from "react";
import { View, Dimensions, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Carousel from "react-native-snap-carousel-v4";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { setInstructionIsNotVisible } from "../../store/instructionSlice";
import CarouselItem from "./CarouselItem";
import Paging from "./Paging";

import styles from "./styles";

const { width } = Dimensions.get("window");

export default function InstructionCarousel() {
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);
  const { t } = useTranslation();

  const data = [
    {
      title: "1",
      description: t("slide1"),
      source: require("../../../assets/instruction_one.png"),
    },
    {
      title: "2",
      description: t("slide2"),
      source: require("../../../assets/instruction_two.png"),
    },
    {
      title: "3",
      description: t("slide3"),
      source: require("../../../assets/instruction_three.png"),
    },
    {
      title: "4",
      description: t("slide4"),
      source: require("../../../assets/instruction_four.png"),
    },
  ];

  const settings = {
    onSnapToItem: (index) => setSlideIndex(index),
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
  };

  return (
    <View style={styles.container}>
      <Carousel ref={carouselRef} {...settings} loop={true} />
      <View style={styles.nav}>
        <Paging data={data} activeSlide={slideIndex} />
        <Pressable
          onPress={() => carouselRef.current.snapToItem(slideIndex + 1)}
        >
          <FontAwesome name="arrow-circle-o-right" size={40} color="#89BD21" />
        </Pressable>
      </View>
      <Pressable
        style={styles.skipBtn}
        onPress={() => dispatch(setInstructionIsNotVisible())}
      >
        <Text style={styles.skipBtnTxt}>{t("все_понятно")}</Text>
      </Pressable>
    </View>
  );
}
