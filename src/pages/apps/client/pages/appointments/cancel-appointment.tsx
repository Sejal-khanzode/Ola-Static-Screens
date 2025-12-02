import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment-timezone';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Appointment,
  RequestAppointment,
  RequestAppointmentManagementService,
} from 'src/sdk/requests';
import { cancelSchema } from './request-appt-schema';
import { schedulingConstants } from 'src/constants/scheduling-constants';
import { BASIC_DATE_FORMAT_MM_DD_YYYY } from 'src/constants/date-format';
import { convertDateTimeToSpecifiedZoneWithoutDate } from 'src/utils/date-utils';
import CustomTextArea from 'src/components/core/reusable/custom-text-area/custom-textarea';
import { formConstants } from 'src/constants/setting-constants';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';

type AppointmentCancelDrawerProps = {
  appointment: Appointment | any | null;
  handleDrawerClose?: () => void;
  refetch: () => void;
};

const AppointmentCancelDrawer = (props: AppointmentCancelDrawerProps) => {
  const { appointment, refetch, handleDrawerClose } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(cancelSchema),
  });
  const patientClinicData = useSelector(
    (state: RootState) => state.patientClinicReducer.patientClinicData
  );
  const patientDetails = patientClinicData;

  const clinicId = patientDetails?.clinic ? Object.keys(patientDetails.clinic)[0] : undefined;
  const dispatch = useDispatch();

  const {
    mutateAsync: cancelRequest,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    data: updateData,
  } = useMutation({
    mutationFn: (payload: RequestAppointment) =>
      RequestAppointmentManagementService.postApiMasterRequestAppointmentCancel({
        requestBody: payload,
      }),
  });

  const getTimeZoneAbbreviationDate = () => {
    const timezone = moment.tz.guess();
    const abbreviation = moment.tz(timezone).format('z');
    return abbreviation;
  };

  const { convertedDate, formattedStartTime, formattedEndTime } =
    convertDateTimeToSpecifiedZoneWithoutDate(
      appointment?.startTime || '',
      appointment?.endTime || '',
      getTimeZoneAbbreviationDate()
    );

  const onSubmit = async (values: any) => {
    try {
      if (!appointment?.uuid) {
        return;
      }

      await cancelRequest({
        appointmentId: appointment.uuid,
        requestType: 'CANCEL',
        clinicId: clinicId || '',
        patientClinicId: patientDetails?.uuid || '',
        providerId: appointment.providerId,
        mode: appointment.mode,
        requestedStartTime: appointment?.startTime,
        requestedEndTime: appointment?.endTime,
        appointmentTypeId: appointment.appointmentTypeId,
        locationId: appointment?.locationId,
        requestReason: values?.reason,
      });

      handleDrawerClose && handleDrawerClose();
      refetch && refetch();
    } catch (error) {}
  };

  useApiFeedback(
    isUpdateError,
    updateError,
    isUpdateSuccess,
    (updateData?.message || 'Updated successfully!') as string
  );

  useEffect(() => {
    if (isUpdatePending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUpdatePending, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container flexDirection={'column'} gap={1}>
        <Grid container flexWrap={'nowrap'}>
          <Grid size={2}>
            <Typography variant="titleMedium4" color="Neutral.70">
              {schedulingConstants.CLINICIAN}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="titleMedium4">
              {appointment?.providerName ? `${appointment?.providerName}` : '-'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container flexWrap={'nowrap'}>
          <Grid size={3}>
            <Typography variant="titleMedium4" color="Neutral.70">
              {schedulingConstants.DATE}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="titleMedium4">
              {appointment?.endTime
                ? moment(convertedDate).format(BASIC_DATE_FORMAT_MM_DD_YYYY)
                : '-'}
            </Typography>
          </Grid>

          <Grid size={4}>
            <Typography variant="titleMedium4" color="Neutral.70">
              {schedulingConstants.TIME}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="titleMedium4">
              {appointment?.endTime && appointment?.startTime
                ? `${formattedStartTime} - ${formattedEndTime || ''}`
                : '-'}
            </Typography>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Box display={'flex'} gap={0.5}>
            <Typography variant="titleMedium4" color="Neutral.70" mb={1}>
              {schedulingConstants.REASON_FOR_CANCELLATION}
            </Typography>
            <Typography variant="titleMedium4" color="Neutral.70" sx={{ color: 'red' }} mb={1}>
              *
            </Typography>
          </Box>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={schedulingConstants.CANCEL_REASON}
                {...field}
                value={field.value || ''}
                hasError={!!errors.reason}
                errorMessage={errors.reason?.message}
                minRow={5}
              />
            )}
          />
        </Grid>

        <Grid container mt={2} mb={2} justifyContent={'flex-end'}>
          <CustomButton variant="filled" type="submit" label={formConstants.SAVE} />
        </Grid>
      </Grid>
    </form>
  );
};
export default AppointmentCancelDrawer;
