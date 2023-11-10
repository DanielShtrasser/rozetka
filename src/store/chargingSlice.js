import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import openLink from "../utils/openLink";
import Toast from "react-native-toast-message";
import i18next from "../utils/i18next";

export const getSocketData = createAsyncThunk(
  "charging/getSocketData",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://rozetkaweb.ru/api/Home/GetSocketData",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rozetkaId: id }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("charging fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getActiveSocketData = createAsyncThunk(
  "charging/getActiveSocketData",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://rozetkaweb.ru/api/Home/GetSocketData",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rozetkaId: id }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("charging fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startCharging = createAsyncThunk(
  "charging/startCharging",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch("https://rozetkaweb.ru/api/Home/Start", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RozetkaId: id, OrderType: 4 }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("charging fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const endCharging = createAsyncThunk(
  "charging endCharging",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch("https://rozetkaweb.ru/api/Home/Stop", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rozetkaId: id }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("charging fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chargingSlice = createSlice({
  name: "charging",
  initialState: {
    isCharging: false,
    activeSocket: null,
    activeStation: null,
    urlForPay: null,

    duration: 0,
    currentKwt: 0,
    power: 0,
    voltage: 0,
    currentTotal: 0,
    status: 0,
    activeSocketStatus: 0,

    chargingFetchError: null,
    chargingFetchStatus: null,
  },
  reducers: {
    isChargingToggle(state) {
      state.isCharging = !state.isCharging;
    },
    setActiveSocket(state, action) {
      state.activeSocket = action.payload;
      console.log("state.activeSocket: ", state.activeSocket);
    },
    setActiveStation(state, action) {
      state.activeStation = action.payload;
      console.log("state.activeStation: ", state.activeStation);
    },
    setActiveStatus(state, action) {
      state.activeSocketStatus = action.payload;
      console.log("state.activeSocketStatus: ", state.activeSocketStatus);
    },
    setStatus(state, action) {
      state.status = action.payload;
      console.log("state.socketStatus: ", state.socketStatus);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startCharging.pending, (state) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "pending";
    });
    builder.addCase(startCharging.fulfilled, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "fulfilled";

      console.log("startCharging.fulfilled: ", action.payload);
      const data = JSON.parse(action.payload);
      if (data.Success) {
        state.isCharging = true;
        openLink(data.Url);
      }
    });
    builder.addCase(startCharging.rejected, (state, action) => {
      state.chargingFetchError = action.payload;
      state.chargingFetchStatus = "rejected";

      console.log("startCharging.rejected: ", action.payload);
      Toast.show({
        type: "error",
        text1: i18next.t("неудалось_начать_зарядку"),
        text2: i18next.t("попробуйте_снова"),
      });
    });

    builder.addCase(endCharging.pending, (state) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "pending";
    });
    builder.addCase(endCharging.fulfilled, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "fulfilled";

      const data = JSON.parse(action.payload);

      if (data.Success) {
        state.isCharging = false;
        state.activeSocketStatus = 0;
        state.activeStation = null;
        state.activeSocket = null;
      } else {
        console.log("endCharging.fulfilled: ", data);
      }
    });
    builder.addCase(endCharging.rejected, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "rejected";

      console.log("endCharging.rejected: ", action.payload);
      Toast.show({
        type: "error",
        text1: i18next.t("неудалось_закончить_зарядку"),
        text2: i18next.t("попробуйте_снова"),
      });
    });

    builder.addCase(getSocketData.pending, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "pending";
    });
    builder.addCase(getSocketData.fulfilled, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "fulfilled";

      const data = JSON.parse(action.payload);
      state.status = data.Status;
    });
    builder.addCase(getSocketData.rejected, (state, action) => {
      state.chargingFetchError = action.payload;
      state.chargingFetchStatus = "rejected";
      console.log("getSocketData.rejected: ", action.payload);
    });

    builder.addCase(getActiveSocketData.pending, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "pending";
    });
    builder.addCase(getActiveSocketData.fulfilled, (state, action) => {
      state.chargingFetchError = null;
      state.chargingFetchStatus = "fulfilled";

      const data = JSON.parse(action.payload);
      console.log("getActiveSocketData: ", data);

      state.power = data.Power;
      state.voltage = data.Voltage;
      state.currentKwt = data.CurrentKwt;
      state.currentTotal = data.CurrentTotal;
      state.duration = data.Duration;
      state.activeSocketStatus = data.Status;

      if (state.activeSocketStatus !== 2) {
        state.activeSocket = null;
        state.activeStation = null;
        state.isCharging = false;

        state.power = null;
        state.voltage = null;
        state.currentKwt = null;
        state.currentTotal = null;
        state.duration = null;
      }
    });
    builder.addCase(getActiveSocketData.rejected, (state, action) => {
      state.chargingFetchError = action.payload;
      state.chargingFetchStatus = "rejected";
      console.log("getActiveSocketData.rejected: ", action.payload);
    });
  },
});

export const {
  isChargingToggle,
  setActiveSocket,
  setActiveStation,
  setActiveStatus,
  setStatus,
  setRedirectedToTheChargingPage,
  setRedirectedToTheSocketPage,
} = chargingSlice.actions;

export default chargingSlice.reducer;
