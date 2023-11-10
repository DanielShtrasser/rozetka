import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chargingReducer from "./chargingSlice";
import stationsReducer from "./stationsSlice";
import storyReducer from "./storySlice";
import loaderReducer from "./loaderSlice";
import instructionReducer from "./instructionSlice";
import chatSocketMiddleware from "./middlewares/chatSocketMiddleware";
import { chatSocket } from "../socket";
import chatSlice from "./chatSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    charging: chargingReducer,
    stations: stationsReducer,
    story: storyReducer,
    loader: loaderReducer,
    instruction: instructionReducer,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(chatSocketMiddleware(new chatSocket())),
});
