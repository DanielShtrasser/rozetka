import React from "react";
import { Pagination } from "react-native-snap-carousel-v4";
import styles from "./styles";

export default function Paging({ data, activeSlide }) {
  const settings = {
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    containerStyle: styles.dotContainer,
    dotStyle: styles.dotStyle,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 0.4,
    inactiveDotScale: 0.7,
  };
  return <Pagination {...settings} />;
}
