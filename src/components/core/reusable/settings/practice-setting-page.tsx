import { Hospital } from '../../../../assets/icons/hospitalIcon';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import { settingsConstants } from '../../../../constants/setting-constants';
import CustomIcon from '../CustomIcon';
import { KeyboardArrowRight } from 'src/assets/icons/keyboardArrow';

const menuItems = [
  { label: settingsConstants.PROFILE, path: 'profile' , disabled: false},
  { label: settingsConstants.LOCATIONS, path: 'location' , disabled: false},
  { label: settingsConstants.USERS, path: 'users' , disabled: false},
  { label: settingsConstants.ROLES_AND_RESPONSIBILITY, path: 'roles' , disabled: true},
  { label: settingsConstants.PRINT_CONFIGURATION, path: 'print-config' , disabled: false},
];

const PracticeSettingsPage = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string, disabled: boolean) => {
    if (disabled) {
      return;
    } else {
      navigate(`/provider/settings/practice/${path}`);
    }
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
                <Hospital color="Primary.main" />
              </Grid>
              <Grid>
                <Typography variant="bodyMedium3" color="Primary.main">
                  {settingsConstants.PRACTICE}
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
                  onClick={() => handleMenuItemClick(item.path, item.disabled )}
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
                    <Typography variant="bodyRegular3" color={item.disabled ? 'Neutral.70' : ''}>{item.label}</Typography>
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

export default PracticeSettingsPage;
