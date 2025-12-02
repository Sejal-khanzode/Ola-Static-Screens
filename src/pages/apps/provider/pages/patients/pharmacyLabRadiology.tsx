import { Grid, Button, Box } from '@mui/material';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { pharmacyLabRadiologyConstants } from 'src/constants/patients-constants';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { APIFeedbackMessages, ValidationMessages } from 'src/constants/formConst';
import { formsConstants } from 'src/constants/patients-constants';
import { useMutation } from '@tanstack/react-query';
import { PharmacyLabRadiologyControllerService } from 'src/sdk/requests';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import states from 'src/assets/states/states.json';
import useApiFeedback from 'src/hooks/useApiFeedback';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
    
type PharmacyLabRadiologyProps = {
  type: 'pharmacy' | 'lab' | 'radiology';
  open: boolean;
  onClose: () => void;
  onConfirm?: (data: any) => void;
  message?: string;
};

const schema = yup.object().shape({
  name: yup.string().required(ValidationMessages.NAME_REQUIRED),
  phoneNumber: yup.string().required(ValidationMessages.PHONE_NUMBER_REQUIRED)
  .matches(/^\d{10}$/, ValidationMessages.PHONE_NUMBER_FORMAT),
  addressLine1: yup.string().optional(),
  addressLine2: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  country: yup.string().optional(),
  zipCode: yup.string().optional(),
  faxNumber: yup.string().optional(),
});

const PharmacyLabRadiology = (props: PharmacyLabRadiologyProps) => {
  const { onClose, type } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      faxNumber: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    mutate: createPharmacyLabRadiology,
    data: createPharmacyLabRadiologyData,
    isPending: isCreatePharmacyLabRadiologyLoading,
    isSuccess: isCreatePharmacyLabRadiologySuccess,
    error: createPharmacyLabRadiologyError,
  } = useMutation({
    mutationFn: PharmacyLabRadiologyControllerService.postApiMasterPharmacyLabRadiology,
  });

  const onSubmit = (data: any) => {
    createPharmacyLabRadiology({
      requestBody: {
        name: data.name,
        preferenceType: type === 'pharmacy' ? 'PHARMACY' : type === 'lab' ? 'LAB' : 'RADIOLOGY',
        contactNumber: data.phoneNumber,
        faxNumber: data.faxNumber,
        address: {
          line1: data.addressLine1,
          line2: data.addressLine2,
          city: data.city,
          state: data.state,
          zipcode: data.zipCode,
          country: 'USA',
        },
      },
    });
  };

  useApiFeedback(
    isCreatePharmacyLabRadiologySuccess,
    createPharmacyLabRadiologyError,
    isCreatePharmacyLabRadiologyLoading,
    (createPharmacyLabRadiologyData?.message || APIFeedbackMessages.PHARMACY_LAB_RADIOLOGY_CREATED_SUCCESSFULLY) as string
  );


  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container size={12} spacing={2}>
        <Grid size={12}>
          <CustomLabel
            label={
              type === 'pharmacy'
                ? pharmacyLabRadiologyConstants.PHARMACY_NAME
                : type === 'lab'
                  ? pharmacyLabRadiologyConstants.LAB_NAME
                  : pharmacyLabRadiologyConstants.RADIOLOGY_NAME
            }
            isRequired
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={
                  type === 'pharmacy'
                    ? pharmacyLabRadiologyConstants.ENTER_PHARMACY_NAME
                    : type === 'lab'
                      ? pharmacyLabRadiologyConstants.ENTER_LAB_NAME
                      : pharmacyLabRadiologyConstants.ENTER_RADIOLOGY_NAME
                }
                hasError={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.ADDRESS_LINE_1} />
          <Controller
            name="addressLine1"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={pharmacyLabRadiologyConstants.ENTER_ADDRESS_LINE_1}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.ADDRESS_LINE_2} />
          <Controller
            name="addressLine2"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={pharmacyLabRadiologyConstants.ENTER_ADDRESS_LINE_2}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.CITY} />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} placeholder={pharmacyLabRadiologyConstants.ENTER_CITY} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.STATE} />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              
                  <CustomSelect
                    placeholder={pharmacyLabRadiologyConstants.SELECT_STATE}
                    items={states.map((item: any) => ({
                      label: item.name,
                      value: item.code,
                    }))}    
                    {...field}
                    value={field.value || ''}
                    hasError={!!errors?.state}
                errorMessage={errors?.state?.message}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.ZIP_CODE} />
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} placeholder={pharmacyLabRadiologyConstants.ENTER_ZIP_CODE} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.PHONE_NUMBER} isRequired />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <CustomContactInput
                {...field}
                placeholder={pharmacyLabRadiologyConstants.ENTER_PHONE_NUMBER}
                hasError={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={pharmacyLabRadiologyConstants.FAX_NUMBER} />
          <Controller
            name="faxNumber"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={pharmacyLabRadiologyConstants.ENTER_FAX_NUMBER}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={handleCancel}>
              {formsConstants.CANCEL}
            </Button>
            <Button variant="contained" type="submit">
              {formsConstants.SAVE}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default PharmacyLabRadiology;
