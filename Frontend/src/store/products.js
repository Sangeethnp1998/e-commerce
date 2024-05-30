import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../config/config";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const userJson = localStorage.getItem("userInfo");
    if (!userJson) return;
    const user = JSON.parse(userJson);
    const response = await axios.get(`${config.apiUrl}product/list`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch(setProducts(response.data.products));
  } catch (error) {
    console.error(error);
  }
};

export const selectProducts = (state) => state.products.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
