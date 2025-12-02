import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Grid , Stack} from '@mui/material';
import { dashboardConstants } from '../../constants/dashboard-constants';
import EventIcon from '../../assets/icons/event';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Dino Winfield (55 Year M) - Scheduled',
    start: new Date(2024, 11, 21, 9, 0),
    end: new Date(2024, 11, 21, 10, 0),
  },
  {
    title: 'Dino Winfield (55 Year M) - Scheduled',
    start: new Date(2024, 11, 21, 11, 0),
    end: new Date(2024, 11, 21, 12, 0),
  },
  {
    title: 'Louis King (46 Year F) - In Exam',
    start: new Date(2024, 11, 21, 12, 0),
    end: new Date(2024, 11, 21, 13, 0),
  },
  {
    title: 'Linda Parez (36 Year F) - Scheduled',
    start: new Date(2024, 11, 21, 15, 0),
    end: new Date(2024, 11, 21, 16, 0),
  },
  {
    title: 'Betty Price (79 Year M) - Scheduled',
    start: new Date(2024, 11, 21, 17, 0),
    end: new Date(2024, 11, 21, 18, 0),
  },
];

export default function DayAppointmentsCalendar() {
  return (
    <Box sx={{ backgroundColor: 'Base.white', padding: 2, borderRadius: 0.5 }}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="titleSemiBold4"
            sx={{
              color: 'Neutral.80',
            }}
          >
            {dashboardConstants.UPCOMMING_APPOINTMENTS}
          </Typography>

          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'Primary.main',
              color: 'Base.white',
              borderRadius: '50%',
              fontSize: '0.75rem',
              height: 28,
              width: 28,
            }}
          >
            12
          </Box>
        </Grid>

        <Grid>
          {/* <AppButton
            variant="outlined"
            size="small"
            startIcon={<EventIcon />}
            sx={{
              color: 'Neutral.70',
              border: 0,
              padding:0
            }}
          /> */}
          <EventIcon />
        </Grid>
      </Grid>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="day"
        views={['day']}
        step={60}
        timeslots={1}
        defaultDate={new Date(2024, 11, 21)}
        style={{ height: 600 }}
        min={new Date(2024, 11, 21, 8, 0)}
        max={new Date(2024, 11, 21, 20, 0)}
        components={{
          toolbar: () => null,
          timeSlotWrapper: ({ children }: { children: React.ReactNode }) => (
            <Stack style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
              <Typography >{children}</Typography>
            </Stack>
          ),
        }}
      />
    </Box>
  );
}
