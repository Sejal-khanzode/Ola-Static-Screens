import { Appointment } from '../../../../assets/icons/appointmentIcon';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import { settingsConstants } from '../../../../constants/setting-constants';
import CustomIcon from '../CustomIcon';
import { KeyboardArrowRight } from '../../../../assets/icons/keyboardArrow';

const menuItems = [
  { label: settingsConstants.AVAILABILITY, path: 'availability' , disabled: false},
  { label: settingsConstants.APPOINTMENT_TYPES, path: 'appointment-types' , disabled: false},
  { label: settingsConstants.COLOR_CONFIGURATION, path: 'color-config' , disabled: false},
  { label: settingsConstants.CANCELLATION_POLICY, path: 'cancellation-policy' , disabled: true},
];

const AppointmentSettingsPage = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(`/provider/settings/appointment/${path}`);
  };

  return (
    <Box display="flex" height={'100%'}>
      <Paper
        elevation={1}
        sx={{
          width: '430px',
          borderRadius: '8px',
          p: 2,
        }}
      >
        <Grid container direction="column" spacing={2}>
          {/* Header */}
          <Grid>
            <Grid
              container
              alignItems="center"
              spacing={1}
              display={'flex'}
              flexDirection={'row'}
              gap={1}
            >
              <Grid
                bgcolor={'#E5F5FF'}
                display={'flex'}
                borderRadius={'4px'}
                width={'50px'}
                height={'35px'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Appointment color="Primary.main" />
              </Grid>
              <Grid>
                <Typography variant="bodyMedium3" color="Primary.main">
                  {settingsConstants.APPOINTMENT}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Menu Items */}
          <Grid>
            <Grid container direction="column">
              {menuItems.map((item, index) => (
                <Grid
                  key={index}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => item.disabled ? null : handleMenuItemClick(item.path)}
                  sx={{
                    py: 1,
                    px: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      borderRadius: '4px',
                    },
                  }}
                >
                  <Grid>
                    <Typography variant="bodyRegular3" color={item.disabled ? 'Neutral.70' : 'Base.black'}>{item.label}</Typography>
                  </Grid>
                  <Grid>
                    <CustomIcon icon={<KeyboardArrowRight />} iconColor="Neutral.70" />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Box flex={1} ml={2}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppointmentSettingsPage;
