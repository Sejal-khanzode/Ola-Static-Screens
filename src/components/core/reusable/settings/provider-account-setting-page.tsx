import { Provider } from '../../../../assets/icons/providerIcon';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import { settingsConstants } from '../../../../constants/setting-constants';
import CustomIcon from '../CustomIcon';
import { KeyboardArrowRight } from '../../../../assets/icons/keyboardArrow';

const menuItems = [
  { label: settingsConstants.PROFILE, path: 'profile' },
  // { label: settingsConstants.PATIENT_FLAG, path: 'patient-flag' },
];

const ProviderAccountSettingsPage = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(`/provider/settings/provider-account/${path}`);
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
                width={'35px'}
                height={'35px'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Provider color="Primary.main" />
              </Grid>
              <Grid>
                <Typography variant="bodyMedium3" color="Primary.main">
                  {settingsConstants.PROVIDER_ACCOUNT}
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
                  onClick={() => handleMenuItemClick(item.path)}
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
                    <Typography variant="bodyRegular3">{item.label}</Typography>
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

export default ProviderAccountSettingsPage;
