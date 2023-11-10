import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity, Modal, View, Platform } from "react-native";
import { YaMap, Marker, Animation, Polyline } from "react-native-yamap";
import { useTheme } from "@react-navigation/native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import { MaterialIcons } from "@expo/vector-icons";
import { URL } from "react-native-url-polyfill";

import QRCScanner from "../components/QRCScanner";

import MapControls from "../components/MapControls";
import getStationsSortedByDistance from "../utils/getStationsSortedByDistance";
import getAllRoutePoints from "../utils/getAllRoutePoints";

YaMap.init("f10be001-cb33-49b8-9804-f671fe90380e");

export default function MapScreen({ navigation }) {
  const { stations } = useSelector((state) => state.stations);
  const { dark, colors } = useTheme();
  const [stnVisible, setStnVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);
  const [firsRoute, setFirstRoute] = useState([]);
  const [stateZoom, setStateZoom] = useState(18);
  const [currentPosition, setCurrentPosition] = useState(false);
  const [scanedData, setScanedData] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanedData) {
      const params = new URL(scanedData).searchParams;
      const id = params.get("id");
      let cntr;
      const stn = stations.find((s) =>
        s.Connectors.some((c) => {
          if (c.Id == id) {
            cntr = c;
            return true;
          }
        })
      );

      navigation.navigate("SocketScreen", {
        stn: stn,
        cntr: cntr,
      });
    }
    setScanedData(null);
  }, [scanedData]);

  const map = useRef(YaMap);

  function zoomIn() {
    if (stateZoom >= 19) return;
    map.current.setZoom(stateZoom + 1);
    setStateZoom((stateZoom) => stateZoom + 1);
  }

  function zoomOut() {
    if (stateZoom <= 5) return;
    map.current.setZoom(stateZoom - 1);
    setStateZoom((stateZoom) => stateZoom - 1);
  }

  function myLocation() {
    map.current.setCenter(
      {
        lat: currentPosition.coords.latitude,
        lon: currentPosition.coords.longitude,
      },
      stateZoom,
      0,
      0,
      0.4,
      Animation.LINEAR
    );
  }

  const requestLocationPermission = async () => {
    try {
      const granted =
        Platform.OS === "ios"
          ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (granted === "granted") {
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted =
        Platform.OS === "ios"
          ? await request(PERMISSIONS.IOS.CAMERA)
          : await request(PERMISSIONS.ANDROID.CAMERA);
      if (granted === "granted") {
        return true;
      } else {
        console.log("You cannot use Camera");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const permission = requestLocationPermission();
    permission.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition(position);
            setUserVisible(true);
            map.current.setCenter({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              zoom: 18,
              azimuth: 0,
              tilt: 0,
              duration: 2,
              animation: Animation.SMOOTH,
            });
          },
          (error) => {
            console.log(error.code, error.message);
            setCurrentPosition(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        Geolocation.watchPosition(
          (lastPosition) => {
            setCurrentPosition(lastPosition);
          },
          (e) => {
            console.log("watchPosition error: ", e);
            setCurrentPosition(false);
          },
          { distanceFilter: 0, interval: 3000 }
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
    setStnVisible(true);
  }, []);

  function makeRoute() {
    if (routeVisible) {
      setRouteVisible(false);
      setFirstRoute([]);
      return;
    }

    if (!currentPosition) return;
    const nearestStn = getStationsSortedByDistance(
      stations,
      currentPosition
    )[0];

    map.current.findDrivingRoutes(
      [
        {
          lat: currentPosition.coords.latitude,
          lon: currentPosition.coords.longitude,
        },
        { lat: nearestStn.CoordinatesX, lon: nearestStn.CoordinatesY },
      ],
      (data) => {
        const points = [];

        data.routes[0].sections.forEach((section) =>
          points.push(...section.points)
        );

        setFirstRoute(points);
        setRouteVisible(true);
      }
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={scanning}
        style={{ flex: 1 }}
      >
        <QRCScanner setScanedData={setScanedData} setScanning={setScanning} />
      </Modal>

      <YaMap
        ref={map}
        showUserPosition={false}
        initialRegion={{
          lat: 52.29,
          lon: 104.28,
          zoom: 18,
        }}
        onMapLoaded={() => {}}
        nightMode={dark}
        style={{ flex: 1 }}
      >
        {routeVisible && (
          <Polyline points={firsRoute} strokeWidth={4} strokeColor={"red"} />
        )}
        {currentPosition && (
          <Marker
            key={currentPosition.coords.latitude}
            point={{
              lat: currentPosition.coords.latitude,
              lon: currentPosition.coords.longitude,
            }}
            scale={2}
            visible={userVisible}
            source={require("../../assets/map_pin_user_fill.png")}
          />
        )}

        {stations.map((stn) => (
          <Marker
            key={stn.Id}
            point={{ lat: stn.CoordinatesX, lon: stn.CoordinatesY }}
            scale={0.04}
            source={require("../../assets/charging_station.png")}
            onPress={() => navigation.navigate("StationScreen", { stn: stn })}
            visible={stnVisible}
          />
        ))}
      </YaMap>

      <MapControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        myLocation={myLocation}
        makeRoute={makeRoute}
      />

      <TouchableOpacity
        onPress={async () => {
          const permission = requestCameraPermission();
          permission.then((res) => {
            if (res) {
              setScanning(true);
            }
          });
        }}
        style={{ position: "absolute", bottom: 5, left: 5 }}
      >
        <MaterialIcons name="qr-code-scanner" size={40} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

/*
lat: 52.2142,
lon: 104.2661,

lat: 52.2,
lon: 104.2662,


*/
