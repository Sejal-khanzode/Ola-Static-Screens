import { useEffect, useState } from 'react';
import moment from 'moment';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { BASIC_DATE_FORMAT, BASIC_DATE_TIME_FORMAT } from 'src/constants/date-format';
import { AvailableSlot, newAppointment } from 'src/constants/scheduling-constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestAppointmentSchemaNew } from './request-appt-schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  AppointmentType,
  AppointmentTypeManagementService,
  AvailabilityManagementService,
  Location,
  LocationControllerService,
  Provider,
  ProviderControllerService,
  RequestAppointmentManagementService,
} from 'src/sdk/requests';
import { checkUtcDateForPast, convertLocalToUTC, convertTime } from 'src/utils/date-utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { AvailabilityConstants } from 'src/pages/apps/provider/pages/settings/availability/model/availabilityModel';
import { addPatientConstants, appointmentConstants } from 'src/constants/patients-constants';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import DateCalendarBS from 'src/pages/apps/provider/components/scheduling/date-calendar-bs/date-calendar-bs';
import {
  slotSelectStylesHover,
  slotSelectStyles,
} from 'src/pages/apps/provider/components/scheduling/widgets/appointment.widget';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { formConstants } from 'src/constants/setting-constants';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { errorStyle } from 'src/components/core/reusable/custom-input/widgets/customInputStyles';
import {
  adjustTimeForDST,
  standardTimeZoneType,
} from 'src/utils/timeZone';
import { getglobalRefetchApptFunction } from 'src/pages/apps/client/pages/appointments/client-appointment';

export interface ScheduleApptProps {
  refetchList?: () => void;
  handleDrawerClose?: () => void;
  appointmentData?: any;
  isEdit?: boolean;
}

