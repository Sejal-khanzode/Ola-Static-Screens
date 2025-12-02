import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ProviderPortalAccount } from './providerPortalAccount';

const ProviderAccount = () => {
  return (
    <Grid size={12} p={1}>
      <Grid size={12}>
        <ProviderPortalAccount />
      </Grid>
      <Grid size={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ProviderAccount;
