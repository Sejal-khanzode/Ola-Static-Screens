import { useEffect, useState } from 'react';
import { Box, Grid, Checkbox, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../../../../../../components/core/reusable/custom-input/custom-input';
import CustomLabel from '../../../../../../../components/core/reusable/custom-label/custom-label';
import CustomSelect from '../../../../../../../components/core/reusable/custom-select/custom-select';
import { clinicConstants } from '../../../../../../../constants/admin-constants';
import { clinicSchema } from '../../../../../../../schema/clinic-schema/clinic-schema';
import StateList from '../../../../../../../assets/states/states.json';
import CustomButton from '../../../../../../../components/core/reusable/custom-button/custom-button';
import useApiFeedback from '../../../../../../../hooks/useApiFeedback';
import { useAppDispatch } from 'src/redux/hooks';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
import { showLoader, hideLoader } from '../../../../../../../redux/reducers/loaderReducer';
import {
  Address,
  Clinic,
  ClinicControllerService,
  PostApiMasterClinicData,
  SpecialityControllerService,
} from 'src/sdk/requests';
import CustomAutoMultiSelect from 'src/components/core/reusable/custom-multiselect/custom-autocomplete-multiselect';

const listOfStateOptions = StateList.map(state => {
  return {
    value: state.code,
    label: state.name,
  };
});

type SpecialityOption = {
  label: string;
  value: string;
};

const activeStatusOptions = [
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

interface ClinicFormProps {
  onClose: () => void;
  RefetchClinicData?: () => void;
  uuid?: string;
  isEdit: boolean;
  initialData?: Clinic;
}

const ClinicForm = (props: ClinicFormProps) => {
  const { onClose, RefetchClinicData, isEdit, uuid, initialData } = props;
  const dispatch = useAppDispatch();

  const [usePhysicalAddress, setUsePhysicalAddress] = useState(false);
  const [specialitiesOptions, setSpecialitiesOptions] = useState<SpecialityOption[]>([]);
  const { data: clinicDetails } = useQuery({
    queryKey: ['clinicDetails', uuid],
    queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId: uuid || '' }),
    enabled: !!uuid,
  });

  const initialValues: Clinic = initialData || {
    name: '',
    phone: '',
    groupNpiNumber: '',
    email: '',
    website: '',
    fax: '',
    description: '',
    active: true,
    physicalAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'USA',
    },
    billingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'USA',
    },
    specialities: {},
    cancellationCharges: 0,
    noShowCharges: 0,
  };

  const method = useForm<Clinic>({
    defaultValues: initialValues,
    resolver: yupResolver(clinicSchema) as any,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    resetField,
    clearErrors,
  } = method;

  const physicalAddress = watch('physicalAddress');

  const {
    mutateAsync: createClinicAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreateClinic,
    isError: isErrorCreateClinic,
    error: errorCreateClinic,
    data: createClinicData,
  } = useMutation({
    mutationFn: ClinicControllerService.postApiMasterClinic,
  });

  const {
    mutateAsync: updateClinicAsync,
    data: updatedClinicData,
    isPending: isUpdating,
    isSuccess: isSuccessUpdateClinic,
    isError: isErrorUpdateClinic,
    error: errorUpdateClinic,
  } = useMutation({
    mutationFn: ClinicControllerService.putApiMasterClinic,
  });

  const {
    mutateAsync: getSpecialities,
    data: specialities,
    isSuccess: isSuccessGetSpecialities,
  } = useMutation({
    mutationFn: SpecialityControllerService.getApiMasterSpeciality,
  });

  const specialitiesData = specialities?.data?.content || [];

  const createClinicPayload = (values: Clinic, uuid?: string): Clinic => {
    let specialitiesObj: { [key: string]: string } = {};

    if (values.specialities && typeof values.specialities === 'object') {
      specialitiesObj = values.specialities as { [key: string]: string };
    }

    return {
      name: values.name,
      phone: values.phone,
      groupNpiNumber: values.groupNpiNumber,
      email: values.email,
      website: values.website,
      fax: values.fax,
      description: values.description,
      active: values.active as Clinic['active'],
      physicalAddress: values.physicalAddress as Address,
      billingAddress: values.billingAddress as Address,
      specialities: specialitiesObj,
      uuid: uuid || '',
      cancellationCharges: values?.cancellationCharges || 0,
      noShowCharges: values.noShowCharges || 0,
    };
  };

  useEffect(() => {
    if (usePhysicalAddress && physicalAddress) {
      setValue('billingAddress', physicalAddress, { shouldValidate: true });
      clearErrors('billingAddress');
    } else if (!isEdit) {
      resetField('billingAddress', {
        defaultValue: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zipcode: '',
          country: 'USA',
        },
      });
    }
  }, [usePhysicalAddress, physicalAddress, setValue, resetField, clearErrors, isEdit]);
  useEffect(() => {
    if (isErrorCreateClinic) {
      dispatch(hideLoader());
    }
  }, [isErrorCreateClinic, dispatch]);

  useEffect(() => {
    if (isSuccessCreateClinic || isSuccessUpdateClinic) {
      dispatch(hideLoader());
      RefetchClinicData?.();
      onClose();
    }
  }, [isSuccessCreateClinic, isSuccessUpdateClinic, RefetchClinicData, onClose, dispatch]);

  useEffect(() => {
    if (isSuccessCreateClinic || isSuccessUpdateClinic) {
      onClose();
      RefetchClinicData && RefetchClinicData();
    }
  }, [isSuccessCreateClinic, isSuccessUpdateClinic, onClose, RefetchClinicData]);

  useEffect(() => {
    getSpecialities({});
  }, []);

  useApiFeedback(
    isErrorCreateClinic,
    errorCreateClinic,
    isSuccessCreateClinic,
    (createClinicData?.message || 'Clinic Added Successfully') as string
  );

  useApiFeedback(
    isErrorUpdateClinic,
    errorUpdateClinic,
    isSuccessUpdateClinic,
    (updatedClinicData?.message || 'Clinic updated successfully!') as string
  );

  useEffect(() => {
    if (isSuccessGetSpecialities && specialitiesData && Array.isArray(specialitiesData)) {
      const formatted = specialitiesData?.map((item: any) => ({
        label: item?.name,
        value: item?.uuid,
      }));
      setSpecialitiesOptions(formatted);
    }
  }, [isSuccessGetSpecialities, specialitiesData]);
  const clinicData = clinicDetails?.data as any;

  useEffect(() => {
    if (isEdit && clinicData) {
      const formData = {
        name: clinicData?.name || '',
        phone: clinicData?.phone || '',
        groupNpiNumber: clinicData?.groupNpiNumber || '',
        email: clinicData?.email || '',
        website: clinicData?.website || '',
        fax: clinicData?.fax || '',
        description: clinicData?.description || '',
        timezone: clinicData?.timezone || '',
        active: clinicData?.active !== undefined ? clinicData?.active : true,
        physicalAddress: {
          line1: clinicData?.physicalAddress?.line1 || '',
          line2: clinicData?.physicalAddress?.line2 || '',
          city: clinicData?.physicalAddress?.city || '',
          state: clinicData?.physicalAddress?.state || '',
          zipcode: clinicData?.physicalAddress?.zipcode || '',
          country: clinicData?.physicalAddress?.country || 'USA',
        },
        billingAddress: {
          line1: clinicData?.billingAddress?.line1 || '',
          line2: clinicData?.billingAddress?.line2 || '',
          city: clinicData?.billingAddress?.city || '',
          state: clinicData?.billingAddress?.state || '',
          zipcode: clinicData?.billingAddress?.zipcode || '',
          country: clinicData?.billingAddress?.country || 'USA',
        },
        specialities: clinicData?.specialities || {},
        cancellationCharges: clinicData?.cancellationCharges || 0,
        noShowCharges: clinicData?.noShowCharges || 0,
      };
      method.reset(formData);
    }
  }, [isEdit, clinicData, method]);

  useEffect(() => {
    if (isEdit && clinicData && specialitiesOptions?.length > 0) {
      if (clinicData?.specialities && Object.keys(clinicData?.specialities)?.length > 0) {
        const specialitiesKeys = Object.keys(clinicData?.specialities);
        const specialitiesObj = specialitiesKeys.reduce(
          (acc, key) => {
            const specialityName = clinicData?.specialities[key];
            acc[key] = specialityName;
            return acc;
          },
          {} as Record<string, string>
        );
        setValue('specialities', specialitiesObj);
      }
    }
  }, [isEdit, clinicData, specialitiesOptions, setValue]);

  const isPending = isCreating || isUpdating;

  const onSubmit = async (values: Clinic) => {
    const payloadSubmit: Clinic = createClinicPayload(values, uuid);

    // Add stripeAccountId to payload if in edit mode
    if (isEdit && clinicData?.stripeAccountId) {
      payloadSubmit.stripeAccountId = clinicData.stripeAccountId;
    }

    const payload: PostApiMasterClinicData = {
      requestBody: payloadSubmit,
    };
    try {
      dispatch(showLoader());
      if (isEdit) {
        await updateClinicAsync(payload);
      } else {
        await createClinicAsync(payload);
      }
      if (RefetchClinicData) {
        RefetchClinicData();
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to submit clinic data:', error);
      dispatch(hideLoader());
    }
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={clinicConstants.CLINIC_NAME} isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.CLINIC_NAME}`}
                  {...field}
                  hasError={!!errors.name}
                  errorMessage={errors.name?.message}
                  disableField={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.CONTACT_NUMBER} isRequired />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <CustomContactInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.CONTACT_NUMBER}`}
                  {...field}
                  hasError={!!errors.phone}
                  errorMessage={errors.phone?.message}
                  isDisabled={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.SPECIALITY_TYPE} isRequired />
            <Controller
              control={control}
              name="specialities"
              render={({ field }) => {
                const multiSelectValue = Object.keys(field.value || {});

                return (
                  <CustomAutoMultiSelect
                    name="specialities"
                    options={specialitiesOptions?.map(option => ({
                      key: option.value,
                      value: option.label,
                    }))}
                    value={multiSelectValue}
                    onChange={selectedValues => {
                      const specialitiesObj = selectedValues.reduce(
                        (acc, key) => {
                          const option = specialitiesOptions?.find(opt => opt.value === key);
                          if (option) {
                            acc[key] = option.label;
                          }
                          return acc;
                        },
                        {} as Record<string, string>
                      );
                      field.onChange(specialitiesObj);
                    }}
                    placeholder={`${clinicConstants.SELECT} ${clinicConstants.SPECIALITY_TYPE}`}
                    showEllipse
                    errorMessage={
                      errors.specialities?.message ? String(errors.specialities.message) : ''
                    }
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.GROUP_NPI_NUMBER} isRequired />
            <Controller
              control={control}
              name="groupNpiNumber"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.GROUP_NPI_NUMBER}`}
                  {...field}
                  hasError={!!errors.groupNpiNumber}
                  errorMessage={errors.groupNpiNumber?.message}
                  disableField={isPending}
                  isNumeric
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.EMAIL} isRequired />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.EMAIL}`}
                  {...field}
                  hasError={!!errors.email}
                  errorMessage={errors.email?.message}
                  disableField={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.WEBSITE} />
            <Controller
              control={control}
              name="website"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.WEBSITE}`}
                  {...field}
                  hasError={!!errors.website}
                  errorMessage={errors.website?.message}
                  disableField={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.FAX_ID} />
            <Controller
              control={control}
              name="fax"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.FAX_ID}`}
                  {...field}
                  hasError={!!errors.fax}
                  errorMessage={errors.fax?.message}
                  disableField={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={clinicConstants.STATUS} />
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <CustomSelect
                  items={activeStatusOptions}
                  placeholder={`${clinicConstants.SELECT} ${clinicConstants.STATUS}`}
                  {...field}
                  value={field.value === true ? 'true' : 'false'}
                  onChange={e => field.onChange(e.target.value === 'true')}
                  isDisabled={isPending}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomLabel label={clinicConstants.INFORMATION} />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} ${clinicConstants.INFORMATION}`}
                  {...field}
                  hasError={!!errors.description}
                  errorMessage={errors.description?.message}
                  disableField={isPending}
                />
              )}
            />
          </Grid>

          {/* Physical Address */}
          <Grid
            sx={{
              pt: 1.5,
              width: '100%',
            }}
          >
            <Grid size={{ xs: 12 }} pb={1.5}>
              <Typography variant="titleSemiBold3">{clinicConstants.PHYSICAL_ADDRESS}</Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomLabel label={clinicConstants.LINE_1} isRequired />
                <Controller
                  control={control}
                  name="physicalAddress.line1"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.LINE_1}`}
                      {...field}
                      hasError={!!errors.physicalAddress?.line1}
                      errorMessage={errors.physicalAddress?.line1?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomLabel label={clinicConstants.LINE_2} />
                <Controller
                  control={control}
                  name="physicalAddress.line2"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.LINE_2}`}
                      {...field}
                      hasError={!!errors.physicalAddress?.line2}
                      errorMessage={errors.physicalAddress?.line2?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.CITY} isRequired />
                <Controller
                  control={control}
                  name="physicalAddress.city"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.CITY}`}
                      {...field}
                      hasError={!!errors.physicalAddress?.city}
                      errorMessage={errors.physicalAddress?.city?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.STATE} isRequired />
                <Controller
                  control={control}
                  name="physicalAddress.state"
                  render={({ field }) => (
                    <CustomSelect
                      items={listOfStateOptions}
                      placeholder={`${clinicConstants.SELECT} ${clinicConstants.STATE}`}
                      {...field}
                      isDisabled={isPending}
                      hasError={!!errors.physicalAddress?.state}
                      errorMessage={errors.physicalAddress?.state?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.ZIP_CODE} isRequired />
                <Controller
                  control={control}
                  name="physicalAddress.zipcode"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.ZIP_CODE}`}
                      {...field}
                      hasError={!!errors.physicalAddress?.zipcode}
                      errorMessage={errors.physicalAddress?.zipcode?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Billing Address */}
          <Grid
            sx={{
              width: '100%',
            }}
          >
            <Grid size={{ xs: 12 }} display={'flex'} alignItems={'center'} gap={2}>
              <Typography variant="titleSemiBold3">{clinicConstants.BILLING_ADDRESS}</Typography>
              <Grid container alignItems="center" spacing={0.5}>
                <Grid>
                  <Checkbox
                    checked={usePhysicalAddress}
                    onChange={e => setUsePhysicalAddress(e.target.checked)}
                    disabled={isPending}
                    sx={{
                      '&.Mui-checked': {
                        color: 'Primary.main',
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <Typography variant="titleSemiBold4" color="Neutral.60">
                    Use same as physical address
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomLabel label={clinicConstants.LINE_1} isRequired />
                <Controller
                  control={control}
                  name="billingAddress.line1"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.LINE_1}`}
                      {...field}
                      hasError={!!errors.billingAddress?.line1}
                      errorMessage={errors.billingAddress?.line1?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={clinicConstants.LINE_2} />
                <Controller
                  control={control}
                  name="billingAddress.line2"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.LINE_2}`}
                      {...field}
                      hasError={!!errors.billingAddress?.line2}
                      errorMessage={errors.billingAddress?.line2?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.CITY} isRequired />
                <Controller
                  control={control}
                  name="billingAddress.city"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.CITY}`}
                      {...field}
                      hasError={!!errors.billingAddress?.city}
                      errorMessage={errors.billingAddress?.city?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.STATE} isRequired />
                <Controller
                  control={control}
                  name="billingAddress.state"
                  render={({ field }) => (
                    <CustomSelect
                      items={listOfStateOptions}
                      placeholder={`${clinicConstants.SELECT} ${clinicConstants.STATE}`}
                      {...field}
                      value={field.value || ''}
                      isDisabled={isPending}
                      hasError={!!errors.billingAddress?.state}
                      errorMessage={errors.billingAddress?.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <CustomLabel label={clinicConstants.ZIP_CODE} isRequired />
                <Controller
                  control={control}
                  name="billingAddress.zipcode"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={`${clinicConstants.ENTER} ${clinicConstants.ZIP_CODE}`}
                      {...field}
                      hasError={!!errors.billingAddress?.zipcode}
                      errorMessage={errors.billingAddress?.zipcode?.message}
                      disableField={isPending}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomLabel label="Cancellation Charges" />
            <Controller
              control={control}
              name="cancellationCharges"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} Cancellation Charges`}
                  {...field}
                  value={field.value ?? 0}
                  onChange={e => field.onChange(Number(e.target.value) || 0)}
                  disableField={isPending}
                  isNumeric
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomLabel label="No Show Charges" />
            <Controller
              control={control}
              name="noShowCharges"
              render={({ field }) => (
                <CustomInput
                  placeholder={`${clinicConstants.ENTER} No Show Charges`}
                  {...field}
                  value={field.value ?? 0}
                  onChange={e => field.onChange(Number(e.target.value) || 0)}
                  disableField={isPending}
                  isNumeric
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mb={2}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <CustomButton variant="outlined" onClick={onClose} label={clinicConstants.CANCEL} />
              <CustomButton
                variant="filled"
                type="submit"
                disabled={isPending}
                label={isPending ? 'Saving...' : clinicConstants.SAVE}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default ClinicForm;
