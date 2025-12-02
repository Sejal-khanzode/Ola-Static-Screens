import { useEffect, useState } from 'react';
import { Grid, SelectChangeEvent, Typography } from '@mui/material';
import { billingSettingConstants } from '../../../../../../constants/setting-constants';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { servicesHeader } from 'src/components/core/reusable/headers/all-headers';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import BillingForm from './billing-form/billing-form';
import { STATUS_OPTIONS } from 'src/pages/apps/admin/components/adminPortalMaster';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { useDispatch } from 'react-redux';
import { useFeeScheduleControllerServiceGetApiMasterFeeSchedule } from 'src/sdk/queries';
import { FilterType } from 'src/pages/apps/admin/pages/clinics/dashboard';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { FeeSchedule, FeeScheduleControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';

const Services = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFeeSchedule, setSelectedFeeSchedule] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [statusType, setStatusType] = useState<FilterType>('All');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const {
    data: medicalCodesData,
    isLoading,
    refetch: refetchMedicalCodes,
  } = useFeeScheduleControllerServiceGetApiMasterFeeSchedule({
    page,
    size: pageSize,
    searchString: searchText,
    active: statusType === 'Active' ? true : statusType === 'Inactive' ? false : undefined,
  });

  const {
    mutateAsync: deleteFeeScheduleAsync,
    isPending: isDeleting,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    error: errorDelete,
    data: dataDelete,
  } = useMutation({
    mutationFn: FeeScheduleControllerService.deleteApiMasterFeeScheduleByFeeScheduleUuid,
  });

  useApiFeedback(
    isErrorDelete,
    errorDelete,
    isSuccessDelete,
    (dataDelete?.message || 'Deleted Successfully') as string
  );

  const handleNewSchedule = () => {
    setIsEditMode(false);
    setSelectedFeeSchedule(null);
    setOpenEditDialog(true);
  };

  const handleEdit = async (data: FeeSchedule) => {
    try {
      const selectedData = Array.isArray(medicalCodeData)
        ? medicalCodeData.find((item: any) => item.uuid === data?.uuid)
        : null;
      setSelectedFeeSchedule(selectedData);
      setIsEditMode(true);
      setOpenEditDialog(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const medicalCodeData = medicalCodesData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: any) => ({
        ...medical,
        code: medical?.code,
        description: medical?.description,
        status: medical?.active ? 'ACTIVE' : 'INACTIVE',
        uuid: medical?.uuid,
        action: medical.archive
          ? [{ label: 'Restore', route: 'restore' }]
          : [
              { label: 'Edit', route: 'edit' },
              { label: 'Delete', route: 'delete' },
            ],
      }))
    : [];

  const handleDelete = async (data: FeeSchedule) => {
    setSelectedFeeSchedule(data);
    setIsDeleteConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedFeeSchedule(null);
    refetchMedicalCodes();
  };

  const handleConfirmDelete = async () => {
    if (selectedFeeSchedule?.uuid) {
      try {
        await deleteFeeScheduleAsync({ feeScheduleUuid: selectedFeeSchedule.uuid });
        setIsDeleteConfirmOpen(false);
        setSelectedFeeSchedule(null);
        refetchMedicalCodes();
      } catch (error) {
        console.error('Error deleting macro:', error);
      }
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetchMedicalCodes();
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as FilterType;
    setStatusType(value);
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setSearchText(e.target.value);
      setPage(0);
    } else if (e.target.value === '') {
      setSearchText('');
    }
  };

  useEffect(() => {
    if (isLoading || isDeleting) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isDeleting, dispatch]);

  return (
    <>
      <Grid container size={12}>
        <Grid padding={'0px 8px'} size={12}>
          <Grid justifyContent="space-between" display="flex" size={12}>
            <Grid sx={{ display: 'flex', alignItems: 'center' }} size={4}>
              <Typography variant="titleSemiBold2" color="Primary.main" ml={1}>
                {billingSettingConstants.FEE_SCHEDULE}
              </Typography>
            </Grid>
            <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2,justifyContent:'end' }} size={6}>
              <Grid size={{ xs: 12, md: 2 }}>
                <CustomLabel label="Status" />
                <CustomSelect
                  placeholder={billingSettingConstants.STATUS}
                  value={statusType}
                  items={STATUS_OPTIONS}
                  onChange={handleStatusChange}
                  bgWhite
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Procedure Code" />
                <CustomInput
                  bgWhite
                  placeholder={billingSettingConstants.SELECT_CPT_HCPCS_PROCEDURE_CODE}
                  showIcon={<SearchIcon />}
                  onChange={handleSearch}
                />
              </Grid>
              <Grid mt={2.5}>
                <CustomButton
                  variant="filled"
                  startIcon={<AddIcon />}
                  label={billingSettingConstants.ADD_FEE_SCHEDULE}
                  fullWidth
                  onClick={handleNewSchedule}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid paddingTop={2}>
            <CustomisedTable
              headCells={servicesHeader}
              tableData={tableData}
              setHeight="72vh"
              removeRadius={false}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showPagination
              totalCount={(medicalCodesData?.data?.page as any)?.totalElements || 0}
              currentPage={page + 1}
              itemsPerPage={pageSize}
              onPageChange={newPage => setPage(newPage - 1)}
              onItemsPerPageChange={handlePageSizeChange}
            />
          </Grid>
        </Grid>

        <CustomDrawer
          title={
            isEditMode
              ? billingSettingConstants.EDIT_FEE_SCHEDULE
              : billingSettingConstants.ADD_FEE_SCHEDULE
          }
          anchor="right"
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setIsEditMode(false);
            setSelectedFeeSchedule(null);
          }}
          drawerPadding="18px"
        >
          <BillingForm
            onClose={() => {
              setOpenEditDialog(false);
              setIsEditMode(false);
              setSelectedFeeSchedule(null);
            }}
            RefetchFeeScheduleData={() => {
              refetchMedicalCodes();
            }}
            isEdit={isEditMode}
            uuid={selectedFeeSchedule?.uuid || ''}
          />
        </CustomDrawer>

        <ConfirmationPopUp
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the "${selectedFeeSchedule?.procedureCode}" Fee Schedule?`}
      />
      </Grid>
    </>
  );
};

export default Services;
