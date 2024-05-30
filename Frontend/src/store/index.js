import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import cartReducer from "./cart";
import productsReducer from "./products";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
