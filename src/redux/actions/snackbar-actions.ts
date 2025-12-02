import { AlertColor } from "@mui/material/Alert";

export const SNACKBAR_ON = "SNACKBAR_ON";
export const SNACKBAR_OFF = "SNACKBAR_OFF";

export const setSnackbarOn = (payload: SnackbarPayload) => {
  return {
    type: SNACKBAR_ON,
    payload,
  };
};

export const setSnackbarOff = () => {
  return {
    type: SNACKBAR_OFF,
  };
};

export type SnackbarPayload = {
  severity: AlertColor;
  message: string;
  data?: string;
};
