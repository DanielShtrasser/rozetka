import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import i18next from "../utils/i18next";

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://rozetkaweb.ru/api/Station/GetAllStations",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("station fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    stations: [],
    connectors: [],
    stationsFetchStatus: null,
    stationsFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStations.pending, (state, action) => {
      state.stationsFetchStatus = "loading";
      state.stationsFetchError = null;
    });
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.stationsFetchStatus = "resolved";
      state.stationsFetchError = null;

      const data = JSON.parse(action.payload);

      state.stations = [...data.Stations];
      state.connectors = [];
      state.stations.forEach((stn) =>
        stn.Connectors.forEach((c) => state.connectors.push(c))
      );
      // console.log("state.connectors: ", state.connectors);
    });
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.stationsFetchStatus = "rejected";
      state.stationsFetchError = action.payload;

      console.log("fetchStations.rejected: ", action.payload);
      Toast.show({
        type: "error",
        text1: i18next.t("ошибка_получения_перечня_станций"),
      });
    });
  },
});

export default stationsSlice.reducer;
