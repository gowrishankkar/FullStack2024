// to create a slice -> redux;

import { createSlice } from "@reduxjs/toolkit";
//1
const cartSlice = createSlice({
  name: "countername",
  initialState: {
    cartQuantity: 0,
    cartProducts: [],
  },
  // all the update logic
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      if (quantity && quantity > 0) {
        state.cartQuantity += quantity;
      } else {
        state.cartQuantity++;
      }
      const productToBeAdded = product;
      const requiredProduct = state.cartProducts.find((cProduct) => {
        return cProduct.id == productToBeAdded.id;
      });
      if (requiredProduct == undefined) {
        // not present
        state.cartProducts.push({ ...productToBeAdded, indQuantity: quantity ? quantity : 1 });
      } else {
        // already present
        quantity
          ? quantity + requiredProduct.indQuantity
          : requiredProduct.indQuantity++;
      }
    },

    removeFromCart: (state, action) => {
      state.cartQuantity -= action.payload.indQuantity;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },

    deleteFromCart: (state, action) => {
      const productToBeAdded = action.payload;
      const productIdx = state.cartProducts.findIndex((cProduct) => {
        return cProduct.id == productToBeAdded.id;
      });
      if (productIdx == -1) {
      } else {
        let product = state.cartProducts[productIdx];
        if (product.indQuantity == 1) {
          state.cartProducts[productIdx].indQuantity--;
          state.cartQuantity--;
          state.cartProducts = state.cartProducts.filter(
            (product) => product.id !== action.payload.id
          );
        } else {
          state.cartProducts[productIdx].indQuantity--;
          state.cartQuantity--;
        }
      }
    },
  },
});

export const action = cartSlice.actions;
export default cartSlice;
