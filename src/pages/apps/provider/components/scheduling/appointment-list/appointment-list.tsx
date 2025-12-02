import { Grid, Typography, Box, Tooltip } from '@mui/material';
import moment from 'moment';
import { ChangeEvent, useState } from 'react';
import ScheduleAppointmentDialog from '../schedule-appointments/schedule-appointment-dialog';
import { Appointment } from 'src/sdk/requests';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { convertDateTimeToSpecifiedZoneWithoutDate } from 'src/utils/date-utils';
import { BASIC_MONTH_DATE_FORMAT, formatDateToMMDDYYYY } from 'src/constants/date-format';
import { appointmentTableHeaders } from 'src/components/core/reusable/headers/all-headers';
import { statusLabels } from 'src/models/chip';
import { appointmentConstants, providerConstants } from 'src/constants/patients-constants';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FeedSharpIcon from '@mui/icons-material/FeedSharp';
import IntakeForm from 'src/pages/apps/admin/pages/templates/intake-form';
import { useQueryClient } from '@tanstack/react-query';
import StartAppointment from '../start-appointment/startAppointment';
import CheckinDrawer from '../start-appointment/checkin-drawer';
import { useNavigate } from 'react-router-dom';

interface Option {
  value: string;
  label: string;
}

export const options: Option[] = [
  { value: statusLabels.SCHEDULED, label: 'Scheduled' },
  { value: statusLabels.CHECKED_IN, label: 'Checked In' },
  { value: statusLabels.IN_EXAM, label: 'In Exam' },
  { value: statusLabels.SEEN, label: 'Seen' },
  { value: statusLabels.SIGNED_OFF, label: 'Signed off' },
  { value: statusLabels.CANCELLED, label: 'Cancelled' },
  { value: statusLabels.NO_SHOW, label: 'No show' },
];

interface ApptTableProps {
  data?: Appointment[];
  success?: boolean;
  onRowsPerPageChange?: (recordsPerPage: number) => void;
  onPageChange?: (event: ChangeEvent<unknown> | null, page: number) => void;
  page?: number;
  refetch: () => void;
  totalElements: number;
  totalPages: number;
  rowPerPage: number;
}

