import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserProfileState = {
  userProfile: any | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserProfileState = {
  userProfile: null,
  isLoading: false,
  error: null,
};

const userProfileReducer = createSlice({
  name: 'userProfileReducer',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUserProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUserProfile: state => {
      state.userProfile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUserProfile, setUserProfileLoading, setUserProfileError, clearUserProfile } =
  userProfileReducer.actions;

export default userProfileReducer.reducer;

