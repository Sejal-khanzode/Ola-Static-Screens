import { yupResolver } from '@hookform/resolvers/yup';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSnackbarOn } from 'src/redux/actions/snackbar-actions';
import { MigrationControllerService } from 'src/sdk/requests';
import * as yup from 'yup';
import { AlertSeverity } from '../../snackbar-alert/snackbar-alert';
import { ErrorResponseEntity } from 'src/models/response/error-response';
import { settingConstants } from 'src/constants/admin-constants';
import CustomLabel from '../../custom-label/custom-label';
import CustomSelect from '../../custom-select/custom-select';
import MultipleFilesUpload from '../../multiple-files-upload/multiple-files-upload';

export const adminUploadDataSchema = yup.object().shape({
  entityType: yup.string(),
  uploadCsvFile: yup.mixed().nullable(),
  specialityType: yup.string(),
});

export type UploadFileData = {
  category: 'CPT' | 'ICD' | 'HCPCS' | 'LOINC' | 'PAYER_CATALOG' | 'PATIENT' | 'PROVIDER';
  formData: {
    file: Blob | File;
  };
  title: string;
  xTenantId?: string;
};

export const initialValues = {
  entityType: '',
  uploadCsvFile: '',
};
type Category = 'CPT' | 'ICD' | 'HCPCS' | 'LOINC' | 'PAYER_CATALOG' | 'PATIENT' | 'PROVIDER';

export const entityTypes = [
  { value: 'CPT', label: 'CPT Code' },
  { value: 'ICD', label: 'ICD 10 Code' },
];

const steps = [
  {
    label: 'Download CSV File',
  },
  {
    label: 'Add or edit entity info in downloaded CSV template',
  },
  {
    label: 'Upload CSV File',
  },
];

export type FilesMetaData = {
  name: string;
  type: string;
  preview: string;
  file: File | Blob;
};

interface DataImport {
  onClose?: () => void;
  refetchDataImport: () => void;
}
export type ProviderGroup = {
  uuid: string;
  name: string;
};

export type ProviderGroupResponse = {
  data: ProviderGroup[];
  total: number;
  size: number;
  page: number;
};

