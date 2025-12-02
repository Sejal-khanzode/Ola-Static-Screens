import { Grid, Box } from '@mui/material';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DocumentTypeControllerService,
  PatientDocumentControllerService,
  PostApiMasterPatientDocumentUploadData,
  PutApiMasterPatientDocumentData,
} from 'src/sdk/requests';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useState, useCallback, useEffect } from 'react';
import { formatDateToISO } from 'src/constants/date-format';
import { documentsConstants, formsConstants } from 'src/constants/patients-constants';
import { uploadDocumentSchema } from 'src/schema/template-schema/template-schema';
import { useAppDispatch } from 'src/redux/hooks';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import FileUpload, {
  FileMetaData,
} from 'src/components/core/reusable/multiple-files-upload/file-upload';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages } from 'src/constants/formConst';

type DocumentFormat = 'PDF' | 'JPEG_IMAGE' | 'PNG_IMAGE' | undefined;

interface DocumentUploadProps {
  isEdit?: boolean;
  selectedData?: any;
  refetchDocumentData: () => void;
  onClose: () => void;
  setOpenDocumentTypesDialog?: boolean;
}

interface DocumentType {
  uuid: string;
  name: string;
  clinicUuid: string | null;
  active: boolean;
  archive: boolean;
}

interface DocumentFormData {
  documentTypeId: string;
  documentDate: string;
  name: string;
  file: FileMetaData | null | undefined;
}

interface FormData {
  file: File | null;
}

interface DataType {
  patientDocumentId: string;
  name: string;
  documentDate: string;
  documentTypeId: string;
  documentFormat: DocumentFormat;
  documentDescription: string;
  patientClinicId: string;
  formData: FormData;
}

const getDocumentFormatFromFile = (file: File): 'PDF' | 'JPEG_IMAGE' | 'PNG_IMAGE' | 'OTHER' => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase() as any;

  const formatMap: { [key: string]: 'PDF' | 'JPEG_IMAGE' | 'PNG_IMAGE' | 'OTHER' } = {
    'application/pdf': 'PDF',
    'image/jpeg': 'JPEG_IMAGE',
    'image/png': 'PNG_IMAGE',
  };

  if (formatMap[fileType]) {
    return formatMap[fileType];
  }

  if (fileName.endsWith('.pdf')) return 'PDF';
  if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return 'JPEG_IMAGE';
  if (fileName.endsWith('.png')) return 'PNG_IMAGE';

  return 'OTHER';
};

