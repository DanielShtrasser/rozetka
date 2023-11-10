import React from "react";
import { ParallaxImage } from "react-native-snap-carousel-v4";
import { Text, SafeAreaView } from "react-native";
import styles from "./styles";

export default function CarouselItem({ item }, parallaxProps) {
  return (
    <SafeAreaView style={styles.item}>
      <ParallaxImage
        source={item.source}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        spinnerColor="#89BD21"
        {...parallaxProps}
      />
      <Text style={styles.title} numberOfLines={3}>
        {item.title}
      </Text>
      <Text style={styles.description} numberOfLines={10}>
        {item.description}
      </Text>
    </SafeAreaView>
  );
}
