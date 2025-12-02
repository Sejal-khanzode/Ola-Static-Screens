import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { MedicalCode, MedicalCodeControllerService } from 'src/sdk/requests';
import CustomLabel from '../../custom-label/custom-label';
import CustomInput from '../../custom-input/custom-input';
import CustomTextArea from '../../custom-text-area/custom-textarea';
import { settingConstants } from 'src/constants/admin-constants';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { useEffect } from 'react';
import CustomButton from '../../custom-button/custom-button';
import { CodeList } from 'src/constants/formConst';
import CustomSelect from '../../custom-select/custom-select';

export const editProfileSchema = yup.object().shape({
  cptCode: yup.string().required('Code is required'),
  description: yup.string().required('Code Description is required'),
  type: yup.string().required('Type is required'),
});
export type CreateMedicalCodeData = {
  requestBody: MedicalCode;
  xTenantId?: string;
};

interface CPTInitalValues {
  cptCode: string;
  description: string;
  type: string;
}

interface CPTDialogProps {
  onClose?: () => void;
  refetch: () => void;
}

const AdminAddCptDialog = (props: CPTDialogProps) => {
  const { refetch, onClose } = props;
  const initialValues: CPTInitalValues = {
    cptCode: '',
    description: '',
    type: 'CPT',
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(editProfileSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = method;

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

  const buildAddDiagnosisCode = (values: CPTInitalValues): MedicalCode => ({
    code: values.cptCode,
    description: values.description,
    type: values.type as
      | 'CPT'
      | 'ICD'
      | 'CUSTOM'
      | 'HCPCS'
      | 'LOINC'
      | 'PAYER_CATALOG'
      | 'PATIENT'
      | 'PROVIDER',
  });

  const onSubmit = async (values: CPTInitalValues) => {
    const trimmedValues = {
      ...values,
      cptCode: values.cptCode.trimEnd(),
    };
    const CPTPayload = buildAddDiagnosisCode(trimmedValues);

    const payload: CreateMedicalCodeData = {
      requestBody: CPTPayload,
    };

    try {
      await addMutateAsync(payload);
      refetch();
      if (onClose) onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'CPT Code Added Successfully') as string
  );

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          display={'flex'}
          flexDirection={'row'}
          width={'100%'}
          columnGap={1}
          rowGap={2}
        >
          <Grid size={{ xs: 12, sm: 4 }}>
            <CustomLabel label={settingConstants.TYPE} isRequired />
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  items={CodeList}
                  placeholder={settingConstants.SELECT_TYPE}
                  hasError={!!errors.type}
                  errorMessage={errors.type?.message as string}
                />
              )}
            ></Controller>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={settingConstants.CPT_CODE} isRequired />
            <Controller
              control={control}
              name="cptCode"
              render={({ field }) => (
                <CustomInput
                  placeholder={settingConstants.CPT_CODE_NAME}
                  hasError={!!errors.cptCode}
                  errorMessage={errors.cptCode?.message}
                  {...field}
                />
              )}
            ></Controller>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={settingConstants.DESCRIPTION} isRequired />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <CustomTextArea
                  placeholder={settingConstants.CPT_DESCRIPTION}
                  hasError={!!errors.description}
                  minRow={5}
                  errorMessage={errors.description?.message}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            gap={2}
          >
            <Grid>
              <CustomButton variant="outlined" label={settingConstants.CANCEL} onClick={onClose} />
            </Grid>
            <CustomButton variant="filled" label={settingConstants.SAVE} type="submit" />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AdminAddCptDialog;