const DocumentUpload = (props: DocumentUploadProps) => {
  const { isEdit, selectedData, refetchDocumentData, onClose } = props;
  const patientClinicId = getDataFromLocalStorage('patientUUID') as string;
  const [, setUploadedFile] = useState<FileMetaData | null>(null);
  const dispatch = useAppDispatch();

  const { data: getUploadedDoc, isPending: isLoadingUploadedDoc } = useQuery({
    queryKey: ['getUploadedDoc', selectedData?.uuid],
    queryFn: () =>
      PatientDocumentControllerService.getApiMasterPatientDocumentByPatientDocumentId({
        patientDocumentId: selectedData?.uuid,
      }),
    enabled: !!isEdit && !!selectedData?.uuid,
  });

  const uploadedDoc = getUploadedDoc?.data;

  const { data: documentTypes, isPending: isPendingDocumentData } = useQuery({
    queryKey: ['documentTypes'],
    queryFn: () => DocumentTypeControllerService.getApiMasterDocumentType({}),
  });

  const docTypes: DocumentType[] = Array.isArray(documentTypes?.data?.content)
    ? documentTypes.data.content
    : [];

  const {
    mutate: uploadDocument,
    isSuccess: isUploadDocumentSuccess,
    isError: isUploadDocumentError,
    error: uploadDocumentError,
    data: uploadDocumentData,
    isPending: isUploadDocumentPending,
  } = useMutation({
    mutationFn: async (data: PostApiMasterPatientDocumentUploadData) => {
      return PatientDocumentControllerService.postApiMasterPatientDocumentUpload(
        data as PostApiMasterPatientDocumentUploadData
      );
    },
  });

  const {
    mutate: updateDocument,
    isSuccess: isUpdateDocumentSuccess,
    isPending: isUpdateDocumentPending,
    isError: isUpdateDocumentError,
    error: errorDocument,
    data: updateDocumentData,
  } = useMutation({
    mutationFn: async (data: PutApiMasterPatientDocumentData) => {
      return PatientDocumentControllerService.putApiMasterPatientDocument(
        data as PutApiMasterPatientDocumentData
      );
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm<DocumentFormData>({
    resolver: yupResolver(uploadDocumentSchema) as any,
    context: { isEdit },
    mode: 'onSubmit',
    defaultValues: {
      documentTypeId: '',
      documentDate: '',
      name: '',
      file: null,
    },
  });

  const handleFileUpload = useCallback(
    (fileMetaData: FileMetaData | null) => {
      setUploadedFile(fileMetaData);
      setValue('file', fileMetaData);
    },
    [setValue]
  );

  const handleFileDelete = useCallback(() => {
    setValue('file', null);
    setUploadedFile(null);
    resetField('file', { defaultValue: null });
  }, [setValue, resetField]);

  const getExistingFileMetaData = useCallback((): FileMetaData | null => {
    if (!isEdit || !uploadedDoc) return null;

    const documentUrl = uploadedDoc.document;
    const documentFormat = uploadedDoc.documentFormat;
    let fileType = '';

    let fileName = 'document';
    if (typeof uploadedDoc.name === 'string') {
      fileName = uploadedDoc.name;
    } else if (uploadedDoc.name && typeof uploadedDoc.name === 'object') {
      fileName = uploadedDoc.name.toString() || 'document';
    }

    if (documentFormat === 'PDF') {
      fileType = 'application/pdf';
      if (typeof fileName === 'string' && !fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }
    } else if (documentFormat === 'JPEG_IMAGE') {
      fileType = 'image/jpeg';
      if (
        typeof fileName === 'string' &&
        !fileName.endsWith('.jpg') &&
        !fileName.endsWith('.jpeg')
      ) {
        fileName += '.jpg';
      }
    } else if (documentFormat === 'PNG_IMAGE') {
      fileType = 'image/png';
      if (typeof fileName === 'string' && !fileName.endsWith('.png')) {
        fileName += '.png';
      }
    }

    const finalFileName = typeof fileName === 'string' ? fileName : 'document';

    const file = new File([], finalFileName, {
      type: fileType,
      lastModified: new Date().getTime(),
    });

    Object.defineProperty(file, 'size', {
      value: 0,
      writable: false,
    });

    return {
      name: finalFileName,
      type: fileType,
      preview: documentUrl as string,
      file: file,
      url: documentUrl as string,
    };
  }, [isEdit, uploadedDoc]);

  const metaData = getExistingFileMetaData;

  const onSubmit = async (data: DocumentFormData) => {
    const documentFormatUpload = data.file ? getDocumentFormatFromFile(data.file.file) : 'OTHER';
    const documentFormatUpdate = data.file
      ? getDocumentFormatFromFile(data.file.file)
      : uploadedDoc?.documentFormat;

    const uploadData = {
      patientClinicId,
      name: data.name,
      documentTypeId: data.documentTypeId,
      documentDate: formatDateToISO(data.documentDate) as string,
      assigned: false,
      documentFormat: documentFormatUpload,
      documentDescription: uploadedDoc?.documentDescription as string,
      formData: {
        file: data.file ? data.file.file : null,
      },
    };

    let updatedFile: File | null = null;
    if (isEdit) {
      if (data.file?.file && data.file.file.size > 0) {
        updatedFile = data.file.file;
      } else {
        updatedFile = null;
      }
    }

    const updateData: DataType = {
      patientDocumentId: selectedData?.uuid,
      name: data.name,
      documentDate: formatDateToISO(data.documentDate) as string,
      documentTypeId: data.documentTypeId,
      documentFormat: documentFormatUpdate as DocumentFormat,
      documentDescription: uploadedDoc?.documentDescription as string,
      patientClinicId,
      formData: {
        file: isEdit ? updatedFile : data.file?.file || null,
      },
    };

    try {
      if (isEdit) {
        updateDocument(updateData as PutApiMasterPatientDocumentData);
      } else {
        uploadDocument(uploadData as PostApiMasterPatientDocumentUploadData);
      }
    } catch (error) {
      console.error('Error submitting document:', error);
    }
  };

  useEffect(() => {
    return () => {
      reset({
        documentTypeId: '',
        documentDate: '',
        name: '',
        file: null,
      });
      setUploadedFile(null);
    };
  }, [reset]);

  useEffect(() => {
    if (isEdit && uploadedDoc) {
      let documentTypeId = '';

      if (uploadedDoc.documentTypeId) {
        documentTypeId = uploadedDoc.documentTypeId as any;
      } else if (uploadedDoc.documentType && (uploadedDoc.documentType as DocumentType)?.uuid) {
        documentTypeId = (uploadedDoc.documentType as DocumentType).uuid;
      } else {
        console.warn('Could not determine documentTypeId from uploadedDoc:', uploadedDoc);
      }

      setValue('documentTypeId', documentTypeId);
      setValue('documentDate', (uploadedDoc.documentDate as string) || '');
      setValue('name', (uploadedDoc.name as string) || '');
      setValue('file', (uploadedDoc.file as FileMetaData) || null);

      if (uploadedDoc.file) {
        setUploadedFile(uploadedDoc.file as FileMetaData);
      }
    } else if (!isEdit) {
      reset({
        documentTypeId: '',
        documentDate: '',
        name: '',
        file: null,
      });
      setUploadedFile(null);
    }
  }, [isEdit, uploadedDoc, setValue, reset]);

  useEffect(() => {
    if (isUploadDocumentSuccess || isUpdateDocumentSuccess) {
      reset();
      setUploadedFile(null);
    }
  }, [isUploadDocumentSuccess, isUpdateDocumentSuccess, reset]);

  useEffect(() => {
    if (isPendingDocumentData) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPendingDocumentData]);

  useEffect(() => {
    if (isLoadingUploadedDoc) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingUploadedDoc]);

  useEffect(() => {
    if (isUploadDocumentPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUploadDocumentPending]);

  useEffect(() => {
    if (isUpdateDocumentPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUpdateDocumentPending]);

  useEffect(() => {
    if (isUpdateDocumentSuccess || isUploadDocumentSuccess) {
      refetchDocumentData();
      reset();
      onClose();
    }
  }, [isUpdateDocumentSuccess, isUploadDocumentSuccess, refetchDocumentData, reset, onClose]);

  useApiFeedback(
    isUpdateDocumentError,
    errorDocument,
    isUpdateDocumentSuccess,
    (updateDocumentData?.message || APIFeedbackMessages.DOCUMENT_UPDATED_SUCCESSFULLY) as string
  );

  useApiFeedback(
    isUploadDocumentError,
    uploadDocumentError,
    isUploadDocumentSuccess,
    (uploadDocumentData?.message || APIFeedbackMessages.DOCUMENT_UPLOADED_SUCCESSFULLY) as string
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid container size={12} spacing={2}>
            <Grid size={6}>
              <CustomLabel label={documentsConstants.DOCUMENT_TYPE} isRequired />
              <Controller
                control={control}
                name="documentTypeId"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    placeholder={documentsConstants.SELECT_DOCUMENT_TYPE}
                    items={docTypes.map((docType: DocumentType) => ({
                      value: docType.uuid,
                      label: docType.name,
                    }))}
                    value={field.value}
                    onChange={e => {
                      const newValue = e?.target?.value ?? e;
                      field.onChange(newValue);
                    }}
                    hasError={!!errors.documentTypeId}
                    errorMessage={errors.documentTypeId?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <CustomLabel label={documentsConstants.DOCUMENT_DATE} isRequired />
              <Controller
                control={control}
                name="documentDate"
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    value={field.value}
                    handleDateChange={date => field.onChange(date)}
                    hasError={!!errors.documentDate}
                    errorMessage={errors.documentDate?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid size={12}>
            <CustomLabel label={documentsConstants.DOCUMENT_NAME} isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder={documentsConstants.ENTER_DOCUMENT_NAME}
                  bgWhite
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  hasError={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <FileUpload
                  {...field}
                  name={'Upload Document'}
                  onUpload={handleFileUpload}
                  onDelete={handleFileDelete}
                  maxSize={1 * 1024 * 1024}
                  hasError={!!errors.file}
                  errorMessage={errors.file?.message}
                  existingFile={isEdit ? (metaData as any) : null}
                />
              )}
            />
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <CustomButton
              label={formsConstants.SAVE}
              variant="filled"
              type="submit"
              disabled={isUploadDocumentPending || isUpdateDocumentPending}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DocumentUpload;
