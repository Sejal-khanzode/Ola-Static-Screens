import { Grid, Typography } from '@mui/material';
import { formatToCapitalize } from 'src/constants/capitalize-function';
import { getTimeDuration } from './startAppointment';
import { appointmentConstants } from 'src/constants/patients-constants';

interface CheckinDrawerProps {
  appointmentData: any;
}

const CheckinDrawer = (props: CheckinDrawerProps) => {
  const { appointmentData } = props;
  console.log('appointmentData', appointmentData);

  const leftSideApptDetails = [
    {
      label: appointmentConstants.APPOINTMENT_MODE,
      value: formatToCapitalize(appointmentData?.mode),
    },
    { label: appointmentConstants.CLINICIAN, value: appointmentData?.providerName },
    {
      label: appointmentConstants.DURATION,
      value: `${getTimeDuration(appointmentData?.time)} mins`,
    },
  ];

  const rightSideApptDetails = [
    { label: appointmentConstants.APPOINTMENT_TYPE, value: appointmentData?.appointmentType },
    { label: appointmentConstants.DATE_TIME, value: appointmentData?.time },
  ];

  return (
    <Grid container>
      <Grid size={12}>
        <Grid
          border={'1px solid'}
          borderColor={'Neutral.30'}
          size={12}
          borderRadius={1}
          p={1}
          display={'flex'}
        >
          <Grid size={6}>
            {leftSideApptDetails.map(({ label, value }) => (
              <Grid display={'flex'}>
                <Grid size={3.5}>
                  <Typography variant="bodyRegular4" color="Neutral.70">
                    {label}
                  </Typography>
                </Grid>

                <Typography sx={{ pr: 1 }}>:</Typography>
                <Typography variant="bodyMedium4">{value || '-'}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid size={6}>
            {rightSideApptDetails.map(({ label, value }) => (
              <Grid display={'flex'}>
                <Grid size={3.5} gap={1}>
                  <Typography variant="bodyRegular4" color="Neutral.70">
                    {label}
                  </Typography>
                </Grid>

                <Typography sx={{ pr: 1 }}>:</Typography>
                <Typography variant="bodyMedium4">{value || '-'}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckinDrawer;
