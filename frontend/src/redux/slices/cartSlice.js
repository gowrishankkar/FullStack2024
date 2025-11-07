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
      const productToBeAdded = product;
      const productId = productToBeAdded.id || productToBeAdded._id;

      if (!productId) {
        return;
      }

      const incrementBy = quantity && quantity > 0 ? quantity : 1;
      state.cartQuantity += incrementBy;

      const existingProduct = state.cartProducts.find((cProduct) => {
        const currentId = cProduct.id || cProduct._id;
        return currentId === productId;
      });

      if (!existingProduct) {
        state.cartProducts.push({
          ...productToBeAdded,
          id: productId,
          indQuantity: incrementBy,
        });
      } else {
        existingProduct.indQuantity += incrementBy;
      }
    },

    removeFromCart: (state, action) => {
      const product = action.payload;
      const productId = product.id || product._id;

      if (!productId) {
        return;
      }

      state.cartQuantity -= product.indQuantity || 0;
      state.cartProducts = state.cartProducts.filter(
        (existingProduct) => {
          const currentId = existingProduct.id || existingProduct._id;
          return currentId !== productId;
        }
      );
    },

    deleteFromCart: (state, action) => {
      const productToBeRemoved = action.payload;
      const productId = productToBeRemoved.id || productToBeRemoved._id;

      if (!productId) {
        return;
      }

      const productIdx = state.cartProducts.findIndex((cProduct) => {
        const currentId = cProduct.id || cProduct._id;
        return currentId === productId;
      });
      if (productIdx === -1) {
        return;
      }

      const product = state.cartProducts[productIdx];

      if (product.indQuantity <= 1) {
        state.cartQuantity--;
        state.cartProducts = state.cartProducts.filter((existingProduct) => {
          const currentId = existingProduct.id || existingProduct._id;
          return currentId !== productId;
        });
      } else {
        state.cartProducts[productIdx].indQuantity--;
        state.cartQuantity--;
      }
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
      state.cartQuantity = 0;
    },
  },
});

export const action = cartSlice.actions;
export default cartSlice;
