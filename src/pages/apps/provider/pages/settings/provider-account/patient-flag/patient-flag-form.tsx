import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CustomLabel from '../../../../../../../components/core/reusable/custom-label/custom-label';
import CustomInput from '../../../../../../../components/core/reusable/custom-input/custom-input';
import { Controller } from 'react-hook-form';
import CustomButton from '../../../../../../../components/core/reusable/custom-button/custom-button';
import CustomColorPicker, {
  generateRandomHex,
} from '../../../../../../../components/core/reusable/custom-color-picker/custom-color-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePatientFlagControllerServicePostApiMasterPatientFlag,
  usePatientFlagControllerServicePutApiMasterPatientFlag,
} from '../../../../../../../sdk/queries/queries';
import { PatientFlag } from '../../../../../../../sdk/requests/types.gen';
import { settingConstants } from 'src/constants/admin-constants';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { activeStatusOptions } from 'src/constants/staff-provider-types';
import { StaffFormPlaceholders } from 'src/constants/formConst';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { patientFlagSchema } from 'src/schema/flag-schema/flag-schema';

type PatientFlagFormProps = {
  onClose?: () => void;
  isEdit?: boolean;
  editData?: PatientFlag;
  onSuccess?: () => void;
};

interface PatientFlagFormData {
  name: string;
  hexColor: string;
  active: boolean;
}

const PatientFlagForm = (props: PatientFlagFormProps) => {
  const { onClose, isEdit, editData, onSuccess } = props;
  const isInitialized = useRef(false);
  const [generatedColor, setGeneratedColor] = useState<string>('');

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PatientFlagFormData>({
    defaultValues: {
      name: editData?.name || '',
      hexColor: editData?.hexColor,
      active: editData?.active !== undefined ? editData.active : true,
    },
    resolver: yupResolver(patientFlagSchema) as any,
  });

  const {
    mutateAsync: createPatientFlag,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = usePatientFlagControllerServicePostApiMasterPatientFlag({
    onSuccess: () => {
      onSuccess?.();
      onClose?.();
    },
    onError: error => {
      console.error('Error creating patient flag:', error);
    },
  });

  const {
    mutateAsync: updatePatientFlag,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = usePatientFlagControllerServicePutApiMasterPatientFlag({
    onSuccess: () => {
      onSuccess?.();
      onClose?.();
    },
    onError: error => {
      console.error('Error updating patient flag:', error);
    },
  });

  useEffect(() => {
    if (isEdit && editData) {
      reset({
        name: editData?.name || '',
        hexColor: editData?.hexColor,
        active: editData?.active !== undefined ? editData.active : true,
      });
    } else if (!isEdit && !isInitialized.current) {
      const randomColor = generateRandomHex();
      setGeneratedColor(randomColor);

      setValue('hexColor', randomColor);
      setValue('active', true);
      isInitialized.current = true;
    }
  }, [isEdit, editData, reset, setValue]);

  const onSubmit = async (data: PatientFlagFormData) => {
    try {
      const requestBody: PatientFlag = {
        name: data.name,
        hexColor: data.hexColor,
        active: data.active,
        ...(isEdit && editData?.uuid && { uuid: editData.uuid }),
        ...(isEdit && editData?.clinicUuid && { clinicUuid: editData.clinicUuid }),
        ...(isEdit && editData?.archive !== undefined && { archive: editData.archive }),
      };

      if (isEdit) {
        await updatePatientFlag({ requestBody });
      } else {
        await createPatientFlag({ requestBody });
      }
    } catch (error) {
      console.error('Error submitting patient flag:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label="Patient Flag Name" isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  placeholder={`Enter Flag Name`}
                  {...field}
                  hasError={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label="Flag Color" isRequired />
            <Controller
              control={control}
              name="hexColor"
              render={({ field }) => (
                <CustomColorPicker
                  value={field.value}
                  onChange={value => {
                    field.onChange(value);
                  }}
                  hasError={!!errors.hexColor}
                  errorMessage={errors.hexColor?.message}
                  defaultColor={generatedColor}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.STATUS} />
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <CustomSelect
                  items={activeStatusOptions}
                  placeholder={StaffFormPlaceholders.SELECT_STATUS}
                  {...field}
                  value={field.value === true ? 'true' : 'false'}
                  hasError={!!errors.active}
                  errorMessage={(errors.active?.message as string) || ''}
                  onChange={e => {
                    field.onChange(e.target.value === 'true');
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} mb={2}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <CustomButton
              variant="outlined"
              onClick={onClose}
              label={settingConstants.CANCEL}
              disabled={isLoading}
            />
            <CustomButton
              variant="filled"
              label={isEdit ? settingConstants.SAVE : 'Create Flag'}
              type="submit"
              disabled={isLoading}
            />
          </Box>
        </Grid>
      </form>
    </>
  );
};

export default PatientFlagForm;
