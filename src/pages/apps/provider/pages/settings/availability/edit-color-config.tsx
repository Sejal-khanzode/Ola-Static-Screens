import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomColorPicker from 'src/components/core/reusable/custom-color-picker/custom-color-picker';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import {
  appointmentSettingConstants,
  formConstants,
  settingsConstants,
} from 'src/constants/setting-constants';

type ColorConfigFormProps = {
  onClose?: () => void;
  isEdit?: boolean;
  editData?: any;
};

interface ColorConfig {
  appointmentName: string;
  color: string;
}

const EditColorConfig = (props: ColorConfigFormProps) => {
  const { onClose, isEdit, editData } = props;

  const ColorConfigSchema = yup.object().shape({
    appointmentName: yup.string().required(formConstants.APPT_NAME_REQ),
    color: yup.string().required(formConstants.APPT_COLOR_REQ),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ColorConfig>({
    defaultValues: {
      appointmentName: editData?.appointmentName || '',
      color: editData?.color || '',
    },
    resolver: yupResolver(ColorConfigSchema) as any,
  });

  useEffect(() => {
    if (isEdit && editData) {
      reset({
        appointmentName: editData?.appointmentName || '',
        color: editData.color || '',
      });
    }
  }, [isEdit, editData, reset]);

  const onSubmit = (data: ColorConfig) => {
    console.log(data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <CustomLabel label={settingsConstants.APPT_NAME} />
          <Controller
            control={control}
            name="appointmentName"
            render={({ field }) => (
              <CustomInput
                placeholder={settingsConstants.ENTER_APPT_NAME}
                {...field}
                hasError={!!errors.appointmentName}
                errorMessage={errors.appointmentName?.message}
                disableField
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomLabel label="Color" isRequired />
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <CustomColorPicker
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.color}
                errorMessage={errors.color?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} mb={2}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <CustomButton variant="outlined" onClick={onClose} label={formConstants.CANCEL} />
          <CustomButton
            variant="filled"
            label={isEdit ? appointmentSettingConstants.SAVE : 'Create '}
            type="submit"
          />
        </Box>
      </Grid>
    </form>
  );
};
export default EditColorConfig;
