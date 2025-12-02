import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CustomisedTable from '../../custom-table/custom-table';
import { cptHeader } from '../../headers/all-headers';
import { useMedicalCodeControllerServiceGetApiMasterMedicalCodes } from 'src/sdk/queries';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { settingConstants } from 'src/constants/admin-constants';
import { useMutation } from '@tanstack/react-query';
import { MedicalCode, MedicalCodeControllerService, PutApiMasterMedicalCodesByMedicalCodeIdStatusByStatusData } from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import ConfirmationPopUp from '../../confirmation-pop-up/confirmation-pop-up';

let globalRefetchCPTFunction: (() => void) | null = null;
let globalCPTSearchString: string = '';
let globalCPTStatusType: 'All' | 'Active' | 'Inactive' | 'Archived' = 'All';
let globalCPTCodeType: 'CPT' | 'CUSTOM' = 'CPT';

export const setglobalRefetchCPTFunction = (refetchFn: () => void) => {
  globalRefetchCPTFunction = refetchFn;
};

export const getglobalRefetchCPTFunction = () => globalRefetchCPTFunction;

export const setGlobalCPTSearchAndStatus = (
  search: string,
  status: 'All' | 'Active' | 'Inactive' | 'Archived',
  type: 'CPT' | 'CUSTOM'
) => {
  globalCPTSearchString = search;
  globalCPTStatusType = status;
  globalCPTCodeType = type;
};

export const getGlobalCPTSearchAndStatus = () => ({
  searchString: globalCPTSearchString,
  statusType: globalCPTStatusType,
  codeType: globalCPTCodeType,
});

const CPTCodeSetting = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [openICD, setOpenICD] = useState(false);
  const [selectedICDRow, setSelectedICDRow] = useState<{
    medicalCodeId: string;
    active: boolean;
  } | null>(null);

  // Get global search and status values
  const {
    searchString: globalSearch,
    statusType: globalStatus,
    codeType: globalType,
  } = getGlobalCPTSearchAndStatus();

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
    type: globalType,
    page,
    size: pageSize,
    searchString: globalSearch,
    active,
    archive,
  });
  const medicalCodeData = medicalCodesData?.data?.content || [];

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
    
    const {
      searchString: globalSearch,
      statusType: globalStatus,
      codeType: globalType,
    } = getGlobalCPTSearchAndStatus();
    
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
      type: globalType,
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
    
    // Call API with the new page size and reset to page 0
    const {
      searchString: globalSearch,
      statusType: globalStatus,
      codeType: globalType,
    } = getGlobalCPTSearchAndStatus();
    
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
      type: globalType,
      page: 0, // Always go to page 0 when changing page size
      size: newPageSize, // Use the new page size directly
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
    setglobalRefetchCPTFunction(refetchMedicalCodes);
    return () => {
      setglobalRefetchCPTFunction(() => {});
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
        <CustomisedTable
          headCells={cptHeader}
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

export default CPTCodeSetting;
