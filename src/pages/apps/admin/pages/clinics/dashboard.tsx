import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, SelectChangeEvent, Box } from '@mui/material';
import { clinicConstants } from '../../../../../constants/admin-constants';
import CustomButton from '../../../../../components/core/reusable/custom-button/custom-button';
import { AddIcon } from '../../../../../assets/icons/addIcon';
import { SearchIcon } from '../../../../../assets/icons/searchIcon';
import CustomSelect from '../../../../../components/core/reusable/custom-select/custom-select';
import { adminDashboardClinicsData } from '../../../../../components/core/reusable/headers/all-headers';
import CustomisedTable from '../../../../../components/core/reusable/custom-table/custom-table';
import CustomInput from '../../../../../components/core/reusable/custom-input/custom-input';
import ClinicForm from './clinic/new-clinic/new-clinic';
import CustomDrawer from '../../../../../components/core/reusable/custom-drawer/custom-drawer';
import ConfirmationPopUp from '../../../../../components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import StateList from '../../../../../assets/states/states.json';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { setSelectedClinic } from '../../../../../redux/reducers/clinicReducer';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  Clinic,
  ClinicControllerService,
  ProviderControllerService,
  StripeControllerService,
} from '../../../../../sdk/requests';
import { useClinicControllerServiceGetApiMasterClinic } from '../../../../../sdk/queries';
import { hideLoader, showLoader } from '../../../../../redux/reducers/loaderReducer';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { getCountAndFormat } from 'src/utils/stringUtils';
import { GroupIcon } from '../../../../../assets/icons/groupIcon';
import { PersonIcon } from '../../../../../assets/icons/personIcon';
import { PatientIcon } from '../../../../../assets/icons/patientIcon';
import CustomIcon from 'src/components/core/reusable/CustomIcon';
import { saveToLocalStorage } from 'src/sdk/requests/core/localStorage';

