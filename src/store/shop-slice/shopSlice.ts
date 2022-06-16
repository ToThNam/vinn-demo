import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import ShopServices, { UpdateShopRequest } from "services/shops.service";
import { IShop } from "types/shops/shops";
import { RootState } from "store";

export const createShop = createAsyncThunk(
  "admins/createShop",
  async (body: IShop) => {
    const response = await ShopServices.createShop(body);
    return response;
  }
);

interface InitialStateType {
  shopList: IShop[];
  shopDetail: IShop;
  loading: boolean;
}
const initialState: InitialStateType = {
  shopList: [],
  shopDetail: {
    id: "",
    key: "",
    coverShopImage: "",
    avatarShopImage: "",
    shopName: "",
    shopDescription: ""
  },
  loading: false
};
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: {
    [createShop.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createShop.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShop>
    ) => {
      state.loading = false;
      state.shopList = [...state.shopList, action.payload];
    },
    [createShop.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default shopSlice.reducer;
export const shopDetail = (state: RootState) => state.shop.shopDetail;
export const LoadingShop = (state: RootState) => state.shop.loading;
