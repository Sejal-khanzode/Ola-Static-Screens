import { Typography, Grid } from '@mui/material';
import { settingConstants } from '../../../../../../constants/admin-constants';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { documentTypesHeader } from 'src/components/core/reusable/headers/all-headers';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import AddEditDocumentType from './AddEditDocumentType';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DocumentTypeControllerService } from 'src/sdk/requests';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { AddIcon } from 'src/assets/icons/addIcon';
import { useDocumentTypeControllerServiceGetApiMasterDocumentType } from 'src/sdk/queries';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';

const DocumentTypes = () => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [isAddDocumentTypeOpen, setIsAddDocumentTypeOpen] = useState<boolean>(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const dispatch = useAppDispatch();

  const { 
    data: documentTypesData, 
    refetch: refetchDocumentTypes,
    isLoading 
  } = useDocumentTypeControllerServiceGetApiMasterDocumentType({
    page,
    size: pageSize,
  });

  const {
    mutateAsync: asyncDeleteDocumentType,
    isSuccess: isDeleteDocumentTypeSuccess,
    isError: isDeleteDocumentTypeError,
    data: deleteDocumentTypeData,
    error: deleteDocumentTypeError,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: DocumentTypeControllerService.deleteApiMasterDocumentTypeByDocumentTypeId,
  });

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    asyncDeleteDocumentType({ documentTypeId: selectedDocumentType.uuid });
    setIsDeleteConfirmOpen(false);
  };

  const handleAddDocumentType = () => {
    setSelectedDocumentType(null);
    setIsEditMode(false);
    setIsAddDocumentTypeOpen(true);
  };

  const handleEdit = (rowData: any) => {
    setSelectedDocumentType(rowData);
    setIsEditMode(true);
    setIsAddDocumentTypeOpen(true);
  };

  const handleCloseForm = () => {
    setIsAddDocumentTypeOpen(false);
    setSelectedDocumentType(null);
    setIsEditMode(false);
  };

  const handleDelete = (rowData: any) => {
    setSelectedDocumentType(rowData);
    setIsDeleteConfirmOpen(true);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  useEffect(() => {
    if (isDeleting || isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isDeleting, isLoading, dispatch]);

  useEffect(() => {
    if (isDeleteDocumentTypeSuccess) {
      refetchDocumentTypes();
    }
  }, [isDeleteDocumentTypeSuccess, refetchDocumentTypes]);

  useApiFeedback(
    isDeleteDocumentTypeError,
    deleteDocumentTypeError,
    isDeleteDocumentTypeSuccess,
    (deleteDocumentTypeData?.message || 'Document type deleted successfully') as string
  );

  const TableData = Array.isArray(documentTypesData?.data?.content)
    ? documentTypesData?.data?.content?.map((doc: any, index: number) => ({
        ...doc,
        srn: index + 1,
        name: doc.name,
        action: [
          { label: 'Edit', route: 'edit' },
          { label: 'Delete', route: 'delete' },
        ],
      }))
    : [];

  return (
    <Grid size={12} sx={{ px: 1 }} direction="column">
      <Grid mb={1.5}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="titleBold4" color="Primary.main">
              {settingConstants.DOCUMENT_TYPES}
            </Typography>
          </Grid>

          <CustomButton
            variant="filled"
            startIcon={<AddIcon />}
            label={settingConstants.ADD_DOCUMENT_TYPE}
            onClick={handleAddDocumentType}
          />
        </Grid>

        <Grid size={{xs:6}}>
          <CustomisedTable
            headCells={documentTypesHeader}
            tableData={TableData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setHeight="77vh"
            showPagination
            currentPage={page + 1}
            itemsPerPage={pageSize}
            onPageChange={newPage => setPage(newPage - 1)}
            onItemsPerPageChange={handlePageSizeChange}
            totalCount={(documentTypesData?.data?.page as any)?.totalElements || 0}
          />
        </Grid>
      </Grid>

      <ConfirmationPopUp
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the "${selectedDocumentType?.name}" Document Type?`}
      />

      {isAddDocumentTypeOpen && (
        <CustomDialog
          open={isAddDocumentTypeOpen}
          onClose={handleCloseForm}
          title={isEditMode ? settingConstants.EDIT_DOCUMENT_TYPE : settingConstants.ADD_DOCUMENT_TYPE}
          width="500px"
        >
          <AddEditDocumentType
            onClose={handleCloseForm}
            isEdit={isEditMode}
     
          selectedData={selectedDocumentType}
          RefetchData={refetchDocumentTypes}
        />
        </CustomDialog>
      )}
    </Grid>
  );
};

export default DocumentTypes;
