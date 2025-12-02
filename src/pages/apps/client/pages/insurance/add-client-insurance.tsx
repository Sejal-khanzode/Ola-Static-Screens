import { Box, Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RequiredFieldLabels, addPatientConstants } from 'src/constants/patients-constants';
import {
  InsuranceFormLabels,
  MinMaxFieldLimits,
  SUBSCRIBER_DETAILS_ENUM,
  appointmentSettingConstants,
} from 'src/constants/setting-constants';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { RelationshipList } from 'src/constants/formConst';
import CustomImageUpload from 'src/components/core/reusable/image-upload/custom-image-upload';
import {
  InsurancePayerControllerService,
  PatientInsurance,
  PatientInsuranceControllerService,
} from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { formatDateToISO } from 'src/constants/date-format';

export const addInsuranceValidationSchema = yup.object().shape(
  {
    insuranceType: yup.string().required(RequiredFieldLabels.INSURANCE_TYPE),
    insuranceName: yup
      .string()
      .required(RequiredFieldLabels.INSURANCE_NAME)
      .trim()
      .min(2, MinMaxFieldLimits.INSURANCE_NAME_MIN),
    groupId: yup.string(),
    memberId: yup
      .string()
      .required(RequiredFieldLabels.MEMBER_ID)
      .trim()
      .min(1, MinMaxFieldLimits.MEMBER_ID_MIN)
      .max(50, MinMaxFieldLimits.MEMBER_ID_MAX),

    relationship: yup.string().required(RequiredFieldLabels.RELATIONSHIP),

    startDate: yup
      .string()
      .required(RequiredFieldLabels.START_DATE)
      .test('valid-date', InsuranceFormLabels.PLEASE_SELECT_A_VALID_START_DATE, value => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }),
    endDate: yup
      .string()
      .required(RequiredFieldLabels.END_DATE)
      .test('valid-date', InsuranceFormLabels.PLEASE_SELECT_A_VALID_END_DATE, value => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      })
      .test('after-start', InsuranceFormLabels.END_DATE_MUST_BE_AFTER_START_DATE, function (value) {
        const { startDate } = this.parent as { startDate?: string };
        if (!value || !startDate) return true;
        const endDateObj = new Date(value);
        const startDateObj = new Date(startDate);

        if (isNaN(endDateObj.getTime()) || isNaN(startDateObj.getTime())) return true;
        return endDateObj > startDateObj;
      }),
    firstName: yup.string().when('relationship', {
      is: (val: string) => val !== 'SELF',
      then: schema =>
        schema
          .required(RequiredFieldLabels.FIRST_NAME)
          .trim()
          .min(2, MinMaxFieldLimits.FIRST_NAME_MIN)
          .max(50, MinMaxFieldLimits.FIRST_NAME_MAX)
          .matches(
            /^[a-zA-Z\s'-]+$/,
            InsuranceFormLabels.FIRST_NAME_CAN_ONLY_CONTAIN_LETTERS_SPACES_HYPHENS_AND_APOSTROPHES
          ),
      otherwise: schema => schema.notRequired(),
    }),

    lastName: yup.string().when('relationship', {
      is: (val: string) => val !== 'SELF',
      then: schema =>
        schema
          .required(RequiredFieldLabels.LAST_NAME)
          .trim()
          .min(2, MinMaxFieldLimits.LAST_NAME_MIN)
          .max(50, MinMaxFieldLimits.LAST_NAME_MAX)
          .matches(
            /^[a-zA-Z\s'-]+$/,
            InsuranceFormLabels.LAST_NAME_CAN_ONLY_CONTAIN_LETTERS_SPACES_HYPHENS_AND_APOSTROPHES
          ),
      otherwise: schema => schema.notRequired(),
    }),

    dateOfBirth: yup.string().when('relationship', {
      is: (val: string) => val !== 'SELF',
      then: schema =>
        schema
          .required(RequiredFieldLabels.DATE_OF_BIRTH)
          .test('valid-date', InsuranceFormLabels.PLEASE_ENTER_A_VALID_DATE, value => {
            if (!value) return false;
            const date = new Date(value);
            return !isNaN(date.getTime());
          })
          .test('not-future', InsuranceFormLabels.DATE_OF_BIRTH_CANNOT_BE_IN_THE_FUTURE, value => {
            if (!value) return true;
            const date = new Date(value);
            return date <= new Date();
          })
          .test(
            'reasonable-age',
            InsuranceFormLabels.PLEASE_ENTER_A_REASONABLE_BIRTH_DATE,
            value => {
              if (!value) return true;
              const date = new Date(value);
              const now = new Date();
              const age = now.getFullYear() - date.getFullYear();
              return age >= 0 && age <= 150;
            }
          ),
      otherwise: schema => schema.notRequired(),
    }),
  },
  [
    ['firstName', 'relationship'],
    ['lastName', 'relationship'],
    ['dateOfBirth', 'relationship'],
  ]
);

