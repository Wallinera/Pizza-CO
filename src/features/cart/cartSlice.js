import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload: { pizzaId, name, quantity, unitPrice, totalPrice }
      const existingItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
        return;
      }

      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload:  pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload:  pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
        return;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;

        // calling an action inside an another action
        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);

        return;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    updateCartForReorder(state, action) {
      state.cart = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  updateCartForReorder,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalPrice = (state) =>
  state.cart.cart
    .map((item) => item.totalPrice)
    .reduce((acc, cur) => acc + cur, 0);

export const getTotalPizzas = (state) =>
  state.cart.cart
    .map((item) => item.quantity)
    .reduce((acc, cur) => acc + cur, 0);
