import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { AvailabilityConstants, AvailabilitySetting } from './model/availabilityModel';
import { standardTimeZoneType } from 'src/utils/timeZone';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import DatePickerFieldSlot from 'src/components/core/reusable/date-picker-field/date-picker-Slot';
import CustomTimePicker from 'src/components/core/reusable/custom-time-picker/custom-time-picker';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
interface AccordianProps {
  availabilityPayload: AvailabilitySetting;
  setAvailabilityPayload: React.Dispatch<React.SetStateAction<AvailabilitySetting>>;
  isSubmitted: boolean;
}

const SlotCreation: React.FC<AccordianProps> = props => {
  const { availabilityPayload, setAvailabilityPayload, isSubmitted } = props;

  const handleTimeZoneChange = (e: SelectChangeEvent<string>) => {
    const newData = { ...availabilityPayload };
    newData.timezone = e.target.value as AvailabilitySetting['timezone'];
    setAvailabilityPayload(newData);
  };

  const getLocalDateParts = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBlockDays = (dateFromPicker: Date | null, index: number) => {
    if (!dateFromPicker) return;

    const newLocalDatePart = getLocalDateParts(dateFromPicker); // Correctly "YYYY-MM-DD" (local)

    setAvailabilityPayload(prev => {
      const newBlockDays = [...prev.blockDays];
      const currentItem = newBlockDays[index] || {
        id: `temp-${index}`,
        startTime: '',
        endTime: '',
      }; // Ensure item exists

      // Get current time part (local) from existing startTime, default to 00:00:00
      const existingLocalTimeForStart = extractTimeFromISO(currentItem.startTime) || '00:00:00';
      // Default end time logic (can be improved based on requirements)
      const existingLocalTimeForEnd = extractTimeFromISO(currentItem.endTime) || '00:00:00';

      const newStartDateTimeLocal = new Date(`${newLocalDatePart}T${existingLocalTimeForStart}`);
      const newEndDateTimeLocal = new Date(`${newLocalDatePart}T${existingLocalTimeForEnd}`);

      newBlockDays[index] = {
        ...currentItem,
        startTime: newStartDateTimeLocal.toISOString(),
        endTime: newEndDateTimeLocal.toISOString(),
      };
      return { ...prev, blockDays: newBlockDays };
    });
  };

  const handleBlockDaysFrom = (newLocalTimePart: string, index: number) => {
    setAvailabilityPayload(prev => {
      const newBlockDays = [...prev.blockDays];
      const currentItem = newBlockDays[index];

      if (!currentItem) return prev;

      let existingLocalDatePart: string;

      if (currentItem.startTime) {
        const existingDateTimeUTC = new Date(currentItem.startTime);
        existingLocalDatePart = getLocalDateParts(existingDateTimeUTC);
      } else {
        existingLocalDatePart = getLocalDateParts(new Date());
      }

      const newStartDateTimeLocal = new Date(`${existingLocalDatePart}T${newLocalTimePart}`);

      // Check if the Date object is valid before calling toISOString()
      if (isNaN(newStartDateTimeLocal.getTime())) {
        return prev; // Return unchanged state if invalid date
      }

      newBlockDays[index] = {
        ...currentItem,
        startTime: newStartDateTimeLocal.toISOString(),
      };
      // if (
      //   newBlockDays[index].endTime &&
      //   newStartDateTimeLocal.getTime() >
      //     new Date(newBlockDays[index].endTime).getTime()
      // ) {
      //   const newEndDateTimeLocal = new Date(
      //     `${existingLocalDatePart}T${newLocalTimePart}`
      //   );
      //   newBlockDays[index].endTime = newEndDateTimeLocal.toISOString();
      // }

      return { ...prev, blockDays: newBlockDays };
    });
  };

  const handleBlockDaysTill = (newLocalTimePart: string, index: number) => {
    // newLocalTimePart is "HH:mm:ss"
    setAvailabilityPayload(prev => {
      const newBlockDays = [...prev.blockDays];
      const currentItem = newBlockDays[index];

      if (!currentItem) return prev;

      let existingLocalDatePart: string;

      // Use the date part from endTime if it exists, otherwise from startTime, otherwise today
      if (currentItem.endTime) {
        const existingDateTimeUTC = new Date(currentItem.endTime);
        existingLocalDatePart = getLocalDateParts(existingDateTimeUTC);
      } else if (currentItem.startTime) {
        const existingDateTimeUTC = new Date(currentItem.startTime);
        existingLocalDatePart = getLocalDateParts(existingDateTimeUTC);
      } else {
        existingLocalDatePart = getLocalDateParts(new Date());
      }

      const newEndDateTimeLocal = new Date(`${existingLocalDatePart}T${newLocalTimePart}`);

      // Check if the Date object is valid before calling toISOString()
      if (isNaN(newEndDateTimeLocal.getTime())) {
        return prev; // Return unchanged state if invalid date
      }

      newBlockDays[index] = {
        ...currentItem,
        endTime: newEndDateTimeLocal.toISOString(),
      };
      // Ensure endTime is not before startTime
      // if (
      //   newBlockDays[index].startTime &&
      //   new Date(newBlockDays[index].startTime).getTime() >
      //     newEndDateTimeLocal.getTime()
      // ) {
      //   const newStartDateTimeLocal = new Date(
      //     `${existingLocalDatePart}T${newLocalTimePart}`
      //   ); // Set start time same as end or clear it
      //   newBlockDays[index].startTime = newStartDateTimeLocal.toISOString();
      // }

      return { ...prev, blockDays: newBlockDays };
    });
  };

  const handleAdd = () => {
    setAvailabilityPayload(prev => {
      return {
        ...prev,
        blockDays: [...prev.blockDays, { startTime: '', endTime: '' }],
      };
    });
  };

  const extractTimeFromISO = (isoString: string | undefined): string => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString); // Parses ISO string.
      if (isNaN(date.getTime())) return '';
      // .getHours(), .getMinutes(), .getSeconds() give time in browser's local timezone.
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch (e) {
      console.error('Error parsing date in extractTimeFromISO:', e);
      return '';
    }
  };

  const handleDelete = (index: number) => {
    const temp = [...availabilityPayload.blockDays];
    const updatedBlockDays = [...temp.slice(0, index), ...temp.slice(index + 1)];

    setAvailabilityPayload(prev => {
      return {
        ...prev,
        blockDays: updatedBlockDays,
      };
    });
  };

  const mappedTimeZones = standardTimeZoneType.map(item => ({
    value: item.key,
    label: item.value,
  }));

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="titleSemiBold3">
          {AvailabilityConstants.SLOT_CREATION_SETTING}{' '}
        </Typography>
      </Grid>

      <Grid size={{ xs: 5.8 }}>
        <CustomLabel label={AvailabilityConstants.TIMEZONE} isRequired />
        <CustomSelect
          value={availabilityPayload.timezone || ''}
          items={mappedTimeZones}
          placeholder={AvailabilityConstants.SELECT_TIMEZONE}
          onChange={handleTimeZoneChange}
          hasError={isSubmitted && !availabilityPayload.timezone}
          errorMessage={
            isSubmitted && !availabilityPayload.timezone
              ? AvailabilityConstants.TIMEZONE_REQUIRED
              : ''
          }
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }} mt={1}>
          <Typography variant="titleSemiBold3">{AvailabilityConstants.BLOCK_DAYS}</Typography>
        </Grid>

        {availabilityPayload.blockDays.map((item, index) => {
          return (
            <Grid container spacing={2} key={index} sx={{ mt: index === 0 ? 0 : 0.2 }}>
              <Grid size={{ xs: 3.5 }}>
                <CustomLabel label={AvailabilityConstants.DATE} isRequired />
                <DatePickerFieldSlot
                  value={item?.startTime}
                  onChange={val => handleBlockDays(val, index)}
                  hasError={isSubmitted && !item?.startTime}
                  errorMessage={AvailabilityConstants.DATE_REQUIRED}
                  disablePast
                />
              </Grid>
              <Grid size={{ xs: 3.5 }}>
                <CustomLabel label={AvailabilityConstants.FROM} isRequired />
                <CustomTimePicker
                  value={extractTimeFromISO(item?.startTime)}
                  handleTimeChange={val => handleBlockDaysFrom(val, index)}
                  hasError={isSubmitted && !extractTimeFromISO(item?.startTime)}
                  errorMessage={AvailabilityConstants.ENTER_FROM_TIME}
                />
              </Grid>
              <Grid size={{ xs: 3.5 }}>
                <CustomLabel label={AvailabilityConstants.TO} isRequired />
                <CustomTimePicker
                  value={extractTimeFromISO(item?.endTime)}
                  handleTimeChange={val => handleBlockDaysTill(val, index)}
                  hasError={isSubmitted && !extractTimeFromISO(item?.endTime)}
                  errorMessage={AvailabilityConstants.ENTER_TILL_TIME}
                />
              </Grid>
              <Grid size={{ xs: 1.5 }} mt={1}>
                <CustomLabel label={'\u200B'} isRequired={false} />
                <DeleteOutlineOutlinedIcon
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDelete(index)}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '8px',
            width: 'fit-content',
          }}
        >
          <CustomButton
            label={AvailabilityConstants.ADD_BLOCK_DAYS}
            startIcon={<AddIcon />}
            onClick={handleAdd}
            variant="outlined"
            isSubmitButtonTwo
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SlotCreation;
