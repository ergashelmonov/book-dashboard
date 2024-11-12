import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const req = await axiosInstance.get("/products").then((data) => data.data);

  return req;
});

export const delProducts = createAsyncThunk(
  "product/delProducts",
  async (id: number, { dispatch }) => {
    const req = await axiosInstance
      .delete(`/products/${id}`)
      .then((data) => data.data);

    dispatch(getProducts())
    dispatch(setDel(false));
    return req;
  }
);
export const postProducts = createAsyncThunk(
  "product/postProducts",
  async (
    obj: {
      name: string;
      description: string;
      image: string;
      price: string;
    },
    { dispatch }
  ) => {
    const req = await axiosInstance
      .post(`/products`, obj)
      .then((data) => data.data);

    dispatch(getProducts());
    return req;
  }
);
export const editProducts = createAsyncThunk(
  "product/editProducts",
  async (
    obj: {
      id: number;
      name: string;
      description: string;
      price: string;
    },
    { dispatch }
  ) => {
    const req = await axiosInstance
      .patch(`/products/${obj.id}`, obj)
      .then((data) => data.data);

    dispatch(getProducts());
    dispatch(setEdit(false));
    return req;
  }
);
export const notif = createAsyncThunk(
  "product/notif",
  async (
    obj: {
      id: number;
      name: string;
      description: string;
      price: string;
      image: string;
    },
    { dispatch }
  ) => {
    const req = await axiosInstance
      .post(`/notification/`, obj)
      .then((data) => data.data);

    dispatch(getNotif());
    return req;
  }
);
export const orderProducts = createAsyncThunk(
  "product/orderProducts",
  async (
    obj: {
      id: number;
      name: string;
      description: string;
      price: string;
      image: string;
    },
    { dispatch }
  ) => {
    const req = await axiosInstance
      .post(`/cart`, obj)
      .then((data) => data.data);

    dispatch(notif(obj));
    return req;
  }
);
export const getNotif = createAsyncThunk("product/notif", async () => {
  const req = await axiosInstance
    .get(`/notification`)
    .then((data) => data.data);

  return req;
});
export const delNotif = createAsyncThunk(
  "product/notif",
  async (id: number, { dispatch }) => {
    const req = await axiosInstance
      .delete(`/notification/${id}`)
      .then((data) => data.data);

    dispatch(getNotif());

    return req;
  }
);
export const getOrderProducts = createAsyncThunk(
  "product/orderProducts",
  async () => {
    const req = await axiosInstance.get(`/cart`).then((data) => data.data);

    return req;
  }
);

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ProductState {
  products: Product[];
  notif: Product[];
  orders: Product[];
  del: boolean;
  edit: boolean;
  not: number;
}
const initialState: ProductState = {
  products: [],
  notif: [],
  orders: [],
  del: false,
  edit: false,
  not: 0,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDel(state, action) {
      state.del = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
  },
  extraReducers(api) {
    api.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    api.addCase(getOrderProducts.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    api.addCase(getNotif.fulfilled, (state, action) => {
     
      state.notif = action.payload;
      state.not = action.payload.length;
    });
  },
});
export const { setDel, setEdit } = productSlice.actions;
export default productSlice.reducer;
