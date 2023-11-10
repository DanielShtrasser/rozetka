import React, { useCallback, useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useTheme } from "@react-navigation/native";

export default function QRCScanner({ setScanning, setScanedData }) {
  const device = useCameraDevice("back");
  const { colors } = useTheme();
  const [isActive, setIsActive] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: ([{ value }]) => {
      setIsActive(false);
      setScanedData(value);
      setScanning(false);
    },
  });

  useEffect(() => setIsActive(true), []);

  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        onError={onError}
        style={{ flex: 1 }}
      />
      <View
        style={{
          // padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          onPress={() => setScanning(false)}
          style={{ backgroundColor: colors.primary }}
        >
          <Text
            style={{
              padding: 15,
              alignSelf: "center",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Закрыть сканнер
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
