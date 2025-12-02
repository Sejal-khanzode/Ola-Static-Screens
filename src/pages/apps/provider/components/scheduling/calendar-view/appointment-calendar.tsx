// @ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Modal, Paper, Avatar, Divider } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { convertDateTimeToSpecifiedZoneWithoutDate } from 'src/utils/date-utils';
import { formatPhoneNumber, toCamelCase } from 'src/utils/toCamelCase';
import { Appointment } from 'src/sdk/requests';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import ScheduleAppointmentDialog from '../schedule-appointments/schedule-appointment-dialog';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import { calculateAge } from 'src/utils/stringUtils';
import { SettingsFormLabels } from 'src/constants/formConst';
import { appointmentConstants, providerConstants } from 'src/constants/patients-constants';
import { CloseIcon } from 'src/assets/icons/closeIcon';

interface ModalPosition {
  top: number;
  left: number;
  arrowDirection: 'left' | 'right' | 'top' | 'bottom';
}

const localizer = momentLocalizer(moment);
interface CalendarEvent {
  id: string | undefined;
  title: string;
  description: React.ReactElement;
  start: Date;
  end: Date;
  patientName: string | undefined;
  uuid?: string | undefined;
  patientId: string;
  archive?: boolean | undefined;
  appointmentTypeName?: string;
  providerName?: string;
  mode?: string;
  status?: string;
  contactNumber?: string;
  dateOfBirth?: string;
  age?: string;
  patientDob?: string;
  timezone?: string;
}

