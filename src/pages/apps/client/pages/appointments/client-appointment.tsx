import { Grid, Typography, Box } from '@mui/material';
import moment from 'moment-timezone';
import { convertDateTimeToSpecifiedZoneWithoutDate } from 'src/utils/date-utils';
import { BASIC_MONTH_DATE_FORMAT } from 'src/constants/date-format';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import Chip from 'src/components/core/reusable/chip/chip';
import { isTimeBetween } from 'src/pages/apps/provider/components/scheduling/appointment-list/appointment-condition';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import React, { useState, useEffect, useMemo } from 'react';
import RequestAppointmentDialog from './request-appointment';
import { AddIcon } from 'src/assets/icons/addIcon';
import {
  requestAppointmentConstants,
  schedulingConstants,
} from 'src/constants/scheduling-constants';
import AppointmentCancelDrawer from './cancel-appointment';
import {
  Appointment,
  AppointmentManagementService,
  PatientClinic,
  PatientClinicControllerService,
  RequestAppointmentManagementService,
} from 'src/sdk/requests';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { RootState } from 'src/redux/store';
import { setPatientClinicData } from 'src/redux/reducers/patientClinicReducer';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { toCamelCase } from 'src/utils/toCamelCase';
import { RequestApptHeadCells } from 'src/components/core/reusable/headers/all-headers';
import { AppointmentModeOptions } from 'src/constants/formConst';
import { useAppDispatch } from 'src/redux/hooks';

let globalRefetchApptFunction: (() => void) | null = null;

export const setglobalRefetchApptFunction = (refetchFn: () => void) => {
  globalRefetchApptFunction = refetchFn;
};

export const getglobalRefetchApptFunction = () => globalRefetchApptFunction;

