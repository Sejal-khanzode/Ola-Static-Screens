import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { historyConstants } from 'src/constants/patients-constants';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddMedicationSchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { dispenseOptions, routeOptions, sigUnitOptions } from 'src/constants/dropdown-values';

const AddMedication = () => {

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      medicine: '',
      sig: {
        quantity: '',
        unit: 'TABLET',
      },
      route: 'EVERYDAY',
      dispense: 'BEFORE_MEAL',
      startDate: '',
      endDate: '',
      note: '',
    },
    resolver: yupResolver(AddMedicationSchema) as any,
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label={historyConstants.MEDICINE_NAME} isRequired />
          <Controller
            name="medicine"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={historyConstants.ENTER_MEDICINE_NAME}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.medicine}
                errorMessage={errors.medicine?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.SIG} isRequired />
          <Grid display="flex" gap={2}>
            <Grid size={6}>
              <Controller
                name="sig.quantity"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder={historyConstants.ENTER_SIG}
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasError={!!(errors.sig as any)?.quantity}
                    errorMessage={(errors.sig as any)?.quantity?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="sig.unit"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    placeholder={''}
                    items={sigUnitOptions}
                    value={field.value || 'TABLET'}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={3}>
          <CustomLabel label={historyConstants.BY_ORAL_ROUTE} />
          <Controller
            name="route"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                placeholder={''}
                items={routeOptions}
                value={field.value || 'EVERYDAY'}
                onChange={field.onChange}
                hasError={!!errors.route}
                errorMessage={errors.route?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={3} mt={2.8}>
          <Controller
            name="dispense"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                placeholder={''}
                items={dispenseOptions}
                value={field.value || 'BEFORE_MEAL'}
                onChange={field.onChange}
                hasError={!!errors.dispense}
                errorMessage={errors.dispense?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.START_DATE} isRequired />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                value={field.value || ''}
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={!!errors.startDate}
                errorMessage={errors.startDate?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.END_DATE} isRequired />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                value={field.value || ''}
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={!!errors.endDate}
                errorMessage={errors.endDate?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <CustomLabel label={historyConstants.NOTE} />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={historyConstants.TYPE_HERE}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.note}
                errorMessage={errors.note?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={12} display="flex" gap={2} justifyContent="flex-end">
          <CustomButton variant="filled" type="submit" label={'Save'} disabled={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMedication;
