import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import DocumentsTab from './documents/document-tab';
import { Box } from '@mui/material';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Upload } from '@mui/icons-material';
import { useState } from 'react';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import UploadDocuments from './documents/upload-documents';
import { documentsConstants } from 'src/constants/patients-constants';
import { PatientDocumentControllerService } from 'src/sdk/requests/services.gen';
import { useQuery } from '@tanstack/react-query';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

const DocumentsSubTabsOutlet = () => {
  const [openDocumentTypesDialog, setOpenDocumentTypesDialog] = useState(false);
  const patientClinicId = getDataFromLocalStorage('patientUUID');

  const { refetch: refetchDocumentTableData } = useQuery({
    queryKey: ['documentTableData'],
    queryFn: () =>
      PatientDocumentControllerService.getApiMasterPatientDocumentList({
        patientId: patientClinicId as string,
      }),
  });
  const DOCUMENTS_TABS_CONFIG = [
    {
      id: documentsConstants.DOCUMENTS,
      label: documentsConstants.DOCUMENTS,
      component: DocumentsTab,
      actions: (
        <Box display="flex" gap={2}>
          <CustomButton
            variant="filled"
            startIcon={<Upload />}
            onClick={() => {
              setOpenDocumentTypesDialog(true);
            }}
            label={documentsConstants.UPLOAD_DOCUMENTS}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <CommonTabsOutlet tabsConfig={DOCUMENTS_TABS_CONFIG} />
      {openDocumentTypesDialog && (
        <CustomDialog
          open={openDocumentTypesDialog}
          onClose={() => setOpenDocumentTypesDialog(false)}
          title={documentsConstants.UPLOAD_DOCUMENTS}
        >
          <UploadDocuments
            refetchDocumentData={() => refetchDocumentTableData()}
            onClose={() => setOpenDocumentTypesDialog(false)}
          />
        </CustomDialog>
      )}
    </>
  );
};

export default DocumentsSubTabsOutlet;
