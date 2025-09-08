import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunkMiddleWare from "redux-thunk";
// 2

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    cartReducer: persistedReducer,
  },
  middleware: [thunkMiddleWare],
});

export const persistor = persistStore(store);
