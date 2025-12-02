// eslint-disable-next-line @typescript-eslint/no-misused-promises

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { scheduleAppointmentSchemaNew } from './schedule-appointment-schema';
import moment from 'moment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { slotSelectStyles, slotSelectStylesHover } from '../widgets/appointment.widget';
import { useDispatch } from 'react-redux';
import { BASIC_DATE_FORMAT, BASIC_DATE_TIME_FORMAT } from 'src/constants/date-format';
import { adjustTimeForDST, standardTimeZoneType } from 'src/utils/timeZone';
import { checkUtcDateForPast, convertLocalToUTC, convertTime } from 'src/utils/date-utils';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import DateCalendarBS from '../date-calendar-bs/date-calendar-bs';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { formConstants } from 'src/constants/setting-constants';
import {
  AppointmentManagementService,
  AppointmentType,
  AppointmentTypeManagementService,
  AvailabilityManagementService,
  LocationControllerService,
  PatientClinicControllerService,
  ProviderControllerService,
} from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { AvailabilityConstants } from '../../../pages/settings/availability/model/availabilityModel';
import { addPatientConstants, appointmentConstants } from 'src/constants/patients-constants';
import { AvailableSlot, newAppointment } from 'src/constants/scheduling-constants';
import { AddIcon } from 'src/assets/icons/addIcon';
import { useNavigate } from 'react-router-dom';
import { errorStyle } from 'src/components/core/reusable/custom-text-area/custom-textarea';

export interface ScheduleApptProps {
  refetchList?: () => void;
  handleDrawerClose?: () => void;
  appointmentData?: any;
  isEdit?: boolean;
  isReschedule?: boolean;
}

