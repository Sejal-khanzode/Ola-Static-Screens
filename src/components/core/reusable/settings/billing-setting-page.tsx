import { ManageBill } from '../../../../assets/icons/manageBillIcon';
import { KeyboardArrowRight } from '../../../../assets/icons/keyboardArrow';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { settingsConstants } from '../../../../constants/setting-constants';
import CustomIcon from '../CustomIcon';

const menuItems = [{ label: settingsConstants.SERVICES, path: 'services' }];

const BillingSettingsPage = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(`/provider/settings/billing/${path}`);
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
                <ManageBill color="Primary.main" />
              </Grid>
              <Grid>
                <Typography variant="bodyMedium3" color="Primary.main">
                  {settingsConstants.BILLING}
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

export default BillingSettingsPage;
