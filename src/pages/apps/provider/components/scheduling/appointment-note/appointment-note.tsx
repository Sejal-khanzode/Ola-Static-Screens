import { Grid } from '@mui/material';
import AppointmentNoteNav from './appointment-note-nav';
import AppointmentNoteOutlet from './appointment-note-outlet';
import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import ClinicalData from './clinical-data';
import EncounterSummary from './encounter-summary';

const AppointmentNote = () => {
  const TABS_CONFIG = [
    { id: 'Clinical Data', label: 'Clinical Data', component: ClinicalData },
    {
      id: 'Encounter',
      label: 'Encounter',
      component: EncounterSummary
      ,
    },
    {
      id: 'Orders',
      label: 'Orders',
      component: ClinicalData,
    },
  ];

  return (
    <Grid container size={12} gap={2}>
      <Grid size={8.85} gap={2}>
        <AppointmentNoteNav />
        <AppointmentNoteOutlet />
      </Grid>
      <Grid size={3} bgcolor="white" borderRadius={1} sx={{ height: '92.5vh', overflowY: 'auto' }}>
        <CommonTabsOutlet tabsConfig={TABS_CONFIG} />
      </Grid>
    </Grid>
  );
};

export default AppointmentNote;