const ScheduleAppointmentDialog = (props: ScheduleApptProps) => {
  const { refetchList, handleDrawerClose, appointmentData, isEdit, isReschedule } = props;

  const [providerSelected, setProviderSelected] = useState('');
  const [apptTypeSelected, setApptTypeSelected] = useState('');

  const [patientList, setPatientList] = useState<{ key: string; value: string }[]>([]);

  const [providersList, setProvidersList] = useState<{ key: string; value: string }[]>([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format(BASIC_DATE_FORMAT));
  const [startTimeForSlots, setStartTimeForSlots] = useState('');
  const [endTimeForSlots, setEndTimeForSlots] = useState('');
  const [avlSlots, setAvlSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('EST');
  const [searchText, setsearchText] = useState('');
  const clinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
  const [appointmentTypesList, setAppointmentTypesList] = useState<
    { key: string; value: string }[]
  >([]);
  const [locationsList, setLocationsList] = useState<{ key: string; value: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(
    isEdit && !isReschedule ? 'scheduled' : isEdit && isReschedule ? 'reschedule' : ''
  );
  const [reasonInput, setReasonInput] = useState('');
  const [slotError, setSlotError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const dispatch = useDispatch();

  const allStatusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'reschedule', label: 'Reschedule' },
    { value: 'cancel', label: 'Cancel' },
    { value: 'no_show', label: 'No Show' },
  ];

  const statusOptions =
    isEdit && !isReschedule
      ? allStatusOptions.filter(option => option.value !== 'reschedule')
      : isReschedule && isEdit
        ? [{ value: 'reschedule', label: 'Reschedule' }]
        : allStatusOptions.filter(option => option.value !== 'scheduled');

  const { data: patientInformationData, refetch } = useQuery({
    queryKey: ['patientsListScheduleAPI'],
    enabled: !!clinicId,
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinic({
        clinicUuid: clinicId || '',
        searchString: searchText,
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
        clinicId: clinicId,
        archive: false,
        status: true,
      }),
    enabled: !!clinicId,
  });

  const initialValues = {
    patientId: appointmentData?.patientClinicId || '',
    providerId: appointmentData?.providerId || '',
    locationId: appointmentData?.locationId || '',
    chiefComplaint: appointmentData?.reasonOfVisit || '',
    startTime: appointmentData?.startTime || '',
    endTime: appointmentData?.endTime || '',
    timezone: appointmentData?.timezone || 'EST',
    mode: appointmentData?.mode || 'IN_PERSON',
    type: appointmentData?.appointmentTypeId || '',
    paymentType: appointmentData?.paymentType || 'CASH',
    duration: appointmentData?.duration || 0,
    insuranceType: appointmentData?.insuranceType || undefined,
    estimateAmount: appointmentData?.estimateAmount || '',
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(scheduleAppointmentSchemaNew),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = method;

  // Watch patientId, mode and locationId from form
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

  const {
    mutateAsync: addMutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (payload: any) =>
      AppointmentManagementService.postApiMasterAppointments({ requestBody: payload }),
  });

  const {
    mutateAsync: updateMutateAsync,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    data: updateData,
  } = useMutation({
    mutationFn: (payload: any) =>
      AppointmentManagementService.putApiMasterAppointments({ requestBody: payload }),
  });

  const {
    mutateAsync: statusMutateAsync,
    isSuccess: isStatusSuccess,
    isPending: isStatusPending,
    isError: isStatusError,
    error: statusError,
    data: statusData,
  } = useMutation({
    mutationFn: ({ uuid, status }: { uuid: string; status: 'CANCELLED' | 'NO_SHOW' }) =>
      AppointmentManagementService.patchApiMasterAppointmentsByUuidStatus({
        uuid,
        requestBody: { status },
      }),
  });

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'Appointment added successfully!') as string
  );

  useApiFeedback(
    isUpdateError,
    updateError,
    isUpdateSuccess,
    (updateData?.message || 'Appointment updated successfully!') as string
  );

  useApiFeedback(
    isStatusError,
    statusError,
    isStatusSuccess,
    (statusData?.message || 'Appointment status updated successfully!') as string
  );

  const handleTimeZoneChange = (val: string) => {
    setSelectedTimeZone(val);
    setValue('timezone', val, { shouldValidate: true });
  };

  function calculateDurationInMinutes(startTime: string, endTime: string) {
    const startDate = new Date(`1970-01-01T${startTime}`);
    const endDate = new Date(`1970-01-01T${endTime}`);
    // const timeDifference = endDate - startDate;
    // const durationInMinutes = timeDifference / (1000 * 60);

    return (endDate.getTime() - startDate.getTime()) / (1000 * 60);
  }

useEffect(() => {
  setSelectedSlot('');
  setSelectedStartTime('');
  setSelectedEndTime('');
  setSlotError(false);
}, [selectedDate, providerSelected, apptTypeSelected, watchedMode, watchedLocationId]);

const onSubmit = async (values: any) => {
  // Validate reason input for cancel and no_show
  if ((selectedStatus === 'cancel' || selectedStatus === 'no_show') && !reasonInput.trim()) {
    setReasonError(true);
    return;
  }

  if (selectedStatus === 'scheduled' && isEdit) {
    // Update appointment with existing details (no slot change)
    const payload = {
      uuid: appointmentData?.uuid,
      clinicId: clinicId,
      patientClinicId: values.patientId,
      providerId: values.providerId,
      locationId: values.locationId,
      appointmentTypeId: values.type,
      reasonOfVisit: values.chiefComplaint,
      startTime: adjustTimeForDST(appointmentData?.startTime, selectedTimeZone),
      endTime: adjustTimeForDST(appointmentData?.endTime, selectedTimeZone),
      timezone: selectedTimeZone,
      mode: values.mode,
      duration: appointmentData?.duration || 0,
      estimateAmount: values.estimateAmount,
    };
    await updateMutateAsync(payload);
  } else if (selectedStatus === 'reschedule') {
    // Update appointment with new details
    if (selectedStartTime === '' || selectedSlot === '') {
      setSlotError(true);
      return;
    }
    const payload = {
      uuid: appointmentData?.uuid,
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

    await updateMutateAsync(payload);
  } else if (selectedStatus === 'cancel' || selectedStatus === 'no_show') {
    // Update appointment status
    const status = selectedStatus === 'cancel' ? 'CANCELLED' : 'NO_SHOW';
    await statusMutateAsync({
      uuid: appointmentData?.uuid,
      status,
    });
  } else if (isEdit) {
    const payload = {
      uuid: appointmentData?.uuid,
      clinicId: clinicId,
      patientClinicId: values.patientId,
      providerId: values.providerId,
      locationId:
            watchedMode === 'IN_PERSON' || values.mode === 'HOME' ? values.locationId : undefined,  
      appointmentTypeId: values.type,
      reasonOfVisit: values.chiefComplaint,
      startTime: adjustTimeForDST(appointmentData?.startTime, selectedTimeZone),
      endTime: adjustTimeForDST(appointmentData?.endTime, selectedTimeZone),
      timezone: selectedTimeZone,
      mode: values.mode,
        duration: calculateDurationInMinutes(
          selectedSlot.split(' - ')[0],
          selectedSlot.split(' - ')[1]
        ),
      estimateAmount: values.estimateAmount,
    };
    await updateMutateAsync(payload);
  } else {
    // Create new appointment
    if (selectedStartTime === '' || selectedSlot === '') {
      setSlotError(true);
      return;
    }
    const payload = {
      clinicId: clinicId,
      patientClinicId: values.patientId,
      providerId: values.providerId,
locationId:
            watchedMode === 'IN_PERSON' || values.mode === 'HOME' ? values.locationId : undefined,
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

    await addMutateAsync(payload);
  }

  handleDrawerClose && handleDrawerClose();
  refetchList && refetchList();
};

  useEffect(() => {
    if (!slotsResponse || !isSuccessSlot) return;

    setAvlSlots(slotsResponse?.data?.slots as AvailableSlot[]);
  }, [slotsResponse, isSuccessSlot]);

  useEffect(() => {
    const apiData = Array.isArray(patientInformationData?.data?.content)
      ? patientInformationData?.data?.content?.map((ele: any) => ({
          key: ele.uuid,
          value: ele.patientName,
        }))
      : [];
    const uniqueNewPatientOptions = apiData?.filter(
      newPatient => !patientList?.some(existingPatient => existingPatient.key === newPatient.key)
    );

    setPatientList(prevOptions => [...prevOptions, ...uniqueNewPatientOptions]);
  }, [patientInformationData]);

  useEffect(() => {
    if (providerAPIData?.data?.content && Array.isArray(providerAPIData.data.content)) {
      const apiData = providerAPIData.data.content.map((provider: any) => ({
        key: provider.uuid,
        value: `${provider.firstName} ${provider.lastName}`,
      }));
      setProvidersList(apiData);
    }
  }, [providerAPIData]);

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

  const handleInputChangePatient = (inputValue: any) => {
    if (inputValue?.length > 2) {
      setsearchText(inputValue);
    }
  };

  useEffect(() => {
    refetch();
  }, [searchText]);

  useEffect(() => {
    if (appointmentTypesData?.data?.content && Array.isArray(appointmentTypesData?.data?.content)) {
      const apiData = appointmentTypesData?.data?.content
        ?.filter((appointmentType: AppointmentType) => appointmentType.uuid)
        ?.map((appointmentType: AppointmentType) => ({
          key: appointmentType.uuid!,
          value: appointmentType.title,
        }));
      setAppointmentTypesList(apiData);
    }
  }, [appointmentTypesData]);

  useEffect(() => {
    if (locationsAPIData?.data?.content && Array.isArray(locationsAPIData.data.content)) {
      const apiData = locationsAPIData.data.content
        ?.filter((location: any) => location.uuid)
        ?.map((location: any) => ({
          key: location.uuid!,
          value: location.name,
        }));
      setLocationsList(apiData);
    }
  }, [locationsAPIData]);

  // Clear location when mode is not IN_PERSON
  useEffect(() => {
    if (watchedMode && watchedMode == 'VIRTUAL') {
      setValue('locationId', '', { shouldValidate: true });
    }
  }, [watchedMode, setValue]);

  // Pre-populate states when appointmentData is available
  useEffect(() => {
    if (appointmentData) {
      setProviderSelected(appointmentData.providerId || '');
      setApptTypeSelected(appointmentData.appointmentTypeId || '');
      if (appointmentData.startTime) {
        const appointmentDate = moment(appointmentData.startTime).format(BASIC_DATE_FORMAT);
        setSelectedDate(appointmentDate);
      }
      if (appointmentData.timezone) {
        setSelectedTimeZone(appointmentData.timezone);
      }
    }
  }, [appointmentData]);

  // Reset form with appointment data after dropdown options are loaded
  useEffect(() => {
    if (
      appointmentData &&
      patientList.length > 0 &&
      providersList.length > 0 &&
      locationsList.length > 0 &&
      appointmentTypesList.length > 0
    ) {
      // Check if the values exist in the dropdown options
      const patientExists = patientList.find(p => p.key === appointmentData.patientClinicId);
      const providerExists = providersList.find(p => p.key === appointmentData.providerId);
      const locationExists = locationsList.find(l => l.key === appointmentData.locationId);
      const appointmentTypeExists = appointmentTypesList.find(
        a => a.key === appointmentData.appointmentTypeId
      );

      // Add missing options to dropdown lists if they don't exist
      if (!patientExists && appointmentData.patientClinicId && appointmentData.patientName) {
        const newPatient = {
          key: appointmentData.patientClinicId,
          value: appointmentData.patientName,
        };
        setPatientList(prev => [...prev, newPatient]);
      }

      if (!providerExists && appointmentData.providerId && appointmentData.providerName) {
        const newProvider = {
          key: appointmentData.providerId,
          value: appointmentData.providerName,
        };
        setProvidersList(prev => [...prev, newProvider]);
      }

      if (!locationExists && appointmentData.locationId && appointmentData.locationName) {
        const newLocation = {
          key: appointmentData.locationId,
          value: appointmentData.locationName,
        };
        setLocationsList(prev => [...prev, newLocation]);
      }

      if (
        !appointmentTypeExists &&
        appointmentData.appointmentTypeId &&
        appointmentData.appointmentTypeName
      ) {
        const newAppointmentType = {
          key: appointmentData.appointmentTypeId,
          value: appointmentData.appointmentTypeName,
        };
        setAppointmentTypesList(prev => [...prev, newAppointmentType]);
      }

      const formData = {
        patientId: appointmentData.patientClinicId || '',
        providerId: appointmentData.providerId || '',
        locationId: appointmentData.locationId || '',
        chiefComplaint: appointmentData.reasonOfVisit || '',
        startTime: appointmentData.startTime || '',
        endTime: appointmentData.endTime || '',
        timezone: appointmentData.timezone || 'EST',
        mode: appointmentData.mode || 'IN_PERSON',
        type: appointmentData.appointmentTypeId || '',
        paymentType: appointmentData.paymentType || 'CASH',
        duration: appointmentData.duration || 0,
        insuranceType: appointmentData.insuranceType || undefined,
        estimateAmount: appointmentData.estimateAmount || '',
      };

      // Small delay to allow state updates to complete
      setTimeout(() => {
        reset(formData);
      }, 100);
    }
  }, [appointmentData, patientList, providersList, locationsList, appointmentTypesList, reset]);

  useEffect(() => {
    if (isLoading || isPending || isUpdatePending || isStatusPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isPending, isUpdatePending, isStatusPending, dispatch]);

  return (
    <Grid height={'100%'}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container display="flex" flexDirection="column" rowGap={2} m={0}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={2} display="flex">
                <Grid size={{ xs: 8 }} pt={0}>
                  <CustomLabel label={newAppointment.PATIENT_NAME} isRequired />
                  <Controller
                    control={control}
                    name="patientId"
                    render={({ field }) => (
                      <CustomAutoComplete
                        placeholder={newAppointment.SELECT_PATIENT}
                        value={field.value}
                        options={patientList}
                        onChange={selectedVal => {
                          setValue('patientId', selectedVal, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.patientId}
                        errorMessage={errors.patientId?.message as string}
                        onInputChange={handleInputChangePatient}
                        autoname="patientId"
                        isDisabled={isEdit}
                      />
                    )}
                  ></Controller>
                </Grid>
                {!isEdit && (
                  <Grid
                    size={{ xs: 3 }}
                    // mt={errors.patientId ? 2 : 1}
                    display="flex"
                    alignItems={!!errors.patientId ? 'center' : 'end'}
                  >
                    <CustomButton
                      label={addPatientConstants.ADD_PATIENT}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        navigate('/provider/patients/add-patient');
                      }}
                    />
                  </Grid>
                )}

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
                          disabled={isEdit && !isReschedule}
                        />
                        <FormControlLabel
                          value="VIRTUAL"
                          control={<Radio />}
                          label={newAppointment.VIDEO_CALL}
                          disabled={isEdit && !isReschedule}
                        />
                        <FormControlLabel
                          value="HOME"
                          control={<Radio />}
                          label={newAppointment.HOME}
                          disabled={isEdit && !isReschedule}
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
                        isDisabled={isEdit && !isReschedule}
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
                        isDisabled={isEdit && !isReschedule}
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
                          isDisabled={isEdit && !isReschedule}
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
                        isNumeric
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
                        onChange={handleTimeZoneChange}
                        autoname="timezone"
                        isDisabled={isEdit && !isReschedule}
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

                {appointmentData && (
                  <Grid size={{ xs: 4 }}>
                    <CustomLabel label={appointmentConstants.STATUS} />
                    <CustomAutoComplete
                      placeholder={appointmentConstants.SELECT_STATUS}
                      value={selectedStatus}
                      options={statusOptions.map(option => ({
                        key: option.value,
                        value: option.label,
                      }))}
                      onChange={value => setSelectedStatus(value)}
                      autoname="status"
                      isDisabled={isReschedule}
                    />
                  </Grid>
                )}

                {appointmentData &&
                  (selectedStatus === 'cancel' || selectedStatus === 'no_show') && (
                    <Grid size={{ xs: 12 }}>
                      <CustomLabel label={appointmentConstants.REASON} isRequired />
                      <CustomInput
                        placeholder={appointmentConstants.ENTER_REASON}
                        value={reasonInput}
                        onChange={e => {
                          setReasonInput(e.target.value);
                          setReasonError(false);
                        }}
                        hasError={reasonError}
                        errorMessage={reasonError ? 'Reason is required' : ''}
                      />
                    </Grid>
                  )}
              </Grid>
            </Grid>
            {/* // calendar and slots  section */}
            {(!appointmentData || selectedStatus === 'reschedule') && (
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
            {slotError && isReschedule && (
              <Typography sx={errorStyle} variant="titleMedium5">
                Please select a time slot.
              </Typography>
            )}

            {slotError && !isEdit && (
              <Typography sx={errorStyle} variant="titleMedium5">
                Please select a time slot.
              </Typography>
            )}
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
export default ScheduleAppointmentDialog;
