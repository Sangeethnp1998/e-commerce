import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../config/config";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isRestored: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    signOut: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
    restoreUser: (state) => {
      const userJson = localStorage.getItem("userInfo");
      if (userJson) {
        state.user = JSON.parse(userJson);
      }
      state.isRestored = true;
    },
  },
});

export const signIn = (body, onSuccess, onError) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.post(`${config.apiUrl}user/login`, body);
    dispatch(setUser(response.data));
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    onSuccess();
  } catch (error) {
    console.error(error);
    onError(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const signUp = (body, onSuccess, onError) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.post(`${config.apiUrl}user`, body);
    dispatch(setUser(response.data));
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    onSuccess();
  } catch (error) {
    console.error(error);
    onError(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const selectAuth = (state) => state.auth;

export const { setUser, setIsLoading, signOut, restoreUser } =
  authSlice.actions;

export default authSlice.reducer;
