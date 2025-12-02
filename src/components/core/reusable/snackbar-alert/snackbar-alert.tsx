import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setSnackbarOff } from "../../../../redux/actions/snackbar-actions";
import {useReduxSelector} from "../../../../redux/store";

const SNACKBAR_HIDE_DURATION = 4000

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  },
);

export const AlertSeverity = {
  SUCCESS: "success" as AlertColor,
  ERROR: "error" as AlertColor,
  WARNING: "warning" as AlertColor,
  INFO: "info" as AlertColor,
};

const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const isSnackbarOpen = useReduxSelector(
    (state: any) => state.snackbarReducer.isSnackbarOpen
  ) as boolean;

  const severity = useReduxSelector(
    (state: any) => state.snackbarReducer.severity
  ) as AlertColor;
  const message = useReduxSelector(
    (state: any) => state.snackbarReducer.message
  ) as string;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event;
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbarOff());
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={SNACKBAR_HIDE_DURATION}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
