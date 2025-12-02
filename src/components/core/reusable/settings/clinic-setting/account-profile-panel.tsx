import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

interface AccountProfileItem {
  label: string;
  value: string | string[] | object | null;
}

interface AccountProfilePanelProps {
  title: string;
  data: AccountProfileItem[];
}

const AccountProfilePanel: React.FC<AccountProfilePanelProps> = ({
  title,
  data
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0.5,
        p: 3,
        minHeight: 350,
        marginTop: 2
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="titleSemiBold2" color="Primary.main">
          {title}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {data.map((item, index) => {
          // Check if value is an array of objects with desc/date and if any desc is long
          const isArrayOfDesc = Array.isArray(item.value) && item.value.some(
            (line: any) => typeof line === 'object' && line !== null && 'desc' in line && (line.desc?.length > 50)
          );
          const gridSize = isArrayOfDesc ? 12 : (
            item.label === 'Provider Group Information' || item.label === 'Billing Address' ? 12 : 6
          );

          return (
            <Grid
              key={index}
              size={{ xs: gridSize }}
            >
              <Box display="flex" flexDirection="row" alignItems="flex-start" gap={2} mb={1}>
                <Typography
                  variant="titleMedium4"
                  color="Neutral.70"
                  sx={{ minWidth: 230, maxWidth: 300 }}
                >
                  {item.label}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.isArray(item.value) ? (
                    item.value.map((line, idx) =>
                      typeof line === 'object' &&
                      line !== null &&
                      'desc' in line &&
                      'date' in line ? (
                        <Typography key={idx} variant="titleMedium4" display="flex">
                          <span> {idx + 1}. {(line as { desc: string; date: string }).desc}</span>
                          <span>
                            {(line as { desc: string; date: string }).date}
                          </span>
                        </Typography>
                      ) : (
                        <Typography key={idx} variant="titleMedium4">
                          {line}
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography variant="titleMedium4">{item.value as string}</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default AccountProfilePanel; 