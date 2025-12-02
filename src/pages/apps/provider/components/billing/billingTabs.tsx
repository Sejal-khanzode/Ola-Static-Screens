import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { BillingRoutes } from './billingRoutes';

export default function BillingTabs() {
  return (
    <Grid size={12} p={1}>
      <Grid size={12}>
        <BillingRoutes />
      </Grid>
      <Grid size={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
