import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chatConnection: false,
    chatFetchStatus: null,
    chatFetchError: null,
  },
  reducers: {
    addStory(state, action) {
      state.messages.push(action.payload.Data);
    },
    addNewMessage(state, action) {
      state.messages.push(action.payload);
    },
    deleteMessages(state) {
      state.messages = [];
    },
  },
});

export const { addStory, addNewMessage, deleteMessages } = chatSlice.actions;

export default chatSlice.reducer;
