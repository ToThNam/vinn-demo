import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import ProductServices, {
  UpdateProductRequest
} from "services/products.service";
import { IProduct } from "types/products/products";
import { RootState } from "store";

export const getAllProduct = createAsyncThunk(
  "admins/getAllProduct",
  async () => {
    const response = await ProductServices.getAllProduct();
    return response;
  }
);

export const getProductById = createAsyncThunk(
  "admins/getProductById",
  async (id: string) => {
    const response = await ProductServices.getProductById(id);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "admins/createProduct",
  async (body: UpdateProductRequest) => {
    const response = await ProductServices.createProduct(body);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "admins/updateProduct",
  async (params: { id: string; body: UpdateProductRequest }) => {
    const response = await ProductServices.updateProduct(
      params.id,
      params.body
    );
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "admins/deleteProduct",
  (ids: string[]) => {
    for (let i = 0; i < ids.length; i++) {
      ProductServices.deleteProduct(ids[i]);
    }
    return ids;
  }
);

export const deleteProductThenGetAllProduct =
  (ids: string[]) => async (dispatch: (arg0: any) => any) => {
    await dispatch(deleteProduct(ids));
    await dispatch(getAllProduct());
  };

interface InitialStateType {
  productList: IProduct[];
  productDetail: IProduct;
  loading: boolean;
}

const initialState: InitialStateType = {
  productList: [],
  productDetail: {
    id: "",
    key: "",
    name: "",
    image: [],
    category: {
      title: "",
      key: ""
    },
    description: "",
    status: "",
    originalPrice: 0,
    discountPrice: 0,
    productSku: "",
    productQuantity: 0,
    createdDate: "",
    attributes: [],
    variants: []
  },
  loading: false
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAllProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.loading = false;
      state.productList = [...action.payload];
    },
    [getAllProduct.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getProductById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getProductById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IProduct>
    ) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    [getProductById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<IProduct>
    ) => {
      state.loading = false;
      state.productList = [...state.productList, action.payload];
    },
    [createProduct.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<IProduct>
    ) => {
      state.loading = false;
      state.productList = state.productList.map((element) => {
        if (element.id === action.payload.id) {
          element = action.payload;
        }
        return element;
      });
    },
    [updateProduct.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteProduct.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      const update = state.productList.filter(
        (product: IProduct) => product.id !== action.payload
      );
      state.productList = [...update];
    },
    [deleteProduct.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default productSlice.reducer;

export const ListProduct = (state: RootState) => state.product.productList;
export const DetailProduct = (state: RootState) => state.product.productDetail;
export const LoadingProduct = (state: RootState) => state.product.loading;
