import { createSlice } from "@reduxjs/toolkit";
import { Clinic } from '../../sdk/requests/types.gen';

interface ClinicState {
  data: Clinic | null;
}

const initialState: ClinicState = {
  data: null,
};

const selectedClinicReducer = createSlice({
  name: "selectedClinicReducer",
  initialState,
  reducers: {
    setSelectedClinic(state, action) {
      state.data = action.payload;
    },
    resetSelectedClinic(state) {
      state.data = null;
    },
  },
});

export const { setSelectedClinic, resetSelectedClinic } =
  selectedClinicReducer.actions;

export default selectedClinicReducer.reducer;
