import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { rosAndPEHeader } from 'src/components/core/reusable/headers/all-headers';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { ClinicalTemplateService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import {
  useClinicalTemplateServiceDeleteApiMasterClinicalTemplateByTemplateId,
  useClinicalTemplateServiceGetApiMasterClinicalTemplate,
} from 'src/sdk/queries';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { templateConstants } from 'src/constants/setting-constants';
import { formatDate } from 'src/constants/date-format';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import ViewRosAndPEDetails from './view-ros-pe';

// Global state for PE search
let globalRefetchPEFunction: (() => void) | null = null;
let globalPESearchString: string = '';

export const setGlobalPESearchString = (searchString: string) => {
  globalPESearchString = searchString;
};

export const getGlobalPESearchString = () => globalPESearchString;

export const setGlobalRefetchPEFunction = (refetchFn: () => void) => {
  globalRefetchPEFunction = refetchFn;
};

export const getGlobalRefetchPEFunction = () => globalRefetchPEFunction;

const PhysicalExamSetting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState<boolean>(false);
  const [cloneTitle, setCloneTitle] = useState<string>('');
  const [cloneTitleError, setCloneTitleError] = useState<string>('');
  const [isViewMode, setIsViewMode] = useState(false);

  // Get global search string
  const searchString = getGlobalPESearchString();

  const {
    data: apiData,
    isLoading,
    refetch: refetchPEData,
  } = useClinicalTemplateServiceGetApiMasterClinicalTemplate({
    page,
    size: pageSize,
    templateType: 'PE',
    title: searchString,
  });

  const {
    mutateAsync: deleteAsync,
    isPending: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deleteData,
  } = useClinicalTemplateServiceDeleteApiMasterClinicalTemplateByTemplateId();

  const { mutateAsync: getPEByTemplateIdAsync, isPending } = useMutation({
    mutationFn: (templateId: string) =>
      ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId }),
  });

  const {
    mutateAsync: createCloneAsync,
    isPending: isCreatingClone,
    isSuccess: isSuccessCreateClone,
    isError: isErrorCreateClone,
    error: errorCreateClone,
    data: dataCreateClone,
  } = useMutation({
    mutationFn: ClinicalTemplateService.postApiMasterClinicalTemplateByTemplateIdClone,
  });

  const medicalCodeData = apiData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: any) => ({
        ...medical,
        title: medical?.title,
        uuid: medical?.uuid,
        updateDate: formatDate(medical?.updateDate),
        action: medical.archive
          ? [{ label: 'Restore', route: 'restore' }]
          : [
              { label: 'Edit', route: 'edit' },
              { label: 'Delete', route: 'delete' },
              { label: 'Clone', route: 'clone' },
            ],
      }))
    : [];

  const handlePageChange = (value: number) => {
    const newPage = value - 1;
    setPage(newPage);

    ClinicalTemplateService.getApiMasterClinicalTemplate({
      page: newPage,
      size: pageSize,
      templateType: 'PE',
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);

    ClinicalTemplateService.getApiMasterClinicalTemplate({
      page: 0,
      size: newPageSize,
      templateType: 'PE',
    });
  };

  const handleEdit = async (rowData: any) => {
    try {
      if (rowData?.uuid) {
        const rosData = await getPEByTemplateIdAsync(rowData.uuid);
        navigate('/admin/templates/edit-physical-exam', {
          state: {
            isEdit: true,
            type: 'pe',
            uuid: rowData.uuid,
            rosData: rosData?.data || [],
          },
        });
      } else {
        console.error('Template UUID not found');
      }
    } catch (error) {
      console.error(templateConstants.ERROR_FETCHING_PE_DATA, error);
    }
  };

  const handleView = (rowData: any) => {
    setIsViewMode(true);
    setSelectedData(rowData);
  };

  const handleDelete = (rowData: any) => {
    setSelectedData(rowData);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedData?.uuid) {
      try {
        await deleteAsync({ templateId: selectedData.uuid });
        setIsDeleteConfirmOpen(false);
        setSelectedData(null);
        refetchPEData();
      } catch (error) {
        console.error(templateConstants.ERROR_DELETING_PE, error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedData(null);
  };

  const handleClone = async (rowData: any) => {
    setSelectedData(rowData);
    setCloneTitle(`${rowData.title} - Copy`);
    setCloneTitleError('');
    setIsCloneDialogOpen(true);
  };

  const handleCloneConfirm = async () => {
    if (!cloneTitle || cloneTitle.trim() === '') {
      setCloneTitleError(templateConstants.TITLE_IS_REQUIRED);
      return;
    }

    try {
      await createCloneAsync({
        templateId: selectedData.uuid,
        newTitle: cloneTitle.trim(),
      });
      setIsCloneDialogOpen(false);
      refetchPEData();

      setCloneTitle('');
      setSelectedData(null);
    } catch (error) {
      console.error(templateConstants.ERROR_CLONING_PE, error);
    }
  };

  const handleCloneCancel = () => {
    setIsCloneDialogOpen(false);
    setCloneTitle('');
    setCloneTitleError('');
    setSelectedData(null);
  };

  useEffect(() => {
    if (isLoading || isDeleting || isCreatingClone || isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isDeleting, isCreatingClone, isPending, dispatch]);

  useApiFeedback(
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    (deleteData?.message || templateConstants.PE_deleted_successfully) as string
  );

  useApiFeedback(
    isErrorCreateClone,
    errorCreateClone,
    isSuccessCreateClone,
    (dataCreateClone?.message || templateConstants.PE_cloned_successfully) as string
  );

  useEffect(() => {
    setGlobalRefetchPEFunction(refetchPEData);
  }, [refetchPEData]);

  return (
    <Box paddingTop={2}>
      <CustomisedTable
        headCells={rosAndPEHeader}
        tableData={tableData}
        setHeight="70vh"
        removeRadius={false}
        showPagination
        totalCount={(apiData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handlePageSizeChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleClone={handleClone}
        handleView={handleView}
      />

      <ConfirmationPopUp
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the PE "${selectedData?.title}"?`}
      />

      <CustomDialog
        open={isCloneDialogOpen}
        onClose={handleCloneCancel}
        title={templateConstants.CLONE_PE_TEMPLATE}
        width="400px"
        buttonName={[]}
      >
        <Box sx={{ p: 1 }}>
          <CustomLabel label={templateConstants.TITLE} isRequired />
          <CustomInput
            value={cloneTitle}
            onChange={e => {
              setCloneTitle(e.target.value);
              if (cloneTitleError) {
                setCloneTitleError('');
              }
            }}
            hasError={!!cloneTitleError}
            errorMessage={cloneTitleError}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <CustomButton
              variant="outlined"
              label={templateConstants.CANCEL}
              onClick={handleCloneCancel}
              disabled={isCreatingClone}
            />
            <CustomButton
              label={isCreatingClone ? templateConstants.CLONING : templateConstants.CLONE}
              variant="filled"
              onClick={handleCloneConfirm}
              disabled={isCreatingClone}
            ></CustomButton>
          </Box>
        </Box>
      </CustomDialog>

      <CustomDrawer
        title="View Physical Exam"
        anchor="right"
        open={isViewMode}
        onClose={() => {
          setIsViewMode(false);
        }}
        drawerWidth="40vw"
        drawerPadding="18px"
      >
        {selectedData && <ViewRosAndPEDetails uuid={selectedData?.uuid} />}
      </CustomDrawer>
    </Box>
  );
};

export default PhysicalExamSetting;
