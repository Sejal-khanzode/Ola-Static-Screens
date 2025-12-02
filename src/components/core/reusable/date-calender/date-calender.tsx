import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import './widgets/date-calender-widgets.css';

export const inputStyles = {
  '& .$MuiPickersCalendarHeader-root': {
    // border: `1px solid ${theme.palette.grey[400]}`,
  },
};

export interface DateCalenderProps {
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
}

const DateCalender = (props: DateCalenderProps) => {
  const { value, onChange } = props;

  const [inputValue, setInputValue] = useState(
    (value && (dayjs(value) as unknown as Dayjs)) || null
  );

  const handleChange = (value: Dayjs | null) => {
    onChange(value);
  };

  useEffect(() => {
    setInputValue((value && (dayjs(value) as unknown as Dayjs)) || null);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={inputValue}
        // @ts-ignore
        onChange={handleChange}
        sx={{
          '& .MuiPickersCalendarHeader-root': {
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',

            border: `0.5px solid #d7cdcd`,
            // color: theme.palette.primary.main,
            fontWeight: 700,
            marginBottom: '0px',
            borderBottom: 'none',
            width: '317px',
          },
          '& .MuiDayCalendar-root': {
            border: `0.5px solid #d7cdcd`,
            width: '317px',
          },
          '& .Mui-selected': {
            backgroundColor: '#233853 !important',
          },
          '& .MuiPickersSlideTransition-root': {
            minHeight: '200px',
          },
          '&.MuiDateCalendar-root': {
            height: '300px !important',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateCalender;
