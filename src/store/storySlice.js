import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import i18next from "../utils/i18next";

export const fetchStory = createAsyncThunk(
  "story/fetchStory",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("https://rozetkaweb.ru/api/User/GetOrders");

      if (!response.ok) {
        throw new Error("story fetch error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    story: {},
    storyFetchStatus: null,
    storyFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStory.pending, (state, action) => {
      state.storyFetchStatus = "loading";
      state.storyFetchError = null;
    });
    builder.addCase(fetchStory.fulfilled, (state, action) => {
      state.storyFetchStatus = "resolved";
      state.storyFetchError = null;

      state.story = action.payload;
    });
    builder.addCase(fetchStory.rejected, (state, action) => {
      state.storyFetchStatus = "rejected";
      state.storyFetchError = action.payload;

      console.log("fetchStory.rejected: ", action.payload);
      Toast.show({
        type: "error",
        text1: i18next.t("ошибка_получения_даннных_истории"),
      });
    });
  },
});

export const {} = storySlice.actions;

export default storySlice.reducer;
