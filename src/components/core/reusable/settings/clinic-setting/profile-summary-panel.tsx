import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Chip } from '@mui/material';

interface ProfileInfoItem {
  label: string;
  value: string;
}

interface ProfileSummaryPanelProps {
  name: string;
  specialty: string;
  data: ProfileInfoItem[];
  image?: string;
}

const ProfileSummaryPanel: React.FC<ProfileSummaryPanelProps> = ({
  name,
  specialty,
  data
}) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 1, p: 3, minHeight: 'auto', gap: 8 }}>
      <Stack>
        <Box sx={{ gap: 2, paddingBottom: 2 }}>
          <Typography
            variant="h5Bold"
            color="Neutral.90"
            sx={{ paddingBottom: 2, display: 'flex' }}
          >
            {name}
          </Typography>
          <Chip
            label={specialty}
            sx={{ backgroundColor: '#F0FAFF', color: 'Primary.main' }}
          />
        </Box>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid
              key={item.label}
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <Typography
                variant="bodyMedium4"
                color="Neutral.70"
                sx={{ minWidth: 120, maxWidth: 120 }}
              >
                {item.label}
              </Typography>
              <Typography variant="bodyMedium4">{item.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ProfileSummaryPanel; 