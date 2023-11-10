import React from "react";
import { useSelector } from "react-redux";

import Charging from "../components/Charging";
import NotCharging from "../components/NotCharging";

export default function ChargingScreen() {
  const { isCharging } = useSelector((state) => state.charging);

  if (isCharging) {
    return <Charging />;
  } else {
    return <NotCharging />;
  }
}
