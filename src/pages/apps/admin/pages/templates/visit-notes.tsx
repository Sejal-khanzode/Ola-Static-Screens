import { Box } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { visitNotesHeader } from 'src/components/core/reusable/headers/all-headers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { VisitNoteTemplateService } from 'src/sdk/requests';
import { useEffect, useState } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { templateConstants } from 'src/constants/setting-constants';
import { formatDate } from 'src/constants/date-format';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import ViewVisitNoteDetails from './visit-notes/view-template';

// Global state for visit notes search and status
let globalRefetchVisitNotesFunction: (() => void) | null = null;
let globalVisitNotesSearchString: string = '';
let globalVisitNotesStatusType: string = 'All';

export const setGlobalVisitNotesSearchAndStatus = (searchString: string, statusType: string) => {
  globalVisitNotesSearchString = searchString;
  globalVisitNotesStatusType = statusType;
};

export const getGlobalVisitNotesSearchAndStatus = () => ({
  searchString: globalVisitNotesSearchString,
  statusType: globalVisitNotesStatusType,
});

export const setGlobalRefetchVisitNotesFunction = (refetchFn: () => void) => {
  globalRefetchVisitNotesFunction = refetchFn;
};

export const getGlobalRefetchVisitNotesFunction = () => globalRefetchVisitNotesFunction;

