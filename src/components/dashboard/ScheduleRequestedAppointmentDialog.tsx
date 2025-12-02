import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  slotSelectStyles,
  slotSelectStylesHover,
} from '../../pages/apps/provider/components/scheduling/widgets/appointment.widget';
import { BASIC_DATE_FORMAT, BASIC_DATE_TIME_FORMAT } from 'src/constants/date-format';
import {
  adjustTimeForDST,
  standardTimeZoneType,
} from 'src/utils/timeZone';
import { checkUtcDateForPast, convertLocalToUTC, convertTime } from 'src/utils/date-utils';
import CustomLabel from '../core/reusable/custom-label/custom-label';
import CustomAutoComplete from '../core/reusable/custom-auto-complete/custom-auto-complete';
import CustomInput from '../core/reusable/custom-input/custom-input';
import DateCalendarBS from '../../pages/apps/provider/components/scheduling/date-calendar-bs/date-calendar-bs';
import CustomButton from '../core/reusable/custom-button/custom-button';
import { formConstants } from 'src/constants/setting-constants';
import {
  AppointmentManagementService,
  AppointmentType,
  AppointmentTypeManagementService,
  AvailabilityManagementService,
  LocationControllerService,
  ProviderControllerService,
  RequestAppointmentManagementService,
} from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { AvailabilityConstants } from '../../pages/apps/provider/pages/settings/availability/model/availabilityModel';
import { addPatientConstants, appointmentConstants } from 'src/constants/patients-constants';
import { AvailableSlot, newAppointment } from 'src/constants/scheduling-constants';
import { errorStyle } from '../core/reusable/custom-text-area/custom-textarea';

interface ScheduleRequestedAppointmentDialogProps {
  selectedRequest: any;
  buttonAction: 'approve' | 'cancel' | null;
  onClose: () => void;
  onSuccess?: () => void;
  isReschedule?: boolean;
}

