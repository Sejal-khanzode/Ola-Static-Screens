import {
  DateValidationError,
  DesktopDatePicker,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { datePickerLabel } from "./widget/datePickerWidget";

export const DEFAULT_DISPLAY_FORMAT = "MM-DD-YYYY";

export interface datePickerProps {
  name?: string;
  styles?: React.CSSProperties;
  useCustomStyle?: boolean;
  value?: string | undefined | null;
  onChange?: (date: Date | null | undefined) => void;
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
  hideYears?: boolean;
  disableInput?: boolean;
  shouldDisableDate?: boolean;
  dontRequiredequiredCurrentYearValidation?: boolean;
}

function DatePickerFieldMoment(props: datePickerProps) {
  const {
    hasError,
    onChange,
    value,
    errorMessage,
    disablePast,
    disableFuture,
    disabled,
    disableInput,
    dontRequiredequiredCurrentYearValidation,
  } = props;

  const [inputValue, setInputValue] = useState<moment.Moment | null>(
    value ? moment(value) : null
  );
  const [internalError, setInternalError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(value ? moment(value) : null);
  }, [value]);

  const validateDate = (date: moment.Moment | null): boolean => {
    if (!date) return true;
    const year = date.year();
    const currentYear = moment().year();
    return year >= 1900 && year <= currentYear;
  };

  const handleChange = (
    value: any,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    context;
    const momentValue = value ? moment(value) : null;
    if (
      momentValue &&
      !validateDate(momentValue) &&
      !dontRequiredequiredCurrentYearValidation
    ) {
      setInternalError("Year must be between 1900 and the current year.");
      if (onChange) onChange(null);
    } else {
      setInternalError(null);
      if (onChange) onChange(momentValue?.toDate() ?? null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        value={inputValue}
        onChange={handleChange}
        format={DEFAULT_DISPLAY_FORMAT}
        sx={{
          width: "100%",
          "& label": {
            ...datePickerLabel,
          },
          "& .MuiInputBase-root": {
            height: "36px",
          },
          "& .MuiOutlinedInput-root": {
            height: "36px",
          },
          "& fieldset": {
            border:
              hasError || internalError
                ? "1px solid #d32f2f"
                : "1px solid #C9CBCC",
            borderRadius: "5px",
          },
          "& input": {
            color: "black",
            fontFamily: "Figtree !important",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "120%",
            letterSpacing: "0.024px",
            padding: "6px",
          },
          "& .MuiIconButton-root": {
            color: "#BCBCBC",
            padding: "4px",
            width: "32px",
            height: "32px",
          },
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            helperText: internalError || errorMessage,
            error: Boolean(hasError || internalError),
            InputProps: {
              sx: {
                flexDirection: "row-reverse",
              },
            },
          },
          field: {
            readOnly: disableInput,
          },
        }}
        disablePast={disablePast}
        disableFuture={disableFuture}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
}

export default DatePickerFieldMoment;
