import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loaderVisible: false,
  },
  reducers: {
    isLoaderVisible(state) {
      state.loaderVisible = true;
    },
    isLoaderNotVisible(state) {
      state.loaderVisible = false;
    },
  },
});

export const { isLoaderVisible, isLoaderNotVisible } = loaderSlice.actions;

export default loaderSlice.reducer;
