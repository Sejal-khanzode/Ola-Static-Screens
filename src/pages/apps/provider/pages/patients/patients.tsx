import { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Grid, SelectChangeEvent } from '@mui/material';
import CustomSelect from '../../../../../components/core/reusable/custom-select/custom-select';
import CustomButton from '../../../../../components/core/reusable/custom-button/custom-button';
import {
  addPatientConstants,
  patientsConstants,
  providerConstants,
} from '../../../../../constants/patients-constants';
import CustomisedTable from '../../../../../components/core/reusable/custom-table/custom-table';
import { patientsTableHeader } from '../../../../../components/core/reusable/headers/all-headers';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveToLocalStorage,
} from 'src/sdk/requests/core/localStorage';
import { FilterType, StatusList } from 'src/pages/apps/admin/pages/clinics/dashboard';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import { PatientClinicControllerService } from 'src/sdk/requests';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';

let globalRefetchPatientsFunction: (() => void) | null = null;
let globalPatientsSearchString: string = '';
let globalPatientsStatusType: FilterType = 'All';

export const setGlobalRefetchPatientsFunction = (refetchFn: () => void) => {
  globalRefetchPatientsFunction = refetchFn;
};

export const getglobalRefetchPatientsFunction = () => globalRefetchPatientsFunction;

export const setGlobalPatientsSearchAndStatus = (search: string, status: FilterType) => {
  globalPatientsSearchString = search;
  globalPatientsStatusType = status;
};

export const getGlobalPatientsSearchAndStatus = () => ({
  searchString: globalPatientsSearchString,
  statusType: globalPatientsStatusType,
});

