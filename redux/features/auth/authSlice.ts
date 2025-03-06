/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  firstName: string;
  lastName: string;
  department: string;
  batch: number;
  registrationNo: string;
  rollNo: number;
  semester: number;
  phone: number;
  email: string;
  password: string;
};

type TInitialState = {
  user: null | TUser;
};

const initialState: TInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, Logout } = authSlice.actions;

export default authSlice.reducer;

// export single user from state

export const useSelectCurrentUser = (state: RootState): TUser | null =>
  state.auth.user;