export const AdminUploadDataDialog = (props: DataImport) => {
  const { onClose, refetchDataImport } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = useState<Category | string>();
  const [uploadedFiles, setUploadedFiles] = useState<FilesMetaData[]>([]);
  const [showEntityTypeError, setShowEntityTypeError] = useState(false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const initialValues = {
    entityType: '',
    uploadCsvFile: null,
    specialityType: '',
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(adminUploadDataSchema),
  });

  const {
    mutateAsync: addMutateAsync,
    isSuccess: isSuccessFileUpload,
    data: dataDuccessFileUpload,
  } = useMutation({
    mutationFn: MigrationControllerService.postApiMasterDataImportByCategoryUpload,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = method;

  // Watch the entityType field to get real-time updates
  const entityTypeValue = watch('entityType');

  const dispatch = useDispatch();

  type categories = 'CPT' | 'ICD' | 'HCPCS' | 'LOINC' | 'PAYER_CATALOG' | 'PATIENT' | 'PROVIDER';

  const downloadCurrentCSV = async () => {
    // Check if entityType is selected
    if (!entityTypeValue) {
      setShowEntityTypeError(true);
      return;
    }

    // Clear any previous error
    setShowEntityTypeError(false);

    try {
      const res = await MigrationControllerService.getApiMasterDataImportSampleByCategory({
        category: values as categories,
      });

      const blob = new Blob([res], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${values}_Template.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.SUCCESS,
          message: 'CSV file downloaded successfully!',
        })
      );
    } catch (err) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (err as ErrorResponseEntity).body.message,
        })
      );
    }
  };

  const onSubmit = async () => {
    for (const fileMeta of uploadedFiles) {
      const payload: UploadFileData = {
        title: 'Hello',
        category: values as categories,
        formData: { file: fileMeta.file },
      };

      try {
        await addMutateAsync(payload);
      } catch (err) {
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: (err as ErrorResponseEntity).body.message || settingConstants.AN_ERROR,
          })
        );
      }
    }
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isSuccessFileUpload) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.SUCCESS,
          message:
            (dataDuccessFileUpload?.message as unknown as string) ||
            settingConstants.DOCUMENT_UPLOAD,
        })
      );
      refetchDataImport();
    }
  }, [isSuccessFileUpload, dataDuccessFileUpload, dispatch, refetchDataImport]);

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container width={'100%'}>
          <Grid width={'100%'} mb={2}>
            <Grid
              container
              rowGap={1}
              width={'100%'}
              justifyContent={'space-between'}
              alignContent={'center'}
            >
              <Grid flex={1}>
                <CustomLabel label={settingConstants.TYPE} isRequired />
                <Controller
                  control={control}
                  name="entityType"
                  render={({ field }) => (
                    <CustomSelect
                      items={entityTypes}
                      placeholder={settingConstants.SELECT_TYPE}
                      hasError={!!errors.entityType || showEntityTypeError}
                      errorMessage={errors.entityType?.message || (showEntityTypeError ? 'Select Type' : '')}
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                        setValues(e.target.value);
                        // Clear entity type error when user selects a type
                        if (e.target.value) {
                          setShowEntityTypeError(false);
                        }
                      }}
                      value={field.value || ''}
                    />
                  )}
                ></Controller>
              </Grid>
            </Grid>
          </Grid>
          <Grid width={'100%'}>
            <Box sx={{ maxWidth: '100%' }}>
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                sx={{
                  '& .MuiStepIcon-root': {
                    color: 'Primary.main',
                  },
                  '& .MuiStepIcon-root.Mui-active': {
                    color: 'Primary.main',
                  },
                  '& .MuiStepIcon-root.Mui-completed': {
                    color: 'Primary.main',
                  },
                }}
              >
                {steps?.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      {index === 0 && (
                        <Box sx={{ mt: 2 }}>
                          <ButtonBase
                            onClick={downloadCurrentCSV}
                            sx={{
                              border: `2px solid`,
                              borderColor: 'Primary.main',
                              height: '40px',
                              padding: '10px',
                              borderRadius: '5px',
                              color: 'Primary.main',
                            }}
                          >
                            <Typography variant="titleMedium4" fontWeight={'bold'}>
                              <FileDownloadOutlinedIcon
                                sx={{
                                  color: 'Primary.main',
                                  marginBottom: '-8px',
                                }}
                              />
                              {settingConstants.DOWNLOAD_CSV}
                            </Typography>
                          </ButtonBase>
                        </Box>
                      )}

                      {index === 1 && (
                        <Box sx={{ mt: 2 }}>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow
                                  sx={{
                                    backgroundColor: '#E8E8E8',
                                    height: '30px',
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      padding: '4px',
                                      borderRight: '1px solid #ccc',
                                    }}
                                  >
                                    {entityTypes?.find(type => type?.value === values)?.label ||
                                      'Code'}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      padding: '4px',
                                      borderRight: '1px solid #ccc',
                                    }}
                                  >
                                    Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow sx={{ height: '30px' }}>
                                  <TableCell
                                    sx={{
                                      padding: '4px',
                                      borderRight: '1px solid #ccc',
                                    }}
                                  >
                                    90846
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      padding: '4px',
                                      borderRight: '1px solid #ccc',
                                    }}
                                  >
                                    {settingConstants.FAMILY_TEXT}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                      {index === 2 && (
                        <Box
                          sx={{ mt: 2 }}
                          display={'flex'}
                          alignContent={'flex-start'}
                          width={'100%'}
                        >
                          <Grid sx={{ marginTop: '15px' }}>
                            <MultipleFilesUpload
                              fileType="csv"
                              onUpload={function (filesMetaData: FilesMetaData[]): void {
                                filesMetaData;
                                setUploadedFiles(filesMetaData);
                              }}
                            />
                          </Grid>
                        </Box>
                      )}
                      <Box
                        sx={{
                          mt: 2,
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Grid display={'flex'} flexDirection={'row'} gap={2}>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{
                              mt: 1,
                              mr: 1,
                            }}
                            variant="outlined"
                          >
                            {settingConstants.BACK}
                          </Button>

                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mt: 1,
                              mr: 1,
                              bgcolor: 'Primary.main',
                              '&.Mui-disabled': {
                                border: 'none !important',
                              },
                            }}
                            disabled={!entityTypeValue}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                        </Grid>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>{settingConstants.STEPCS_COMPLETED} </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </Grid>
          <Grid width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: 'Primary.main',
                '&.Mui-disabled': {
                  border: 'none !important',
                },
              }}
              disabled={activeStep != steps.length || uploadedFiles.length === 0}
            >
              {settingConstants.UPLOAD}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