const RequestAppointmentDialog = (props: ScheduleApptProps) => {
  const { refetchList, handleDrawerClose, appointmentData, isEdit } = props;

  const patientClinicData = useSelector(
    (state: RootState) => state.patientClinicReducer.patientClinicData
  );

  const [providerSelected, setProviderSelected] = useState('');
  const [apptTypeSelected, setApptTypeSelected] = useState('');

  const [providersList, setProvidersList] = useState<{ key: string; value: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format(BASIC_DATE_FORMAT));

  const [startTimeForSlots, setStartTimeForSlots] = useState('');
  const [endTimeForSlots, setEndTimeForSlots] = useState('');
  const [avlSlots, setAvlSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('EST');

  const [locationsList, setLocationsList] = useState<{ key: string; value: string }[]>([]);
  const [appointmentTypesList, setAppointmentTypesList] = useState<
    { key: string; value: string }[]
  >([]);
  const [slotError, setSlotError] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    providerId: appointmentData?.providerId || '',
    locationId: appointmentData?.locationId || '',
    chiefComplaint: appointmentData?.reasonOfVisit || '',
    startTime: appointmentData?.startTime || '',
    endTime: appointmentData?.endTime || '',
    timezone: appointmentData?.timezone || 'EST',
    mode: appointmentData?.mode || 'IN_PERSON',
    type: appointmentData?.appointmentTypeId || '',
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(requestAppointmentSchemaNew),
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = method;

  const patientDetails = patientClinicData;

  const clinicId = patientDetails?.clinic ? Object.keys(patientDetails.clinic)[0] : undefined;

  const { data: providerAPIData } = useQuery({
    queryKey: ['providerData'],
    queryFn: () =>
      ProviderControllerService.getApiMasterProvider({
        clinicId: clinicId || '',
        archive: false,
        status: true,
      }),
    enabled: !!clinicId,
  });

  const { data: locationsAPIData } = useQuery({
    queryKey: ['locationsAPIData', clinicId],
    queryFn: () =>
      LocationControllerService.getApiMasterLocation({
        clinicId: clinicId || '',
        archive: false,
        status: true,
      }),
    enabled: !!clinicId,
  });

  const { data: appointmentTypesData } = useQuery({
    queryKey: ['appointmentTypesAPIData'],
    queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({}),
  });

  const {
    mutateAsync: createRequest,
    isSuccess,
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (payload: any) =>
      RequestAppointmentManagementService.postApiMasterRequestAppointmentRequest({
        requestBody: payload,
      }),
  });

  const {
    mutateAsync: rescheduleRequest,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    data: updateData,
  } = useMutation({
    mutationFn: (payload: any) =>
      RequestAppointmentManagementService.postApiMasterRequestAppointmentReschedule({
        requestBody: payload,
      }),
  });

  // Watch mode and locationId from form
  const watchedMode = useWatch({ control, name: 'mode' });

  const isQueryEnabled =
    !!startTimeForSlots &&
    !!endTimeForSlots &&
    providerSelected != '' &&
    !!watchedMode &&
    apptTypeSelected != '';

  const watchedLocationId = useWatch({ control, name: 'locationId' });

  const { data: slotsResponse, isSuccess: isSuccessSlot } = useQuery({
    enabled: isQueryEnabled,
    queryKey: [
      'provider-availability-slots',
      providerSelected,
      startTimeForSlots,
      endTimeForSlots,
      apptTypeSelected,
      watchedMode,
      watchedLocationId,
    ],
    queryFn: () => {
      return AvailabilityManagementService.getApiMasterSlots({
        providerUuid: providerSelected,
        startDate: startTimeForSlots as string,
        endDate: endTimeForSlots as string,
        appointmentTypeUuid: apptTypeSelected || '',
        availabilityMode:
          watchedMode === 'HOME'
            ? 'IN_PERSON'
            : ((watchedMode || 'IN_PERSON') as 'IN_PERSON' | 'VIRTUAL'),
        locationUuid: watchedLocationId || '',
      });
    },
  });

  function calculateDurationInMinutes(startTime: string, endTime: string) {
    const startDate = new Date(`1970-01-01T${startTime}`);
    const endDate = new Date(`1970-01-01T${endTime}`);
    // const timeDifference = endDate - startDate;
    // const durationInMinutes = timeDifference / (1000 * 60);

    return (endDate.getTime() - startDate.getTime()) / (1000 * 60);
  }

  const handleTimeZoneChange = (val: string) => {
    setSelectedTimeZone(val);
    setValue('timezone', val, { shouldValidate: true });
    clearErrors('timezone');
  };

  const onSubmit = async (values: any) => {
    // Validate timezone
    const isValidTimezone =
      selectedTimeZone && standardTimeZoneType.some(tz => tz.key === selectedTimeZone);

    if (!isValidTimezone) {
      setError('timezone', {
        type: 'manual',
        message: 'Timezone is required',
      });
      return;
    }

    // Validate slot selection
    if (!selectedSlot || !selectedStartTime || !selectedEndTime) {
      setSlotError(true);
      return;
    }

    // Clear errors if validation passes
    setSlotError(false);
    clearErrors('timezone');

    try {
      if (isEdit) {
        // Update appointment with new details
        const payload = {
          uuid: appointmentData?.uuid,
          patientClinicId: patientDetails?.uuid,
          providerId: values.providerId,
          locationId:
            watchedMode === 'IN_PERSON' || values.mode === 'HOME' ? values.locationId : undefined,
          reasonOfVisit: values.chiefComplaint,
          requestedStartTime: adjustTimeForDST(selectedStartTime, selectedTimeZone),
          requestedEndTime: adjustTimeForDST(selectedEndTime, selectedTimeZone),
          timezone: selectedTimeZone,
          mode: values.mode,
          duration: calculateDurationInMinutes(
            selectedSlot.split(' - ')[0],
            selectedSlot.split(' - ')[1]
          ),
          requestType: 'RESCHEDULE',
          clinicId: clinicId,
          appointmentTypeId: values.type,
          appointmentId: appointmentData?.uuid,
        };

        await rescheduleRequest(payload);
      } else {
        // Create new appointment
        const payload = {
          patientClinicId: patientDetails?.uuid,
          providerId: values.providerId,
          locationId:
            watchedMode === 'IN_PERSON' || values.mode === 'HOME' ? values.locationId : undefined,
          appointmentTypeId: values.type,
          reasonOfVisit: values.chiefComplaint,
          requestedStartTime: adjustTimeForDST(selectedStartTime, selectedTimeZone),
          requestedEndTime: adjustTimeForDST(selectedEndTime, selectedTimeZone),
          timezone: selectedTimeZone,
          mode: values.mode,
          duration: calculateDurationInMinutes(
            selectedSlot.split(' - ')[0],
            selectedSlot.split(' - ')[1]
          ),
          requestType: 'BOOK',
          clinicId: clinicId,
        };
        await createRequest(payload);
      }

      handleDrawerClose && handleDrawerClose();
      refetchList && refetchList();
    } catch (error) {
      console.error('Error submitting appointment request:', error);
    }
  };

  useEffect(() => {
    if (providerAPIData?.data?.content && Array.isArray(providerAPIData?.data?.content)) {
      const apiData = providerAPIData?.data?.content
        ?.filter((provider: Provider) => provider.uuid)
        .map((provider: Provider) => ({
          key: provider.uuid!,
          value: `${provider.firstName} ${provider.lastName}`,
        }));
      setProvidersList(apiData);
    }
  }, [providerAPIData]);

  useEffect(() => {
    if (locationsAPIData?.data?.content && Array.isArray(locationsAPIData?.data?.content)) {
      const apiData = locationsAPIData?.data?.content
        ?.filter((location: Location) => location?.uuid)
        .map((location: Location) => ({
          key: location?.uuid!,
          value: location?.name,
        }));
      setLocationsList(apiData);
    }
  }, [locationsAPIData]);

  useEffect(() => {
    if (appointmentTypesData?.data?.content && Array.isArray(appointmentTypesData?.data?.content)) {
      const apiData = appointmentTypesData?.data?.content
        ?.filter((appointmentType: AppointmentType) => appointmentType?.uuid)
        ?.map((appointmentType: AppointmentType) => ({
          key: appointmentType?.uuid!,
          value: appointmentType?.title,
        }));
      setAppointmentTypesList(apiData);
    }
  }, [appointmentTypesData]);

  useEffect(() => {
    if (selectedTimeZone) {
      const selectedDateMoment = moment(selectedDate);
      const isToday = selectedDateMoment.isSame(moment(), 'day');
      const updatedStartDate = isToday
        ? moment.utc().add(5, 'minutes').format(BASIC_DATE_TIME_FORMAT) + 'Z'
        : selectedDateMoment.format(BASIC_DATE_TIME_FORMAT) + 'Z';
      const startTime = isToday
        ? updatedStartDate
        : convertLocalToUTC(
            updatedStartDate.split('T')[0] + 'T00:00:00',
            selectedTimeZone
            // selectedPatientState
          );

      setStartTimeForSlots(checkUtcDateForPast(startTime));

      setEndTimeForSlots(
        convertLocalToUTC(
          moment(selectedDateMoment.toISOString())
            .endOf('day')
            .add(1, 'day')
            .startOf('day')
            .format('yyyy-MM-DDTHH:mm:ss'),
          selectedTimeZone
          // selectedPatientState
        )
      );
    }
  }, [selectedDate, selectedTimeZone, providerSelected]);

  const is1229PX = useMediaQuery('(max-width:1229px)');

  // Clear location when mode is not IN_PERSON
  useEffect(() => {
    if (watchedMode && watchedMode !== 'IN_PERSON' && watchedMode !== 'HOME') {
      setValue('locationId', '', { shouldValidate: true });
    }
  }, [watchedMode, setValue]);

  // Pre-populate states when appointmentData is available
  useEffect(() => {
    if (appointmentData) {
      setProviderSelected(appointmentData?.providerId || '');
      setApptTypeSelected(appointmentData?.appointmentTypeId || '');
      if (appointmentData?.startTime) {
        const appointmentDate = moment(appointmentData?.startTime).format(BASIC_DATE_FORMAT);
        setSelectedDate(appointmentDate);
      }
      if (appointmentData?.timezone) {
        setSelectedTimeZone(appointmentData?.timezone);
      }
    }
  }, [appointmentData]);

  useEffect(() => {
    setSelectedSlot('');
    setSelectedStartTime('');
    setSelectedEndTime('');
    setSlotError(false);
  }, [selectedDate, providerSelected, apptTypeSelected, watchedMode, watchedLocationId]);

  useEffect(() => {
    if (!slotsResponse || !isSuccessSlot) return;

    setAvlSlots(slotsResponse?.data?.slots as AvailableSlot[]);
  }, [slotsResponse, isSuccessSlot]);

  useApiFeedback(isError, error, isSuccess, (data?.message || 'Added successfully!') as string);

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      getglobalRefetchApptFunction();
    }
  }, [isSuccess, isUpdateSuccess]);

  useApiFeedback(
    isUpdateError,
    updateError,
    isUpdateSuccess,
    (updateData?.message || 'Updated successfully!') as string
  );

  useEffect(() => {
    if (isPending || isUpdatePending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, isUpdatePending, dispatch]);

  return (
    <Grid height={'100%'}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container display="flex" flexDirection="column" rowGap={2} m={0}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={2} display="flex">
                <Grid size={{ xs: 12 }} pt={0}>
                  <CustomLabel label={newAppointment.APPOINTMENT_MODE} isRequired />
                  <Controller
                    control={control}
                    name="mode"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value || 'IN_PERSON'}
                        onChange={e => {
                          field.onChange(e.target.value);
                          setValue('locationId', '');
                          setAvlSlots([]);
                          setSelectedSlot('');
                          setSelectedStartTime('');
                          setSelectedEndTime('');
                        }}
                        row
                        sx={{
                          mt: 1,
                          '& .MuiTypography-root': {
                            fontSize: '14px',
                          },
                        }}
                      >
                        <FormControlLabel
                          value="IN_PERSON"
                          control={<Radio />}
                          label={newAppointment.IN_PERSON}
                        />
                        <FormControlLabel
                          value="VIRTUAL"
                          control={<Radio />}
                          label={newAppointment.VIDEO_CALL}
                        />
                        <FormControlLabel
                          value="HOME"
                          control={<Radio />}
                          label={newAppointment.HOME}
                        />
                      </RadioGroup>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <CustomLabel label={newAppointment.PROVIDER} isRequired />
                  <Controller
                    control={control}
                    name="providerId"
                    render={({ field }) => (
                      <CustomAutoComplete
                        placeholder={newAppointment.SELECT_PROVIDER}
                        value={field.value || ''}
                        options={providersList}
                        onChange={selectedValue => {
                          field.onChange(selectedValue);
                          setProviderSelected(selectedValue);
                        }}
                        hasError={!!errors.providerId}
                        errorMessage={errors.providerId?.message as string}
                        autoname="providerId"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <CustomLabel label={formConstants.APPOINTMENT_TYPE} isRequired />
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <CustomAutoComplete
                        placeholder={formConstants.SELECT_APPT_TYPE}
                        value={field.value || ''}
                        options={appointmentTypesList}
                        onChange={selectedValue => {
                          field.onChange(selectedValue);
                          setApptTypeSelected(selectedValue);
                        }}
                        hasError={!!errors.type}
                        errorMessage={errors.type?.message as string}
                        autoname="type"
                      />
                    )}
                  />
                </Grid>

                {(watchedMode === 'IN_PERSON' || watchedMode === 'HOME') && (
                  <Grid size={{ xs: 6 }}>
                    <CustomLabel label={AvailabilityConstants.LOCATION} isRequired />
                    <Controller
                      control={control}
                      name="locationId"
                      render={({ field }) => (
                        <CustomAutoComplete
                          placeholder={AvailabilityConstants.SELECT_LOCATION}
                          value={field.value || ''}
                          options={locationsList}
                          onChange={selectedValue => {
                            field.onChange(selectedValue);
                          }}
                          hasError={!!errors.locationId}
                          errorMessage={errors.locationId?.message as string}
                          autoname="locationId"
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid size={{ xs: 6 }}>
                  <CustomLabel label={addPatientConstants.TIME_ZONE} isRequired />
                  <Controller
                    control={control}
                    name="timezone"
                    render={() => (
                      <CustomAutoComplete
                        value={selectedTimeZone}
                        options={standardTimeZoneType}
                        placeholder={addPatientConstants.SELECT_TIMEZONE}
                        onChange={handleTimeZoneChange}
                        autoname="timezone"
                        hasError={!!errors.timezone}
                        errorMessage={errors.timezone?.message as string}
                      />
                    )}
                  ></Controller>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <CustomLabel label={appointmentConstants.REASON_FOR_VISIT} isRequired />
                  <Controller
                    control={control}
                    name="chiefComplaint"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={appointmentConstants.ADD_REASON}
                        hasError={!!errors.chiefComplaint}
                        errorMessage={errors.chiefComplaint?.message as string}
                        {...field}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              size={{ xs: 12 }}
              gap={1}
              alignItems={'flex-start'}
              overflow={'hidden'}
              //   boxShadow={"0px 3px 9px 3px rgba(0,0,0,0.1)"}
              mt={3}
              flexDirection={is1229PX ? 'column' : 'row'}
            >
              <Grid>
                <DateCalendarBS
                  value={selectedDate || ''}
                  // minDate={isEdit ? moment().toDate() : moment().add(4, 'weeks').toDate()}
                  // maxDate={
                  //   isEdit ? moment().add(4, 'weeks').toDate() : moment().add(8, 'weeks').toDate()
                  // }
                  minDate={new Date()}
                  onChange={selectedDate => {
                    setSelectedDate(moment(selectedDate).format(BASIC_DATE_FORMAT));
                  }}
                />
              </Grid>
              <Grid
                flex={1}
                height={!avlSlots || !avlSlots?.length ? '18rem' : 'fit-content'}
                maxHeight={'18rem'}
                overflow={'auto'}
                mt={2}
                mb={2}
              >
                <Grid
                  container
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                  gap={1}
                >
                  {avlSlots?.length > 0 &&
                    avlSlots?.map((avlSlot, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          if (avlSlot?.start && avlSlot?.end) {
                            setSelectedSlot(
                              `${avlSlot.start.split('T')[1].split('Z')[0]} - ${avlSlot.end.split('T')[1].split('Z')[0]}`
                            );
                            setSelectedStartTime(avlSlot?.start);
                            setSelectedEndTime(avlSlot?.end);
                            setSlotError(false); // Clear error when slot is selected
                          }
                        }}
                        sx={
                          selectedSlot ===
                          `${avlSlot?.start?.split('T')[1].split('Z')[0]} - ${avlSlot?.end?.split('T')[1].split('Z')[0]}`
                            ? { ...slotSelectStyles }
                            : {
                                borderRadius: 2,
                                border: '1px solid grey',
                                '&:hover': slotSelectStylesHover,
                              }
                        }
                      >
                        <Grid
                          container
                          border={`1px solid  '#F4F4F4'`}
                          height={'fit-content'}
                          justifyContent={'center'}
                          width={'11rem'}
                          borderRadius={2}
                          p={1}
                        >
                          <Typography variant="bodyRegular4">
                            {`${convertTime(
                              selectedTimeZone,
                              avlSlot?.start?.split('T')[1]?.split('Z')[0] ?? '',
                              avlSlot?.start ?? ''
                            )} - ${convertTime(
                              selectedTimeZone,
                              avlSlot?.end?.split('T')[1]?.split('Z')[0] ?? '',
                              avlSlot?.end ?? ''
                            )}`}
                          </Typography>
                        </Grid>
                      </Box>
                    ))}
                  {(!avlSlots || !avlSlots.length) && (
                    <Typography variant="bodyRegular4">No slots available</Typography>
                  )}
                </Grid>
              </Grid>
              {slotError && (
                <Grid size={12} mt={2}>
                  <Typography variant="titleMedium5" sx={errorStyle}>
                    Please select a time slot.
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid container sx={{ marginTop: 'auto' }} justifyContent={'flex-end'} pb={1}>
              <Grid container gap={2} justifyContent={'flex-end'} mt={3}>
                <CustomButton variant="filled" type="submit" label={formConstants.SAVE} />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
export default RequestAppointmentDialog;