export default function ClientAppointments() {
  const [openScheduleApptDialog, setOpenScheduleApptDialog] = useState(false);
  const [openCancelApptDialog, setOpenCancelApptDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [upcomingApptListData, setUpcomingApptListData] = useState<Appointment[]>([]);
  const [pastApptListData, setPastApptListData] = useState<Appointment[]>([]);
  const [titleDialog, setTitleDialog] = useState('');
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const [requestedAppointments, setRequestedAppointments] = useState<any[]>([]);

  const { data: patientClinicApiData } = useQuery({
    queryKey: ['patientData'],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({
        patientUuid: userProfile?.uuid || '',
      }),
  });

  const patientDetails = patientClinicApiData?.data as PatientClinic;
  const clinicId = patientDetails?.clinic ? Object.keys(patientDetails?.clinic)[0] : undefined;

  const {
    data: dataList,
    fetchNextPage: fetchNextUpcomingAppt,
    hasNextPage: hasNextUpcomingAppt,
    isFetchingNextPage: isFetchingNextUpcomingAppt,
    isLoading: isLoadingUpcoming,
    isFetching: isFetchingUpcoming,
    refetch: refetchUpcomingList,
  } = useInfiniteQuery({
    queryKey: ['UpcomingApptList', patientDetails?.uuid],
    enabled: !!patientDetails?.uuid,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      AppointmentManagementService.getApiMasterAppointments({
        page: pageParam,
        size: 15,
        sortBy: 'startTime',
        sortDirection: 'asc',
        timeFilter: 'UPCOMING',
        patientUuid: patientDetails?.uuid,
      }),
    getNextPageParam: (lastPage: any) => {
      const currentPage = lastPage?.data?.page?.number ?? 0;
      const totalPages = lastPage?.data?.page?.totalPages ?? 1;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });

  const {
    data: pastApptData,
    fetchNextPage: fetchNextPastAppt,
    hasNextPage: hasNextPastAppt,
    isFetchingNextPage: isFetchingNextPastAppt,
    isLoading: isLoadingPast,
    isFetching: isFetchingPast,
    refetch: refetchPastList,
  } = useInfiniteQuery({
    queryKey: ['PastApptList', patientDetails?.uuid],
    enabled: !!patientDetails?.uuid,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      AppointmentManagementService.getApiMasterAppointments({
        page: pageParam,
        size: 15,
        sortBy: 'startTime',
        sortDirection: 'asc',
        timeFilter: 'PAST',
        patientUuid: patientDetails?.uuid,
      }),
    getNextPageParam: (lastPage: any) => {
      const currentPage = lastPage?.data?.page?.number ?? 0;
      const totalPages = lastPage?.data?.page?.totalPages ?? 1;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });

  const {
    data: patientApptReqApiData,
    isLoading: isApptLoading,
    isFetchingNextPage,
    fetchNextPage: fetchNextPageAllApt,
    hasNextPage: hasNextPageAllApt,
    isFetching: isApptFetching,
    refetch: refetchPatientApptReqList,
  } = useInfiniteQuery({
    queryKey: ['requestAppt', clinicId],
    enabled: !!clinicId && !!patientDetails?.uuid,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({
        clinicUuid: clinicId,
        patientUuid: patientDetails?.uuid,
        page: pageParam,
      }),
    getNextPageParam: (lastPage: any) => {
      const currentPage = lastPage?.data?.page?.number ?? 0;
      const totalPages = lastPage?.data?.page?.totalPages ?? 1;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });

  const upcomingAppointments = useMemo(
    () => dataList?.pages?.flatMap(page => page?.data?.content) || [],
    [dataList]
  );

  const pastAppointments = useMemo(
    () => pastApptData?.pages?.flatMap(page => page?.data?.content) || [],
    [pastApptData]
  );

  const allAppointments = useMemo(
    () => patientApptReqApiData?.pages?.flatMap(page => page?.data?.content || []) || [],
    [patientApptReqApiData]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && hasNextPageAllApt && !isFetchingNextPage) {
      fetchNextPageAllApt();
    }
  };

  const handleUpcomingApptScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight + 50 &&
      hasNextUpcomingAppt &&
      !isFetchingNextUpcomingAppt
    ) {
      fetchNextUpcomingAppt();
    }
  };

  const handlePastApptScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight + 50 &&
      hasNextPastAppt &&
      !isFetchingNextPastAppt
    ) {
      fetchNextPastAppt();
    }
  };

  useEffect(() => {
    if (upcomingAppointments) {
      setUpcomingApptListData(upcomingAppointments as Appointment[]);
    }
  }, [upcomingAppointments]);

  useEffect(() => {
    if (pastAppointments) {
      setPastApptListData(pastAppointments as Appointment[]);
    }
  }, [pastAppointments]);

  useEffect(() => {
    if (patientDetails) {
      dispatch(setPatientClinicData(patientDetails));
    }
  }, [patientDetails, dispatch]);

  const getTimeZoneAbbreviation = () => {
    const timezone = moment.tz.guess();
    const abbreviation = moment.tz(timezone).format('z');
    return abbreviation;
  };

  const formatAppointmentTime = (appointment: any) => {
    const { convertedDate, formattedStartTime, formattedEndTime } =
      convertDateTimeToSpecifiedZoneWithoutDate(
        appointment?.startTime,
        appointment?.endTime,
        getTimeZoneAbbreviation()
      );
    const date = convertedDate;
    const startTime = formattedStartTime;
    const endTime = formattedEndTime;

    return `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${startTime} - ${endTime})`;
  };

  const formatAppointmentDuration = (startTime: string, endTime: string) => {
    const { convertedDate, formattedStartTime, formattedEndTime } =
      convertDateTimeToSpecifiedZoneWithoutDate(startTime, endTime, getTimeZoneAbbreviation());
    const date = convertedDate;
    const start = formattedStartTime;
    const end = formattedEndTime;

    return `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${start} - ${end})`;
  };

  const refetchList = () => {
    refetchPastList();
    refetchUpcomingList();
    refetchPatientApptReqList();
  };

  const LabelValue = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      <Typography variant="bodyRegular4" color="Neutral.60" sx={{ minWidth: '8rem' }}>
        {label}
      </Typography>
      <Typography variant="bodyRegular4" color="Neutral.90">
        :
      </Typography>
      <Typography variant="bodyRegular4" color="Neutral.90">
        {value}
      </Typography>
    </Box>
  );

  const AppointmentCard = ({
    appointment,
    showActions = false,
  }: {
    appointment: any;
    showActions?: boolean;
  }) => (
    <Box
      sx={{
        p: 2,
        mb: 2,
        minHeight: '6.875rem',
        border: '1px solid #E0E0E0',
        borderRadius: 2,
        backgroundColor: '#FAFAFA',
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <LabelValue
                label={schedulingConstants.APPOINTMENT_MODE}
                value={
                  AppointmentModeOptions.find(option => option.value === appointment.mode)?.label ||
                  '-'
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 5, md: 6 }}>
              <LabelValue
                label={schedulingConstants.DATE_TIME}
                value={formatAppointmentTime(appointment)}
              />
            </Grid>

            <Grid
              size={{ xs: 12, sm: 3, md: 2 }}
              sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
            >
              <Chip
                type={appointment?.status === 'COMPLETED' ? 'SIGNED_OFF' : appointment?.status}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <LabelValue
                label={schedulingConstants.PROVIDER_NAME}
                value={appointment.providerName}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 5, md: 5 }}>
              <LabelValue
                label={schedulingConstants.LOCATION}
                value={
                  appointment.mode === 'IN_PERSON' || appointment.mode === 'HOME'
                    ? appointment.locationName
                    : schedulingConstants.VIRTUAL
                }
              />
            </Grid>

            {showActions && (
              <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                {appointment.status != 'CANCELLED' && appointment.status != 'NO_SHOW' && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 1,
                      justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                      flexWrap: 'wrap',
                      mt: { xs: 1, sm: 0 },
                    }}
                  >
                    <CustomButton
                      variant="warning"
                      label={schedulingConstants.CANCEL_APPOINTMENT}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setOpenCancelApptDialog(true);
                      }}
                    />
                    <CustomButton
                      variant="outlined"
                      label={schedulingConstants.RESCHEDULE_APPOINTMENT}
                      onClick={() => {
                        setTitleDialog(schedulingConstants.RESCHEDULE_APPOINTMENT);
                        setSelectedAppointment(appointment);
                        setOpenScheduleApptDialog(true);
                        getglobalRefetchApptFunction();
                      }}
                    />
                    {isTimeBetween(appointment.startTime, appointment.endTime) && (
                      <CustomButton variant="filled" label={schedulingConstants.JOIN_VISIT} />
                    )}
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  useEffect(() => {
    if (allAppointments && Array.isArray(allAppointments)) {
      const formattedData = allAppointments?.map((request: any) => ({
        uuid: request?.uuid,
        requestType: request?.requestType ? toCamelCase(request?.requestType) : '-',
        providerName: `${request?.provider?.firstName} ${request?.provider?.lastName}`,
        dateTime: formatAppointmentDuration(request?.requestedStartTime, request?.requestedEndTime),
        location: request?.mode === 'VIRTUAL' ? 'Virtual' : request?.location?.name || 'N/A',
        appointmentType: request?.appointmentType?.title || 'N/A',
        status: <Chip type={request?.status} />,
        statusValue: request?.status,
        mode: request?.mode,
        reasonOfVisit: request?.reasonOfVisit,
        rejectionReason: request?.rejectionReason,
      }));
      setRequestedAppointments(formattedData);
    }
  }, [patientApptReqApiData]);

  useEffect(() => {
    if (isApptLoading || isApptFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isApptLoading, isApptFetching, dispatch]);

  useEffect(() => {
    if (isLoadingUpcoming || isFetchingUpcoming || isLoadingPast || isFetchingPast) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingUpcoming, isFetchingUpcoming, isLoadingPast, isFetchingPast, dispatch]);

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Grid container gap={2}>
        <Grid size={12} gap={2} display={'flex'}>
          <Grid size={5.94} bgcolor="white" px={2} pt={2} borderRadius={2} maxHeight="300px">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="bodyRegular3" sx={{ color: 'Primary.main' }}>
                {schedulingConstants.UPCOMING_APPOINTMENT}
              </Typography>
            </Box>

            <Box
              sx={{
                height: '240px',
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#a8a8a8',
                },
              }}
              onScroll={handleUpcomingApptScroll}
            >
              {upcomingApptListData.length > 0 ? (
                upcomingApptListData.map(appointment => (
                  <AppointmentCard
                    key={appointment.uuid}
                    appointment={appointment}
                    showActions={true}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  display="flex"
                  justifyContent="center"
                  color="#00000099"
                >
                  No Upcoming appointments
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size={5.94} bgcolor={'white'} px={2} pt={2} borderRadius={2}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
            >
              <Typography variant="bodyRegular3" sx={{ color: 'Primary.main' }}>
                {schedulingConstants.PAST_APPOINTMENT}
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  height: '245px',
                  overflowY: 'auto',
                  pr: 1.5,
                  my: 1,
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#a8a8a8',
                  },
                }}
                onScroll={handlePastApptScroll}
              >
                {pastApptListData?.length > 0 ? (
                  pastApptListData?.map(appointment => (
                    <AppointmentCard
                      key={appointment.uuid}
                      appointment={appointment}
                      showActions={false}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    display={'flex'}
                    justifyContent={'center'}
                    color="#00000099"
                  >
                    {schedulingConstants.NO_PAST_APPT}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid size={12} bgcolor={'white'} px={2} py={1} borderRadius={2}>
          <Grid >
            <Grid justifyContent={'space-between'} display="flex" alignItems="center">
              <Typography variant="bodyRegular3" sx={{ color: 'Primary.main' }}>
                {requestAppointmentConstants.REQ_APPT}
              </Typography>
              <CustomButton
                variant="filled"
                label={schedulingConstants.REQUEST_APPOINTMENT}
                startIcon={<AddIcon />}
                onClick={() => {
                  setTitleDialog(schedulingConstants.REQUEST_APPOINTMENT);
                  setOpenScheduleApptDialog(true);
                }}
              />
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  height: '42vh',
                  overflowY: 'auto',
                  pr: 1.5,
                  my: 1,
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#a8a8a8',
                  },
                }}
                onScroll={handleScroll}
              >
                <CustomisedTable
                  headCells={RequestApptHeadCells}
                  tableData={requestedAppointments}
                  noRecordsMsg={requestAppointmentConstants.NO_REQ_APPTS}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CustomDrawer
        title={titleDialog}
        open={openScheduleApptDialog}
        onClose={() => {
          setSelectedAppointment(null);
          setOpenScheduleApptDialog(false);
        }}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        <RequestAppointmentDialog
          handleDrawerClose={function (): void {
            setSelectedAppointment(null);
            setOpenScheduleApptDialog(false);
          }}
          appointmentData={selectedAppointment}
          refetchList={refetchList}
          isEdit={titleDialog === schedulingConstants.RESCHEDULE_APPOINTMENT ? true : false}
        />
      </CustomDrawer>

      <CustomDrawer
        title={schedulingConstants.CANCEL_APPOINTMENT}
        open={openCancelApptDialog}
        onClose={() => {
          setSelectedAppointment(null);
          setOpenCancelApptDialog(false);
        }}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        {selectedAppointment && (
          <AppointmentCancelDrawer
            handleDrawerClose={() => {
              setSelectedAppointment(null);
              setOpenCancelApptDialog(false);
            }}
            appointment={selectedAppointment}
            refetch={refetchList}
          />
        )}
      </CustomDrawer>
    </Box>
  );
}
