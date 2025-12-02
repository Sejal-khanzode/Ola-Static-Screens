import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { AvailabilityConstants, DaySlot } from './model/availabilityModel';

import { SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toCamelCase } from 'src/utils/toCamelCase';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomTimePicker from 'src/components/core/reusable/custom-time-picker/custom-time-picker';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useQuery } from '@tanstack/react-query';
import { LocationControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { Options } from 'src/constants/options';
import { useProviderControllerServiceGetApiMasterProviderByProviderIdClinics } from 'src/sdk/queries';

interface AvailabilitySLotsProps {
  rangeId: number;
  rangeStartDate: string;
  rangeEndDate: string;
  currentDaySlots: DaySlot[];
  updateDaySlotsForRange: (rangeId: number, updatedSlots: DaySlot[]) => void;
  isSubmitted: boolean;
  selectedProvider?: string;
}
const AvailabilitySLots: React.FC<AvailabilitySLotsProps> = React.memo(props => {
  const {
    rangeId,
    rangeStartDate,
    rangeEndDate,
    currentDaySlots,
    updateDaySlotsForRange,
    isSubmitted,
    selectedProvider,
  } = props;

  const [_, setProviderLocation] = useState<{ value: string; label: string }[]>([]);
  const clinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
  const [cptOptions, setcptOptions] = useState<Options>([]);
  const [clinicLocations, setClinicLocations] = useState<{
    [key: string]: { value: string; label: string }[];
  }>({});

  const { data: locationsData, refetch: getLocations } = useQuery({
    queryKey: ['locationsData', clinicId],
    queryFn: () => {
      return LocationControllerService.getApiMasterLocation({
        clinicId: clinicId,
        archive: false,
        status: true,
      });
    },
    enabled: !!clinicId,
  });

  const { data: cptCodesData } =
    useProviderControllerServiceGetApiMasterProviderByProviderIdClinics({
      providerId: selectedProvider || '',
      active: true,
      archive: false,
    });

  useEffect(() => {
    if (cptCodesData) {
      const getList = Array.isArray(cptCodesData?.data)
        ? cptCodesData?.data?.map((data: any) => {
            return {
              key: `${data.uuid}`,
              value: `${data.name}`,
            };
          })
        : [];

      setcptOptions(getList);
    }
  }, [cptCodesData]);

  // Listen for clinic change events
  useEffect(() => {
    const handleClinicChange = () => {
      if (clinicId) {
        getLocations();
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, [clinicId, getLocations]);

  useEffect(() => {
    if (locationsData?.data) {
      const apiData = Array.isArray(locationsData?.data?.content)
        ? locationsData?.data?.content?.map((clinic: any) => ({
            value: clinic?.uuid,
            label: clinic?.name,
          }))
        : [];
      setProviderLocation(apiData);
    }
  }, [locationsData]);

  useEffect(() => {
    if (rangeStartDate && rangeEndDate && currentDaySlots.length === 0) {
      const newBlankSlot: DaySlot = {
        dateRangeId: rangeId,
        day: '',
        startTime: '',
        endTime: '',
        locationUuid: '',
        availabilityMode: 'IN_PERSON',
        location: {},
        clinicUuid: '',
        clinicName: '',
        locationName: '',
      };
      updateDaySlotsForRange(rangeId, [newBlankSlot]);
    }
  }, [rangeStartDate, rangeEndDate, currentDaySlots, rangeId, updateDaySlotsForRange]);
  // Fetch locations for pre-populated clinics
  useEffect(() => {
    if (currentDaySlots && currentDaySlots.length > 0) {
      currentDaySlots.forEach(slot => {
        if (slot.clinicUuid && !clinicLocations[slot.clinicUuid]) {
          fetchLocationsForClinic(slot.clinicUuid);
        }
      });
    }
  }, [currentDaySlots, clinicLocations]);

  function getUniqueWeekdays(startDate: Date, endDate: Date): string[] {
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const uniqueDays = new Set<string>();

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const start = new Date(startDate.setHours(0, 0, 0, 0));
      const end = new Date(endDate.setHours(0, 0, 0, 0));
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        uniqueDays.add(dayNames[date.getDay()]);
      }
    }

    return Array.from(uniqueDays);
  }

  const start = new Date(rangeStartDate);
  const end = new Date(rangeEndDate);

  const dayOptions = Object.values(getUniqueWeekdays(start, end)).map(day => ({
    value: day,
    label: toCamelCase(day as string),
  }));

  const handleLocalSlotUpdate = (updatedDaySlots: DaySlot[]) => {
    updateDaySlotsForRange(rangeId, updatedDaySlots);
  };

  const handleDelete = (index: number) => {
    const updated = [...currentDaySlots];
    updated.splice(index, 1);
    handleLocalSlotUpdate(updated);
  };

  const handleAdd = () => {
    const newDaySlot: DaySlot = {
      dateRangeId: rangeId,
      day: '',
      startTime: '',
      endTime: '',
      locationUuid: '',
      availabilityMode: 'IN_PERSON',
      location: {},
      clinicUuid: '',
      clinicName: '',
      locationName: '',
    };
    handleLocalSlotUpdate([...currentDaySlots, newDaySlot]);
  };

  const handleDayChange = (index: number, value: string) => {
    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index ? { ...slot, day: value } : slot
    );
    handleLocalSlotUpdate(updated);
  };

  const handleEndTime = (time: string, index: number) => {
    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index ? { ...slot, endTime: time } : slot
    );
    handleLocalSlotUpdate(updated);
  };

  const handleStartTime = (time: string, index: number) => {
    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index ? { ...slot, startTime: time } : slot
    );
    handleLocalSlotUpdate(updated);
  };

  const handleLocationChange = (index: number, name: string, value: string) => {
    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index ? { ...slot, locationUuid: value, locationName: name } : slot
    );
    handleLocalSlotUpdate(updated);
  };

  const handleVirtualModeChange = (index: number, checked: boolean) => {
    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index
        ? {
            ...slot,
            availabilityMode: checked ? ('VIRTUAL' as const) : ('IN_PERSON' as const),
            // Clear location and clinic when virtual is selected
            ...(checked
              ? {
                  locationUuid: '',
                  locationName: '',
                  clinicUuid: '',
                  clinicName: '',
                }
              : {}),
          }
        : slot
    );
    handleLocalSlotUpdate(updated);
  };
  const fetchLocationsForClinic = async (clinicUuid: string) => {
    try {
      const response = await LocationControllerService.getApiMasterLocation({
        clinicId: clinicUuid,
        archive: false,
        status: true,
      });

      if (response?.data?.content) {
        const locations = Array.isArray(response.data.content)
          ? response.data.content.map((location: any) => ({
              value: location?.uuid,
              label: location?.name,
            }))
          : [];

        setClinicLocations(prev => ({
          ...prev,
          [clinicUuid]: locations,
        }));
      }
    } catch (error) {
      console.error('Error fetching locations for clinic:', error);
    }
  };

  const handleClinicChange = (index: number, clinicUuid: string) => {
    // Find the clinic name from cptOptions
    const selectedClinic = cptOptions.find(option => option.key === clinicUuid);
    const clinicName = selectedClinic ? selectedClinic.value : '';

    const updated = currentDaySlots.map((slot: DaySlot, i: number) =>
      i === index ? { ...slot, clinicUuid: clinicUuid, clinicName: clinicName } : slot
    );
    handleLocalSlotUpdate(updated);

    // Fetch locations for this clinic if not already cached
    if (clinicUuid) {
      fetchLocationsForClinic(clinicUuid);
    }
  };

  return (
    <Box mt={1} mb={1} display={'flex'} flexDirection={'column'} gap={1}>
      {currentDaySlots.map((item: DaySlot, index: number) => (
        <Grid
          container
          spacing={2}
          key={`${rangeId}-slot-${index}-${item?.day}`}
          sx={{ mt: index !== 0 ? 0.2 : 0 }}
        >
          <Grid size={{ xs: 12, sm: 1.8 }}>
            <CustomLabel label={AvailabilityConstants.DAY} isRequired />
            <CustomSelect
              name="day"
              hasError={isSubmitted && !item?.day}
              errorMessage={AvailabilityConstants.DAY_REQUIRED}
              value={item?.day}
              placeholder={AvailabilityConstants.SELECT_DAY}
              items={dayOptions}
              onChange={(e: SelectChangeEvent<string>) =>
                handleDayChange(index, (e.target as HTMLSelectElement).value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <CustomLabel label={AvailabilityConstants.FROM} isRequired />
            <CustomTimePicker
              hasError={isSubmitted && !item?.startTime}
              errorMessage={AvailabilityConstants.ENTER_FROM_TIME}
              handleTimeChange={(timeValue: string) => handleStartTime(timeValue, index)}
              value={item?.startTime}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <CustomLabel label={AvailabilityConstants.TILL} isRequired />
            <CustomTimePicker
              hasError={isSubmitted && !item?.endTime}
              errorMessage={AvailabilityConstants.ENTER_TILL_TIME}
              handleTimeChange={(timeValue: string) => handleEndTime(timeValue, index)}
              value={item?.endTime}
            />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <CustomLabel label="Clinic" isRequired={item.availabilityMode !== 'VIRTUAL'} />
            <CustomAutoComplete
              placeholder="Select Clinic"
              value={item.clinicUuid || ''}
              options={cptOptions}
              onChange={selectedValue => {
                handleClinicChange(index, selectedValue);
              }}
              autoname="clinicUuid"
              hasError={isSubmitted && !item.clinicUuid && item.availabilityMode !== 'VIRTUAL'}
              errorMessage="Clinic is required"
              isDisabled={item.availabilityMode === 'VIRTUAL'}
            />
          </Grid>

          <Grid size={{ xs: 2 }}>
            <CustomLabel
              label={AvailabilityConstants.LOCATION}
              isRequired={item.availabilityMode !== 'VIRTUAL'}
            />
            <CustomSelect
              name="locationUuid"
              hasError={isSubmitted && !item.locationUuid && item.availabilityMode !== 'VIRTUAL'}
              errorMessage={AvailabilityConstants.ENTER_LOCATION}
              value={item.locationUuid}
              placeholder={AvailabilityConstants.SELECT_LOCATION}
              items={item.clinicUuid ? clinicLocations[item.clinicUuid] || [] : []}
              onChange={e => handleLocationChange(index, e.target.name, e.target.value)}
              isDisabled={!item.clinicUuid||item.availabilityMode === 'VIRTUAL'}
              showEllipse
              showEllipseLength={10}
            />{' '}
          </Grid>
          <Grid
            size={{ xs: 1 }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={2}
          >
            <Checkbox
              size="small"
              checked={item.availabilityMode === 'VIRTUAL'}
              onChange={e => handleVirtualModeChange(index, e.target.checked)}
            />
            <Typography variant="titleMedium4">Virtual</Typography>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 1.2 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1.5,
            }}
          >
            <DeleteOutlineOutlinedIcon
              style={{
                cursor: 'pointer',
                opacity: currentDaySlots.length === 1 ? 0.5 : 1,
                pointerEvents: currentDaySlots.length === 1 ? 'none' : 'auto',
              }}
              onClick={() => handleDelete(index)}
            />
          </Grid>
        </Grid>
      ))}
      <Grid size={{ xs: 12 }} mt={2}>
        <CustomButton
          startIcon={<AddIcon />}
          label={AvailabilityConstants.ADD_MORE}
          onClick={handleAdd}
          isSubmitButtonTwo
          variant="outlined"
        />
      </Grid>
    </Box>
  );
});

export default AvailabilitySLots;
