import {  Grid } from '@mui/material';
import PatientProfileOutlet from './patient-profile-outlet';
import PatientProfileNav from './patient-profile-nav';

const PatientProfile = () => {
  return (
    <Grid container sx={{ width: '100%' ,display:'flex'}}>
      <PatientProfileNav />
      <PatientProfileOutlet />
    </Grid>
  );
};

export default PatientProfile;