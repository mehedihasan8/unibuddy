/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TInitialState = {
  user: null | TUser;
  token: null | object;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    Logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, Logout } = authSlice.actions;

export default authSlice.reducer;

// export single user or token

export const useCurrentToken = (state: any) => state.auth.token;
export const useSelectCurrentUser = (state: any) => state.auth.user;
