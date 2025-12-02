import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { apptTypeHeader } from 'src/components/core/reusable/headers/all-headers';
import AddEditApptTypes from './add-edit-appt-types';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import {
  useAppointmentTypeManagementServiceDeleteApiMasterAppointmentTypesByUuid,
  useAppointmentTypeManagementServiceGetApiMasterAppointmentTypes,
} from 'src/sdk/queries';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { formConstants } from 'src/constants/setting-constants';
import { AppointmentType } from 'src/sdk/requests';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import useApiFeedback from 'src/hooks/useApiFeedback';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import { settingsConstants } from 'src/constants/setting-constants';

let globalRefetchApptTypeFunction: (() => void) | null = null;

export const setGlobalRefetchApptTypeFunction = (refetchFn: () => void) => {
  globalRefetchApptTypeFunction = refetchFn;
};

export const getGlobalRefetchApptTypeFunction = () => globalRefetchApptTypeFunction;

const AppointmentTypes = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<AppointmentType | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const dispatch = useDispatch();

  const {
    data: apiData,
    isLoading,
    refetch: refetchApptTypeData,
  } = useAppointmentTypeManagementServiceGetApiMasterAppointmentTypes({
    page,
    size: pageSize,
  });

  const {
    mutateAsync: deleteAsync,
    isPending: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deleteData,
  } = useAppointmentTypeManagementServiceDeleteApiMasterAppointmentTypesByUuid();

  const medicalCodeData = apiData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: AppointmentType) => ({
        ...medical,
        title: medical?.title,
        description: medical?.description,
        uuid: medical?.uuid,
        colorCode: medical?.colorCode,
        action: [
          { label: 'Edit', route: 'edit' },
          { label: 'Delete', route: 'delete' },
        ],
      }))
    : [];

  const handleEdit = (data: AppointmentType) => {
    setSelectedData(data);
    setIsEditMode(true);
  };

  const handleDelete = (rowData: AppointmentType) => {
    setSelectedData(rowData);
    setIsDeleteConfirmOpen(true);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetchApptTypeData();  
};

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedData(null);
    refetchApptTypeData();
  };

  const handleConfirmDelete = async () => {
    if (selectedData?.uuid) {
      try {
        await deleteAsync({ uuid: selectedData.uuid });
        setIsDeleteConfirmOpen(false);
        setSelectedData(null);
        refetchApptTypeData();
      } catch (error) {
        console.error('Error deleting macro:', error);
      }
    }
  };
  const handleAddAppointmentType = () => {
    setIsCreateMode(true);
  };

  useEffect(() => {
    if (isLoading || isDeleting) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isDeleting, dispatch]);

  useEffect(() => {
    setGlobalRefetchApptTypeFunction(() => {
      refetchApptTypeData();
    });
  }, []);

  useEffect(() => {
    setGlobalRefetchApptTypeFunction(() => {
      refetchApptTypeData();
    });
    return () => {
      setGlobalRefetchApptTypeFunction(() => {});
    };
  }, [refetchApptTypeData]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetchApptTypeData();
    }
  }, [isDeleteSuccess, refetchApptTypeData]);

  useApiFeedback(
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    (deleteData?.message || 'Deleted successfully') as string
  );

  return (
    <Box paddingTop={1} width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
      <Grid container display={'flex'} justifyContent={'space-between'}>
        <Grid size={6} alignItems={'center'}>
          <Typography variant="bodyRegular3">{settingsConstants.APPOINTMENT_TYPES}</Typography>
        </Grid>
        <Grid>
          <CustomButton
            variant="filled"
            startIcon={<AddIcon />}
            onClick={handleAddAppointmentType}
            label={formConstants.ADD_APPT_TYPE}
          />
        </Grid>
      </Grid>
      <CustomisedTable
        headCells={apptTypeHeader}
        tableData={tableData}
        setHeight="75vh"
        removeRadius={false}
        handleEdit={handleEdit}
        showPagination
        totalCount={(apiData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={newPage => setPage(newPage - 1)}
        onItemsPerPageChange={handlePageSizeChange}
        handleDelete={handleDelete}
      />

      <CustomDrawer
        title={formConstants.EDIT_APPT_TYPE}
        anchor="right"
        open={isEditMode}
        onClose={() => {
          setIsEditMode(false);
          setSelectedData(null);
        }}
        drawerPadding="18px"
      >
        <AddEditApptTypes
          onClose={() => {
            setIsEditMode(false);
            setSelectedData(null);
          }}
          isEdit={true}
          uuid={selectedData?.uuid || ''}
          selectedData={isEditMode ? selectedData : undefined}
          ReftechData={refetchApptTypeData}
        />
      </CustomDrawer>

      <ConfirmationPopUp
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the "${selectedData?.title}" Appointment Type?`}
      />

      <CustomDrawer
        title={formConstants.ADD_APPT_TYPE}
        anchor="right"
        open={isCreateMode}
        onClose={() => {
          setIsCreateMode(false);
        }}
        drawerPadding="18px"
      >
        <AddEditApptTypes
          onClose={() => {
            setIsCreateMode(false);
          }}
          isEdit={false}
          ReftechData={refetchApptTypeData}
        />
      </CustomDrawer>
    </Box>
  );
};
export default AppointmentTypes;
