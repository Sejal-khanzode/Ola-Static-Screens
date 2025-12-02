import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { documentTableHeader } from 'src/components/core/reusable/headers/all-headers';
import { PatientDocumentControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatIsoDateToMMDDYYYY } from 'src/constants/date-format';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import UploadDocuments from './upload-documents';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { documentsConstants, formsConstants } from 'src/constants/patients-constants';
import { APIFeedbackMessages } from 'src/constants/formConst';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import ViewDocuments from './view-documents';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';

const DocumentTab = () => {
  const dispatch = useAppDispatch();
  const [, setViewDocument] = useState(false);
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const [openDocumentTypesDialog, setOpenDocumentTypesDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: documentData,
    refetch: refetchDocumentData,
    isPending: isDocumentDataPending,
  } = useQuery({
    queryKey: ['documentTableData'],
    queryFn: () =>
      PatientDocumentControllerService.getApiMasterPatientDocumentList({
        patientId: patientUUID as string,
      }),
  });

  const {
    mutate: archiveDocument,
    data: archiveDocumentData,
    isSuccess: isArchiveDocumentSuccess,
    isError: isArchiveDocumentError,
    error: archiveDocumentError,
    isPending: isArchiveDocumentPending,
  } = useMutation({
    mutationFn: ({ documentId, status }: { documentId: any; status: boolean }) =>
      PatientDocumentControllerService.putApiMasterPatientDocumentByPatientDocumentIdArchiveStatusByStatus(
        {
          patientDocumentId: documentId,
          status: status,
        }
      ),
  });

  const documentTableData = documentData?.data?.content;
  const documentArchived = archiveDocumentData?.data?.archive;

  const handleView = (document: any) => {
    setSelectedDocument(document);
    setDrawerOpen(true);
    setViewDocument(true);
  };

  const handleConfirm = async () => {
    if (!selectedDocument) return;

    try {
      const docId = selectedDocument?.uuid;
      const isCurrentlyArchived = selectedDocument?.archive;

      archiveDocument({
        documentId: docId,
        status: !isCurrentlyArchived,
      });

      refetchDocumentData();
    } catch (error) {
      console.error('Error archiving allergy:', error);
    }
  };

  const handleArchive = async (rowData: any) => {
    setConfirmationPopup(true);
    setSelectedDocument(rowData);
  };

  const handleClose = () => {
    setIsEdit(false);
    setConfirmationPopup(false);
    setSelectedDocument(null);
    setOpenDocumentTypesDialog(false);
  };

  const handleEdit = (document: any) => {
    setSelectedDocument(document);
    setIsEdit(true);
    setOpenDocumentTypesDialog(true);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  useEffect(() => {
    if (isDocumentDataPending || isArchiveDocumentPending) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isDocumentDataPending]);

  useApiFeedback(
    isArchiveDocumentError,
    archiveDocumentError,
    isArchiveDocumentSuccess,
    (archiveDocumentData?.message ||
      (documentArchived
        ? APIFeedbackMessages.DOCUMENT_RESTORED_SUCCESSFULLY
        : APIFeedbackMessages.DOCUMENT_ARCHIVED_SUCCESSFULLY)) as string
  );

  useEffect(() => {
    if (isArchiveDocumentSuccess) {
      refetchDocumentData();
      setConfirmationPopup(false);
      setSelectedDocument(null);
    }
  }, [isArchiveDocumentSuccess]);

  const tableData = Array.isArray(documentTableData)
    ? documentTableData.map((document: any) => ({
        ...document,
        documentName: document?.name,
        documentType: document?.documentType?.name,
        date: formatIsoDateToMMDDYYYY(document?.documentDate),
        uploadedBy: document?.uploadedBy,
        action: document?.archive
          ? [{ label: formsConstants.RESTORE, route: 'restore' }]
          : [
              { label: formsConstants.EDIT, route: 'edit' },
              { label: formsConstants.ARCHIVE, route: 'archive' },
            ],
      }))
    : [];

  return (
    <Box>
      <CustomisedTable
        headCells={documentTableHeader}
        tableData={tableData}
        handleView={handleView}
        handleArchive={handleArchive}
        handleEdit={handleEdit}
        showPagination
        totalCount={(documentData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={newPage => setPage(newPage - 1)}
        onItemsPerPageChange={handlePageSizeChange}
        hideBgColorPagination
      />

      {openDocumentTypesDialog == true && (
        <CustomDialog
          open={openDocumentTypesDialog}
          onClose={handleClose}
          title={documentsConstants.EDIT_DOCUMENT}
        >
          <UploadDocuments
            refetchDocumentData={() => refetchDocumentData()}
            isEdit={isEdit}
            selectedData={selectedDocument}
            onClose={() => setOpenDocumentTypesDialog(false)}
          />
        </CustomDialog>
      )}

      <CustomDrawer
        title={documentsConstants.VIEW_DOCUMENT}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="right"
      >
        <ViewDocuments selectedDocument={selectedDocument} />
      </CustomDrawer>

      <ConfirmationPopUp
        open={openConfirmationPopup}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={`Do you really want to change the ${selectedDocument?.name} status to ${selectedDocument?.archive ? 'Restore' : 'Archive'}  ?`}
      />
    </Box>
  );
};

export default DocumentTab;
