import { Grid, Typography, Box } from '@mui/material';
import { formatIsoDateToMMDDYYYY } from 'src/constants/date-format';
import { documentsConstants } from 'src/constants/patients-constants';

interface ViewDocumentsProps {
  selectedDocument: any;
}

const ViewDocuments = (props: ViewDocumentsProps) => {
  const { selectedDocument } = props;

  if (!selectedDocument) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {documentsConstants.NO_DOCUMENT_SELECTED}
        </Typography>
      </Box>
    );
  }

  const documentInfoFields = [
    {
      label: documentsConstants.DOCUMENT_NAME,
      value: selectedDocument?.documentName || selectedDocument?.name,
    },
    {
      label: documentsConstants.DOCUMENT_TYPE,
      value: selectedDocument?.documentType?.name || selectedDocument?.documentType,
    },
    {
      label: documentsConstants.DOCUMENT_FORMAT,
      value: selectedDocument?.documentFormat?.replace('_', ' '),
    },
    {
      label: documentsConstants.DOCUMENT_DATE,
      value: formatIsoDateToMMDDYYYY(selectedDocument?.documentDate),
    },
    { label: documentsConstants.UPLOADED_BY, value: selectedDocument?.uploadedBy },
    {
      label: documentsConstants.UPLOADED_AT,
      value: formatIsoDateToMMDDYYYY(selectedDocument?.uploadedAt),
    },
  ];

  const isPDF =
    selectedDocument?.documentFormat?.toLowerCase().includes('pdf') ||
    selectedDocument?.document?.toLowerCase().endsWith('.pdf') ||
    selectedDocument?.document?.includes('application/pdf');

  return (
    <Grid container sx={{ p: 1, gap: 2 }}>
      <Grid size={{ xs: 12 }}>
        <Grid size={12}>
          <Typography variant="bodyBold3" color="Primary.main">
            {documentsConstants.DOCUMENT_INFORMATION}
          </Typography>
        </Grid>
        <Grid container spacing={1.5} mt={1.5}>
          {documentInfoFields.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container alignItems="center">
                <Grid size={{ xs: 5 }}>
                  <Typography variant="bodyBold4" color="Neutral.60">
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 7 }}>
                  <Typography variant="titleMedium4">{field.value || '-'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {selectedDocument?.documentDescription && (
        <Grid size={{ xs: 12 }}>
          <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
            {documentsConstants.DESCRIPTION}
          </Typography>
          <Box>
            <Typography variant="bodyMedium4">{selectedDocument.documentDescription}</Typography>
          </Box>
        </Grid>
      )}

      <Grid sx={{ mt: 2 }}>
        <Grid size={12}>
          <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
            {documentsConstants.DOCUMENT_PREVIEW}
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
          {isPDF ? (
            <iframe
              src={`${selectedDocument.document}#toolbar=0&navpanes=0&scrollbar=0`}
              title={selectedDocument?.documentName}
              style={{
                width: '100vw',
                height: '70vh',
                border: '1px solid #e0e0e0',
                borderRadius: 4,
              }}
            />
          ) : (
            <img
              src={selectedDocument.document}
              alt={selectedDocument?.documentName}
              style={{
                maxWidth: '100%',
                height: '500px',
                borderRadius: '4px',
                objectFit: 'contain',
              }}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewDocuments;
