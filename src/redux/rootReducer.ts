import { combineReducers } from '@reduxjs/toolkit';
import userPreferencesReducer from './features/userPreferences/userPreferencesSlice';
import userReducer from "./user/userReducer";
import snackbarReducer from './reducers/snackbarReducer';
import loaderReducer from './reducers/loaderReducer';
import clinicReducer from './reducers/clinicReducer';
import patientReducer from './reducers/patientReducer';
import userProfileReducer from './reducers/userProfileReducer';
import patientClinicReducer from './reducers/patientClinicReducer';

export const rootReducer = combineReducers({
  user:userReducer,
  snackbarReducer,
  userPreferences: userPreferencesReducer,
  loaderReducer,
  clinicReducer,
  patientReducer,
  userProfileReducer,
  patientClinicReducer
}); 