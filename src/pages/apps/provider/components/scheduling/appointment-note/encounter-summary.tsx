import { Box, Divider, Grid, Typography } from '@mui/material';

const EncounterSummaryData = [
  {
    date: 'Mon, Mar 23, 2025',
    note: 'Initial Psychiatric Exam',
    diagnosis: [
      {
        code: 'F43.22',
        description: 'Major Depressive Disorder, Recurrent Episode',
      },
      {
        code: 'F43.22',
        description: 'Major Depressive Disorder, Recurrent Episode',
      },
    ],
  },
  {
    date: 'Fri, Nov 28, 2025',
    note: 'Progress Note',
    diagnosis: [
      {
        code: 'F43.22',
        description: 'Major Depressive Disorder, Recurrent Episode',
      },
    ],
  },
  {
    date: 'Mon, Mar 23, 2025',
    note: 'Initial Psychiatric Exam',
    diagnosis: [
      {
        code: 'F43.22',
        description: 'Major Depressive Disorder, Recurrent Episode',
      },
      {
        code: 'F43.22',
        description: 'Major Depressive Disorder, Recurrent Episode',
      },
    ],
  },
];

const Card = ({ data }: any) => {
  return (
    <Box sx={{ width: '100%', pb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="bodyMedium4" sx={{ fontWeight: 600 }}>
          {data.date} : {data.note}
        </Typography>
      </Box>

      {/* Diagnosis Title */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        Diagnosis :
      </Typography>

      {data.diagnosis.map((item: any, index: number) => (
        <Box key={index} sx={{ ml: 2, mt: 0.5 }}>
          <Typography variant="bodyMedium5" sx={{ fontSize: '14px' }}>
            {index + 1}.{' '}
            <Typography variant="bodyMedium5" sx={{ fontSize: '14px' }}>
              {item.code}
            </Typography>{' '}
            -{' '}
            <Typography variant="bodyMedium5" sx={{ fontSize: '14px', color: 'Neutral.70' }}>
              {item.description}
            </Typography>
          </Typography>
        </Box>
      ))}

      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

const EncounterSummary = () => {
  return (
    <Grid container size={12}>
      {EncounterSummaryData.map(item => (
        <Grid size={12}>
          <Card data={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EncounterSummary;
