/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

interface DatePickerProps {
  handleDateChange?: (newValue: string) => void;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
  bgWhite?: boolean;
  readonly?:boolean
}

function CustomDatePicker(props: DatePickerProps) {
  const {
    handleDateChange,
    value,
    hasError,
    errorMessage,
    placeholder,
    disableFuture,
    disablePast,
    disabled,
    bgWhite,
    readonly
  } = props;

  const handleChange = (newValue: any) => {
    if (newValue === null || !dayjs(newValue).isValid()) {
      if (handleDateChange) {
        handleDateChange('');
      }
      return;
    }
    const formattedValue = dayjs(newValue).format('YYYY-MM-DD');
    if (handleDateChange) {
      handleDateChange(formattedValue);
    }
  };

  const handleClear = () => {
    if (handleDateChange) {
      handleDateChange('');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format="MM/DD/YYYY"
          readOnly={readonly}
          enableAccessibleFieldDOMStructure={false}
          slotProps={{
            textField: {
              size: 'small',
              error: hasError,
              placeholder: placeholder,
              sx: {
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                  backgroundColor: bgWhite ? 'white' : 'inherit',
                  '&.Mui-disabled input': {
                    ...(disabled && value !== '' && value !== null && value !== undefined
                      ? {
                          color: 'black',
                          WebkitTextFillColor: 'black',
                        }
                      : {}),
                  },
                },
                '& fieldset': {
                  border: hasError ? '1px solid #d32f2f' : '1px solid #C9CBCC',
                  borderRadius: '5px',
                },
                '& input::placeholder': {
                  color: 'Neutral.60',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '120%',
                  letterSpacing: '0.024px',
                },
                '& input': {
                  color: 'black',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '120%',
                  letterSpacing: '0.024px',
                  padding: '6px',
                },
                '& .MuiIconButton-root': {
                  color: 'Neutral.70',
                  padding: '4px',
                  width: '32px',
                  height: '32px',
                },
              },
            },
            field: {
              clearable: true,
              onClear: handleClear,
            },
          }}
          onChange={handleChange}
          disabled={disabled}
        />
      </LocalizationProvider>
      {hasError && (
        <Typography
          sx={{
            color: '#d32f2f',
            marginTop: '3px',
            fontFamily: 'Roboto',
            fontSize: '0.75rem',
            lineHeight: '1.66',
          }}
          variant="caption"
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default CustomDatePicker;
