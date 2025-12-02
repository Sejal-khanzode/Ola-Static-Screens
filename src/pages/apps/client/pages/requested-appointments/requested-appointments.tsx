import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import {
  PatientClinic,
  PatientClinicControllerService,
  RequestAppointmentManagementService,
} from 'src/sdk/requests';
import { Box, Typography } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import Chip from 'src/components/core/reusable/chip/chip';
import moment from 'moment';
import { convertDateTimeToSpecifiedZoneWithoutDate } from 'src/utils/date-utils';
import { BASIC_MONTH_DATE_FORMAT } from 'src/constants/date-format';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { RequestApptHeadCells } from 'src/components/core/reusable/headers/all-headers';
import { toCamelCase } from 'src/utils/toCamelCase';
import { requestAppointmentConstants } from 'src/constants/scheduling-constants';

export default function RequestedAppointments() {
  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const dispatch = useDispatch();
  const [requestedAppointments, setRequestedAppointments] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

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
    data: patientApptReqApiData,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useQuery({
    queryKey: ['requestAppt', clinicId, page, pageSize],
    enabled: !!clinicId,
    queryFn: () =>
      RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({
        clinicUuid: clinicId,
        patientUuid: patientDetails?.uuid,
        page: page,
        size: pageSize,
      }),
  });

  const getTimeZoneAbbreviation = () => {
    const timezone = moment.tz.guess();
    const abbreviation = moment.tz(timezone).format('z');
    return abbreviation;
  };

  const formatAppointmentTime = (startTime: string, endTime: string) => {
    const { convertedDate, formattedStartTime, formattedEndTime } =
      convertDateTimeToSpecifiedZoneWithoutDate(startTime, endTime, getTimeZoneAbbreviation());
    const date = convertedDate;
    const start = formattedStartTime;
    const end = formattedEndTime;

    return `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${start} - ${end})`;
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  useEffect(() => {
    if (
      patientApptReqApiData?.data?.content &&
      Array.isArray(patientApptReqApiData?.data?.content)
    ) {
      const formattedData = patientApptReqApiData?.data?.content?.map((request: any) => ({
        uuid: request?.uuid,
        requestType: request?.requestType ? toCamelCase(request?.requestType) : '-',
        providerName: `${request?.provider?.firstName} ${request?.provider?.lastName}`,
        dateTime: formatAppointmentTime(request?.requestedStartTime, request?.requestedEndTime),
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
    if (isLoading || isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isFetching, dispatch]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
        {requestAppointmentConstants.REQ_APPT}
      </Typography>
      <CustomisedTable
        setHeight="80vh"
        headCells={RequestApptHeadCells}
        tableData={requestedAppointments}
        noRecordsMsg={requestAppointmentConstants.NO_REQ_APPTS}
        showPagination
        totalCount={(patientApptReqApiData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={newPage => setPage(newPage - 1)}
        onItemsPerPageChange={handlePageSizeChange}
      />
    </Box>
  );
}
