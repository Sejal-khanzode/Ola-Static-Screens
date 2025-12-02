import { Grid, Paper, Typography, Box } from '@mui/material';
import { DropDownSection } from 'src/pages/apps/admin/pages/templates/intake-form';

const DiagnosesData = [
  {
    title: 'Typhoid Fever',
    value: 'Chronic',
  },
  {
    title: 'DA (Degenerative Arthritis)',
    value: 'Acute',
  },
];

const AllergiesData = [
  {
    title: 'Asthma',
    value: 'Chest Pain',
    severity: 'Moderate',
  },
  {
    title: 'Fever',
    value: 'Runny Nose',
    severity: 'Mild',
  },
];

const MedicationsData = [
  {
    title: 'Abelcet',
    date: '1-10-2025',
  },
  {
    title: 'Abacavir Sulfate',
    date: '12-05-2025',
  },
];

const HistoryData = [
  { title: 'Past Medical History', value: 'Past Dramatic Stress Disorder', date: '2025-01-01' },
  { title: 'Family History', value: 'Past Dramatic Stress Disorder', date: '2025-01-01' },
  { title: 'Social History', value: 'Past Dramatic Stress Disorder', date: '2025-01-01' },
];

const VaccineData = [
  { title: 'Flu Shot', value: '1-10-2025' },
  { title: 'Pneumonia Shot', value: '10-5-2025' },
  { title: 'Tetanus Shot', value: '5-1-2025' },
];

const VitalsData = [
  { title: 'Blood Pressure', value: '120/80 mmHg', date: '1-10-2025' },
  { title: 'Heart Rate', value: '70 bpm', date: '1-10-2025' },
  { title: 'Temperature', value: '98.6 °F', date: '1-10-2025' },
];

const ClinicalData = () => {
  return (
    <Paper
      sx={{
        minHeight: { xs: 'auto', md: 10 },
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'Base.white',
        boxShadow: 'none',
      }}
    >
      <Grid container size={12} sx={{ overflowY: 'auto' }}>
        <Grid size={12}>
          <DropDownSection title="Diagnoses">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid container size={8} m={1} display="flex" gap={1}>
                {DiagnosesData.map(item => (
                  <Grid
                    container
                    size={12}
                    key={item.title}
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                  >
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bgcolor: 'Primary.main',
                      }}
                    ></Box>
                    <Typography variant="bodyMedium4">{item.title}</Typography>
                    <Typography variant="bodyMedium4" color="Neutral.70">
                      {item.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container size={2.4}>
                <Box>
                  <Typography
                    variant="bodyMedium4"
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      py: 0.5,
                      alignItems: 'center',
                      cursor: 'pointer',

                      opacity: 1,
                      color: 'Primary.main',
                    }}
                  >
                    View more
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>
        <Grid size={12}>
          <DropDownSection title="Allergies">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid container size={8} m={1} display="flex" gap={1}>
                {AllergiesData.map(item => (
                  <Grid
                    container
                    size={12}
                    key={item.title}
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                  >
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bgcolor: 'Primary.main',
                      }}
                    ></Box>
                    <Typography variant="bodyMedium4">{item.title}</Typography>
                    <Typography variant="bodyMedium4" color="Neutral.70">
                      {item.value}
                    </Typography>
                    <Typography variant="bodyMedium4" color="Neutral.70">
                      {item.severity}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container size={2.4}>
                <Box>
                  <Typography
                    variant="bodyMedium4"
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      py: 0.5,
                      alignItems: 'center',
                      cursor: 'pointer',

                      opacity: 1,
                      color: 'Primary.main',
                    }}
                  >
                    View more
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>

        <Grid size={12}>
          <DropDownSection title="Medications">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid container size={8} m={1} display="flex" gap={1}>
                {MedicationsData.map(item => (
                  <Grid size={12}>
                    <Grid
                      container
                      size={12}
                      key={item.title}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                    >
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          bgcolor: 'Primary.main',
                        }}
                      ></Box>
                      <Typography variant="bodyMedium4">{item.title}</Typography>
                    </Grid>
                    <Grid size={12} ml={2}>
                      <Typography variant="bodyMedium4" color="Neutral.70">
                        Start Date:
                      </Typography>
                      <Typography variant="bodyMedium4" color="Neutral.70">
                        {item.date}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container size={2.4}>
                <Box>
                  <Typography
                    variant="bodyMedium4"
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      py: 0.5,
                      alignItems: 'center',
                      cursor: 'pointer',

                      opacity: 1,
                      color: 'Primary.main',
                    }}
                  >
                    View more
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>
        <Grid size={12}>
          <DropDownSection title="History">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid size={12} display="flex" justifyContent="space-between">
                <Grid container size={8} m={1} display="flex" gap={1}>
                  {HistoryData.map(item => (
                    <Grid
                      container
                      size={12}
                      key={item.title}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                    >
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          bgcolor: 'Primary.main',
                        }}
                      ></Box>
                      <Grid size={10}>
                        <Typography variant="bodyMedium4">{item.title}</Typography>
                      </Grid>
                      <Grid size={12} ml={2}>
                        <Typography variant="bodyMedium4" color="Neutral.70">
                          {item.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid container size={2.4}>
                  <Box>
                    <Typography
                      variant="bodyMedium4"
                      sx={{
                        display: 'flex',
                        width: 'fit-content',
                        py: 0.5,
                        alignItems: 'center',
                        cursor: 'pointer',

                        opacity: 1,
                        color: 'Primary.main',
                      }}
                    >
                      View more
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>
        <Grid size={12}>
          <DropDownSection title="Vaccine">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid container size={8} m={1} display="flex" gap={1}>
                {VaccineData.map(item => (
                  <Grid
                    container
                    size={12}
                    key={item.title}
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                  >
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bgcolor: 'Primary.main',
                      }}
                    ></Box>
                    <Typography variant="bodyMedium4">{item.title}</Typography>
                    <Typography variant="bodyMedium4" color="Neutral.70">
                      {item.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container size={2.4}>
                <Box>
                  <Typography
                    variant="bodyMedium4"
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      py: 0.5,
                      alignItems: 'center',
                      cursor: 'pointer',

                      opacity: 1,
                      color: 'Primary.main',
                    }}
                  >
                    View more
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>
        <Grid size={12}>
          <DropDownSection title="Vitals">
            <Grid size={12} display="flex" justifyContent="space-between">
              <Grid container size={8} m={1} display="flex" gap={1}>
                {VitalsData.map(item => (
                  <Grid size={12}>
                    <Grid
                      container
                      size={12}
                      key={item.title}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                    >
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          bgcolor: 'Primary.main',
                        }}
                      ></Box>
                      <Typography variant="bodyMedium4" color="Primary.main" width={'100px'}>
                        {item.title}
                      </Typography>
                      <Typography variant="bodyMedium4" color="Primary.main">
                        : {item.value}
                      </Typography>
                    </Grid>
                    <Grid size={12} ml={2}>
                      <Typography variant="bodyMedium4" color="Neutral.70">
                        {item.date}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container size={2.4}>
                <Box>
                  <Typography
                    variant="bodyMedium4"
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      py: 0.5,
                      alignItems: 'center',
                      cursor: 'pointer',

                      opacity: 1,
                      color: 'Primary.main',
                    }}
                  >
                    View more
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DropDownSection>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClinicalData;
