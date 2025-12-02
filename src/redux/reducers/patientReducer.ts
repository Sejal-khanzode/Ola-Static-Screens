import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientClinic } from 'src/sdk/requests';

interface PatientState {
  currentPatient: PatientClinic | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  currentPatient: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<PatientClinic>) => {
      state.currentPatient = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPatientLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPatientError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPatientData: (state) => {
      state.currentPatient = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setPatientData, setPatientLoading, setPatientError, clearPatientData } = patientSlice.actions;
export default patientSlice.reducer; 