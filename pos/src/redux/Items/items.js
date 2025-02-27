import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  cartItems: [],
  cartTotalItems: 0,
  subTotal: 0,
};

// Helper function to update cart totals
const updateCartTotals = (state) => {
  state.cartTotalItems = state.cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  state.subTotal = state.cartItems.reduce((acc, item) => acc + item.amount, 0);
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.value = action.payload;
    },
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.item_name === action.payload.item_name
      );
      if (item) {
        item.qty += 1;
        item.amount = item.rate * item.qty;
      } else {
        state.cartItems.push({
          ...action.payload,
          qty: 1,
          amount: action.payload.rate,
        });
      }
      updateCartTotals(state);
    },
    subtractFromCart: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.item_name === action.payload.item_name
      );
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
          item.amount = item.rate * item.qty;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.item_name !== action.payload.item_name
          );
        }
        updateCartTotals(state);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.item_name !== action.payload.item_name
      );
      updateCartTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalItems = 0;
      state.subTotal = 0;
    },
  },
});

export const {
  setItems,
  addToCart,
  subtractFromCart,
  removeFromCart,
  clearCart,
} = itemsSlice.actions;

export default itemsSlice.reducer;
