// import { AlertColor } from "@mui/material/Alert";
// import { ActionType } from "../action-type";
import {
  SNACKBAR_ON,
  SNACKBAR_OFF,
  SnackbarPayload,
} from "../actions/snackbar-actions";

type AlertColor = "success" | "info" | "warning" | "error";
export interface Action {
  type: string;
  payload: unknown;
}

export interface ActionType<T = any> {
  type: string;
  payload: T;
}


type SnackbarState = {
  isSnackbarOpen: boolean;
  severity?: AlertColor;
  message?: string;
};

const initialState: SnackbarState = {
  isSnackbarOpen: false,
  message: "",
};

const snackbarReducer = (
  state = initialState,
  action: ActionType<SnackbarPayload>,
): SnackbarState => {
  switch (action.type) {
    case SNACKBAR_ON:
      return {
        ...state,
        isSnackbarOpen: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    case SNACKBAR_OFF:
      return { ...state, isSnackbarOpen: false };
    default:
      return state;
  }
};

export default snackbarReducer;
