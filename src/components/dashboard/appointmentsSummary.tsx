import { Box, Typography, Paper, Stack , Grid} from '@mui/material';
import React, { useState } from 'react';
import { dashboardConstants } from '../../constants/dashboard-constants';
import TimeRangeToggle from '../core/reusable/button-toggle/button-Toggle';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieChartData {
  name: string;
  value: number;
}

const data: PieChartData[] = [
  { name: 'Scheduled', value: 146 },
  { name: 'Declined', value: 24 },
  { name: 'Cancelled', value: 10 },
  { name: 'No Show', value: 24 },
];

const COLORS = ['#4472C4', '#70C0F1', '#F97066', '#8F8F8F'];

const AppointmentsSummary: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>('year');

  const handleTimeRangeChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    setSelectedTimeRange(newValue);
  };

  const totalAppointments = data.reduce((sum, item) => sum + item.value, 0);

  const toggleOptions = [
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom' },
  ];

  const chartData = data.map((item, index) => ({
    value: item.value,
    label: item.name,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Paper
      sx={{
        p: 2,
        boxShadow: 2,
        borderRadius: 0.5,
        width: '100%',
        maxWidth: { xl: 600 },
        mx: { md: 'auto' },
      }}
    >
      <Box sx={{ mb: 2, width: '100%' }}>
        <TimeRangeToggle
          options={toggleOptions}
          value={selectedTimeRange}
          onChange={handleTimeRangeChange}
        />
      </Box>

      <Stack sx={{ border: '1px solid', borderColor: 'Neutral.30', borderRadius: 1, padding: 1.5 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}
        >
          <Typography variant="titleMedium3" color="Neutral.80">
            {dashboardConstants.APPOINTMENTS}
          </Typography>
          <Typography variant="bodyRegular4" color="Primary.main">
            {dashboardConstants.VIEW_REPORT}
          </Typography>
        </Box>

        <Typography variant="h5Bold" sx={{ mb: 2, color: 'Neutral.80' }}>
          {totalAppointments}
        </Typography>
        <Grid container alignItems="center" spacing={2} justifyContent={'space-between'}>
          <Grid>
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 50,
                  outerRadius: 70,
                  paddingAngle: 0,
                  cornerRadius: 0,
                  startAngle: 0,
                  endAngle: 360,
                },
              ]}
              width={150}
              height={150}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              hideLegend
            />
          </Grid>

          <Grid>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
              }}
            >
              {chartData.map(item => (
                <Box key={item.label} sx={{ display: 'flex', gap:1, alignItems: 'center', mb: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: item.color,
                     
                    }}
                    
                  />
                  <Typography variant="bodyRegular5" color="Neutral.70"  >
                    {item.label}
                  </Typography>
                </Box>
                     
               ))}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default AppointmentsSummary;
