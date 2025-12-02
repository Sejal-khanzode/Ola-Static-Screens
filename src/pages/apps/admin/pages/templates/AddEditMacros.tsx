import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Box, Grid } from '@mui/material';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomTextArea from 'src/components/core/reusable/custom-text-area/custom-textarea';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { MacrosEnum } from 'src/constants/formConst';
import { TextMacro, TextMacroControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required(MacrosEnum.MACRO_NAME_REQUIRED).trim(),
  expansionText: yup.string().required(MacrosEnum.MACRO_DESCRIPTION_REQUIRED),
});

interface AddEditMacrosProps {
  onClose: () => void;
  ReftechData?: () => void;
  initialData?: TextMacro;
  isEdit?: boolean;
}

const AddEditMacros: React.FC<AddEditMacrosProps> = ({
  onClose,
  ReftechData,
  initialData,
  isEdit = false,
}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema) as any,
    defaultValues: initialData || {
      title: '',
      expansionText: '',
    },
  });

  const {
    mutateAsync: createMacroAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: TextMacroControllerService.postApiMasterTextMacro,
  });

  const {
    mutateAsync: updateMacroAsync,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: TextMacroControllerService.putApiMasterTextMacro,
  });

  const onSubmit = async (data: any) => {
    try {
      const clinicUuid = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (isEdit && initialData?.uuid) {
        await updateMacroAsync({
          requestBody: {
            uuid: initialData.uuid,
            title: data.title,
            expansionText: data.expansionText,
            clinicUuid: clinicUuid,
          },
        });
      } else {
        await createMacroAsync({
          requestBody: {
            title: data.title,
            expansionText: data.expansionText,
            clinicUuid: clinicUuid,
          },
        });
      }
      if (ReftechData) {
        ReftechData();
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useApiFeedback(
    isErrorCreate,
    errorCreate,
    isSuccessCreate,
    (dataCreate?.message || 'Added Successfully') as string
  );

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || 'Updated Successfully') as string
  );

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        expansionText: initialData.expansionText || '',
      });
    } else {
      reset({
        title: '',
        expansionText: '',
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <CustomLabel label={MacrosEnum.MACRO_NAME} isRequired />
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <CustomInput
                {...field}
                name="title"
                placeholder={MacrosEnum.ENTER_MACRO_NAME}
                hasError={!!errors.title}
                errorMessage={errors.title?.message}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <CustomLabel label={MacrosEnum.MACRO_DESCRIPTION} isRequired />
          <Controller
            control={control}
            name="expansionText"
            render={({ field }) => (
              <CustomTextArea
                {...field}
                name="expansionText"
                placeholder={MacrosEnum.ENTER_MACRO_DESCRIPTION}
                hasError={!!errors.expansionText}
                errorMessage={errors.expansionText?.message}
                minRow={4}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} mt={3}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <CustomButton
              variant="outlined"
              onClick={onClose}
              disabled={isSubmitting}
              label="Cancel"
            />
            <CustomButton
              variant="filled"
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? 'Saving...' : 'Save'}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEditMacros;
