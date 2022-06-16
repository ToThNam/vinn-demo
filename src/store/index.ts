import { configureStore } from "@reduxjs/toolkit";

import variantSlice from "./product-slice/variant.Slice";
import productSlice from "./product-slice/product.Slice";
import shopSlice from "./shop-slice/shopSlice";
import userSlice from "./user-slice/userSlice";

const store = configureStore({
  reducer: {
    variant: variantSlice,
    product: productSlice,
    user: userSlice,
    shop: shopSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