export const StatusList = [
  { value: 'All', label: 'All (Active + Inactive )' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Archived', label: 'Archived' },
];

export type FilterType = 'All' | 'Active' | 'Inactive' | 'Archived';

const ClinicDashboard = () => {
  const navigate = useNavigate();
  const [openAddClinicDialog, setOpenAddClinicDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clinicData] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [stateType, setStateType] = useState<string>('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useAppDispatch();
  const selectedClinic = useAppSelector((state: any) => state.clinicReducer?.data);

  const [statusType, setStatusType] = useState<FilterType>('All');
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [clinicToArchive, setClinicToArchive] = useState<Clinic | null>(null);

  const listOfStateOptions = [
    { value: '', label: 'All' },
    ...StateList?.map(state => ({
      value: state.code,
      label: state.name,
    })),
  ];

  const { mutateAsync: getProviderCounts, data: providerCountsData } = useMutation({
    mutationFn: ProviderControllerService.getApiMasterProviderCounts,
  });

  const { mutateAsync: fetchClinicByIdAsync, isPending } = useMutation({
    mutationFn: ClinicControllerService.getApiMasterClinicByClinicId,
  });

  const count = providerCountsData?.data;

  const {
    mutateAsync: clinicStatus,
    data: clinicStatusData,
    isSuccess: isSuccessGetClinicStatus,
    isError: isErrorGettingClinicStatus,
    error: errorGettingClinicStatus,
  } = useMutation({
    mutationFn: ClinicControllerService.putApiMasterClinicByClinicIdStatusByStatus,
  });

  const {
    mutateAsync: archiveClinicAsync,
    isSuccess: isSuccessArchiveClinic,
    isError: isErrorArchiveClinic,
    error: errorArchiveClinic,
    data: dataArchiveClinic,
    isPending: archiveClinicPending,
  } = useMutation({
    mutationFn: ClinicControllerService.putApiMasterClinicByClinicIdArchiveByStatus,
  });

  const {
    mutateAsync: createStripeAccountAsync,
    isSuccess: isSuccessCreateStripeAccount,
    isError: isErrorCreateStripeAccount,
    error: errorCreateStripeAccount,
    data: dataCreateStripeAccount,
    isPending: isCreatingStripeAccount,
  } = useMutation({
    mutationFn: StripeControllerService.postApiMasterStripeAccount,
  });

  const {
    isLoading,
    refetch,
    data: clinicsData,
    isPending: isPendingGetClinic,
  } = useClinicControllerServiceGetApiMasterClinic({
    page,
    size: pageSize,
    searchString: searchText,
    status: statusType === 'Active' ? true : statusType === 'Inactive' ? false : undefined,
    state: stateType === '' ? undefined : stateType,
    archive: statusType === 'Archived' ? true : statusType === 'All' ? undefined : false,
  });

  useEffect(() => {
    if (
      isLoading ||
      isPendingGetClinic ||
      isPending ||
      archiveClinicPending ||
      isCreatingStripeAccount
    ) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [
    isLoading,
    isPendingGetClinic,
    isPending,
    archiveClinicPending,
    isCreatingStripeAccount,
    dispatch,
  ]);

  useEffect(() => {
    if (clinicData?.data) {
      dispatch(setSelectedClinic(clinicData.data));
    }
  }, [clinicData, dispatch]);

  useApiFeedback(
    isErrorGettingClinicStatus,
    errorGettingClinicStatus,
    isSuccessGetClinicStatus,
    (clinicStatusData?.message || 'Clinic status updated successfully') as string
  );

  useApiFeedback(
    isErrorArchiveClinic,
    errorArchiveClinic,
    isSuccessArchiveClinic,
    (dataArchiveClinic?.message || 'Clinic archived successfully') as string
  );

  useApiFeedback(
    isErrorCreateStripeAccount,
    errorCreateStripeAccount,
    isSuccessCreateStripeAccount,
    (dataCreateStripeAccount?.message || 'Stripe account created successfully') as string
  );

  const dashboardData = [
    {
      icon: <GroupIcon />,
      number: count?.totalClinics,
      stakeholder: clinicConstants.ACTIVE_CLINICS,
    },
    { icon: <PersonIcon />, number: count?.totalProviders, stakeholder: clinicConstants.PROVIDERS },
    { icon: <PatientIcon />, number: count?.totalPatient, stakeholder: clinicConstants.PATIENTS },
  ];

  const clinicTableData = clinicsData?.data?.content || [];

  const tableData = Array.isArray(clinicTableData)
    ? clinicTableData?.map((clinic: Clinic) => ({
        ...clinic,
        name: clinic?.name,
        phone: clinic?.phone,
        contact: clinic?.phone ? `${formatPhoneNumber(clinic?.phone)}` : '',
        groupspecialities: getCountAndFormat(clinic?.specialities || [])?.formattedRoles || '',
        specialities: clinic?.specialities
          ? Object.values(clinic?.specialities).join(', ') || '-'
          : '-',
        account: clinic?.stripeAccountId
          ? clinic?.stripeOnboarding
            ? 'Sync'
            : 'Onboard'
          : 'Create',
        address: clinic?.physicalAddress
          ? [
              clinic?.physicalAddress?.line1,
              clinic?.physicalAddress?.line2,
              clinic?.physicalAddress?.city,
              clinic?.physicalAddress?.zipcode,
            ]
              .filter(Boolean)
              .join(', ')
          : '-',

        state: clinic?.physicalAddress?.state || '-',
        status: clinic?.archive ? 'ARCHIVED' : clinic?.active ? 'ACTIVE' : 'INACTIVE',
        action: clinic?.archive
          ? [{ label: 'Restore', route: 'restore' }]
          : [
              { label: 'Edit', route: 'edit' },
              { label: 'Archive', route: 'archive' },
            ],
        uuid: clinic?.uuid || '',
      }))
    : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setSearchText(e.target.value);
      setPage(0);
    } else if (e.target.value === '') {
      setSearchText('');
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    RefetchClinicData();
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as FilterType;
    setStatusType(value);
    setPage(0);
  };

  useEffect(() => {
    refetch();
    getProviderCounts();
  }, [dispatch, page, statusType, stateType, searchText]);

  const handleEditClinic = (clinicData: Clinic) => {
    const originalClinicData = Array.isArray(clinicTableData)
      ? clinicTableData.find((clinic: Clinic) => clinic?.uuid === clinicData?.uuid)
      : null;
    if (originalClinicData) {
      dispatch(setSelectedClinic(originalClinicData));
      setIsEditMode(true);
      setOpenAddClinicDialog(true);
    }
  };

  const handleArchive = (clinicRow: Clinic) => {
    setClinicToArchive(clinicRow);
    setIsArchiveConfirmOpen(true);
  };

  const handleConfirmArchive = async () => {
    try {
      if (!clinicToArchive?.uuid) return;

      const clinicData = await fetchClinicByIdAsync({ clinicId: clinicToArchive.uuid });
      if (!clinicData) return;

      const archivePayload = {
        clinicId: clinicToArchive.uuid,
        status: clinicToArchive.archive === true ? false : true,
      };

      await archiveClinicAsync(archivePayload);
      setIsArchiveConfirmOpen(false);
      setClinicToArchive(null);
    } catch (error) {
      console.error('Error archiving clinic:', error);
      setIsArchiveConfirmOpen(false);
      setClinicToArchive(null);
    }
  };

  const handleCancelArchive = () => {
    setIsArchiveConfirmOpen(false);
    setClinicToArchive(null);
  };

  const handleRestore = async (clinicRow: Clinic) => {
    try {
      if (!clinicRow?.uuid) return;

      const restorePayload = {
        clinicId: clinicRow.uuid,
        status: false,
      };

      await archiveClinicAsync(restorePayload);

      setTimeout(() => {
        RefetchClinicData();
      }, 500);
    } catch (error) {
      console.error('Error restoring clinic:', error);
    }
  };

  const handleCreateStripeAccount = async (rowData: any) => {
    try {
      if (!rowData?.uuid) {
        console.error('No clinic UUID found');
        return;
      }

      // If stripeAccountId exists, directly fetch and open the URL
      if (rowData?.stripeAccountId) {
        const stripeResponse = await StripeControllerService.getApiMasterStripeByClinicId({
          clinicId: rowData.uuid,
        });

        if (stripeResponse?.data?.url) {
          window.open(stripeResponse.data.url as string, '_blank');
        }

        setTimeout(() => {
          RefetchClinicData();
        }, 500);
        return;
      }

      // First fetch the latest clinic data
      const clinicData = await fetchClinicByIdAsync({ clinicId: rowData.uuid });

      if (!clinicData?.data) {
        console.error('Clinic data not found');
        return;
      }

      // Then create the Stripe account with the fetched data
      await createStripeAccountAsync({
        requestBody: clinicData.data as any,
      });

      // After successful creation, fetch the Stripe account details and open URL
      const stripeResponse = await StripeControllerService.getApiMasterStripeByClinicId({
        clinicId: rowData.uuid,
      });

      if (stripeResponse?.data?.url) {
        window.open(stripeResponse.data.url as string, '_blank');
      }

      setTimeout(() => {
        RefetchClinicData();
      }, 500);
    } catch (error) {
      console.error('Error creating Stripe account:', error);
      refetch();
    }
  };

  const handleActionItemSelect = (item: string, rowData: Clinic) => {
    if (item === 'Edit') {
      handleEditClinic(rowData);
    } else if (item === 'archive') {
      handleArchive(rowData);
    } else if (item === 'restore') {
      handleRestore(rowData);
    } else if (item === 'create-stripe-account') {
      handleCreateStripeAccount(rowData);
    }
  };

  const handleView = (rowData: Clinic) => {
    const originalClinicData = Array.isArray(clinicTableData)
      ? clinicTableData.find((clinic: Clinic) => clinic?.uuid === rowData.uuid)
      : null;
    if (originalClinicData) {
      dispatch(setSelectedClinic(originalClinicData));
    }
    saveToLocalStorage('selectedClinicUuid', rowData.uuid);
    navigate(`/admin/clinics/profile/${rowData.uuid}`);
  };

  const handleUpdateStatus = async (rowData: Clinic) => {
    try {
      const clinicId = rowData.uuid;
      if (!clinicId) {
        console.error('No clinic ID found in row data');
        return;
      }

      const currentClinic = Array.isArray(clinicTableData)
        ? clinicTableData.find((clinic: Clinic) => clinic?.uuid === clinicId)
        : null;
      if (!currentClinic) {
        console.error('Clinic not found');
        return;
      }

      const updateClinicStatusPayload = {
        clinicId,
        status: currentClinic?.active === true ? false : true,
      };

      await clinicStatus(updateClinicStatusPayload);
    } catch (error) {
      console.error('Error updating clinic status:', error);
    }
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setStateType(value);
    setPage(0);
  };

  const RefetchClinicData = () => {
    try {
      refetch();
      setTimeout(() => {
        getProviderCounts();
      }, 1000);
    } catch (error) {
      console.error('Error in RefetchClinicData:', error);
    }
  };

  useEffect(() => {
    const handleRefetchEvent = () => {
      RefetchClinicData();
    };

    window.addEventListener('refetchClinic', handleRefetchEvent);

    return () => {
      window.removeEventListener('refetchClinic', handleRefetchEvent);
    };
  }, []);

  useEffect(() => {
    if (isSuccessArchiveClinic) {
      setTimeout(() => {
        RefetchClinicData();
      }, 300);
    }
  }, [isSuccessArchiveClinic]);

  useEffect(() => {
    if (isSuccessCreateStripeAccount) {
      setTimeout(() => {
        RefetchClinicData();
      }, 300);
    }
  }, [isSuccessCreateStripeAccount]);

  const handleClose = () => {
    setOpenAddClinicDialog(false);
    setIsEditMode(false);
  };

  return (
    <>
      <Grid size={{ xs: 12 }} sx={{ width: '100%', px: 1 }}>
        <Grid
          size={{ xs: 12 }}
          alignItems="center"
          justifyContent="space-between"
          display={'flex'}
          width={'100%'}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap={2}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="titleBold4" color="Primary.main">
              {clinicConstants.CLINICS}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid 
              container 
              display={'flex'} 
              flexDirection={'row'} 
              gap={2} 
              size={12}
              flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 8.5}}></Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 5.9}} mt={{ xs: 0, md: 2.5 }}>
                <CustomInput
                  bgWhite
                  placeholder={clinicConstants.SEARCH_HERE}
                  showIcon={<SearchIcon />}
                  onChange={handleSearch}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3, lg:5}}>
                <CustomLabel label="Status" />
                <CustomSelect
                  name="statusType"
                  placeholder={'Status'}
                  value={statusType}
                  onChange={handleStatusChange}
                  items={StatusList}
                  bgWhite
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3.9}}>
                <CustomLabel label="State" />
                <CustomSelect
                  placeholder={clinicConstants.SEARCH_AND_SELECT_STATE}
                  value={stateType}
                  onChange={handleStateChange}
                  items={listOfStateOptions}
                  name="State"
                  bgWhite
                />
              </Grid>
              <Grid 
                size={{ xs: 12, sm: 12, md: 2, lg: 2.8 }} 
                mt={{ xs: 0, md: 2.5 }} 
                alignItems={{ xs: 'flex-start', md: 'end' }} 
                justifyContent={{ xs: 'flex-start', md: 'end' }} 
                display={'flex'}
              >
                <CustomButton
                  variant="filled"
                  onClick={() => setOpenAddClinicDialog(true)}
                  startIcon={<AddIcon />}
                  label={clinicConstants.ADD_CLINIC}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }} flexDirection={'column'} mb={2} mt={2}>
          <Box display={'flex'} flexDirection={'row'} gap={2}>
            {dashboardData?.map((data, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box
                  sx={{
                    gap: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                    p: 2,
                    backgroundColor: 'Base.white',
                    minHeight: 112,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'Primary.0',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <CustomIcon icon={data.icon} iconColor="Primary.main" />
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h3Medium" color="Primary.main">
                      {data.number as string}
                    </Typography>
                    <Typography variant="titleSemiBold3" color="Neutral.80">
                      {data.stakeholder}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          {Array.isArray(clinicsData?.data?.content) && (
            <CustomisedTable
              headCells={adminDashboardClinicsData}
              tableData={tableData as any}
              setHeight="60vh"
              removeRadius={false}
              onActionItemSelect={handleActionItemSelect}
              handleUpdateStatus={handleUpdateStatus}
              handleEdit={handleEditClinic}
              handleView={handleView}
              handleArchive={handleArchive}
              showPagination
              totalCount={(clinicsData?.data?.page as any)?.totalElements || 0}
              currentPage={page + 1}
              itemsPerPage={pageSize}
              onPageChange={newPage => setPage(newPage - 1)}
              onItemsPerPageChange={handlePageSizeChange}
              handleStripe={handleCreateStripeAccount}
            />
          )}
        </Grid>

        <Grid>
          <CustomDrawer
            title={isEditMode ? clinicConstants.EDIT_CLINIC : clinicConstants.ADD_CLINIC}
            anchor="right"
            open={openAddClinicDialog}
            onClose={() => {
              setOpenAddClinicDialog(false);
              setIsEditMode(false);
            }}
            drawerPadding="18px"
          >
            <ClinicForm
              onClose={handleClose}
              RefetchClinicData={() => {
                refetch();
                setTimeout(() => {
                  getProviderCounts();
                }, 1000);
              }}
              isEdit={isEditMode}
              uuid={selectedClinic?.uuid || ''}
            />
          </CustomDrawer>
        </Grid>

        <ConfirmationPopUp
          open={isArchiveConfirmOpen}
          onClose={handleCancelArchive}
          onConfirm={handleConfirmArchive}
          message={`Are you sure you want to ${clinicToArchive?.archive ? 'restore' : 'archive'} the clinic "${clinicToArchive?.name}"?`}
        />
      </Grid>
    </>
  );
};

export default ClinicDashboard;
