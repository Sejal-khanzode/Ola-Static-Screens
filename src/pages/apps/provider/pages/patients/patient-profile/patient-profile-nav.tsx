import { Box, Typography, Paper, Chip, Grid, Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useQuery } from '@tanstack/react-query';
import { PatientClinic, PatientClinicControllerService } from 'src/sdk/requests';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from 'src/utils/stringUtils';
import { setPatientData } from 'src/redux/reducers/patientReducer';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import StickyNotes from '../sticky-notes';
import { Provider } from 'src/assets/icons/providerIcon';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { useAppDispatch } from 'src/redux/hooks';
import Flags from '../../patients/flags';

const PatientProfileNav = () => {
  const dispatch = useAppDispatch();
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [patientData, setpatientData] = useState<PatientClinic>();

  const { data: patientsApiData } = useQuery({
    queryKey: ['patientData'],
    enabled: !!patientUUID,
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUUID || '',
      }),
  });

  useEffect(() => {
    if (patientsApiData?.data) {
      const data = patientsApiData?.data as unknown as PatientClinic;
      setpatientData(data);
      dispatch(setPatientData(data));
    }
  }, [patientsApiData, dispatch]);

  return (
    <Paper
      sx={{
        mt: -1,
        minHeight: { xs: 'auto', md: 10 },
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Grid container size={12} justifyContent="space-between" sx={{ width: '100%' }}>
        <Grid alignItems="center" spacing={2} display="flex" flexDirection="row" gap={2}>
          <Grid ml={2}>
            <Avatar src={patientData?.patient?.avatar} sx={{ width: '70px', height: '70px' }} />
          </Grid>
          <Grid ml={1} display="flex" gap={2}>
            <Box display="flex" flexDirection={'column'} alignItems="start" gap={1}>
              <Typography variant="bodyBold2">
                {patientData?.patient?.firstName || ''} {patientData?.patient?.lastName || ''}
              </Typography>
              {patientData?.patient?.gender && (
                <Box display="flex" alignItems={'center'} gap={1} mt={1}>
                  <Chip
                    label={capitalizeFirstLetter(patientData?.patient?.gender)}
                    variant="outlined"
                    sx={{ color: '#0068FF', backgroundColor: '#EEF7FE' }}
                    size="small"
                  />
                  {patientData?.mrn && (
                    <Typography variant="bodyRegular5" color="#595F63">
                      #{patientData?.mrn}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            <Box display="flex" flexDirection="row" gap="24px" color="#595F63">
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">
                    {patientData?.patient?.dob
                      ? `${formatDateToMMDDYYYY(patientData?.patient?.dob)} (${new Date().getFullYear() - new Date(patientData?.patient?.dob).getFullYear()} yrs)`
                      : ''}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <LocationOnOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">
                    {patientData?.address
                      ? `${patientData.address.line1}${patientData.address.line2 ? `, ${patientData.address.line2}` : ''}, ${patientData.address.city}, ${patientData.address.state}, ${patientData.address.zipcode}`
                      : ''}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalPhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">
                    {formatPhoneNumber(patientData?.patient?.phone || '')}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <MailOutlineIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">
                    {patientData?.patient?.email || ''}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center">
                  <Flags />
                </Box>
                <Box display="flex" alignItems="center" gap={1} pt={1}>
                  {patientData?.primaryProvider && <Provider width="20px" height="20px" />}
                  <Typography variant="bodyRegular4">
                    {patientData?.primaryProvider
                      ? Object.values(patientData.primaryProvider)[0] || ''
                      : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          sx={{
            width: '15vw',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <StickyNotes uuid={patientUUID || ''} isAlertNote={true} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientProfileNav;