const Patients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<FilterType>('All');
  const [isResendConfirmOpen, setIsResendConfirmOpen] = useState(false);
  const [patientToResend, setPatientToResend] = useState<any | null>(null);
  const [, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [, setClinicUuid] = useState('');

  const [clinicId, setClinicId] = useState(
    getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || ''
  );

  const {
    data: getPatientsData,
    refetch: refetchPatients,
    isPending: isLoadingPatientData,
    isLoading,
  } = useQuery({
    queryKey: [
      'PastApptList',
      {
        pageSize,
        page,
        searchText,
      },
    ],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinic({
        page,
        size: pageSize,
        searchString: searchText,
        active:
          selectedStatus === 'Active' ? true : selectedStatus === 'Inactive' ? false : undefined,
        archive: selectedStatus === 'Archived' ? true : false,
        clinicUuid: clinicId,
      }),
    enabled: !!clinicId,
  });

  const patientsData = getPatientsData?.data?.content as any[];

  const {
    mutate: resendInvitation,
    isPending: isResendingInvitation,
    isSuccess: isResendSuccess,
    isError: isResendError,
    error: resendError,
    data: resendData,
  } = useMutation({
    mutationFn: (patientClinicUuid: string) =>
      PatientClinicControllerService.postApiMasterPatientClinicResendInvitationByPatientClinicUuid({
        patientClinicUuid,
      }),
  });

  useApiFeedback(
    isResendError,
    resendError,
    isResendSuccess,
    (resendData?.message || 'Invitation resent successfully') as string
  );

  const RefetchPatientsData = useCallback(() => {
    refetchPatients();
  }, [refetchPatients]);

  useEffect(() => {
    if (patientsData && patientsData?.length > 0) {
      const formattedData = patientsData?.map((patient: any) => ({
        patientName: patient?.patientName || '',
        dob: patient?.dob || '',
        email: patient?.email || '',
        phone: patient?.phone || '',
        status: patient?.active ? 'ACTIVE' : 'INACTIVE',
        primaryProviderName: patient?.primaryProviderName || '',
        uuid: patient?.uuid || '',
      }));
      setTableData(formattedData);
    } else {
      setTableData([]);
    }
  }, [patientsData]);

  const tabledata = useMemo(() => {
    if (!patientsData || patientsData?.length === 0) return [];

    return patientsData?.map((patient: any) => ({
      ...patient,
      patientName: patient?.patientName || '',
      dob: formatDateToMMDDYYYY(patient?.dob) || '',
      email: patient?.email || '',
      phone: formatPhoneNumber(patient?.phone) || '',
      status: patient.archive ? 'ARCHIVED' : patient?.active ? 'ACTIVE' : 'INACTIVE',
      primaryProviderName: patient?.primaryProviderName || '',
      action: !patient?.patientEmailVerified
        ? [{ label: 'Resend Invite', route: 'invite' }]
        : [{ label: 'No actions available', route: '' }],
    }));
  }, [patientsData]);

  const handleView = (rowData: any) => {
    queryClient.removeQueries({
      queryKey: ['consentFormData'],
      exact: false,
    });
    queryClient.removeQueries({
      queryKey: ['intakeData'],
      exact: false,
    });
    saveToLocalStorage('patientUUID', rowData?.uuid);
    navigate(`/provider/patients/patient-profile`);
  };

  const handleNewPatient = () => {
    navigate('/provider/patients/add-patient');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setPage(0);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as FilterType;
    setSelectedStatus(value);
    setPage(0);
    setGlobalPatientsSearchAndStatus(searchText, value);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    RefetchPatientsData();
  };

  const handleResend = (rowData: any) => {
    setPatientToResend(rowData);
    setIsResendConfirmOpen(true);
  };

  const handleCancelResend = () => {
    setIsResendConfirmOpen(false);
    setPatientToResend(null);
  };
  const handleConfirmResend = async () => {
    try {
      if (!patientToResend?.uuid) return;

      await resendInvitation(patientToResend?.uuid);

      setIsResendConfirmOpen(false);
      setPatientToResend(null);
    } catch (error) {
      console.error('Error resending email:', error);
      setIsResendConfirmOpen(false);
      setPatientToResend(null);
    }
  };

  useEffect(() => {
    RefetchPatientsData();
  }, [selectedStatus, clinicId]);

  useEffect(() => {
    setGlobalRefetchPatientsFunction(RefetchPatientsData);
    return () => {
      setGlobalRefetchPatientsFunction(null as any);
    };
  }, [RefetchPatientsData]);

  useEffect(() => {
    const handleClinicChange = () => {
      setPage(0);
      const latestClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (latestClinicId) {
        setClinicId(latestClinicId);
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);

    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, []);

  useEffect(() => {
    if (isLoadingPatientData || isLoading || isResendingInvitation) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingPatientData, dispatch, isLoading, isResendingInvitation]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedClinicUuid') {
        const newClinicId = e.newValue?.replace(/"/g, '') || '';
        setClinicUuid(newClinicId);
        setPage(0);
      }
    };

    const handleClinicChanged = (e: CustomEvent) => {
      const newClinicId = e.detail?.clinicId || '';
      setClinicUuid(newClinicId);
      setPage(0);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinicChanged', handleClinicChanged as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinicChanged', handleClinicChanged as EventListener);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/provider/patients') {
      removeDataFromLocalStorage('patientUUID');
    }
  }, [location.pathname]);

  return (
    <>
      {clinicId ? (
        <Grid size={{ xs: 12 }} sx={{ width: '100%', px: 1 }}>
          <Grid
            size={{ xs: 12 }}
            alignItems="center"
            justifyContent="space-between"
            display={'flex'}
            width={'100%'}
          >
            <Grid size={{ xs: 6, md: 6 }}>
              <Typography variant="titleMedium1" color="Base.black" mt={2}>
                {patientsConstants.PATIENTS}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 6 }}>
              <Grid display="flex" gap={2} flexDirection="row">
                <Grid size={10}></Grid>
                <Grid size={15} mt={2.8}>
                  <CustomInput
                    bgWhite
                    placeholder={patientsConstants.SEARCH_PATIENT}
                    showIcon={<SearchIcon />}
                    onChange={handleSearch}
                    value={searchText}
                  />
                </Grid>
                <Grid size={8.5}>
                  <CustomLabel label={patientsConstants.STATUS} />
                  <CustomSelect
                    placeholder={patientsConstants.SELECT_STATUS}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    items={StatusList}
                    bgWhite
                  />
                </Grid>
                <Grid size={6.5} mt={2.8}>
                  <CustomButton
                    variant="filled"
                    startIcon={<AddIcon />}
                    label={addPatientConstants.ADD_PATIENT}
                    onClick={handleNewPatient}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12} mt={2}>
            <CustomisedTable
              headCells={patientsTableHeader}
              tableData={tabledata}
              setHeight="75vh"
              removeRadius={false}
              handleView={handleView}
              showPagination
              totalCount={(getPatientsData?.data?.page as any)?.totalElements || 0}
              currentPage={page + 1}
              itemsPerPage={pageSize}
              onPageChange={newPage => setPage(newPage - 1)}
              onItemsPerPageChange={handlePageSizeChange}
              handleResend={handleResend}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container width={'100%'}>
          <Grid size={{ xs: 12 }} display={'flex'} justifyContent={'center'} width={'100%'}>
            <Typography variant="titleMedium3">
              {providerConstants.NO_CLINICS_ASSOCIATED}
            </Typography>
          </Grid>
        </Grid>
      )}
      <ConfirmationPopUp
        open={isResendConfirmOpen}
        onClose={handleCancelResend}
        onConfirm={handleConfirmResend}
        message={`Are you sure you want to resend the invitation email to "${patientToResend?.patientName as string}"?`}
      />
    </>
  );
};

export default Patients;
