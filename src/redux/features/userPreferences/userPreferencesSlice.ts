import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const initialState: UserPreferencesState = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 'medium',
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    resetPreferences: () => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setTheme,
  setLanguage,
  toggleNotifications,
  setFontSize,
  resetPreferences,
} = userPreferencesSlice.actions;

// Export reducer
export default userPreferencesSlice.reducer; 