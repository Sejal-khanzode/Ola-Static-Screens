import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { PracticeRoutes } from './practiceRoutes';

export default function PracticeTabs() {
  return (
    <Grid size={12} p={1}>
      <Grid size={12}>
        <PracticeRoutes />
      </Grid>
      <Grid size={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
