import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CustomisedTable from '../../custom-table/custom-table';
import { icdCodeHeader } from '../../headers/all-headers';
import { useMedicalCodeControllerServiceGetApiMasterMedicalCodes } from '../../../../../sdk/queries/queries';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { settingConstants } from 'src/constants/admin-constants';
import { MedicalCode, MedicalCodeControllerService, PutApiMasterMedicalCodesByMedicalCodeIdStatusByStatusData } from 'src/sdk/requests';
import ConfirmationPopUp from '../../confirmation-pop-up/confirmation-pop-up';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';

let globalRefetchICDFunction: (() => void) | null = null;
let globalICDSearchString: string = '';
let globalICDStatusType: 'All' | 'Active' | 'Inactive' | 'Archived' = 'All';

export const setglobalRefetchICDFunction = (refetchFn: () => void) => {
  globalRefetchICDFunction = refetchFn;
};

export const getglobalRefetchICDFunction = () => globalRefetchICDFunction;

export const setGlobalICDSearchAndStatus = (
  search: string,
  status: 'All' | 'Active' | 'Inactive' | 'Archived'
) => {
  globalICDSearchString = search;
  globalICDStatusType = status;
};

export const getGlobalICDSearchAndStatus = () => ({
  searchString: globalICDSearchString,
  statusType: globalICDStatusType,
});

const ICDCodeSetting = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [openICD, setOpenICD] = useState(false);
  const [selectedICDRow, setSelectedICDRow] = useState<{
    medicalCodeId: string;
    active: boolean;
  } | null>(null);

  // Get global search and status values
  const { searchString: globalSearch, statusType: globalStatus } = getGlobalICDSearchAndStatus();

  // Handle different status types
  let active = undefined;
  let archive = undefined;

  if (globalStatus === 'Active') {
    active = true;
    archive = false;
  } else if (globalStatus === 'Inactive') {
    active = false;
    archive = false;
  } else if (globalStatus === 'Archived') {
    active = undefined;
    archive = true;
  }

  const {
    data: medicalCodesData,
    isLoading,
    refetch: refetchMedicalCodes,
  } = useMedicalCodeControllerServiceGetApiMasterMedicalCodes({
    type: 'ICD',
    page,
    size: pageSize,
    searchString: globalSearch,
    active,
    archive,
  });

  const {
    mutateAsync: changeStatusAsync,
    isSuccess: isSuccessChangeStatus,
    isError: isErrorChangeStatus,
    error: errorChangeStatus,
    data: dataChangeStatus,
    isPending,
  } = useMutation({
    mutationFn: MedicalCodeControllerService.putApiMasterMedicalCodesByMedicalCodeIdStatusByStatus,
  });

  const medicalCodeData = medicalCodesData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: MedicalCode) => ({
        ...medical,
        code: medical?.code,
        description: medical?.description,
        status: medical?.active ?? false,
        uuid: medical?.uuid,
      }))
    : [];

  const handlePageChange = (value: number) => {
    const newPage = value - 1;
    setPage(newPage);
    
    // Call API with the new page value directly
    const { searchString: globalSearch, statusType: globalStatus } = getGlobalICDSearchAndStatus();
    
    let active = undefined;
    let archive = undefined;
    
    if (globalStatus === 'Active') {
      active = true;
      archive = false;
    } else if (globalStatus === 'Inactive') {
      active = false;
      archive = false;
    } else if (globalStatus === 'Archived') {
      active = undefined;
      archive = true;
    }
    
    MedicalCodeControllerService.getApiMasterMedicalCodes({
      type: 'ICD',
      page: newPage,
      size: pageSize,
      searchString: globalSearch,
      active,
      archive,
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    
    const { searchString: globalSearch, statusType: globalStatus } = getGlobalICDSearchAndStatus();
    
    let active = undefined;
    let archive = undefined;
    
    if (globalStatus === 'Active') {
      active = true;
      archive = false;
    } else if (globalStatus === 'Inactive') {
      active = false;
      archive = false;
    } else if (globalStatus === 'Archived') {
      active = undefined;
      archive = true;
    }
    
    MedicalCodeControllerService.getApiMasterMedicalCodes({
      type: 'ICD',
      page: 0,
      size: newPageSize,
      searchString: globalSearch,
      active,
      archive,
    });
  };

  const handleUpdateStatus = async (rowData: MedicalCode) => {
    setSelectedICDRow({ medicalCodeId: rowData?.uuid || '', active: rowData.active ?? false });
    setOpenICD(true);
  };

  const handleToggle = async (status: boolean, medicalCodeId: string) => {
    const newStatus = status;
    const newMedicalCodeID = medicalCodeId;
    const payload: PutApiMasterMedicalCodesByMedicalCodeIdStatusByStatusData = {
      status: !newStatus,
      medicalCodeId: newMedicalCodeID,
    };

    await changeStatusAsync(payload);
    refetchMedicalCodes();
  };

  const handleClose = () => {
    setOpenICD(false);
  };

  useEffect(() => {
    if (isLoading || isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isPending, dispatch]);

  useEffect(() => {
    setglobalRefetchICDFunction(refetchMedicalCodes);
    return () => {
      setglobalRefetchICDFunction(() => {});
    };
  }, [refetchMedicalCodes]);

  useApiFeedback(
    isErrorChangeStatus,
    errorChangeStatus,
    isSuccessChangeStatus,
    (dataChangeStatus?.message || 'Status changed successfully') as string
  );

  return (
    <Box paddingTop={1}>
      <Grid container mt={1} gap={1} display={'flex'} flexDirection={'column'}>
        <Grid>
          <CustomisedTable
            headCells={icdCodeHeader}
            tableData={tableData}
            setHeight="70vh"
            removeRadius={false}
            showPagination
            totalCount={(medicalCodesData?.data?.page as any)?.totalElements || 0}
            currentPage={page + 1}
            itemsPerPage={pageSize}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handlePageSizeChange}
            handleUpdateStatus={handleUpdateStatus}
          />
        </Grid>
      </Grid>
      <ConfirmationPopUp
        open={openICD}
        onClose={handleClose}
        onConfirm={() => {
          if (selectedICDRow) {
            handleToggle(selectedICDRow.active, selectedICDRow.medicalCodeId);
            handleClose();
          }
        }}
        message={settingConstants.CONFIRM_POP}
      />
    </Box>
  );
};

export default ICDCodeSetting;
