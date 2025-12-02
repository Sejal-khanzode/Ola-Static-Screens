import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUserData, setLoading, setError, clearUserData } = userSlice.actions;
export default userSlice.reducer; 