const ScheduleRequestedAppointmentDialog: React.FC<ScheduleRequestedAppointmentDialogProps> = ({
  selectedRequest,
  buttonAction,
  onClose,
  onSuccess,
  isReschedule,
}) => {
  const [providerSelected, setProviderSelected] = useState('');
  const [apptTypeSelected, setApptTypeSelected] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    moment(selectedRequest?.requestedStartTime).format(BASIC_DATE_FORMAT)
  );
  const [startTimeForSlots, setStartTimeForSlots] = useState('');
  const [endTimeForSlots, setEndTimeForSlots] = useState('');
  const [avlSlots, setAvlSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState(selectedRequest?.timezone || 'EST');
  const [, setAppointmentTypesList] = useState<{ key: string; value: string }[]>([]);
  const [, setLocationsList] = useState<{ key: string; value: string }[]>([]);
  const [slotError, setSlotError] = useState(false);
  const [timezoneError, setTimezoneError] = useState(false);
  const [status, setStatus] = useState<'APPROVED' | 'REJECTED'>(
    buttonAction === 'approve' ? 'APPROVED' : 'REJECTED'
  );
  const [reason, setReason] = useState('');

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const clinicId = selectedRequest?.clinicId || '';

  const initialValues = {
    patientId: selectedRequest?.patientClinicId || '',
    providerId: selectedRequest?.providerId || '',
    locationId: selectedRequest?.locationId || '',
    chiefComplaint: selectedRequest?.reasonOfVisit || '',
    startTime: selectedRequest?.requestedStartTime || '',
    endTime: selectedRequest?.requestedEndTime || '',
    timezone: selectedRequest?.timezone || 'EST',
    mode: selectedRequest?.mode || 'IN_PERSON',
    type: selectedRequest?.appointmentTypeId || '',
    paymentType: 'CASH',
    duration: 0,
    insuranceType: undefined,
    estimateAmount: selectedRequest?.estimateAmount || '',
  };

  const method = useForm({
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = method;

  const watchedMode = useWatch({ control, name: 'mode' });
  const watchedLocationId = useWatch({ control, name: 'locationId' });

  const isQueryEnabled =
    !!startTimeForSlots &&
    !!endTimeForSlots &&
    providerSelected != '' &&
    apptTypeSelected != '' &&
    !!watchedMode;

  const {
    data: slotsResponse,
    isLoading,
    isSuccess: isSuccessSlot,
  } = useQuery({
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

  const { data: providerAPIData } = useQuery({
    queryKey: ['providerData'],
    queryFn: () =>
      ProviderControllerService.getApiMasterProvider({
        clinicId: clinicId,
        archive: false,
        status: true,
      }),
  });

  const { data: appointmentTypesData } = useQuery({
    queryKey: ['appointmentTypesAPIData'],
    queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({}),
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

  const {
    mutateAsync: updateRequestStatus,
    isPending: isUpdatingRequest,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
    data: updateData,
  } = useMutation({
    mutationFn: ({ uuid, requestBody }: { uuid: string; requestBody: any }) =>
      RequestAppointmentManagementService.patchApiMasterRequestAppointmentByUuidStatus({
        uuid,
        requestBody,
      }),
  });

  const {
    mutateAsync: createAppointment,
    isPending: isCreatingAppointment,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (requestBody: any) =>
      AppointmentManagementService.postApiMasterAppointments({ requestBody }),
  });

  const {
    mutateAsync: updateMutateAsync,
    isSuccess: isUpdateSuccessReschedule,
    isPending: isUpdatePendingReschedule,
    isError: isUpdateErrorReschedule,
    error: updateErrorReschedule,
    data: updateDataReschedule,
  } = useMutation({
    mutationFn: (payload: any) =>
      AppointmentManagementService.putApiMasterAppointments({
        requestBody: payload,
      }),
  });

  const calculateDurationInMinutes = (startTime: string, endTime: string) => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    return end.diff(start, 'minutes');
  };

  const onSubmit = async (values: any) => {
    
    try {
      // Validate timezone
      const isValidTimezone = selectedTimeZone && 
        standardTimeZoneType.some(tz => tz.key === selectedTimeZone);
      
      if (!isValidTimezone) {
        setTimezoneError(true);
        return;
      }
      
      // Clear timezone error if validation passes
      setTimezoneError(false);
      
      // If approving book request, create the actual appointment first
      if (status === 'APPROVED') {
        if (selectedStartTime === '') {
          setSlotError(true);
          return;
        }

        if (isReschedule) {
          const payload = {
            uuid: selectedRequest?.appointmentId,
            patientClinicId: selectedRequest?.patientClinicId,
            providerId: values.providerId,
            locationId: watchedMode === 'IN_PERSON' ? values.locationId : undefined,
            reasonOfVisit: values.chiefComplaint,
            startTime: adjustTimeForDST(selectedStartTime, selectedTimeZone),
            endTime: adjustTimeForDST(selectedEndTime, selectedTimeZone),
            timezone: selectedTimeZone,
            mode: values.mode,
            duration: calculateDurationInMinutes(
              selectedSlot.split(' - ')[0],
              selectedSlot.split(' - ')[1]
            ),
            requestType: 'RESCHEDULE',
            clinicId: clinicId,
            appointmentTypeId: values.type,
            appointmentId: selectedRequest?.appointmentId,
          };

          await updateMutateAsync(payload);
        } else {
          const payload = {
            clinicId: clinicId,
            patientClinicId: values.patientId,
            providerId: values.providerId,
            locationId: values.locationId,
            appointmentTypeId: values.type,
            reasonOfVisit: values.chiefComplaint,
            startTime: adjustTimeForDST(selectedStartTime, selectedTimeZone),
            endTime: adjustTimeForDST(selectedEndTime, selectedTimeZone),
            timezone: selectedTimeZone,
            mode: values.mode,
            duration: calculateDurationInMinutes(
              selectedSlot.split(' - ')[0],
              selectedSlot.split(' - ')[1]
            ),
            estimateAmount: values.estimateAmount,
          };

          await createAppointment(payload);
        }
      }

      // After creating appointment (or if rejecting), update the request status
      await updateRequestStatus({
        uuid: selectedRequest.uuid,
        requestBody: {
          status,
          rejectionReason: status === 'REJECTED' ? reason : null,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['requestAppt'] });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating appointment booking:', error);
    }
  };

  useEffect(() => {
    if (!slotsResponse || !isSuccessSlot) return;
    setAvlSlots(slotsResponse?.data?.slots as AvailableSlot[]);

    // Default select the slot based on requested start and end time
    if (selectedRequest?.requestedStartTime && selectedRequest?.requestedEndTime) {
      const requestedStart = selectedRequest.requestedStartTime;
      const requestedEnd = selectedRequest.requestedEndTime;

      // Find matching slot in available slots
      const slots = slotsResponse?.data?.slots as AvailableSlot[];
      const matchingSlot = slots?.find((slot: any) => {
        return slot.start === requestedStart && slot.end === requestedEnd;
      });

      if (matchingSlot && matchingSlot.start && matchingSlot.end) {
        const slotTimeString = `${matchingSlot.start.split('T')[1].split('Z')[0]} - ${matchingSlot.end.split('T')[1].split('Z')[0]}`;
        setSelectedSlot(slotTimeString);
        setSelectedStartTime(matchingSlot.start);
        setSelectedEndTime(matchingSlot.end);
        setSlotError(false);
      }
    }
  }, [
    slotsResponse,
    isSuccessSlot,
    selectedRequest?.requestedStartTime,
    selectedRequest?.requestedEndTime,
  ]);

  useEffect(() => {
    if (providerAPIData?.data?.content && Array.isArray(providerAPIData?.data?.content)) {
      // Pre-select the provider from the request
      setProviderSelected(selectedRequest?.providerId || '');
    }
  }, [providerAPIData, selectedRequest?.providerId]);

  useEffect(() => {
    if (appointmentTypesData?.data?.content && Array.isArray(appointmentTypesData?.data?.content)) {
      const apiData = appointmentTypesData?.data?.content
        ?.filter((appointmentType: AppointmentType) => appointmentType.uuid)
        ?.map((appointmentType: AppointmentType) => ({
          key: appointmentType.uuid!,
          value: appointmentType.title,
        }));
      setAppointmentTypesList(apiData);
      setApptTypeSelected(selectedRequest?.appointmentTypeId || '');
    }
  }, [appointmentTypesData, selectedRequest?.appointmentTypeId]);

  useEffect(() => {
    if (locationsAPIData?.data?.content && Array.isArray(locationsAPIData.data.content)) {
      const apiData = locationsAPIData.data.content.map((location: any) => ({
        key: location.uuid,
        value: location.name,
      }));
      setLocationsList(apiData);
    }
  }, [locationsAPIData]);

  useEffect(() => {
    if (selectedTimeZone) {
      const selectedDateMoment = moment(selectedDate);
      const isToday = selectedDateMoment.isSame(moment(), 'day');
      const updatedStartDate = isToday
        ? moment.utc().add(5, 'minutes').format(BASIC_DATE_TIME_FORMAT) + 'Z'
        : selectedDateMoment.format(BASIC_DATE_TIME_FORMAT) + 'Z';
      const startTime = isToday
        ? updatedStartDate
        : convertLocalToUTC(updatedStartDate.split('T')[0] + 'T00:00:00', selectedTimeZone);

      setStartTimeForSlots(checkUtcDateForPast(startTime));

      setEndTimeForSlots(
        convertLocalToUTC(
          moment(selectedDateMoment.toISOString())
            .endOf('day')
            .add(1, 'day')
            .startOf('day')
            .format('yyyy-MM-DDTHH:mm:ss'),
          selectedTimeZone
        )
      );
    }
  }, [selectedDate, selectedTimeZone, providerSelected]);

  useEffect(() => {
    if (isLoading || isUpdatingRequest || isCreatingAppointment || isUpdatePendingReschedule) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isUpdatingRequest, isCreatingAppointment, isUpdatePendingReschedule, dispatch]);

  useApiFeedback(isError, error, isSuccess, (data?.message || 'Added successfully!') as string);

  useApiFeedback(
    isUpdateError,
    updateError,
    isUpdateSuccess,
    (updateData?.message || 'Updated successfully!') as string
  );

  useApiFeedback(
    isUpdateErrorReschedule,
    updateErrorReschedule,
    isUpdateSuccessReschedule,
    (updateDataReschedule?.message || 'Appointment updated successfully!') as string
  );

  const is1229PX = useMediaQuery('(max-width:1229px)');

  return (
    <Grid height={'100%'}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container display="flex" flexDirection="column" rowGap={2} m={0}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={2} display="flex">
                <Grid size={{ xs: 12 }} pt={0}>
                  <CustomLabel label={newAppointment.PATIENT_NAME} isRequired />
                  <Controller
                    control={control}
                    name="patientId"
                    render={({ field }) => (
                      <CustomAutoComplete
                        placeholder={newAppointment.SELECT_PATIENT}
                        value={field.value}
                        options={[
                          {
                            key: selectedRequest?.patientClinicId,
                            value: `${selectedRequest?.patientClinic?.patient?.firstName} ${selectedRequest?.patientClinic?.patient?.lastName}`,
                          },
                        ]}
                        onChange={() => {}}
                        hasError={!!errors.patientId}
                        errorMessage={errors.patientId?.message as string}
                        autoname="patientId"
                        isDisabled={true}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} pt={0}>
                  <CustomLabel label={newAppointment.APPOINTMENT_MODE} isRequired />
                  <Controller
                    control={control}
                    name="mode"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value || 'IN_PERSON'}
                        onChange={() => {}}
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
                          control={<Radio disabled />}
                          label={newAppointment.IN_PERSON}
                        />
                        <FormControlLabel
                          value="VIRTUAL"
                          control={<Radio disabled />}
                          label={newAppointment.VIDEO_CALL}
                        />
                        <FormControlLabel
                          value="HOME"
                          control={<Radio disabled />}
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
                        options={[
                          {
                            key: selectedRequest?.providerId,
                            value: `${selectedRequest?.provider?.firstName} ${selectedRequest?.provider?.lastName}`,
                          },
                        ]}
                        onChange={() => {}}
                        hasError={!!errors.providerId}
                        errorMessage={errors.providerId?.message as string}
                        autoname="providerId"
                        isDisabled={true}
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
                        options={[
                          {
                            key: selectedRequest?.appointmentTypeId,
                            value: selectedRequest?.appointmentType?.title,
                          },
                        ]}
                        onChange={() => {}}
                        hasError={!!errors.type}
                        errorMessage={errors.type?.message as string}
                        autoname="type"
                        isDisabled={true}
                      />
                    )}
                  />
                </Grid>

                {/* Location - Disabled (if IN_PERSON or HOME) */}
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
                          options={[
                            {
                              key: selectedRequest?.locationId,
                              value: selectedRequest?.location?.name,
                            },
                          ]}
                          onChange={() => {}}
                          hasError={!!errors.locationId}
                          errorMessage={errors.locationId?.message as string}
                          autoname="locationId"
                          isDisabled={true}
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid size={{ xs: 6 }}>
                  <CustomLabel label={newAppointment.ESTIMATED_AMOUNT} />
                  <Controller
                    control={control}
                    name="estimateAmount"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={newAppointment.ENTER_ESTIMATED_AMOUNT}
                        {...field}
                        hasError={!!errors.estimateAmount}
                        errorMessage={errors.estimateAmount?.message as string}
                        disableField={true}
                      />
                    )}
                  />
                </Grid>

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
                        onChange={value => {
                          setSelectedTimeZone(value);
                          setTimezoneError(false);
                        }}
                        autoname="timezone"
                        hasError={timezoneError}
                        errorMessage={timezoneError ? 'Timezone is required' : ''}
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
                        disableField={true}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <CustomLabel label="Action" isRequired />
                  <CustomAutoComplete
                    placeholder="Select Action"
                    value={status}
                    options={[
                      { key: 'APPROVED', value: 'Approve & Schedule Appointment' },
                      { key: 'REJECTED', value: 'Reject Booking Request' },
                    ]}
                    onChange={value => setStatus(value as 'APPROVED' | 'REJECTED')}
                    autoname="status"
                    isDisabled={buttonAction === 'cancel'}
                  />
                </Grid>

                {status === 'REJECTED' && (
                  <Grid size={{ xs: 12 }}>
                    <CustomLabel label={appointmentConstants.REASON} isRequired />
                    <CustomInput
                      placeholder={appointmentConstants.ENTER_REASON}
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      hasError={status === 'REJECTED' && !reason}
                      errorMessage={status === 'REJECTED' && !reason ? 'Reason is required' : ''}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Calendar and Slots Section - Only enabled when approving */}
            {status === 'APPROVED' && (
              <Grid
                container
                size={{ xs: 12 }}
                gap={1}
                alignItems={'flex-start'}
                overflow={'hidden'}
                mt={3}
                flexDirection={is1229PX ? 'column' : 'row'}
              >
                <Grid>
                  <DateCalendarBS
                    value={selectedDate || ''}
                    minDate={new Date()}
                    onChange={selectedDate => {
                      setSelectedSlot('');
                      setSelectedStartTime('');
                      setSelectedEndTime('');
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
                              setSlotError(false);
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
              </Grid>
            )}

            {slotError && status === 'APPROVED' && (
              <Typography sx={errorStyle} variant="titleMedium5">
                Slot is required
              </Typography>
            )}

            <Grid container sx={{ marginTop: 'auto' }} justifyContent={'flex-end'} pb={1}>
              <Grid container gap={2} justifyContent={'flex-end'} mt={3}>
                <CustomButton
                  variant="outlined"
                  label="Cancel"
                  onClick={onClose}
                  disabled={isUpdatingRequest || isCreatingAppointment}
                />
                <CustomButton
                  variant="filled"
                  type="submit"
                  label={status === 'APPROVED' ? 'Approve & Schedule' : 'Reject Request'}
                  disabled={isUpdatingRequest || isCreatingAppointment}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default ScheduleRequestedAppointmentDialog;