const AppointmentList = (props: ApptTableProps) => {
  const {
    data,
    onRowsPerPageChange,
    onPageChange = () => {},
    page = 0,
    totalElements,
    refetch,
    rowPerPage,
  } = props;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [viewDrawer, setViewDrawer] = useState(false);
  const [openStartAppt, setOpenStartAppt] = useState(false);
  const [checkInDrawerOpen, setCheckInDrawerOpen] = useState(false);

  const getTimeZoneAbbreviation = () => {
    const timezone = moment.tz.guess();
    const abbreviation = moment.tz(timezone).format('z');
    return abbreviation;
  };

  const handleEdit = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenEdit(true);
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenReschedule(true);
  };

  const handleStartAppt = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenStartAppt(true);
  };

  const handleCloseEdit = () => {
    setOpenStartAppt(false);
    setOpenEdit(false);
    setOpenReschedule(false);
    setSelectedAppointment(null);
    refetch && refetch();
  };

  const handleView = (appointment: any) => {
    queryClient.removeQueries({
      queryKey: ['intakeData'],
      exact: false,
    });
    setSelectedAppointment(appointment);
    setViewDrawer(true);
  };

  const transformedTableData =
    data?.map((appointment: any) => {
      const { convertedDate, formattedStartTime, formattedEndTime } =
        convertDateTimeToSpecifiedZoneWithoutDate(
          appointment?.startTime,
          appointment?.endTime,
          getTimeZoneAbbreviation()
        );
      const date = convertedDate;
      const startTime = formattedStartTime;
      const endTime = formattedEndTime;

      return {
        ...appointment,
        uuid: appointment.uuid,
        location:
          appointment.mode === 'IN_PERSON' || appointment.mode === 'HOME'
            ? appointment?.locationName
            : 'Virtual',
        time: `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${startTime} - ${endTime})`,
        appointmentType: appointment.appointmentTypeName,
        intakeForm: (
          <Tooltip title="View Intake Form">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FeedSharpIcon sx={{}} />
            </Box>
          </Tooltip>
        ),
        insuranceEligibility: (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ color: '#28A745', fontSize: '14px', fontWeight: 'bold' }}>
              {appointment.status === 'PENDING' ? (
                <CloseIcon fontSize="small" />
              ) : (
                <CheckIcon fontSize="small" />
              )}
            </Typography>
          </Box>
        ),
        patientName: appointment?.patientName || '-',
        dateOfBirth: appointment?.patientDob ? formatDateToMMDDYYYY(appointment?.patientDob) : '-',
        contactDetails: appointment.patientPhone
          ? formatPhoneNumber(appointment.patientPhone)
          : '-',
        providerName: appointment.providerName || '-',
        status: appointment?.status == 'RESCHEDULED' ? 'SCHEDULED' : appointment?.status,
        action:
          appointment?.status === 'CANCELLED' || appointment?.status === 'NO_SHOW'
            ? [{ label: 'No actions available', route: '' }]
            : [
                { label: 'Start Appointment', route: 'start' },
                { label: 'Edit Appointment', route: 'edit' },
                { label: 'Reschedule', route: 'reschedule' },
              ],
      };
    }) || [];

  return (
    <Grid container className="appointmentTable" pb={4}>
      <CustomisedTable
        headCells={appointmentTableHeaders}
        tableData={transformedTableData}
        noRecordsMsg="No Appointments Found"
        showPagination={true}
        totalCount={totalElements}
        currentPage={page + 1}
        itemsPerPage={rowPerPage}
        onPageChange={newPage => onPageChange(null, newPage - 1)}
        onItemsPerPageChange={onRowsPerPageChange}
        handleEdit={handleEdit}
        setHeight="calc(100vh - 300px)"
        handleReschedule={handleReschedule}
        handleStartAppt={handleStartAppt}
        handleView={handleView}
      />

      <CustomDrawer
        title={providerConstants.APPOINTMENT_DETAILS}
        open={openStartAppt}
        onClose={handleCloseEdit}
        anchor={'right'}
        drawerWidth="50vw"
        onClick={() => {
          if (checkInDrawerOpen) {
            setCheckInDrawerOpen(false);
          } else {
            setCheckInDrawerOpen(true);
          }
        }}

        buttons={checkInDrawerOpen ? [
          {
            label: appointmentConstants.BACK,
            variant: "outlined",
            onClick: () => {
              setCheckInDrawerOpen(false);
              setOpenStartAppt(true);
            },
          },
          {
            label: appointmentConstants.COLLECT_PAYMENT,
            variant: "outlined",
            onClick: () => {
             
            },
          },
          {
            label: appointmentConstants.COMPLETE_CHECK_IN,
            variant: "filled",
            onClick: () => {
              navigate('/provider/scheduling/appointment-note');
            },
          },
        ] : [
          {
            label: appointmentConstants.START_VISIT_NOTE,
            variant: "filled",
            onClick: () => {
              setCheckInDrawerOpen(true);
              // setOpenStartAppt(false);
            },
          },
        ]}
      >
        {checkInDrawerOpen ? (
          <CheckinDrawer
            appointmentData={selectedAppointment}
          />
        ) : (
          <StartAppointment appointmentData={selectedAppointment} />
        )}
      </CustomDrawer>

      <CustomDrawer
        title={providerConstants.EDIT_APPOINTMENT}
        open={openEdit}
        onClose={handleCloseEdit}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        <ScheduleAppointmentDialog
          handleDrawerClose={handleCloseEdit}
          refetchList={refetch}
          appointmentData={selectedAppointment}
          isEdit
        />
      </CustomDrawer>

      <CustomDrawer
        title={providerConstants.RESCH_APPOINTMENT}
        open={openReschedule}
        onClose={handleCloseEdit}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        <ScheduleAppointmentDialog
          handleDrawerClose={handleCloseEdit}
          refetchList={refetch}
          appointmentData={selectedAppointment}
          isEdit
          isReschedule
        />
      </CustomDrawer>

      {viewDrawer && (
        <CustomDrawer
          open={viewDrawer}
          onClose={() => setViewDrawer(false)}
          title={providerConstants.VIEW_PATIENT_INTAKE}
          anchor="right"
          drawerWidth="55vw"
        >
          <IntakeForm
            patientProfile={true}
            patientApptIntake={selectedAppointment?.patientClinicId}
          />
        </CustomDrawer>
      )}
    </Grid>
  );
};

export default AppointmentList;
