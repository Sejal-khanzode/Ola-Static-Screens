import { useEffect, useState } from 'react';
import { Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import CustomisedTable from '../../../../../../../components/core/reusable/custom-table/custom-table';
import { patinetFlagProviderHeader } from '../../../../../../../components/core/reusable/headers/all-headers';
import CustomDrawer from '../../../../../../../components/core/reusable/custom-drawer/custom-drawer';
import PatientFlagForm from './patient-flag-form';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import { usePatientFlagControllerServiceGetApiMasterPatientFlag } from 'src/sdk/queries';
import { useDispatch } from 'react-redux';
import { FilterType } from 'src/pages/apps/admin/pages/clinics/dashboard';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { PatientFlagControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { STATUS_OPTIONS } from 'src/pages/apps/admin/pages/settings/admin-users/admin-users';
import { settingConstants } from 'src/constants/admin-constants';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { convertTimeAndDateUsingSingleValue, getTimeZoneAbbreviation } from 'src/utils/date-utils';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';

const PatientFlagSetting = () => {
  const [openFlagDialog, setOpenFlagDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFlagData, setSelectedFlagData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [statusType, setStatusType] = useState<FilterType>('All');
  const [openArchivePopup, setOpenArchivePopup] = useState(false);

  const {
    data: medicalCodesData,
    isLoading,
    refetch: refetchMedicalCodes,
  } = usePatientFlagControllerServiceGetApiMasterPatientFlag({
    page,
    size: pageSize,
    searchString: searchText,
    status: statusType === 'Active' ? true : statusType === 'Inactive' ? false : undefined,
    archive: statusType === 'Archived' ? true : false,
  });
  const medicalCodeData = medicalCodesData?.data?.content || [];
  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: any) => {
        const { convertedDate } = convertTimeAndDateUsingSingleValue(
          medical?.createdDate,
          getTimeZoneAbbreviation()
        );

        const { convertedDate: updatedDate } = convertTimeAndDateUsingSingleValue(
          medical?.updatedDate,
          getTimeZoneAbbreviation()
        );

        return {
          ...medical,
          name: medical?.name,
          hexColor: medical?.hexColor,
          uuid: medical?.uuid,
          customcreatedDate: medical?.createdDate ? `${convertedDate}` : '-',
          customupdatedDate: medical?.updatedDate ? `${updatedDate}` : '-',
          status: medical.archive ? 'ARCHIVED' : medical.active ? 'ACTIVE' : 'INACTIVE',
          action: medical.archive
            ? [{ label: 'Restore', route: 'restore' }]
            : [
                { label: 'Edit', route: 'edit' },
                { label: 'Archive', route: 'archive' },
              ],
        };
      })
    : [];

  const {
    mutateAsync: archiveUserAsync,
    isSuccess: isSuccessArchiveUser,
    isError: isErrorArchiveUser,
    error: errorArchiveUser,
    data: dataArchiveUser,
    isPending: isArchivePending,
  } = useMutation({
    mutationFn: PatientFlagControllerService.putApiMasterPatientFlagByPatientFlagIdArchiveByStatus,
  });

  const handleEdit = (rowData: any) => {
    setSelectedFlagData(rowData);
    setIsEditMode(true);
    setOpenFlagDialog(true);
  };

  const handleArchive = async (rowData: any) => {
    setSelectedFlagData(rowData);
    setOpenArchivePopup(true);
  };

  const handleConfirm = async () => {
    try {
      const archivePayload = {
        patientFlagId: selectedFlagData.uuid,
        status: selectedFlagData?.archive === true ? false : true,
      };

      await archiveUserAsync(archivePayload);
      refetchMedicalCodes();
      setOpenArchivePopup(false);
    } catch (error) {
      console.error('Error archiving user:', error);
    }
  };

  const handleCloseFlagDialog = () => {
    setOpenFlagDialog(false);
    setIsEditMode(false);
    setSelectedFlagData(null);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetchMedicalCodes();
  };

  const handleAddNewFlag = () => {
    setSelectedFlagData(null);
    setIsEditMode(false);
    setOpenFlagDialog(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setSearchText(e.target.value);
      setPage(0);
    } else if (e.target.value === '') {
      setSearchText('');
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as FilterType;
    setStatusType(value);
    setPage(0);
  };

  const handleClose = () => {
    setOpenArchivePopup(false);
  };

  useApiFeedback(
    isErrorArchiveUser,
    errorArchiveUser,
    isSuccessArchiveUser,
    (dataArchiveUser?.message || 'User archive successfully') as string
  );

  useEffect(() => {
    if (isLoading || isArchivePending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isArchivePending, dispatch]);

  return (
    <Box width={'100%'}>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Grid size={{ xs: 1 }}>
          <Typography variant="titleBold4">{settingConstants.PATIENT_FLAG}</Typography>
        </Grid>
        <Grid
          size={{ xs: 11 }}
          alignItems="center"
          display={'flex'}
          justifyContent={'end'}
          spacing={2}
        >
          <Grid container display={'flex'} justifyContent={'end'} gap={1} width={'100%'}>
            <Grid mt={2.7} size={{ xs: 12, md: 2.3 }}>
              <CustomInput
                placeholder={settingConstants.SEARCH_FLAG_NAME}
                value={searchText}
                onChange={handleSearch}
                bgWhite
                showIcon={<SearchIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1.7 }}>
              <CustomLabel label="Status" />
              <CustomSelect
                placeholder={settingConstants.STATUS}
                value={statusType}
                items={STATUS_OPTIONS}
                onChange={handleStatusChange}
                backgroundColor="white"
              />
            </Grid>
            <Grid mt={2.5}>
              <CustomButton
                variant="filled"
                label={settingConstants.ADD_PATIENT_FLAG}
                startIcon={<AddIcon />}
                onClick={handleAddNewFlag}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CustomisedTable
        tableData={tableData}
        headCells={patinetFlagProviderHeader}
        showPagination
        setHeight="73vh"
        totalCount={(medicalCodesData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={newPage => setPage(newPage - 1)}
        onItemsPerPageChange={handlePageSizeChange}
        handleEdit={handleEdit}
        handleArchive={handleArchive}
      />

      <CustomDrawer
        title={isEditMode ? settingConstants.EDIT_PATIENT_FLAG : settingConstants.ADD_PATIENT_FLAG}
        open={openFlagDialog}
        onClose={handleCloseFlagDialog}
        anchor={'right'}
        drawerWidth="35vw"
        drawerPadding="18px"
      >
        <PatientFlagForm
          onClose={handleCloseFlagDialog}
          isEdit={isEditMode}
          editData={selectedFlagData}
          onSuccess={refetchMedicalCodes}
        />
      </CustomDrawer>

      <ConfirmationPopUp
        open={openArchivePopup}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={settingConstants.CONFIRM_POP}
      />
    </Box>
  );
};

export default PatientFlagSetting;
