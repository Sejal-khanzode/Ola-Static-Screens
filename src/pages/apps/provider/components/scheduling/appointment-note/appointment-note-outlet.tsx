import { Grid, Paper } from '@mui/material';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import SoapNote from './soap-note';
import { useState } from 'react';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import DummyIntake from './dummy-intake';
const AppointmentNoteOutlet = () => {
  const [selectedNoteType, setSelectedNoteType] = useState('soap_note');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Paper
      sx={{
        my: 2,
        p: 2,
        minHeight: { xs: 'auto', md: 10 },
        width: '100%',
        bgcolor: 'Base.white',
        height: '80vh',
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12} display="flex" justifyContent="space-between" gap={2}>
          <Grid size={3}>
            <CustomSelect
              items={[
                { label: 'Simple Note', value: 'simple_note' },
                { label: 'Consultation Note', value: 'consultation_note' },
                { label: 'SOAP Note', value: 'soap_note' },
              ]}
              onChange={e => {
                setSelectedNoteType(e.target.value);
              }}
              placeholder="Select Note Type"
              value={selectedNoteType}
            />
          </Grid>
          <Grid size={9}>
           
          </Grid>
          <Grid size={2.5} display="flex" gap={2}>
            <Grid size={7}>
              <CustomSelect
                items={[{ label: 'Templates', value: 'templates' }]}
                onChange={e => e.target.value}
                placeholder="Templates"
                value={'templates'}
              />
            </Grid>
            <Grid size={3}>
              <CustomButton label="Intake" variant="filled" onClick={() => setDrawerOpen(true)} />
            </Grid>
          </Grid>
        </Grid>

        {selectedNoteType === 'soap_note' && (
          <Grid size={12} sx={{ height: '70vh' }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                overflowY: 'auto',
                p: 1,
              }}
            >
              <SoapNote />
            </Paper>
          </Grid>
        )}


        {drawerOpen && (
          <CustomDrawer
            title="Intake"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="right"
            drawerWidth="60vw"
          >
            <DummyIntake />
          </CustomDrawer>
        )}
      </Grid>
    </Paper>
  );
};

export default AppointmentNoteOutlet;
