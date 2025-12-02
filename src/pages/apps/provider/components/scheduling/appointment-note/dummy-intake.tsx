import { Box, Grid } from '@mui/material';
import { templateConstants } from 'src/constants/setting-constants';
import { DropDownSection } from 'src/pages/apps/admin/pages/templates/intake-form';
import FamilyHealthHistory from 'src/pages/apps/admin/pages/templates/intake-form/family-health-history';
import HealthHabit from 'src/pages/apps/admin/pages/templates/intake-form/health-habit';
import MenOnly from 'src/pages/apps/admin/pages/templates/intake-form/men-only';
import HealthHistoryForm from 'src/pages/apps/admin/pages/templates/intake-form/patient-health-history';
import WomenOnly from 'src/pages/apps/admin/pages/templates/intake-form/women-only';

const DummyIntake = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
        width: '100%',
        scrollbarWidth: 'none',
      }}
    >
      <Grid container gap={1} sx={{ height: 'auto', scroll: 'auto' }}>
        <Grid size={12}>
          <DropDownSection title={templateConstants.PATIENT_HEALTH_HISTORY}>
            <HealthHistoryForm onChangeData={() => {}} data={null} patientApptIntake={undefined} />
          </DropDownSection>

          <DropDownSection title={templateConstants.FAMILY_HEALTH_HISTORY}>
            <FamilyHealthHistory
              onChangeData={() => {}}
              data={null}
              patientApptIntake={undefined}
            />
          </DropDownSection>

          <DropDownSection title={templateConstants.HEALTH_HABIT_AND_PERSONAL_SAFETY}>
            <HealthHabit onChangeData={() => {}} data={null} patientApptIntake={undefined} />
          </DropDownSection>

          <DropDownSection title={templateConstants.MEN_ONLY}>
            <MenOnly onChangeData={() => {}} data={null} patientApptIntake={undefined} />
          </DropDownSection>
          <DropDownSection title={templateConstants.WOMEN_ONLY}>
            <WomenOnly onChangeData={() => {}} data={null} patientApptIntake={undefined} />
          </DropDownSection>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DummyIntake;
