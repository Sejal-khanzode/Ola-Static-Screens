import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { BASIC_DATE_FORMAT } from 'src/constants/date-format';

type DateCalendarBSProps = {
  value: string;
  onChange: (date: string) => void;
  minDate: Date;
  maxDate?: Date;
};

const DateCalendarBS = (props: DateCalendarBSProps) => {
  const { value, minDate, maxDate, onChange } = props;
  const [inputValue, setInputValue] = useState<Moment | null>(value ? moment(value) : null);

  useEffect(() => {
    setInputValue(moment(value));
  }, [value]);

  const handleChange = (newValue: Moment | null) => {
    setInputValue(newValue);

    onChange(newValue?.format(BASIC_DATE_FORMAT) || '');
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateCalendar
          minDate={minDate ? moment(minDate) : undefined}
          maxDate={maxDate ? moment(maxDate) : undefined}
          value={inputValue}
          // @ts-ignore
          onChange={handleChange}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateCalendarBS;
