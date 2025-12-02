import { Box, Typography, Grid } from '@mui/material';
import { dashboardConstants } from '../constants/dashboard-constants';
import NotificationCards from './dashboard/notificationCards';
import EventIcon from '../assets/icons/event';
import UpcomingAppointments from './dashboard/upcomingAppointments';
import AppointmentsSummary from './dashboard/appointmentsSummary';
import MessagesList from './dashboard/messageList';
import TodoTask from './dashboard/todoTask';
import CustomButton from './core/reusable/custom-button/custom-button';

const Dashboard = () => {
  const handleCalender = () => {};
  return (
    <>
      <Box sx={{ backgroundColor: 'Neutral.20', paddingX: 1.5, paddingY: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h5Bold" color="Base.black">
              {dashboardConstants.DASHBOARD}
            </Typography>
          </Grid>

          <Grid>
            <CustomButton
              variant="whiteOutline"
              startIcon={<EventIcon />}
              label={dashboardConstants.CALENDER_RANGE}
              onClick={handleCalender}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12 }}>
            <NotificationCards />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xl: 4, xs: 12 }}>
            <UpcomingAppointments />
          </Grid>
          <Grid size={{ xl: 4, xs: 12 }}>
            <TodoTask />
          </Grid>

          <Grid size={{ xs: 12, xl: 4 }}>
            <Grid container display="flex" direction={{ xs: 'row', md: 'column' }} spacing={2}>
              <Grid size={{ xs: 12 }}>
                <AppointmentsSummary />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <MessagesList />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
