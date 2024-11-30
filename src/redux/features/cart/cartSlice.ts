import { ICartState } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ICartItem } from "./../../../interfaces/index";

const initialState: ICartState = {
  items: [],
  shippingCost: 0,
  tax: 0,
  subtotal: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        toast.success("Quantity increased");
      } else {
        state.items.push(action.payload);
        toast.success("Item added");
      }

      cartSlice.caseReducers.calculateSubtotal(state);
      cartSlice.caseReducers.calculateShippingCost(state);
      cartSlice.caseReducers.calculateTax(state);
      cartSlice.caseReducers.calculateTotalPrice(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id != action.payload);
      toast.success("Item removed");

      cartSlice.caseReducers.calculateSubtotal(state);
      cartSlice.caseReducers.calculateShippingCost(state);
      cartSlice.caseReducers.calculateTax(state);
      cartSlice.caseReducers.calculateTotalPrice(state);
    },

    clearCart: (state) => {
      state.items = [];

      state.subtotal = 0;
      state.shippingCost = 0;
      state.tax = 0;
      state.totalPrice = 0;
    },

    calculateSubtotal: (state) => {
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    calculateShippingCost: (state) => {
      const baseShippingCost = 5;
      const mediumShippingCost = 10;

      if (state.subtotal <= 100) {
        state.shippingCost = baseShippingCost;
      } else if (state.subtotal <= 500) {
        state.shippingCost = mediumShippingCost;
      } else {
        state.shippingCost = 0;
      }
    },

    calculateTax: (state) => {
      const taxRate = 0.05;
      state.tax = state.subtotal * taxRate;
    },

    calculateTotalPrice: (state) => {
      state.totalPrice = state.subtotal + state.shippingCost + state.tax;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
