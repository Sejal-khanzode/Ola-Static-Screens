import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useEffect, useState } from "react";
import moment from "moment";
// import { datePickerLabel, datePickerStyle } from "./widget/datePickerWidget";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
export const DEFAULT_DISPLAY_FORMAT = "MM/DD/YYYY";

export interface datePickerProps {
  name?: string;
  styles?: React.CSSProperties;
  useCustomStyle?: boolean;
  value?: string;
  onChange?: (date: Date | null) => void;
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
  disableInput?: boolean;
  shouldDisableDate?: boolean;
  dontRequiredequiredCurrentYearValidation?: boolean;
}
function DatePickerFieldSlot(props: datePickerProps) {
  const {
    hasError,
    onChange,
    value,
    errorMessage,
    disablePast,
    disableFuture,
    disabled,
    disableInput,
    shouldDisableDate,
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

    const year = moment(date).year();
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
      if (onChange) onChange(momentValue ? momentValue.toDate() : null);
    }
  };

  const disableDatesBeforeToday = (
    date: moment.Moment | import("dayjs").Dayjs
  ) => {
    const momentDate = moment.isMoment(date) ? date : moment(date.valueOf());
    return momentDate.isBefore(moment(), "day");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          value={inputValue}
          onChange={handleChange}
          format={DEFAULT_DISPLAY_FORMAT}
          // @ts-ignore
          shouldDisableDate={
            shouldDisableDate ? disableDatesBeforeToday : undefined
          }
          sx={{
            width: "100%",
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              height: "32px",
              padding: "0px 8px",
              "& input": {
                padding: "4px",
                height: "24px",
                fontSize: "14px",
              },
            },
            "& .MuiFormLabel-root": {
              transform: "translate(14px, -9px) scale(0.75)",
            },
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              helperText:
                (hasError || internalError) &&
                (internalError || (errorMessage as string | undefined)),
              error: Boolean(hasError || internalError),
            },
            field: {
              readOnly: disableInput ? true : false,
            },
          }}
          disablePast={disablePast}
          disableFuture={disableFuture}
          disabled={disabled}
        />
      </LocalizationProvider>
    </>
  );
}

export default DatePickerFieldSlot;
