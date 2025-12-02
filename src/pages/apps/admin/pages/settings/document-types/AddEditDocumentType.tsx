import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { DocumentTypeControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { settingConstants } from 'src/constants/admin-constants';


interface FormProps {
  onClose: () => void;
  isEdit: boolean;
  selectedData: any;
  RefetchData: () => void;
}

const AddEditDocumentType = (props: FormProps) => {
  const { onClose, isEdit, selectedData, RefetchData } = props;
  const dispatch = useDispatch();

  const documentTypeSchema = yup.object().shape({
    name: yup.string().required('Document type is required'),
  });

  const {
    mutateAsync: asyncCreateDocumentType,
    data: createDocumentTypeData,
    isSuccess: isCreateDocumentTypeSuccess,
    isError: isCreateDocumentTypeError,
    error: createDocumentTypeError,
    isPending: isCreating,
  } = useMutation({
    mutationFn: DocumentTypeControllerService.postApiMasterDocumentType,
  });  

  const {
    mutateAsync: asyncUpdateDocumentType,
    data: updateDocumentTypeData,
    isSuccess: isUpdateDocumentTypeSuccess,
    isError: isUpdateDocumentTypeError,
    error: updateDocumentTypeError,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: DocumentTypeControllerService.putApiMasterDocumentType,
  });  

  const {
    handleSubmit,
    control,  
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: selectedData?.name || '',
    },
    resolver: yupResolver(documentTypeSchema) as any,
  });

  useEffect(() => {
    if (isEdit && selectedData) {
      reset({
        name: selectedData?.name || '',
      });
    }
  }, [isEdit, selectedData, reset]);

  useEffect(() => {
    if (isCreating || isUpdating) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isCreating, dispatch]);

    useApiFeedback(
      isCreateDocumentTypeError,
      createDocumentTypeError,
      isCreateDocumentTypeSuccess,
      (createDocumentTypeData?.message || 'Document type created successfully') as string
    );

    useApiFeedback(
      isUpdateDocumentTypeError,
      updateDocumentTypeError,
      isUpdateDocumentTypeSuccess,
      (updateDocumentTypeData?.message || 'Document type updated successfully') as string
    );

    useEffect(() => {
      if (isCreateDocumentTypeSuccess || isUpdateDocumentTypeSuccess) {
        RefetchData();
        onClose();
      }
    }, [isCreateDocumentTypeSuccess, isUpdateDocumentTypeSuccess, RefetchData, onClose]);

  const onSubmit = async (data: any) => {
    const updateData = {
      ...data,
      uuid: selectedData?.uuid,
    };
  
    if (isEdit) {
      await asyncUpdateDocumentType({ requestBody: updateData });
    } else {
      await asyncCreateDocumentType({ requestBody: data });
    }
  };
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={settingConstants.DOCUMENT_TYPE} isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  placeholder={settingConstants.ENTER_DOCUMENT_TYPE}
                  {...field}
                  hasError={!!errors.name}
                  errorMessage={errors.name?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} mt={2}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={onClose} label="Cancel" />
            <CustomButton 
              variant="filled" 
              label={isEdit ? 'Update' : 'Save'} 
              type="submit"
              disabled={isCreating}
            />
          </Box>
        </Grid>
      </form>
  );
};

export default AddEditDocumentType;
