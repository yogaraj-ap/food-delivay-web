import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.splice(action.payload, 1);
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
