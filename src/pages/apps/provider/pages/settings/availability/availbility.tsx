import { useCallback, useEffect, useState } from 'react';
import {
  AvailabilityConstants,
  availabilityDataInitialValue,
  AvailabilitySetting,
  DaySlot,
} from './model/availabilityModel';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import AddIcon from '@mui/icons-material/Add';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AvailabilitySLots from './availabilitySLots';
import SlotCreation from './slot-creation';
import { SettingsFormConstants } from 'src/constants/formConst';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AvailabilityManagementService, ProviderControllerService } from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { Options } from 'src/constants/options';

interface DateRange {
  id: number;
  startDate: string;
  endDate: string;
}
const Availability = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allDaySlots, setAllDaySlots] = useState<Map<number, DaySlot[]>>(new Map());
  const [searchText, setsearchText] = useState('');

  const [currentAvailabilityPayload, setCurrentAvailabilityPayload] = useState<AvailabilitySetting>(
    availabilityDataInitialValue
  );
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [dateRanges, setDateRanges] = useState<DateRange[]>([
    { id: 1, startDate: '', endDate: '' },
  ]);
  const [nextId, setNextId] = useState(2);
  const [deleteRangeDialogOpen, setDeleteRangeDialogOpen] = useState(false);
  const [rangeIdToDelete, setRangeIdToDelete] = useState<number | null>(null);
  const [activeRangeId, setActiveRangeId] = useState<number | null>(
    dateRanges?.length > 0 ? dateRanges[0].id : null
  );
  const [invalidBlockDayDialogOpen, setInvalidBlockDayDialogOpen] = useState(false);
  const [confirmBlockDay, setConfirmBlockDay] = useState(false);
  const clinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
  const [clinicanOptions, setClinicasOntions] = useState<Options>([]);

  const {
    data: availabilityData,
    // isPending,
    // refetch,
  } = useQuery({
    queryKey: ['availabilityData', selectedProvider],
    enabled: !!selectedProvider,
    queryFn: () => {
      return AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({
        providerUuid: selectedProvider,
      });
    },
  });

  const {
    mutateAsync: addAvailabilityAsync,
    isSuccess: isSuccessaddAvailability,
    isError: isErroraddAvailability,
    data: addAvailabilityData,
    error: addAvailabilityError,
  } = useMutation({
    mutationFn: AvailabilityManagementService.postApiMasterProviderAvailabilitySetting,
  });

  useApiFeedback(
    isErroraddAvailability,
    addAvailabilityError,
    isSuccessaddAvailability,
    (addAvailabilityData?.message || 'CPT Code Added Successfully') as string
  );

  useEffect(() => {
    if (isSuccessaddAvailability) {
      setConfirmBlockDay(false);
    }
  }, [isSuccessaddAvailability]);

  useEffect(() => {
    if (isErroraddAvailability) {
      if (
        typeof addAvailabilityError === 'string' &&
        (addAvailabilityError as any)?.toLowerCase().includes('cannot block this time range')
      ) {
        setInvalidBlockDayDialogOpen(true);
      }
    }
  }, [isErroraddAvailability]);

  const { data: clinicUsersData, refetch: getClinicUsers } = useQuery({
    queryKey: ['clinicUsersData'],
    enabled: !!clinicId,
    queryFn: () => {
      return ProviderControllerService.getApiMasterProvider({
        status: true,
        archive: false,
        searchString: searchText,
      });
    },
  });

  useEffect(() => {
    if (clinicUsersData?.data?.content && Array.isArray(clinicUsersData?.data?.content)) {
      const newOptions = clinicUsersData?.data?.content?.map((user: any) => ({
        key: user?.uuid,
        value: `${user?.firstName} ${user?.lastName}`,
      }));

      // Merge with existing options to accumulate unique entries
      setClinicasOntions(prevOptions => {
        const optionsMap = new Map<string, { key: string; value: string }>();

        // Add existing options to map
        prevOptions.forEach(option => {
          optionsMap.set(option.key, option);
        });

        // Add new options to map (will overwrite if key exists)
        newOptions.forEach(option => {
          optionsMap.set(option.key, option);
        });

        // Convert map back to array
        return Array.from(optionsMap.values());
      });
    }
  }, [clinicUsersData]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Add error state at the top of the component
  const [dateRangeErrors, setDateRangeErrors] = useState<
    Map<number, { startDate?: string; endDate?: string }>
  >(new Map());

  const handleStartDateChange = (date: string, id: number) => {
    const currentRange = dateRanges.find(range => range.id === id);

    // Check if start date is after end date
    if (currentRange?.endDate && date && new Date(date) > new Date(currentRange.endDate)) {
      setDateRangeErrors(prev => {
        const newErrors = new Map(prev);
        const currentErrors = newErrors.get(id) || {};
        newErrors.set(id, { ...currentErrors, startDate: 'Start date cannot be after end date' });
        return newErrors;
      });
      return; // Prevent the change
    }

    // Clear start date error if validation passes
    setDateRangeErrors(prev => {
      const newErrors = new Map(prev);
      const currentErrors = newErrors.get(id) || {};
      delete currentErrors.startDate;
      newErrors.set(id, currentErrors);
      return newErrors;
    });

    setDateRanges(prevRanges =>
      prevRanges?.map(range => (range.id === id ? { ...range, startDate: date } : range))
    );
    if (activeRangeId !== id) {
      setActiveRangeId(id);
    }
  };

  // Update handleEndDateChange function
  const handleEndDateChange = (date: string, id: number) => {
    const currentRange = dateRanges.find(range => range.id === id);

    // Check if end date is before start date
    if (currentRange?.startDate && date && new Date(date) < new Date(currentRange.startDate)) {
      setDateRangeErrors(prev => {
        const newErrors = new Map(prev);
        const currentErrors = newErrors.get(id) || {};
        newErrors.set(id, { ...currentErrors, endDate: 'End date cannot be before start date' });
        return newErrors;
      });
      return; // Prevent the change
    }

    // Clear end date error if validation passes
    setDateRangeErrors(prev => {
      const newErrors = new Map(prev);
      const currentErrors = newErrors.get(id) || {};
      delete currentErrors.endDate;
      newErrors.set(id, currentErrors);
      return newErrors;
    });

    setDateRanges(prevRanges =>
      prevRanges?.map(range => (range.id === id ? { ...range, endDate: date } : range))
    );
    if (activeRangeId !== id) {
      setActiveRangeId(id);
    }
  };

  const handleAddAvailability = () => {
    const newId = nextId;
    const newRange = { id: newId, startDate: '', endDate: '' };
    setDateRanges(prevRanges => [...prevRanges, newRange]);
    setAllDaySlots(prevAllSlots => new Map(prevAllSlots).set(newId, []));
    setActiveRangeId(newId);
    setNextId(prevId => prevId + 1);
  };

  const handleDeleteDateRange = (id: number) => {
    setDateRanges(prevRanges => prevRanges?.filter(range => range.id !== id));
    setAllDaySlots(prevAllSlots => {
      const newAllSlots = new Map(prevAllSlots);
      newAllSlots.delete(id);
      return newAllSlots;
    });
    if (activeRangeId === id) {
      const remainingRanges = dateRanges?.filter(r => r.id !== id);
      setActiveRangeId(remainingRanges?.length > 0 ? remainingRanges[0]?.id : null);
    }
  };

  const overrideBlockDay = () => {
    setConfirmBlockDay(true);
    handleSave(true);
    setInvalidBlockDayDialogOpen(false);
  };

  const updateDaySlotsForRangeCallback = useCallback((rangeId: number, updatedSlots: DaySlot[]) => {
    setAllDaySlots(prev => {
      const newMap = new Map(prev);
      newMap.set(
        rangeId,
        updatedSlots?.map(s => ({ ...s }))
      );
      return newMap;
    });
  }, []);

  const handleSave = (overrideConfirmBlockDay?: boolean) => {
    setIsSubmitted(true);

    if (!selectedProvider) {
      return;
    }

    const hasIncompleteDateRanges = dateRanges.some(range => !range?.startDate || !range?.endDate);
    if (hasIncompleteDateRanges) {
      return;
    }

    let hasIncompleteDaySlots = false;
    allDaySlots.forEach((slotsInRanges, rangeId) => {
      const range = dateRanges.find(r => r.id === rangeId);
      if (range && range?.startDate && range?.endDate) {
        if (slotsInRanges.some(slot => !slot?.day || !slot?.startTime || !slot?.endTime)) {
          hasIncompleteDaySlots = true;
        }
      }
    });
    if (hasIncompleteDaySlots) {
      return;
    }

    // Validate timezone
    if (!currentAvailabilityPayload.timezone) {
      return;
    }

    const blockDaysFromPayload = currentAvailabilityPayload.blockDays || [];
    const hasIncompleteBlockDays = blockDaysFromPayload.some(
      bd =>
        !bd?.startTime ||
        !bd?.endTime ||
        !bd?.startTime?.includes('T') ||
        !bd?.endTime?.includes('T')
    );
    if (hasIncompleteBlockDays) {
      return;
    }
    const apiPayload = {
      providerId: selectedProvider,
      timezone: currentAvailabilityPayload.timezone || availabilityDataInitialValue.timezone,
      blockDays: blockDaysFromPayload?.map(bd => ({
        startTime: bd?.startTime,
        endTime: bd?.endTime,
      })),

      confirmBlockDay:
        overrideConfirmBlockDay !== undefined ? overrideConfirmBlockDay : confirmBlockDay,

      dateRanges: dateRanges
        .filter(range => range?.startDate && range?.endDate)
        .map(range => {
          const slotsForThisRange = allDaySlots.get(range?.id) || [];
          return {
            startDate: range?.startDate,
            endDate: range?.endDate,
            daySlots: slotsForThisRange?.map(slot => ({
              day: slot?.day as
                | 'MONDAY'
                | 'TUESDAY'
                | 'WEDNESDAY'
                | 'THURSDAY'
                | 'FRIDAY'
                | 'SATURDAY'
                | 'SUNDAY',
              startTime: slot?.startTime,
              endTime: slot?.endTime,
              location:
                slot?.locationUuid && slot?.locationName
                  ? {
                      [slot.locationUuid]: slot.locationName,
                    }
                  : undefined,
              clinic:
                slot?.clinicUuid && slot?.clinicName
                  ? {
                      [slot.clinicUuid]: slot.clinicName,
                    }
                  : undefined,
              availabilityMode: slot?.availabilityMode || 'IN_PERSON',
            })),
          };
        }),

      bookingWindow: 10,
      initialConsultTime: 15,
      followupConsultTime: 15,
    };
    addAvailabilityAsync({ requestBody: apiPayload as any });
  };

  const handleInputChange = (inputValue: any) => {
    if (inputValue?.length > 2) {
      setsearchText(inputValue);
    } else if (inputValue === '' || inputValue?.length === 0) {
      setsearchText('');
    }
  };
  useEffect(() => {
    getClinicUsers();
  }, [searchText]);

  useEffect(() => {
    getClinicUsers();
  }, [getClinicUsers]);

  useEffect(() => {
    if (availabilityData && Object.keys(availabilityData)?.length > 0) {
      const fetchedData = availabilityData as any;
      const newDateRanges: DateRange[] =
        fetchedData?.data?.dateRanges?.map((range: any, index: number) => ({
          id: range?.id || index + 1,
          startDate: range?.startDate,
          endDate: range?.endDate,
        })) || [];

      const newAllDaySlots = new Map<number, DaySlot[]>();
      fetchedData?.data?.dateRanges?.forEach((range: any, index: number) => {
        const rangeId = index + 1; // Use index + 1 to ensure unique IDs
        const mappedDaySlots =
          range?.daySlots?.map((slot: any) => {
            // Extract locationUuid and locationName from the location object
            let locationUuid = '';
            let locationName = '';
            let clinicUuid = '';
            let clinicName = '';

            if (slot?.location && typeof slot.location === 'object') {
              const locationKeys = Object.keys(slot.location);
              if (locationKeys.length > 0) {
                locationUuid = locationKeys[0];
                locationName = slot.location[locationUuid];
              }
            }

            if (slot?.clinic && typeof slot.clinic === 'object') {
              const clinicKeys = Object.keys(slot.clinic);
              if (clinicKeys.length > 0) {
                clinicUuid = clinicKeys[0];
                clinicName = slot.clinic[clinicUuid]; // Fix: use slot.clinic instead of slot.location
              }
            }

            return {
              day: slot?.day || '',
              startTime: slot?.startTime || '',
              endTime: slot?.endTime || '',
              locationUuid: locationUuid,
              locationName: locationName,
              clinicUuid: clinicUuid,
              clinicName: clinicName,
              availabilityMode: slot?.availabilityMode || 'IN_PERSON',
              location: slot?.location || {},
              dateRangeId: rangeId,
            };
          }) || [];

        // Instead of overwriting, merge day slots if the range already exists
        const existingSlots = newAllDaySlots.get(rangeId) || [];
        newAllDaySlots.set(rangeId, [...existingSlots, ...mappedDaySlots]);
      });

      setDateRanges(newDateRanges);
      setAllDaySlots(newAllDaySlots);
      setCurrentAvailabilityPayload(prevPayload => ({
        ...prevPayload,
        providerId: fetchedData?.data?.providerId,
        timezone: fetchedData?.data?.timezone || availabilityDataInitialValue.timezone,
        blockDays: fetchedData?.data?.blockDays || [],
        initialConsultTime:
          fetchedData?.data?.initialConsultTime ?? availabilityDataInitialValue.initialConsultTime,
        followupConsultTime:
          fetchedData?.data?.followupConsultTime ??
          availabilityDataInitialValue.followupConsultTime,
        bookingWindow:
          fetchedData?.data?.bookingWindow ?? availabilityDataInitialValue.bookingWindow,
        bufferTime: fetchedData?.data?.bufferTime ?? availabilityDataInitialValue.bufferTime,
        bookBefore: fetchedData?.data?.bookBefore ?? availabilityDataInitialValue.bookBefore,
      }));

      if (newDateRanges?.length > 0) {
        setActiveRangeId(newDateRanges[0]?.id);
        setNextId(newDateRanges[newDateRanges?.length - 1]?.id + 1);
      } else {
        setActiveRangeId(null);
        setNextId(1);
      }
    }
  }, [availabilityData]);

  useEffect(() => {
    if (activeRangeId !== null && selectedProvider) {
      const activeRangeData = dateRanges.find(r => r.id === activeRangeId);
      const slotsForActiveRange = allDaySlots.get(activeRangeId) || [];

      setCurrentAvailabilityPayload(prevPayload => {
        const basePayload = prevPayload;

        if (activeRangeData) {
          return {
            ...basePayload,
            providerId: selectedProvider,
            startDate: activeRangeData?.startDate,
            endDate: activeRangeData?.endDate,
            daySlots: slotsForActiveRange?.map(s => ({ ...s })),
          };
        } else {
          return {
            ...basePayload,
            providerId: selectedProvider,
            startDate: '',
            endDate: '',
            daySlots: [],
          };
        }
      });
    } else if (!selectedProvider) {
      setCurrentAvailabilityPayload(availabilityDataInitialValue);
    }
  }, [activeRangeId, dateRanges, allDaySlots, selectedProvider]);

  useEffect(() => {
    if (dateRanges?.length > 0 && !allDaySlots.has(dateRanges[0]?.id)) {
      setAllDaySlots(prev => new Map(prev).set(dateRanges[0]?.id, []));
      if (activeRangeId === null) {
        setActiveRangeId(dateRanges[0]?.id);
      }
    }
  }, [dateRanges, allDaySlots, activeRangeId]);

  useEffect(() => {
    if (!selectedProvider) {
      const initialRangeId = 1;
      setDateRanges([{ id: initialRangeId, startDate: '', endDate: '' }]);
      setAllDaySlots(new Map().set(initialRangeId, []));
      setActiveRangeId(initialRangeId);
      setNextId(2);
      setCurrentAvailabilityPayload(availabilityDataInitialValue);
    }
  }, [selectedProvider]);

  // useEffect(() => {
  //   if (isPending) {
  //     dispatch(showLoader());
  //   } else {
  //     dispatch(hideLoader());
  //   }
  // }, [isPending, dispatch]);

  useEffect(() => {
    // Check if availabilityData exists and has valid structure
    if (
      availabilityData &&
      (availabilityData as any)?.data?.dateRanges &&
      (availabilityData as any)?.data?.providerId
    ) {
      const fetchedData = availabilityData as any;
      const newDateRanges: DateRange[] =
        fetchedData?.data?.dateRanges?.map((range: any, index: number) => ({
          id: range?.id || index + 1,
          startDate: range?.startDate,
          endDate: range?.endDate,
        })) || [];

      const newAllDaySlots = new Map<number, DaySlot[]>();
      fetchedData?.data?.dateRanges?.forEach((range: any, outerIndex: number) => {
        // Use outerIndex + 1 as the range ID to ensure each range gets a unique ID
        const rangeIdToUse = outerIndex + 1;

        const mappedDaySlots =
          range?.daySlots?.map((slot: any) => {
            // Extract locationUuid and locationName from the location object
            let locationUuid = '';
            let locationName = '';
            let clinicUuid = '';
            let clinicName = '';

            if (slot?.location && typeof slot.location === 'object') {
              const locationKeys = Object.keys(slot.location);
              if (locationKeys.length > 0) {
                locationUuid = locationKeys[0];
                locationName = slot.location[locationUuid];
              }
            }
            if (slot?.clinic && typeof slot.clinic === 'object') {
              const clinicKeys = Object.keys(slot.clinic);
              if (clinicKeys.length > 0) {
                clinicUuid = clinicKeys[0];
                clinicName = slot.clinic[clinicUuid]; // Fix: use slot.clinic instead of slot.location
              }
            }

            return {
              day: slot?.day || '',
              startTime: slot?.startTime || '',
              endTime: slot?.endTime || '',
              locationUuid: locationUuid,
              locationName: locationName,
              clinicUuid: clinicUuid,
              clinicName: clinicName,
              availabilityMode: slot?.availabilityMode || 'IN_PERSON',
              location: slot?.location || {},
              dateRangeId: rangeIdToUse,
            };
          }) || [];

        // Instead of overwriting, merge day slots if the range already exists
        const existingSlots = newAllDaySlots.get(rangeIdToUse) || [];
        newAllDaySlots.set(rangeIdToUse, [...existingSlots, ...mappedDaySlots]);
      });

      setDateRanges(newDateRanges);
      setAllDaySlots(newAllDaySlots);

      setCurrentAvailabilityPayload(prevPayload => ({
        ...prevPayload,
        providerId: fetchedData?.data?.providerId,
        timezone: fetchedData?.data?.timezone || availabilityDataInitialValue.timezone,
        blockDays: fetchedData?.data?.blockDays || [],
        initialConsultTime:
          fetchedData?.data?.initialConsultTime ?? availabilityDataInitialValue.initialConsultTime,
        followupConsultTime:
          fetchedData?.data?.followupConsultTime ??
          availabilityDataInitialValue.followupConsultTime,
        bookingWindow:
          fetchedData?.data?.bookingWindow ?? availabilityDataInitialValue.bookingWindow,
        bufferTime: fetchedData?.data?.bufferTime ?? availabilityDataInitialValue.bufferTime,
        bookBefore: fetchedData?.data?.bookBefore ?? availabilityDataInitialValue.bookBefore,
      }));

      if (newDateRanges?.length > 0) {
        setActiveRangeId(newDateRanges[0]?.id);
        const maxId = newDateRanges.reduce(
          (max: number, range: DateRange) => Math.max(max, range?.id),
          0
        );
        setNextId(maxId + 1);
      } else {
        const initialRangeId = 1;
        setDateRanges([{ id: initialRangeId, startDate: '', endDate: '' }]);
        setAllDaySlots(new Map().set(initialRangeId, []));
        setActiveRangeId(initialRangeId);
        setNextId(2);
        setCurrentAvailabilityPayload(() => ({
          ...availabilityDataInitialValue,
          providerId: fetchedData?.data?.providerId,
          timezone: fetchedData?.data?.timezone || availabilityDataInitialValue.timezone,
          blockDays: fetchedData?.data?.blockDays || [],
        }));
      }
    } else if (selectedProvider) {
      // Clear form when provider is selected but has no availability data
      const initialRangeId = 1;
      setDateRanges([{ id: initialRangeId, startDate: '', endDate: '' }]);
      setAllDaySlots(new Map().set(initialRangeId, []));
      setActiveRangeId(initialRangeId);
      setNextId(2);
      setCurrentAvailabilityPayload(() => ({
        ...availabilityDataInitialValue,
        providerId: selectedProvider,
        timezone: availabilityDataInitialValue.timezone,
        blockDays: [],
      }));
    }
  }, [availabilityData, selectedProvider]);

  useEffect(() => {
    const handleClinicChange = () => {
      if (clinicId) {
        setClinicasOntions([]);
        setsearchText('');
        getClinicUsers();
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, [clinicId, getClinicUsers]);

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        minHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        height: '82vh',
        width: '100%',
      }}
    >
      <Grid
        container
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 1,
          pl: 2,
          pr: 2,
          pb: 2,

          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          direction: 'row',
        }}
      >
        <Grid size={12} alignItems={'center'} mt={2}>
          <Typography variant="bodyRegular3">Availability</Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }} mt={1}>
          <Grid mb={1}>
            <CustomLabel label={AvailabilityConstants.CLINICIAN_NAME} />
          </Grid>
          <CustomAutoComplete
            placeholder={AvailabilityConstants.SELECT_CLINICIAN_NAME}
            autoname="selectedProvider"
            onChange={selectedValue => {
              setSelectedProvider(selectedValue);
              setsearchText('');
              getClinicUsers();
              AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({
                providerUuid: selectedValue,
              });
            }}
            value={selectedProvider}
            options={clinicanOptions}
            onInputChange={handleInputChange}
          />
        </Grid>

        {selectedProvider && (
          <>
            <Grid
              container
              mt={1}
              sx={{
                height: '65vh',
              }}
              spacing={isSmallScreen ? 2 : 0}
            >
              <Grid size={{ xs: 12, md: 7 }}>
                <Grid display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="titleSemiBold3">
                    {AvailabilityConstants.DAY_WISE_AVAILABILITY}
                  </Typography>
                  <CustomButton
                    startIcon={<AddIcon />}
                    label={AvailabilityConstants.ADD_AVAILABILITY}
                    variant="outlined"
                    onClick={handleAddAvailability}
                    isSubmitButtonTwo
                  />
                </Grid>
                <Grid
                  sx={{
                    height: '55vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingRight: '8px',
                    // '&::-webkit-scrollbar': {
                    //   display: 'none',
                    // },
                  }}
                >
                  {dateRanges.map(range => (
                    <Grid
                      key={range.id}
                      mt={1}
                      p={1.5}
                      borderRadius={3}
                      border={'1px solid #E0E0E0'}
                      bgcolor={'#F5F5F5'}
                      width={'100%'}
                    >
                      <Grid container>
                        <Grid
                          size={{ xs: 12, sm: 11.68 }}
                          alignItems="center"
                          spacing={isSmallScreen ? 1 : 2}
                          display={'flex'}
                          flexDirection={'row'}
                        >
                          <Grid size={{ xs: 3 }}>
                            {' '}
                            <Typography variant="titleSemiBold3">
                              {AvailabilityConstants.SELECT_DATE_RANGE}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 1 }} ml={2}>
                            <Typography variant="titleSemiBold3">
                              {AvailabilityConstants.FROM}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 3.7 }}>
                            <CustomDatePicker
                              value={range?.startDate}
                              placeholder={AvailabilityConstants.START_DATE}
                              handleDateChange={(date: string) =>
                                handleStartDateChange(date, range.id)
                              }
                              hasError={
                                (isSubmitted && !range?.startDate) ||
                                !!dateRangeErrors.get(range.id)?.startDate
                              }
                              errorMessage={
                                dateRangeErrors.get(range.id)?.startDate ||
                                (isSubmitted && !range?.startDate
                                  ? AvailabilityConstants.START_DATE_REQD
                                  : '')
                              }
                              disablePast
                            />
                          </Grid>
                          {!isSmallScreen && (
                            <Grid sx={{ textAlign: 'center' }} ml={1.5}>
                              <Typography variant="titleSemiBold3">
                                {AvailabilityConstants.TO}
                              </Typography>
                            </Grid>
                          )}
                          <Grid size={{ xs: 3.7 }} ml={2}>
                            <CustomDatePicker
                              value={range?.endDate}
                              placeholder={AvailabilityConstants.END_DATE}
                              handleDateChange={(date: string) =>
                                handleEndDateChange(date, range.id)
                              }
                              hasError={
                                (isSubmitted && !range?.endDate) ||
                                !!dateRangeErrors.get(range.id)?.endDate
                              }
                              errorMessage={
                                dateRangeErrors.get(range.id)?.endDate ||
                                (isSubmitted && !range?.endDate
                                  ? AvailabilityConstants.END_DATE_REQD
                                  : '')
                              }
                              disablePast
                            />
                          </Grid>

                          <Grid
                            size={{ xs: 12, sm: 1.5 }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            {dateRanges.length == 1 ? (
                              <DeleteOutlineOutlinedIcon color="disabled" />
                            ) : (
                              <DeleteOutlineOutlinedIcon
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  setRangeIdToDelete(range.id);
                                  setDeleteRangeDialogOpen(true);
                                }}
                                style={{ cursor: 'pointer' }}
                              />
                            )}
                          </Grid>
                        </Grid>

                        <Box width="100%">
                          <AvailabilitySLots
                            rangeId={range.id}
                            rangeStartDate={range?.startDate}
                            rangeEndDate={range?.endDate}
                            currentDaySlots={allDaySlots.get(range.id) || []}
                            updateDaySlotsForRange={updateDaySlotsForRangeCallback}
                            isSubmitted={isSubmitted}
                            selectedProvider={selectedProvider}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    maxHeight: '63vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    pr: 1,
                    pl: { md: 2 },
                    borderRadius: 1,
                    p: 1,
                    ml: 5,
                  }}
                >
                  <SlotCreation
                    availabilityPayload={currentAvailabilityPayload}
                    setAvailabilityPayload={setCurrentAvailabilityPayload}
                    isSubmitted={isSubmitted}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                pb: 1,
                pt: 1,
                pr: 2,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,

                zIndex: 10,
                backgroundColor: '#fff',
              }}
            >
              <Grid
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <CustomButton
                  variant="outlined"
                  label={SettingsFormConstants.CANCEL}
                  isSubmitButton
                  onClick={() => {
                    setSelectedProvider('');
                  }}
                />
                <CustomButton
                  variant="filled"
                  label={SettingsFormConstants.SAVE}
                  onClick={() => handleSave()}
                  type="button"
                  changePadding={false}
                  isSubmitButton
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog
        open={deleteRangeDialogOpen}
        onClose={() => {
          setDeleteRangeDialogOpen(false);
          setRangeIdToDelete(null);
        }}
        PaperProps={{ sx: { p: 2, width: '400px' } }}
      >
        <DialogTitle>
          Delete Date Range
          <IconButton
            aria-label="close"
            onClick={() => {
              setDeleteRangeDialogOpen(false);
              setRangeIdToDelete(null);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this date range?</Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton
            variant="outline"
            label="No"
            isSubmitButton
            onClick={() => {
              setDeleteRangeDialogOpen(false);
              setRangeIdToDelete(null);
            }}
          />
          <CustomButton
            variant="filled"
            label="Yes"
            changePadding={false}
            isSubmitButton
            onClick={() => {
              if (rangeIdToDelete !== null) {
                handleDeleteDateRange(rangeIdToDelete);
              }
              setDeleteRangeDialogOpen(false);
              setRangeIdToDelete(null);
            }}
          />
        </DialogActions>
      </Dialog>
      <Dialog
        open={invalidBlockDayDialogOpen}
        onClose={() => setInvalidBlockDayDialogOpen(false)}
        PaperProps={{ sx: { p: 2, width: '440px' } }}
      >
        <DialogTitle>
          Block Day Conflict
          <IconButton
            aria-label="close"
            onClick={() => setInvalidBlockDayDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Cannot block this time range. The clinician has upcoming appointment(s) scheduled during
            this time period. Would you still like to proceed with blocking the selected time slot?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton
            variant="filled"
            label="No"
            isSubmitButton
            onClick={() => setInvalidBlockDayDialogOpen(false)}
          />
          <CustomButton
            variant="filled"
            label="Yes"
            isSubmitButton
            onClick={() => {
              overrideBlockDay();
              // setConfirmBlockDay(true);
              // handleSave();
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Availability;
