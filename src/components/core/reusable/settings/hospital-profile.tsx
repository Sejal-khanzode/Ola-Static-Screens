import { Box, Grid, Paper, Typography } from '@mui/material';
import Building from '../../../../assets/images/building.png';
import Chip from '../chip/chip';

const hospitalInfo = [
  { label: 'Group NPI Number', value: '2365987458' },
  { label: 'Website', value: 'www.Jupiterhospital.com' },
  { label: 'Email', value: 'hennawest@gmail.com' },
  { label: 'Contact Number', value: '(569) 822-4144' },
  {
    label: 'Physical Address',
    value: 'Jupiter Hospital 25 Federal plaza, New York, NY 10278',
  },
];

const HospitalProfile = () => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Paper sx={{ borderRadius: 0.5, p: 2, gap: 1 }}>
          <Box>
            <img src={Building} alt="builiding" style={{ width: 219, height: 143 }} />
          </Box>

          <Box sx={{paddingY: 2 , }}>
            <Typography variant="h5Bold" color="Neutral.90" sx={{paddingBottom:2}}>
              Jupiter Hospital
            </Typography>
            <Chip type={'MULTISPECIALITY'} />
          </Box>
          <Grid container spacing={2}>
            {hospitalInfo.map((item) => (
              <Grid
                key={item.label}
                size={{ xs: 12 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap:2
                }}
              >
                <Typography
                  variant="titleMedium4"
                  color="Neutral.70"
                  sx={{ minWidth: 120, maxWidth: 160 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="titleMedium4">{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default HospitalProfile;
