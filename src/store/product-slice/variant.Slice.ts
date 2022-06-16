import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { IVariant, IAttribute } from "types/products/products";
import { RootState } from "store";

export interface InitialStateType {
  loading: boolean;
  variantList: IVariant[];
  attributeList: IAttribute[];
}

const initialState: InitialStateType = {
  loading: false,
  variantList: [],
  attributeList: []
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    getVariant(state, action: PayloadAction<IAttribute[]>) {
      state.attributeList = action.payload;
      state.variantList = [];
      const handleCombine = ([head, ...[body, ...tail]]: any[]): string[] => {
        if (!body) return head;
        const combined = body.reduce(
          (acc: string[], x: string) =>
            acc.concat(head.map((h: string) => `${h}/${x}`)),
          []
        );
        return handleCombine([combined, ...tail]);
      };

      const handleOption = action.payload.map((el) => {
        const optioned = el.options.map((ele) => ele.name);
        return optioned;
      });

      const result = handleCombine(handleOption);
      result.forEach((el) =>
        state.variantList.push({
          id: uuidv4(),
          key: uuidv4(),
          variantName: el,
          discountPrice: 0,
          originPrice: 0,
          quantity: 0,
          sku: ""
        })
      );
    },

    updateVariant(state, action: PayloadAction<IVariant>) {
      state.variantList = state.variantList.map((element) => {
        if (element.id === action.payload.id) {
          element = action.payload;
        }
        return element;
      });
    },

    deleteAllVariant(state) {
      state.variantList = [];
    }
  }
});

export default variantSlice.reducer;
export const variantActions = variantSlice.actions;

export const listVariant = (state: RootState) => state.variant.variantList;
export const listAttribute = (state: RootState) => state.variant.attributeList;
