import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientClinic } from 'src/sdk/requests';

export type PatientClinicState = {
  patientClinicData: PatientClinic | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: PatientClinicState = {
  patientClinicData: null,
  isLoading: false,
  error: null,
};

const patientClinicReducer = createSlice({
  name: 'patientClinicReducer',
  initialState,
  reducers: {
    setPatientClinicData: (state, action: PayloadAction<PatientClinic>) => {
      state.patientClinicData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPatientClinicLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPatientClinicError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearPatientClinicData: state => {
      state.patientClinicData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPatientClinicData,
  setPatientClinicLoading,
  setPatientClinicError,
  clearPatientClinicData,
} = patientClinicReducer.actions;

export default patientClinicReducer.reducer;

