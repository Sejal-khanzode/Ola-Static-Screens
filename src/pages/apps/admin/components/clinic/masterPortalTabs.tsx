import { Grid } from '@mui/material';
import { AdminPortalMaster } from '../adminPortalMaster';
import { Outlet } from 'react-router-dom';

const MasterSettings = () => {
  return (
    <Grid size={12} p={1}>
      <Grid size={12}>
        <AdminPortalMaster />
      </Grid>
      <Grid size={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default MasterSettings;
