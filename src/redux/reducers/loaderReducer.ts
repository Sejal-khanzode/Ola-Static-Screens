import { createSlice } from "@reduxjs/toolkit";

export type LoaderState = {
  showLoaderStatus: boolean;
};

const initialState: LoaderState = {
  showLoaderStatus: false,
};

const loaderReducer = createSlice({
  name: "loaderReducer",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.showLoaderStatus = true;
    },
    hideLoader: (state) => {
      state.showLoaderStatus = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderReducer.actions;

export default loaderReducer.reducer;