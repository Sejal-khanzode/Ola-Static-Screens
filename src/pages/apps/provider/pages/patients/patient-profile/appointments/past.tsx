import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { appointmentHeaders } from 'src/components/core/reusable/headers/all-headers';
import { useAppointmentManagementServiceGetApiMasterAppointments } from 'src/sdk/queries';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { BASIC_MONTH_DATE_FORMAT, formatDateToMMDDYYYY } from 'src/constants/date-format';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import {
  convertDateTimeToSpecifiedZoneWithoutDate,
  getTimeZoneAbbreviation,
} from 'src/utils/date-utils';
import moment from 'moment-timezone';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';

const Past = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const dispatch = useAppDispatch();
  const {
    data: upcommingAppointments,
    refetch: refetchUpcommingAppointments,
    isPending: isPendingUpcommingAppointment,
  } = useAppointmentManagementServiceGetApiMasterAppointments({
    page,
    size: pageSize,
    patientUuid: patientUUID || '',
    timeFilter: 'PAST',
  });

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetchUpcommingAppointments();
  };

  useEffect(() => {
    if (isPendingUpcommingAppointment) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isPendingUpcommingAppointment]);

  const appointments = upcommingAppointments?.data?.content || [];

  const transformedTableData = Array.isArray(appointments)
    ? appointments.map((appointment: any) => {
        const { convertedDate, formattedStartTime, formattedEndTime } =
          convertDateTimeToSpecifiedZoneWithoutDate(
            appointment?.startTime,
            appointment?.endTime,
            getTimeZoneAbbreviation()
          );
        const date = convertedDate;
        const startTime = formattedStartTime;
        const endTime = formattedEndTime;

        const status = appointment?.status == 'RESCHEDULED' ? 'SCHEDULED' : appointment?.status;

        return {
          ...appointment,
          uuid: appointment?.uuid,
          location:
            appointment.mode === 'IN_PERSON' || appointment.mode === 'HOME'
              ? appointment?.locationName
              : 'Virtual',
          time: `${moment(date).format(BASIC_MONTH_DATE_FORMAT)} (${startTime} - ${endTime})`,
          appointmentType: appointment?.appointmentTypeName,
          patientName: appointment?.patientName || '-',
          dateOfBirth: appointment?.patientDob
            ? formatDateToMMDDYYYY(appointment?.patientDob)
            : '-',
          contactDetails: appointment?.patientPhone
            ? formatPhoneNumber(appointment?.patientPhone)
            : '-',
          providerName: appointment?.providerName || '-',
          status: status,
        };
      })
    : [];
  return (
    <Grid container>
      <Grid size={12}>
        <CustomisedTable
          headCells={appointmentHeaders}
          tableData={transformedTableData}
          noRecordsMsg="No Appointments Found"
          showPagination={true}
          removeRadius={false}
          totalCount={(upcommingAppointments?.data?.page as any)?.totalElements || 0}
          currentPage={page + 1}
          itemsPerPage={pageSize}
          onPageChange={newPage => setPage(newPage - 1)}
          onItemsPerPageChange={handlePageSizeChange}
          hideBgColorPagination
        />
      </Grid>
    </Grid>
  );
};

export default Past;
