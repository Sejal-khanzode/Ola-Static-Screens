import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setTheme,
  setLanguage,
  toggleNotifications,
  setFontSize,
  resetPreferences,
} from './userPreferencesSlice';

export const useUserPreferences = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.userPreferences);

  return {
    preferences,
    setTheme: (theme: 'light' | 'dark') => dispatch(setTheme(theme)),
    setLanguage: (language: string) => dispatch(setLanguage(language)),
    toggleNotifications: () => dispatch(toggleNotifications()),
    setFontSize: (size: 'small' | 'medium' | 'large') => dispatch(setFontSize(size)),
    resetPreferences: () => dispatch(resetPreferences()),
  };
}; 

