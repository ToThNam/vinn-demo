import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserServices from "services/users.service";
import { RootState } from "store";
import { Iusers } from "types/users/users";

export const getUserById = createAsyncThunk(
  "admins/getUserById",
  async (id: string) => {
    const response = await UserServices.getUserById(id);
    return response;
  }
);

interface InitialStateType {
  userList: Iusers[];
  userDetail: Object;
  loading: boolean;
}

const initialState: InitialStateType = {
  userList: [],
  userDetail: {
    id: "",
    userName: "",
    email: "",
    password: "",
    profile: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      avatar: ""
    },
    lastLogin: "",
    country: "",
    status: "",
    phone: "",
    city: "",
    address: ""
  },
  loading: false
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    }
  },
  extraReducers: {
    [getUserById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserById.fulfilled.toString()]: (
      state,
      action: PayloadAction<Iusers>
    ) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [getUserById.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const { getUserDetail } = userSlice.actions;

export default userSlice.reducer;

export const userDetail = (state: RootState) => state.user.userDetail;
export const LoadingUser = (state: RootState) => state.user.loading;