const VisitNotesSetting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState<boolean>(false);
  const [cloneTitle, setCloneTitle] = useState<string>('');
  const [cloneTitleError, setCloneTitleError] = useState<string>('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  // Get global search parameters
  const { searchString, statusType } = getGlobalVisitNotesSearchAndStatus();

  const { data: visitNotesTemplateData, refetch: visitNotesTemplateRefetch } = useQuery({
    queryKey: ['visitNotesTemplate', page, pageSize, searchString, statusType],
    queryFn: () => {
      const { searchString: currentSearchString, statusType: currentStatusType } =
        getGlobalVisitNotesSearchAndStatus();

      const getApiTemplateType = (statusType: string) => {
        switch (statusType) {
          case 'SOAP_NOTE':
            return 'SOAP_NOTE';
          case 'SIMPLE_NOTE':
            return 'SIMPLE_NOTE';
          case 'CONSULTATION_NOTE':
            return 'CONSULTATION_NOTE';
          default:
            return undefined;
        }
      };

      return VisitNoteTemplateService.getApiMasterVisitNoteTemplate({
        page: page,
        size: pageSize,
        templateName: currentSearchString,
        templateType:
          currentStatusType === 'All' ? undefined : getApiTemplateType(currentStatusType),
      });
    },
  });

  // Set global refetch function
  useEffect(() => {
    setGlobalRefetchVisitNotesFunction(visitNotesTemplateRefetch);
  }, [visitNotesTemplateRefetch]);

  const formatTemplateType = (templateType: string) => {
    if (templateType === 'SOAP_NOTE') {
      return 'SOAP Note';
    } else if (templateType === 'SIMPLE_NOTE') {
      return 'Simple Note';
    } else if (templateType === 'CONSULTATION_NOTE') {
      return 'Consultation Note';
    }
    return templateType;
  };

  const {
    mutate: deleteVisitNotesTemplate,
    isPending: isDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    error: errorDelete,
    data: dataDelete,
  } = useMutation({
    mutationFn: (uuid: string) =>
      VisitNoteTemplateService.deleteApiMasterVisitNoteTemplateByTemplateId({
        templateId: uuid,
      }),
  });

  const {
    mutateAsync: createCloneAsync,
    isPending: isCreatingClone,
    isSuccess: isSuccessCreateClone,
    isError: isErrorCreateClone,
    error: errorCreateClone,
    data: dataCreateClone,
  } = useMutation({
    mutationFn: VisitNoteTemplateService.postApiMasterVisitNoteTemplateByTemplateIdClone,
  });

  const handleEdit = (rowData: any) => {
    navigate(`/admin/templates/visit-notes/edit-visit-notes/${rowData.uuid}`, {
      state: { edit: true },
    });
  };

  const handleClone = async (rowData: any) => {
    setSelectedData(rowData);
    setCloneTitle(`${rowData.templateName} - Copy`);
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
        newTemplateName: cloneTitle.trim(),
      });
      setIsCloneDialogOpen(false);
      visitNotesTemplateRefetch();

      setCloneTitle('');
      setSelectedData(null);
    } catch (error) {
      console.error('Error cloning visit note template:', error);
    }
  };

  const handleCloneCancel = () => {
    setIsCloneDialogOpen(false);
    setCloneTitle('');
    setCloneTitleError('');
    setSelectedData(null);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    const newPageIndex = newPage - 1;
    setPage(newPageIndex);
  };

  const handleDelete = (rowData: any) => {
    setIsDeleteConfirmOpen(true);
    setSelectedData(rowData);
  };

  const handleConfirmDelete = async () => {
    if (selectedData?.uuid) {
      try {
        await deleteVisitNotesTemplate(selectedData.uuid);
        setIsDeleteConfirmOpen(false);
        setSelectedData(null);
        getGlobalRefetchVisitNotesFunction();
      } catch (error) {
        console.error('Error deleting macro:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedData(null);
  };

  const handleView = (rowData: any) => {
    setSelectedData(rowData);
    setIsViewDialogOpen(true);
  };

  useApiFeedback(
    isErrorDelete,
    errorDelete,
    isSuccessDelete,
    (dataDelete?.message || 'Deleted Successfully') as string
  );

  useApiFeedback(
    isErrorCreateClone,
    errorCreateClone,
    isSuccessCreateClone,
    (dataCreateClone?.message || templateConstants.CLONE_VISIT_NOTE_TEMPLATE_SUCCESS) as string
  );

  useEffect(() => {
    if (isDelete || isCreatingClone) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isDelete, isCreatingClone, dispatch]);

  useEffect(() => {
    setGlobalRefetchVisitNotesFunction(() => {
      visitNotesTemplateRefetch();
    });
  }, []);

  useEffect(() => {
    setGlobalRefetchVisitNotesFunction(() => {
      visitNotesTemplateRefetch();
    });
    return () => {
      setGlobalRefetchVisitNotesFunction(() => {});
    };
  }, [visitNotesTemplateRefetch]);

  useEffect(() => {
    if (isSuccessDelete) {
      visitNotesTemplateRefetch();
    }
  }, [isSuccessDelete, visitNotesTemplateRefetch]);

  const visitNotesTemplateDataContent = visitNotesTemplateData?.data?.content;

  const TableData = Array.isArray(visitNotesTemplateDataContent)
    ? visitNotesTemplateDataContent?.map((patient: any) => ({
        ...patient,
        templateType: formatTemplateType(patient?.templateType),
        updateAt: formatDate(patient?.updateAt),
        action: [
          { label: 'Edit', route: 'edit' },
          { label: 'Delete', route: 'delete' },
          { label: 'Clone', route: 'clone' },
        ],
      }))
    : [];

  return (
    <Box paddingTop={2}>
      <CustomisedTable
        headCells={visitNotesHeader}
        tableData={TableData}
        setHeight="69vh"
        removeRadius={false}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        showPagination
        totalCount={(visitNotesTemplateData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handlePageSizeChange}
        handleClone={handleClone}
        handleView={handleView}
      />

      <CustomDialog
        open={isCloneDialogOpen}
        onClose={handleCloneCancel}
        title={templateConstants.CLONE_VISIT_NOTE_TEMPLATE}
        buttonName={[]}
        width="400px"
      >
        <Box sx={{ p: 2 }}>
          <CustomLabel label={templateConstants.TEMPLATE_NAME} isRequired />
          <CustomInput
            value={cloneTitle}
            onChange={e => {
              setCloneTitle(e.target.value);
              setCloneTitleError('');
            }}
            placeholder={templateConstants.ENTER_TEMPLATE_NAME}
            hasError={!!cloneTitleError}
            errorMessage={cloneTitleError}
            bgWhite
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <CustomButton
              variant="outlined"
              onClick={handleCloneCancel}
              disabled={isCreatingClone}
              label="Cancel"
            />
            <CustomButton
              variant="filled"
              onClick={handleCloneConfirm}
              disabled={isCreatingClone}
              label={isCreatingClone ? 'Cloning...' : 'Clone'}
            />
          </Box>

          <ConfirmationPopUp
            open={isDeleteConfirmOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete the "${selectedData?.templateName}" Visit Note Template?`}
          />

          <CustomDrawer
            open={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
            title={selectedData?.templateName}
            anchor="right"
          >
            <ViewVisitNoteDetails uuid={selectedData?.uuid} />
          </CustomDrawer>
        </Box>
      </CustomDialog>
    </Box>
  );
};

export default VisitNotesSetting;
