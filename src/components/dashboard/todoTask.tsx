import { Box, Typography, Grid, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chip from '../core/reusable/chip/chip';
import { useQuery } from '@tanstack/react-query';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomButton from '../core/reusable/custom-button/custom-button';
import CustomDrawer from '../core/reusable/custom-drawer/custom-drawer';
import AppointmentCancelDrawer from './AppointmentCancelDrawer';
import moment from 'moment';
import ScheduleRequestedAppointmentDialog from './ScheduleRequestedAppointmentDialog';
import {
  convertDateTimeToSpecifiedZoneWithoutDate,
  getTimeZoneAbbreviation,
} from 'src/utils/date-utils';
import { BASIC_MONTH_DATE_FORMAT } from 'src/constants/date-format';
import { newAppointment } from 'src/constants/scheduling-constants';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { RequestAppointment, RequestAppointmentManagementService } from 'src/sdk/requests';

const TodoTask: React.FC = () => {
  const [clinicId, setClinicId] = useState(
    getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || ''
  );
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [drawerType, setDrawerType] = useState<'cancel' | 'book' | 'reschedule' | null>(null);
  const [buttonAction, setButtonAction] = useState<'approve' | 'cancel' | null>(null);
  const dispatch = useDispatch();

  const {
    data: patientClinicApiData,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useQuery({
    queryKey: ['requestAppt', clinicId],
    enabled: !!clinicId,
    queryFn: () =>
      RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({
        clinicUuid: clinicId,
        size: 20,
      }),
  });

  const todoTaskItemsData = Array.isArray(patientClinicApiData?.data?.content)
    ? patientClinicApiData?.data?.content?.map((item: RequestAppointment) => {
        const { convertedDate, formattedStartTime, formattedEndTime } =
          convertDateTimeToSpecifiedZoneWithoutDate(
            item?.requestedStartTime,
            item?.requestedEndTime,
            getTimeZoneAbbreviation()
          );
        const date = convertedDate;
        const startTime = formattedStartTime;
        const endTime = formattedEndTime;

        return {
          uuid: item.uuid,

          name: `${item.patientClinic?.patient?.firstName} ${item.patientClinic?.patient?.lastName}`,
          idDob: `ID: ${item.patientClinic?.mrn} | DOB: ${moment(item.patientClinic?.patient?.dob).format('MM/DD/YYYY')}`,
          assignedBy: item.patientClinic?.patient?.firstName,
          date: `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${startTime} - ${endTime})`,
          status: item.status,
          ...item,
        };
      })
    : [];

  useEffect(() => {
    const handleClinicChange = () => {
      // Get the latest clinicId from localStorage
      const latestClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (latestClinicId) {
        // Update the clinicId state which will trigger the query to refetch
        setClinicId(latestClinicId);
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isFetching, dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: 'Base.white',
        padding: '1rem',
        width: '100%',
        height: 'auto',
      }}
      borderRadius={0.5}
    >
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
          {newAppointment.APPT_REQ}
        </Typography>

        {todoTaskItemsData.length > 0 && (
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
            {todoTaskItemsData.length}
          </Box>
        )}
      </Grid>

      <Grid container spacing={1} sx={{ paddingTop: 1, height: '85vh', overflowY: 'scroll' }}>
        {todoTaskItemsData?.map((item: any, index: number) => (
          <Grid size={{ xs: 12 }} key={index}>
            <Box
              sx={{
                borderRadius: 0.5,
                border: '1px solid ',
                borderColor: 'Neutral.30',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                mb: 1,
              }}
            >
              <Grid container justifyContent="space-between" alignItems="flex-start">
                <Grid size={{ xs: 8 }}>
                  <Typography variant="titleMedium5" color="Primary.main">
                    {`${item.requestType.charAt(0).toUpperCase() + item.requestType.slice(1).toLowerCase()} Request`}
                  </Typography>
                  <Grid container alignItems="center" spacing={2} sx={{ mt: 1 }}>
                    <Grid>
                      <Avatar alt="profile_pic" />
                    </Grid>
                    <Grid>
                      <Typography variant="titleSemiBold5" color="Neutral.80">
                        {item.name}
                      </Typography>

                      <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                        <Typography
                          variant="titleMedium5"
                          sx={{ padding: '4px 8px', color: 'Neutral.60' }}
                        >
                          {item.idDob}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            backgroundColor: 'Neutral.20',
                            padding: '4px 8px',
                            borderRadius: '50px',
                            justifyContent: 'end',
                          }}
                        >
                          <Typography variant="titleMedium5" color="Neutral.70">
                            {newAppointment.APPT_DATE_TIME} - {item.date}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  size={{ xs: 4 }}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                >
                  <Chip type={item.status} />

                  {item.status === 'PENDING' && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <CustomButton
                        variant="filled"
                        label="Accept"
                        onClick={() => {
                          setSelectedRequest(item);
                          setButtonAction('approve');
                          if (item.requestType === 'CANCEL') {
                            setDrawerType('cancel');
                          } else if (item.requestType === 'BOOK') {
                            setDrawerType('book');
                          } else if (item.requestType === 'RESCHEDULE') {
                            setDrawerType('reschedule');
                          }
                          setOpenScheduleDialog(true);
                        }}
                      />
                      <CustomButton
                        variant="outlined"
                        label="Cancel"
                        onClick={() => {
                          setSelectedRequest(item);
                          setButtonAction('cancel');
                          if (item.requestType === 'CANCEL') {
                            setDrawerType('cancel');
                          } else if (item.requestType === 'BOOK') {
                            setDrawerType('book');
                          } else if (item.requestType === 'RESCHEDULE') {
                            setDrawerType('reschedule');
                          }
                          setOpenScheduleDialog(true);
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
        {todoTaskItemsData?.length === 0 && (
          <Typography
            variant="titleMedium4"
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            No requested records found
          </Typography>
        )}
      </Grid>

      <CustomDrawer
        title={
          drawerType === 'cancel'
            ? newAppointment.CANCE_APPT_REQ
            : drawerType === 'book'
              ? newAppointment.BOOK_APPT_REQ
              : drawerType === 'reschedule'
                ? 'Reschedule Request'
                : newAppointment.APPT_REQ
        }
        open={openScheduleDialog}
        onClose={() => {
          setOpenScheduleDialog(false);
          setDrawerType(null);
          setSelectedRequest(null);
          setButtonAction(null);
        }}
        anchor="right"
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        {drawerType === 'cancel' && selectedRequest && (
          <AppointmentCancelDrawer
            selectedRequest={selectedRequest}
            buttonAction={buttonAction}
            onClose={() => {
              setOpenScheduleDialog(false);
              setDrawerType(null);
              setSelectedRequest(null);
              setButtonAction(null);
            }}
          />
        )}
        {(drawerType === 'book' || drawerType === 'reschedule') && selectedRequest && (
          <ScheduleRequestedAppointmentDialog
            selectedRequest={selectedRequest}
            buttonAction={buttonAction}
            onClose={() => {
              setOpenScheduleDialog(false);
              setDrawerType(null);
              setSelectedRequest(null);
              setButtonAction(null);
            }}
            isReschedule={drawerType === 'reschedule' ? true : false}
          />
        )}
      </CustomDrawer>
    </Box>
  );
};

export default TodoTask;
