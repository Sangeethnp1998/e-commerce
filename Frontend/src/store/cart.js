import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    restoreCart: (state) => {
      const products = localStorage.getItem("cart");
      if (products) {
        state.products = JSON.parse(products);
      }
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      state.products = [];
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product._id === action.payload.id,
      );
      product.quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const selectCartProducts = (state) => state.cart.products;

export const {
  addToCart,
  removeFromCart,
  restoreCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
