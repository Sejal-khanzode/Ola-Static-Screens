/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

interface TimePickerProps {
  handleTimeChange?: (newValue: string) => void;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
}

function CustomTimePicker(props: TimePickerProps) {
  const { handleTimeChange, value, hasError, errorMessage } = props;

  const handleChange = (newValue: any) => {
    const formattedValue = dayjs(newValue).format("HH:mm:ss");
    if (handleTimeChange) {
      handleTimeChange(formattedValue);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value ? dayjs(`2023-01-01T${value}`) : null}
          slotProps={{
            textField: {
              size: "small",
              error: hasError,
              sx: {
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "36px",
                },
                "& fieldset": {
                  border: hasError ? "1px solid #d32f2f" : "1px solid #C9CBCC",
                  borderRadius: "5px",
                },
                "& input::placeholder": {
                  color: "#9B9D9F",
                  fontFamily: "Roboto !important",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "120%",
                  letterSpacing: "0.024px",
                },
                "& input": {
                  color: "black",
                  fontFamily: "Roboto !important",
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
              },
            },
          }}
          onChange={handleChange}
        />
      </LocalizationProvider>
      {hasError && (
        <Typography
          sx={{
            color: "#d32f2f",
            marginTop: "3px",
            fontFamily: "Roboto !important",
            fontSize: "0.75rem",
            lineHeight: "1.66",
          }}
          variant="caption"
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default CustomTimePicker;
