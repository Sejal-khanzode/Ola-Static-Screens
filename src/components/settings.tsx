import { Box, Grid, Typography } from '@mui/material';
import ProviderAccountSettingsPage from './core/reusable/settings/provider-account-setting-page';
import PracticeSettingsPage from './core/reusable/settings/practice-setting-page';
import { settingsConstants } from '../constants/setting-constants';

const Settings = () => {
  return (
    <Box sx={{ m: 1, width: '100%' }}>
      <Typography variant="bodyMedium1">{settingsConstants.SETTINGS}</Typography>

      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ProviderAccountSettingsPage />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <PracticeSettingsPage />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
