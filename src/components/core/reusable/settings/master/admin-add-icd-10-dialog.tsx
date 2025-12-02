import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { MedicalCode, MedicalCodeControllerService } from 'src/sdk/requests';
import CustomLabel from '../../custom-label/custom-label';
import { settingConstants } from 'src/constants/admin-constants';
import CustomInput from '../../custom-input/custom-input';
import CustomTextArea from '../../custom-text-area/custom-textarea';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useEffect } from 'react';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import CustomButton from '../../custom-button/custom-button';

export const editProfileSchema = yup.object().shape({
  icd10Code: yup.string().required('ICD 10 Code is required'),
  description: yup.string().required('ICD 10 Description is required'),
});

export type CreateMedicalCodeData = {
  requestBody: MedicalCode;
  xTenantId?: string;
};

interface ICDCodeInitialValues {
  icd10Code: string;
  description: string;
}

interface ICDDataProps {
  onClose?: () => void;
  refetch: () => void;
}

const AdminAddIcd10Dialog = (props: ICDDataProps) => {
  const { refetch, onClose } = props;

  const initialValues: ICDCodeInitialValues = {
    icd10Code: '',
    description: '',
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(editProfileSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    mutateAsync: addMutateAsync,
    data,
    error,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: MedicalCodeControllerService.postApiMasterMedicalCodes,
  });
  const dispatch = useDispatch();

  const buildAddDiagnosisCode = (values: ICDCodeInitialValues): MedicalCode => ({
    code: values.icd10Code,
    description: values.description,
    type: 'ICD',
  });

  const onSubmit = async (values: ICDCodeInitialValues) => {
    const trimmedValues = {
      ...values,
      icd10Code: values.icd10Code.trimEnd(),
    };
    const ICDPayload = buildAddDiagnosisCode(trimmedValues);

    const payload: CreateMedicalCodeData = {
      requestBody: ICDPayload,
    };

    try {
      await addMutateAsync(payload);
      if (onClose) onClose();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'ICD Code Added Successfully') as string
  );

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={settingConstants.ICD_CODE_NAME} isRequired />
            <Controller
              control={control}
              name="icd10Code"
              render={({ field }) => (
                <CustomInput
                  placeholder="Add ICD 10 Code"
                  hasError={!!errors.icd10Code}
                  errorMessage={errors.icd10Code?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={settingConstants.DESCRIPTION} isRequired />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <CustomTextArea
                  placeholder={settingConstants.ICD_DESCRIPTION}
                  hasError={!!errors.description}
                  minRow={5}
                  errorMessage={errors.description?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
        
        <Grid size={{ xs: 12 }} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} gap={2} pt={1}>
          <Grid >
            <CustomButton
              variant="outlined"
              label={settingConstants.CANCEL}
              onClick={onClose}
            />
            </Grid>
            <CustomButton
              variant="filled"
              label={settingConstants.SAVE}
              type='submit'
            />
          </Grid>
      </form>
    </FormProvider>
  );
};

export default AdminAddIcd10Dialog;
