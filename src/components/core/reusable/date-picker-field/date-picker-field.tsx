import { Typography } from "@mui/material";
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateRangeIcon } from "@mui/x-date-pickers/icons";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { errorStyle } from "../custom-input/widgets/customInputStyles";

export const CALENDAR = "Calendar";
export type StringMap2 = {
  [key: string]: string | boolean | number;
};

export interface datePickerProps {
  name?: string;
  styles?: React.CSSProperties;
  useCustomStyle?: boolean;
  value?: Dayjs | null;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  onChange: (date: Dayjs | null) => void;
  hasError?: boolean;
  errorMessage?: string;
  disableFuture?: boolean;
  label?: string;
  disablePast?: boolean;
  bgWhite?: boolean;
  format?: string;
}
function DatePickerField(props: datePickerProps) {
  const {
    bgWhite,
    hasError,
    onChange,
    value,
    useCustomStyle,
    maxDate,
    disableFuture,
    disablePast,
    label,
    minDate,
    format,
  } = props;

  const [cleared, setCleared] = useState<boolean>(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const [inputValue, setInputValue] = useState(
    (value && (dayjs(value) as unknown as Dayjs)) || null
  );

  useEffect(() => {
    setInputValue((value && (dayjs(value) as unknown as Dayjs)) || null);
  }, [value]);

  const handleChange = (
    value: any,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    context;
    onChange(dayjs(value));
  };

  const textFieldProps: StringMap2 = { fullWidth: true };
  if (!useCustomStyle) textFieldProps["placeholder"] = CALENDAR;
  if (label) textFieldProps["placeholder"] = label;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={inputValue}
          closeOnSelect={true}
          onChange={handleChange}
          format={format ? format : "MM-DD-YYYY"}
          maxDate={maxDate ? (dayjs(maxDate) as unknown as Dayjs) : undefined}
          minDate={minDate ? (dayjs(minDate) as unknown as Dayjs) : undefined}
          disableFuture={disableFuture}
          disablePast={disablePast}
          slotProps={{
            textField: { ...textFieldProps, error: hasError },
            field: { clearable: true, onClear: () => setCleared(true) },
            inputAdornment: {
              position: "start",
            },
          }}
          slots={{
            openPickerIcon: DateRangeIcon,
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: "36px",
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              padding: "11px 0px",
              fontFamily: "Figtree",
              // outline: "none",
            },
            "& .MuiOutlinedInput-root": {
              background: bgWhite ? "white" : "inherit",
              borderRadius: "5px",
              "& .MuiInputBase-input::placeholder": {
                fontFamily: "Figtree",
                opacity: 1,
                height: "36px",
              },
            },
            // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            //   borderRadius: "5px",
            //   border: "1px solid #00000029",
            //   // boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
            // },
          }}
        />
      </LocalizationProvider>
      {props.hasError && (
        <Typography variant="caption" sx={errorStyle}>
          {props.hasError ? props.errorMessage : ""}
        </Typography>
      )}
    </>
  );
}

export default DatePickerField;