const getInitials = (name?: string) => {
  if (!name) return 'P';

  const parts = name.trim().split(/\s+|\t+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
};

export interface ApptCalendarProps {
  refetchList?: () => void;
  handleDrawerClose?: () => void;
  providerSelected?: string[];
  locationSelected?: string;
  patientSelected?: string;
  appointmentListData?: Appointment[];
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

const AppointmentCalendar = (props: ApptCalendarProps) => {
  const { appointmentListData, onDateRangeChange, refetchList } = props;
  const [currentView, setCurrentView] = useState('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    top: 0,
    left: 0,
    arrowDirection: 'right',
  });
  const [openRescheduleDrawer, setOpenRescheduleDrawer] = useState(false);

  const getTimeZoneAbbreviation = () => {
    const timezone = moment.tz.guess();
    const abbreviation = moment.tz(timezone).format('z');
    return abbreviation;
  };

  useEffect(() => {
    if (appointmentListData && Array.isArray(appointmentListData)) {
      const newEvents = appointmentListData?.map((item: any) => {
        const { convertedDate, formattedStartTime, formattedEndTime } =
          convertDateTimeToSpecifiedZoneWithoutDate(
            item?.startTime,
            item?.endTime,
            getTimeZoneAbbreviation()
            // item?.patientState
          );

        const providerInitials = item?.providerName
          ? item?.providerName
              .split(' ')
              .map((name: string) => name[0].toUpperCase())
              .join('')
          : '';

        const patientName =
          item?.patientName && item?.patientName?.length > 13
            ? item?.patientName.slice(0, 10) + '...'
            : item?.patientName;
        const monthTooltip = `${formattedStartTime} - ${formattedEndTime}: ${item?.patientName}`;
        return {
          ...item,
          id: item?.uuid,
          title: (currentView != 'month' ? patientName : monthTooltip) || 'Appointment', // Patient name as the title
          appointmentTypeName: item?.appointmentTypeName,
          providerName: item?.providerName,
          mode: item?.mode,
          status: item?.status,
          contactNumber: item?.patientPhone,
          dateOfBirth: '08-11-2009', // You can map this from actual data if available
          age: '16 yrs', // You can calculate this from dateOfBirth if available
          description:
            currentView === 'week' ? (
              <Grid container display="flex" justifyContent="space-between">
                <Grid>
                  <Typography variant="bodyRegular4">&nbsp;&nbsp;{item?.patientName} </Typography>
                </Grid>

                <Grid>
                  <Typography variant="bodyRegular4">{providerInitials}</Typography>
                </Grid>
              </Grid>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  marginTop: '-3px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: currentView != 'day' ? 'space-between' : 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="bodyRegular4">
                    {/* ({startTimeWithoutAMPM}-{endTimeWithoutAMPM}) &nbsp;&nbsp; */}
                    {currentView === 'week' ? patientName : item?.patientName}{' '}
                  </Typography>

                  {(currentView === 'day' || currentView === 'agenda') && (
                    <Box>
                      <Typography variant="bodyRegular4">
                        &nbsp;&nbsp;
                        {` ( ${toCamelCase(item?.appointmentTypeName || '')}- ${toCamelCase(item?.providerName || '')} )`}
                      </Typography>
                      <Typography variant="bodyRegular4">
                        {' '}
                        &nbsp;&nbsp;
                        {toCamelCase(item?.status || '')}
                      </Typography>
                    </Box>
                  )}
                  {currentView != 'agenda' && currentView != 'day' && (
                    <Typography variant="bodyRegular4">{providerInitials}</Typography>
                  )}
                </div>
              </div>
            ),
          start: new Date(convertedDate + ' ' + formattedStartTime),
          end: new Date(convertedDate + ' ' + formattedEndTime),
          patientName: item?.patientName,
        };
      });

      setEvents(newEvents);
    }
  }, [appointmentListData, currentView]);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);

    let start: string, end: string;

    switch (currentView) {
      case 'month':
        start = moment(date).startOf('month').toISOString();
        end = moment(date).endOf('month').toISOString();
        break;
      case 'week':
        start = moment(date).startOf('week').toISOString();
        end = moment(date).endOf('week').toISOString();
        break;
      case 'day':
        start = moment(date).startOf('day').toISOString();
        end = moment(date).endOf('day').toISOString();
        break;
      default:
        start = moment(date).startOf('month').toISOString();
        end = moment(date).endOf('month').toISOString();
        break;
    }

    // Notify parent component of date range change
    if (onDateRangeChange) {
      onDateRangeChange(start, end);
    }
  };

  const handleDateRangeChange = (view: string) => {
    let start: string, end: string;

    switch (view) {
      case 'month':
        start = moment(currentDate).startOf('month').toISOString();
        end = moment(currentDate).endOf('month').toISOString();
        break;
      case 'week':
        start = moment(currentDate).startOf('week').toISOString();
        end = moment(currentDate).endOf('week').toISOString();
        break;
      case 'day':
        start = moment(currentDate).startOf('day').toISOString();
        end = moment(currentDate).endOf('day').toISOString();
        break;
      case 'agenda':
        start = moment(currentDate).toISOString();
        end = moment(currentDate).add(7, 'days').toISOString();
        break;
      default:
        start = moment(currentDate).startOf('month').toISOString();
        end = moment(currentDate).endOf('month').toISOString();
        break;
    }

    // Notify parent component of date range change
    if (onDateRangeChange) {
      onDateRangeChange(start, end);
    }
  };

  const eventPropGetter = (event: any) => {
    const status = event.status;
    let backgroundColor = '#FFFFFF';

    if (status === 'CANCELLED') backgroundColor = '#B42318';

    if (status === 'CONFIRMED') backgroundColor = '#1fb577';
    if (status === 'IN_EXAM') backgroundColor = '#9688FF';

    if (status === 'NO_SHOW') backgroundColor = '#767676';
    if (status === 'PENDING') backgroundColor = '#e6be49';
    if (status === 'SCHEDULED') backgroundColor = '#4873B9';

    return {
      style: { backgroundColor },
    };
  };

  const calculateModalPosition = (mouseEvent: MouseEvent): ModalPosition => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const modalWidth = 400;
    const modalHeight = 450;

    let left = mouseEvent.clientX;
    let top = mouseEvent.clientY + 50;
    let arrowDirection: 'left' | 'right' | 'top' | 'bottom' = 'right';

    if (left + modalWidth > windowWidth) {
      left = mouseEvent.clientX - modalWidth;
      arrowDirection = 'right';
    } else {
      arrowDirection = 'left';
    }

    if (top + modalHeight > windowHeight) {
      top = mouseEvent.clientY - modalHeight;
      arrowDirection = 'bottom';
    }

    return { top, left, arrowDirection };
  };

  const handleEventClick = (event: CalendarEvent, clickEvent: React.SyntheticEvent) => {
    const mouseEvent = clickEvent.nativeEvent as MouseEvent;
    const position = calculateModalPosition(mouseEvent);

    setSelectedEvent(event);
    setModalPosition(position);
    setOpen(true);
  };

  return (
    <Grid container display="flex" spacing={3}>
      <Grid size={12}>
        <div style={{ height: '80vh', fontFamily: 'Roboto' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            eventPropGetter={eventPropGetter}
            onNavigate={handleNavigate}
            onSelectEvent={handleEventClick}
            view={currentView as any}
            date={currentDate}
            defaultView="month"
            onView={(view: any) => {
              setCurrentView(view);
              handleDateRangeChange(view);
            }}
            max={new Date(1970, 1, 1, 21)}
            min={new Date(1970, 1, 1, 5)}
            components={{
              event: ({ event }: { event: CalendarEvent }) => (
                <div>
                  <div>{event.description}</div>
                </div>
              ),
            }}
            // onRangeChange={range => {
            //   if (Array.isArray(range)) {
            //     // Handle date ranges for "month" or "week" views
            //     setCurrentStartDate(moment(range[0]).toISOString());
            //     setCurrentEndDate(moment(range[range.length - 1]).toISOString());
            //   } else if (range && range.start && range.end) {
            //     // Handle date ranges for "agenda" or "day" views
            //     const endDate = moment(range.end).add(1, 'day'); // Add 1 day to end date for agenda/day view
            //     setCurrentStartDate(moment(range.start).toISOString());
            //     setCurrentEndDate(endDate.toISOString());
            //   }
            // }}
            views={['month', 'week', 'day']}
          />
        </div>{' '}
      </Grid>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="appointment-details-modal"
        aria-describedby="appointment-details-description"
        BackdropProps={{
          style: { backgroundColor: 'transparent' },
        }}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            width: 450,
            maxHeight: 500,
            bgcolor: 'background.paper',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            p: 3,
            outline: 'none',
          }}
        >
          {selectedEvent && (
            <Box position="relative">
              <Box
                position="absolute"
                top={-8}
                right={-8}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: '#1976d2',
                    width: 48,
                    height: 48,
                    mr: 2,
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {getInitials(selectedEvent.patientName) || 'P'}
                </Avatar>
                <Box gap={0.5} display="flex" flexDirection="column">
                  <Typography variant="titleBold3">
                    {selectedEvent.patientName || 'Unknown Patient'}
                  </Typography>
                  <Typography variant="titleSemiBold4">
                    {selectedEvent.patientDob
                      ? `${formatDateToMMDDYYYY(selectedEvent.patientDob)} (${calculateAge(selectedEvent.patientDob)} yrs)`
                      : ''}{' '}
                  </Typography>

                  <Typography variant="titleSemiBold4">
                    {SettingsFormLabels.CONTACT_NUMBER}:{' '}
                    {formatPhoneNumber(selectedEvent.contactNumber) || 'N/A'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Appointment Details */}
              <Box mb={2}>
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <Typography
                    variant="titleSemiBold4"
                    color="Neutral.500"
                    sx={{ minWidth: '50px' }}
                  >
                    {SettingsFormLabels.TYPE}
                  </Typography>
                  <Typography variant="titleSemiBold4">:</Typography>
                  <Typography variant="titleSemiBold4">
                    {selectedEvent.appointmentTypeName || 'Assessment'}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <Typography
                    variant="titleSemiBold4"
                    color="Neutral.500"
                    sx={{ minWidth: '50px' }}
                  >
                    {SettingsFormLabels.MODE}
                  </Typography>
                  <Typography variant="titleSemiBold4">:</Typography>

                  <Typography variant="titleSemiBold4">
                    {selectedEvent.mode === 'VIRTUAL'
                      ? appointmentConstants.VIRTUAL_ENCOUNTER
                      : appointmentConstants.IN_PERSON_ENCOUNTER}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <Typography
                    variant="titleSemiBold4"
                    color="Neutral.500"
                    sx={{ minWidth: '50px' }}
                  >
                    {SettingsFormLabels.TIME}{' '}
                  </Typography>

                  <Typography variant="titleSemiBold4">:</Typography>

                  <Typography variant="titleSemiBold4">
                    {moment(selectedEvent.start).format('h:mm A')} -{' '}
                    {moment(selectedEvent.end).format('h:mm A')}{' '} 
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={3}>
                <Typography variant="subtitle2" fontWeight="600" mb={1}>
                  {providerConstants.CLINICIAN_INFORMATION}:
                </Typography>
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: '#9c27b0',
                      width: 32,
                      height: 32,
                      mr: 1,
                      fontSize: '14px',
                    }}
                  >
                    {selectedEvent.providerName
                      ?.split(' ')
                      .map((name: string) => name[0])
                      .join('')
                      .toUpperCase() || 'AI'}
                  </Avatar>
                  <Typography variant="body2" fontWeight="500">
                    {selectedEvent.providerName || 'Anna Isbell'}
                  </Typography>
                </Box>
              </Box>

              {selectedEvent.status !== 'CANCELLED' &&
                selectedEvent.status !== 'NO_SHOW' &&
                !moment.utc(selectedEvent.end).isBefore(moment.utc()) && (
                  <Box display={'flex'} gap={1}>
                    <CustomButton
                      variant="filled"
                      label={providerConstants.EDIT_APPOINTMENT}
                      onClick={() => {
                        setOpen(false);
                        setOpenEditDrawer(true);
                      }}
                    />
                    <CustomButton
                      variant="filled"
                      label={providerConstants.RESCH_APPOINTMENT}
                      onClick={() => {
                        setOpen(false);
                        setOpenRescheduleDrawer(true);
                      }}
                    />
                  </Box>
                )}
            </Box>
          )}
        </Paper>
      </Modal>

      <CustomDrawer
        title={providerConstants.EDIT_APPOINTMENT}
        open={openEditDrawer}
        onClose={() => {
          setOpenEditDrawer(false);
          setSelectedEvent(null);
        }}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        {selectedEvent && (
          <ScheduleAppointmentDialog
            handleDrawerClose={() => {
              setOpenEditDrawer(false);
              setSelectedEvent(null);
            }}
            refetchList={refetchList}
            appointmentData={selectedEvent}
            isEdit
          />
        )}
      </CustomDrawer>

      <CustomDrawer
        title={providerConstants.RESCH_APPOINTMENT}
        open={openRescheduleDrawer}
        onClose={() => {
          setOpenRescheduleDrawer(false);
          setSelectedEvent(null);
        }}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        {selectedEvent && (
          <ScheduleAppointmentDialog
            handleDrawerClose={() => {
              setOpenRescheduleDrawer(false);
              setSelectedEvent(null);
            }}
            refetchList={refetchList}
            appointmentData={selectedEvent}
            isEdit
            isReschedule
          />
        )}
      </CustomDrawer>
    </Grid>
  );
};
export default AppointmentCalendar;
