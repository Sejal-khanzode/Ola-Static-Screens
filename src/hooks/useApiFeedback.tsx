import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AlertSeverity } from "../components/core/reusable/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../models/response/error-response";
import { setSnackbarOn } from "../redux/actions/snackbar-actions";

const useApiFeedback = (
  isError: boolean,
  error: unknown,
  isSuccess?: boolean,
  successMessage?: string,
  onSuccessCallback?: () => void,
  disable?: boolean
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as ErrorResponseEntity)?.body?.message || "An error occurred.";

      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: errorMessage,
        })
      );
    }
  }, [isError, error, dispatch]);

  useEffect(() => {
    if (isSuccess && !disable) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.SUCCESS,
          message: successMessage || "",
        })
      );

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    }
  }, [isSuccess, successMessage, dispatch, disable]);
};

export default useApiFeedback;
