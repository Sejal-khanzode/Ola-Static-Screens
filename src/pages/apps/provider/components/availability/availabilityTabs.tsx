import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AvailabilityRoutes } from './availabilityRoutes';

export default function AvailabilityTabs() {
    return (
        <Grid size={12} p={1}>
          <Grid size={12}>
            <AvailabilityRoutes />
          </Grid>
          <Grid size={12}>
            <Outlet />
          </Grid>
        </Grid>
      );
}
