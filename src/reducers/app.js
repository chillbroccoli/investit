import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPhotos } from "../api";

const initialState = {
  list: [],
  total: undefined,
  isLoading: false,
};

export const fetchData = createAsyncThunk("app/fetchData", async (options) => {
  return await fetchPhotos(options);
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.list.push(...action.payload.images);
      state.total = action.payload.total;
      state.isLoading = false;
    });
  },
});

export default appSlice.reducer;
