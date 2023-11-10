import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import i18next from "../utils/i18next";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("https://rozetkaweb.ru/api/User/GetData", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {},
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async function (phone = " ", { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://rozetkaweb.ru/api/User/SmsAuthorize",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MobilePhone: phone,
            Uuid: "0",
            SmsCode: 0,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLogOut = createAsyncThunk(
  "auth/fetchLogOut",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("https://rozetkaweb.ru/api/User/Logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userId: null,
    userStatus: "NotAuthenticated",
    userPhone: 0,
    balance: 0,
    isActiveCharge: false,
    activeSocketId: null,
    authFetchStatus: null,
    authError: null,
    userStatus: null,
    userError: null,
  },
  reducers: {
    IsActiveChargeToggle(state, action) {
      state.isActiveCharge = !state.isActiveCharge;
    },
    setIsAuthTrue(state) {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.userError = null;
      state.userStatus = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userError = null;
      state.userStatus = "resolved";

      const data = JSON.parse(action.payload);
      console.log("fetchUser.fulfilled: ", data);

      if (data.Status == "Authenticated" && !state.isAuth) state.isAuth = true;

      if (state.isAuth) {
        const data = JSON.parse(action.payload);
        state.userPhone = data?.MobilePhone;
        state.userStatus = data?.Status;
        state.balance = data?.Balance;
        state.isActiveCharge = data?.IsActiveCharge;
        data?.SocketId ? (state.activeSocketId = data.SocketId) : null;
        state.userId = data?.UserId;
      }
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userError = action.payload;
      state.userStatus = "rejected";

      Toast.show({
        type: "error",
        text1: i18next.t("ошибка_получения_даннных_пользователя"),
      });
    }),
      builder.addCase(fetchAuth.pending, (state, action) => {
        state.userError = null;
        state.userStatus = "loading";
      });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.authError = null;
      state.authFetchStatus = "resolved";

      const res = JSON.parse(action.payload);
      if (res.Success) {
        console.log("authentication Success");
        state.isAuth = true;
      }
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.authError = action.payload;
      state.authFetchStatus = "rejected";

      console.log("fetchAuth.rejected: ", state.authError);
      Toast.show({
        type: "error",
        text1: i18next.t("ошибка_авторизации"),
        text2: i18next.t("попробуйте_снова"),
      });
    }),
      builder.addCase(fetchLogOut.pending, (state, action) => {
        // state.authError = null;
        // state.authFetchStatus = "loading";
      });
    builder.addCase(fetchLogOut.fulfilled, (state, action) => {
      // state.authError = null;
      // state.authFetchStatus = "resolved";

      const res = JSON.parse(action.payload);
      if (res.Success) {
        state.isAuth = false;
        state.userStatus = "NotAuthenticated";
        state.userPhone = 0;
        state.balance = 0;
      }
      console.log("isAuth from fetchLogOut.fulfilled: ", state.isAuth);
    });
    builder.addCase(fetchLogOut.rejected, (state, action) => {
      // state.authError = action.payload;
      // state.authFetchStatus = "rejected";

      console.log("fetchLogOut.rejected");
    });
  },
});

export const { setIsAuthTrue } = authSlice.actions;

export default authSlice.reducer;