export interface AddInsuranceFormValues {
  insuranceType: string;
  insuranceName: string;
  memberId: string;
  relationship: string;
  startDate: string;
  endDate: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  insuranceCardFront?: string;
  insuranceCardBack?: string;
  groupId?: string;
}

interface AddInsuranceFormProps {
  defaultValues?: Partial<AddInsuranceFormValues>;
  onSubmit?: (values: AddInsuranceFormValues) => void;
  onCancel?: () => void;
  isEdit?: boolean;
  patientClinicUuid?: string;
  insuranceUuid?: string;
}

const defaultFormValues: AddInsuranceFormValues = {
  insuranceType: 'primary',
  insuranceName: '',
  memberId: '',
  relationship: '',
  startDate: '',
  endDate: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  insuranceCardFront: '',
  insuranceCardBack: '',
  groupId: '',
};

export default function AddInsuranceForm({
  defaultValues,
  onSubmit,
  onCancel,
  isEdit = false,
  patientClinicUuid,
  insuranceUuid,
}: AddInsuranceFormProps) {
  const [primaryFrontPhoto, setPrimaryFrontPhoto] = useState<string>('');
  const [primaryBackPhoto, setPrimaryBackPhoto] = useState<string>('');
  const [determinedInsuranceType, setDeterminedInsuranceType] = useState<string>('primary');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddInsuranceFormValues>({
    defaultValues: { ...defaultFormValues, ...defaultValues },
    resolver: yupResolver(addInsuranceValidationSchema) as any,
    mode: 'onTouched',
  });
  const dispatch = useDispatch();

  const watchRelationship = watch('relationship');

  const { data: insurancePayers } = useQuery({
    queryKey: ['insurancePayers'],
    queryFn: () => InsurancePayerControllerService.getApiMasterInsurancePayers(),
  });

  // Fetch all patient insurances to determine insurance type for new additions
  const { data: patientInsurancesData } = useQuery({
    queryKey: ['patientInsurancesForForm', patientClinicUuid],
    queryFn: () =>
      PatientInsuranceControllerService.getApiMasterPatientInsurance({
        patientClinicUuid: patientClinicUuid || '',
      }),
    enabled: !!patientClinicUuid && !isEdit,
  });

  const {
    mutateAsync: createAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: PatientInsuranceControllerService.postApiMasterPatientInsuranceByPatientClinicUuid,
  });

  const {
    mutateAsync: updateAsync,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientClinicUuid,
  });

  const insurancePayersList = (insurancePayers?.data?.content as any[]) || [];
  const insuranceData = ((patientInsurancesData as any)?.data?.content as any[]) || [];

  const insurancePayersOptions = insurancePayersList.map((payer: any) => ({
    value: payer.payerName,
    label: payer.payerName,
    payerId: payer.payerId,
  }));

  useEffect(() => {
    if (!isEdit && insuranceData) {
      const activeInsurances = insuranceData.filter((insurance: any) => insurance.active === true);

      const hasPrimary = activeInsurances.some(
        (insurance: any) => insurance.insuranceType === 'PRIMARY'
      );
      const hasSecondary = activeInsurances.some(
        (insurance: any) => insurance.insuranceType === 'SECONDARY'
      );

      let newInsuranceType = 'primary';

      if (!hasPrimary) {
        newInsuranceType = 'primary';
      } else if (!hasSecondary) {
        newInsuranceType = 'secondary';
      } else {
        newInsuranceType = 'other';
      }

      setDeterminedInsuranceType(newInsuranceType);
      setValue('insuranceType', newInsuranceType);

      setValue('relationship', 'SELF');
    }
  }, [isEdit, insuranceData, setValue]);

  useEffect(() => {
    if (!isEdit || !defaultValues) return;

    Object.entries(defaultValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        setValue(key as keyof AddInsuranceFormValues, value);
      }
    });

    setPrimaryFrontPhoto(defaultValues.insuranceCardFront || '');
    setPrimaryBackPhoto(defaultValues.insuranceCardBack || '');
  }, [isEdit, defaultValues, setValue]);

  useEffect(() => {
    setValue('insuranceCardFront', primaryFrontPhoto);
    setValue('insuranceCardBack', primaryBackPhoto);
  }, [primaryFrontPhoto, primaryBackPhoto, setValue]);

  const handleFrontPhotoUpload = useCallback((base64: string) => {
    setPrimaryFrontPhoto(base64);
  }, []);

  const handleBackPhotoUpload = useCallback((base64: string) => {
    setPrimaryBackPhoto(base64);
  }, []);

  const handleFormSubmit = useCallback(
    async (values: AddInsuranceFormValues) => {
      if (!patientClinicUuid) {
        console.error('Patient clinic UUID is required');
        return;
      }

      const removeBase64Prefix = (base64String: string): string => {
        if (!base64String) return '';
        const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
        return base64String.replace(base64Regex, '');
      };

      const selectedPayer = insurancePayersList.find(
        (payer: any) => payer.payerName === values.insuranceName
      );

      const patientInsuranceData: PatientInsurance = {
        insuranceType: values.insuranceType.toUpperCase() as
          | 'PRIMARY'
          | 'SECONDARY'
          | 'TERTIARY'
          | 'OTHER',
        memberId: values.memberId,
        groupId: values?.groupId,
        effectiveStartDate: formatDateToISO(values.startDate),
        effectiveEndDate: formatDateToISO(values.endDate),
        insuredRelationshipWithPatient: values.relationship as any,
        subscriberFirstName: values.firstName || '',
        subscriberLastName: values.lastName || '',
        subscriberBirthDate: values.dateOfBirth ? formatDateToISO(values.dateOfBirth) : '',
        frontPhoto: removeBase64Prefix(values.insuranceCardFront || ''),
        backPhoto: removeBase64Prefix(values.insuranceCardBack || ''),
        active: true,
        archive: false,
        insurancePayer: selectedPayer
          ? {
              payerId: selectedPayer.payerId,
              payerName: selectedPayer.payerName,
            }
          : undefined,
      };

      if (isEdit && insuranceUuid) {
        patientInsuranceData.uuid = insuranceUuid;
      }
      try {
        if (isEdit) {
          await updateAsync({
            patientClinicUuid,
            requestBody: patientInsuranceData,
          });
        } else {
          await createAsync({
            patientClinicUuid,
            requestBody: patientInsuranceData,
          });
        }

        if (onSubmit) {
          onSubmit(values);
        }
      } catch (error) {
        console.error('Failed to save insurance:', error);
      }
    },
    [
      onSubmit,
      patientClinicUuid,
      insuranceUuid,
      isEdit,
      createAsync,
      updateAsync,
      insurancePayersList,
    ]
  );

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const getInsuranceTypeDisplay = useCallback(() => {
    if (isEdit && defaultValues?.insuranceType) {
      const insuranceType = defaultValues.insuranceType.toLowerCase();
      switch (insuranceType) {
        case 'primary':
          return InsuranceFormLabels.PRIMARY_INSURANCE;
        case 'secondary':
          return InsuranceFormLabels.SECONDARY_INSURANCE;
        case 'other':
          return InsuranceFormLabels.OTHER_INSURANCE;
        default:
          return `${defaultValues.insuranceType.charAt(0).toUpperCase() + defaultValues.insuranceType.slice(1)} Insurance`;
      }
    }

    switch (determinedInsuranceType) {
      case 'primary':
        return InsuranceFormLabels.PRIMARY_INSURANCE;
      case 'secondary':
        return InsuranceFormLabels.SECONDARY_INSURANCE;
      case 'other':
        return InsuranceFormLabels.OTHER_INSURANCE;
      default:
        return InsuranceFormLabels.INSURANCE;
    }
  }, [isEdit, defaultValues?.insuranceType, determinedInsuranceType]);

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

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="bodyMedium3"
                sx={{
                  color: '#1F2937',
                  mb: 2,
                }}
              >
                {getInsuranceTypeDisplay()}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }} display={'flex'} gap={2}>
              <Grid size={4}>
                <CustomLabel label={InsuranceFormLabels.INSURANCE_NAME} isRequired />
                <Controller
                  name="insuranceName"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      items={insurancePayersOptions}
                      placeholder={InsuranceFormLabels.SELECT_INSURANCE_NAME}
                      hasError={!!errors.insuranceName}
                      errorMessage={errors.insuranceName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={4}>
                <CustomLabel label={InsuranceFormLabels.MEMBER_ID} isRequired />
                <Controller
                  name="memberId"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder={InsuranceFormLabels.ENTER_MEMBER_ID}
                      hasError={!!errors.memberId}
                      errorMessage={errors.memberId?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={4}>
                <CustomLabel label={InsuranceFormLabels.GROUP_ID} />
                <Controller
                  name="groupId"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder={InsuranceFormLabels.ENTER_GROUP_ID}
                      hasError={!!errors.groupId}
                      errorMessage={errors.groupId?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <CustomLabel label={InsuranceFormLabels.START_DATE} isRequired />
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        value={field.value}
                        disableFuture
                        handleDateChange={field.onChange}
                        hasError={!!errors.startDate}
                        errorMessage={errors.startDate?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={4}>
                  <CustomLabel label={InsuranceFormLabels.END_DATE} isRequired />
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        value={field.value}
                        disablePast
                        handleDateChange={field.onChange}
                        hasError={!!errors.endDate}
                        errorMessage={errors.endDate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={4}>
                  <CustomLabel label={InsuranceFormLabels.PATIENT_RELATIONSHIP} isRequired />
                  <Controller
                    name="relationship"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={addPatientConstants.SELECT_RELATIONSHIP}
                        value={field.value}
                        items={RelationshipList}
                        onChange={e => field.onChange(e)}
                        hasError={!!errors.relationship}
                        errorMessage={errors.relationship?.message as string}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12} display={'flex'} gap={2}>
              {watchRelationship !== 'SELF' && (
                <>
                  <Grid size={4}>
                    <CustomLabel
                      label={SUBSCRIBER_DETAILS_ENUM.FIRST_NAME}
                      isRequired={watchRelationship !== 'SELF'}
                    />
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          placeholder={SUBSCRIBER_DETAILS_ENUM.ENTER_FIRST_NAME}
                          hasError={!!errors.firstName}
                          errorMessage={errors.firstName?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={4}>
                    <CustomLabel
                      label={SUBSCRIBER_DETAILS_ENUM.LAST_NAME}
                      isRequired={watchRelationship !== 'SELF'}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          placeholder={SUBSCRIBER_DETAILS_ENUM.ENTER_LAST_NAME}
                          hasError={!!errors.lastName}
                          errorMessage={errors.lastName?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={4}>
                    <CustomLabel
                      label={SUBSCRIBER_DETAILS_ENUM.DATE_OF_BIRTH}
                      isRequired={watchRelationship !== 'SELF'}
                    />
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <CustomDatePicker
                          value={field.value || ''}
                          disableFuture
                          handleDateChange={field.onChange}
                          hasError={!!errors.dateOfBirth}
                          errorMessage={errors.dateOfBirth?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="insuranceCardFront"
                  control={control}
                  render={({ field }) => (
                    <CustomImageUpload
                      text={addPatientConstants.UPLOAD_FRONT_VIEW}
                      customStyle={{ width: '250px', height: '150px' }}
                      handleSetImage={image => {
                        const base64String = image as string;
                        field.onChange(base64String);
                        handleFrontPhotoUpload(base64String);
                      }}
                      imageUrl={field.value}
                      onRemoveImage={() => {
                        field.onChange('');
                        setPrimaryFrontPhoto('');
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="insuranceCardBack"
                  control={control}
                  render={({ field }) => (
                    <CustomImageUpload
                      text={addPatientConstants.UPLOAD_BACK_VIEW}
                      customStyle={{ width: '250px', height: '150px' }}
                      handleSetImage={image => {
                        const base64String = image as string;
                        field.onChange(base64String);
                        handleBackPhotoUpload(base64String);
                      }}
                      imageUrl={field.value}
                      onRemoveImage={() => {
                        field.onChange('');
                        setPrimaryBackPhoto('');
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <CustomButton
            variant="outlined"
            label={appointmentSettingConstants.CANCEL}
            onClick={handleCancel}
          />
          <CustomButton label={appointmentSettingConstants.SAVE} variant="filled" type="submit" />
        </Box>
      </form>
    </Box>
  );
}
