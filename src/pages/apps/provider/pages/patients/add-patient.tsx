import {
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { addPatientConstants, formsConstants } from 'src/constants/patients-constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import {
  genderList,
  maritalStatusList,
  PatientEthnicityOptions,
  PatientRaceOptions,
  APIFeedbackMessages,
  RelationshipList,
} from 'src/constants/formConst';
import { timeZoneType } from 'src/utils/timeZone';
import states from 'src/assets/states/states.json';
import {
  ClinicControllerService,
  PatientClinicControllerService,
  ProviderControllerService,
} from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { activeStatusOptions } from 'src/constants/staff-provider-types';

import { PatientClinic, Patient, Address, PatientInsurance } from 'src/sdk/requests/types.gen';
import { AddPatientSchema } from 'src/schema/patient-schema/patient-schema';
import useApiFeedback from 'src/hooks/useApiFeedback';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
import { languageOptions } from 'src/constants/formConst';
import { formatDateToISO } from 'src/constants/date-format';
import Insurance from './insurance';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import AvatarUpload from 'src/components/core/reusable/image-upload/avatar-upload';

const AddPatient = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clinicId = getDataFromLocalStorage('selectedClinicUuid');
  const [providersList, setProvidersList] = useState<any[]>([]);
  const [showSecondaryInsurance, setShowSecondaryInsurance] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [, setSubmitError] = useState<string | null>(null);
  const [, setInitialAvatar] = useState<string>('');
  const [secondaryInsuranceKey, setSecondaryInsuranceKey] = useState(0);
  const { pathname } = useLocation();
  const { uuid } = useParams();

  const isEdit = uuid ? true : false;

  const getDefaultInsuranceValues = (insuranceType: 'PRIMARY' | 'SECONDARY') => ({
    memberId: '',
    frontPhoto: '',
    backPhoto: '',
    groupId: '',
    subscriberFirstName: '',
    subscriberLastName: '',
    subscriberBirthDate: '',
    insuredRelationshipWithPatient: 'SELF' as any,
    insuranceType: insuranceType as any,
    insurancePayer: {
      payerId: '',
      payerName: '',
    },
    effectiveStartDate: '',
    effectiveEndDate: '',
    active: true,
    archive: false,
  });

  const initialValues: PatientClinic = {
    patient: {
      avatar: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: null as unknown as 'MALE' | 'FEMALE' | 'UNKNOWN' | 'OTHER' | undefined,
      email: '',
      phone: '',
      ethnicity: null as any,
      race: null as any,
      language: null as any,
      maritalStatus: null as any,
      ssn: '',
      active: true as boolean,
    } as Patient,
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
    } as Address,
    emergencyContacts: [
      {
        name: '',
        email: '',
        mobile: '',
        relationshipWithPatient: null as any,
      },
    ],
    patientInsurances: [
      getDefaultInsuranceValues('PRIMARY'),
      getDefaultInsuranceValues('SECONDARY'),
    ],
    active: true as boolean,
    primaryProvider: null as any,
    referringProvider: null as any,
    emailConsent: false,
    callConsent: false,
    timezone: 'PST' as any,
    source: '',
    customerId: '',
    phoneNotAvailable: false,
    emailNotAvailable: false,
  };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm<PatientClinic>({
    defaultValues: initialValues,
    resolver: yupResolver(AddPatientSchema(insurance, showSecondaryInsurance)) as any,
  });

  const { data: providers, refetch: refetchProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: () =>
      ProviderControllerService.getApiMasterProvider({
        clinicId: clinicId || '',
        archive: false,
      }),
  });

  const {
    mutate: getPatientClinic,
    data: patientClinicData,
    isPending: isGetPatientClinicPending,
  } = useMutation({
    mutationFn: () => {
      return PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: uuid || '',
      });
    },
  });

  useEffect(() => {
    if (uuid) {
      getPatientClinic();
    }
  }, [uuid]);

  const selectedPatientClinic = patientClinicData?.data as PatientClinic;

  useEffect(() => {
    if (isEdit && selectedPatientClinic) {
      setValue('patient', {
        uuid: selectedPatientClinic?.patient?.uuid || '',
        iamId: selectedPatientClinic?.patient?.iamId || '',
        avatar: selectedPatientClinic?.patient?.avatar || (null as any),
        firstName: selectedPatientClinic?.patient?.firstName || '',
        lastName: selectedPatientClinic?.patient?.lastName || '',
        dob: selectedPatientClinic?.patient?.dob || '',
        gender: selectedPatientClinic?.patient?.gender || undefined,
        email: selectedPatientClinic?.patient?.email || '',
        phone: selectedPatientClinic?.patient?.phone || '',
        ethnicity: selectedPatientClinic?.patient?.ethnicity || (null as any),
        race: selectedPatientClinic?.patient?.race || (null as any),
        language: selectedPatientClinic?.patient?.language || (null as any),
        maritalStatus: selectedPatientClinic?.patient?.maritalStatus || (null as any),
        ssn: selectedPatientClinic?.patient?.ssn || '',
        active: selectedPatientClinic?.active,
        archive: selectedPatientClinic?.archived,
      });

      setValue('address', {
        line1: selectedPatientClinic?.address?.line1 || '',
        line2: selectedPatientClinic?.address?.line2 || '',
        city: selectedPatientClinic?.address?.city || '',
        state: selectedPatientClinic?.address?.state || '',
        country: selectedPatientClinic?.address?.country || '',
        zipcode: selectedPatientClinic?.address?.zipcode || '',
      });

      if (selectedPatientClinic?.emergencyContacts?.[0]) {
        setValue('emergencyContacts.0', selectedPatientClinic.emergencyContacts[0]);
      }

      if (
        selectedPatientClinic?.patientInsurances &&
        selectedPatientClinic.patientInsurances.length > 0
      ) {
        const insuranceOrder: Record<string, number> = {
          PRIMARY: 1,
          SECONDARY: 2,
        };

        const sortedInsurances = [...selectedPatientClinic.patientInsurances].sort((a, b) => {
          const orderA = insuranceOrder[a.insuranceType as string] ?? 3;
          const orderB = insuranceOrder[b.insuranceType as string] ?? 3;
          return orderA - orderB;
        });

        sortedInsurances.forEach((insurance, index) => {
          setValue(`patientInsurances.${index}`, {
            uuid: insurance?.uuid || '',
            planName: insurance?.planName || '',
            planType: insurance?.planType || 'PPO',
            groupId: insurance?.groupId || '',
            memberId: insurance?.memberId || '',
            groupName: insurance?.groupName || '',
            frontPhoto: insurance?.frontPhoto || '',
            backPhoto: insurance?.backPhoto || '',
            subscriberFirstName: insurance?.subscriberFirstName || '',
            subscriberLastName: insurance?.subscriberLastName || '',
            subscriberBirthDate: insurance?.subscriberBirthDate || '',
            insuredRelationshipWithPatient: insurance?.insuredRelationshipWithPatient || 'SELF',
            insuranceType: insurance?.insuranceType || 'OTHER',
            insurancePayer: insurance?.insurancePayer || {
              payerId: '',
              payerName: '',
            },
            effectiveStartDate: insurance?.effectiveStartDate || '',
            effectiveEndDate: insurance?.effectiveEndDate || '',
            active: insurance?.active,
            archive: insurance?.archive,
          });
        });
      }
      setValue(
        'primaryProvider',
        selectedPatientClinic?.primaryProvider || initialValues.primaryProvider || undefined
      );
      setValue(
        'referringProvider',
        selectedPatientClinic?.referringProvider || initialValues.referringProvider || undefined
      );
      setValue('mrn', selectedPatientClinic?.mrn || '');
      setValue('emailConsent', selectedPatientClinic?.emailConsent || false);
      setValue('callConsent', selectedPatientClinic?.callConsent || false);
      setValue('timezone', selectedPatientClinic?.timezone || 'PST');
      setValue('active', selectedPatientClinic?.active ?? true);

      const primaryInsurance = selectedPatientClinic?.patientInsurances?.find(
        ins => ins.insuranceType === 'PRIMARY'
      );
      const hasValidInsuranceData =
        primaryInsurance?.insurancePayer?.payerId && primaryInsurance?.memberId;

      setInsurance(!!hasValidInsuranceData);

      const secondaryInsurance = selectedPatientClinic?.patientInsurances?.find(
        ins => ins.insuranceType === 'SECONDARY' && ins.archive !== true
      );
      const hasValidSecondaryInsurance =
        secondaryInsurance?.insurancePayer?.payerId && secondaryInsurance?.memberId;

      setShowSecondaryInsurance(!!hasValidSecondaryInsurance);
    }
  }, [isEdit, selectedPatientClinic, setValue]);

  const { data: clinic } = useQuery({
    queryKey: ['clinic'],
    queryFn: () =>
      ClinicControllerService.getApiMasterClinicByClinicId({
        clinicId: clinicId || '',
      }),
  });

  const {
    mutate: createPatient,
    data: createPatientData,
    isSuccess: isCreatedPatientSuccess,
    error: createPatientError,
    isError: isCreatePatientError,
    isPending: isCreatePatientPending,
  } = useMutation({
    mutationFn: (data: PatientClinic) => {
      return PatientClinicControllerService.postApiMasterPatientClinic({
        requestBody: data,
      });
    },
    onSuccess: () => {
      navigate('/provider/patients');
    },
  });

  const {
    mutate: updatePatient,
    data: updatePatientData,
    isSuccess: isUpdatedPatientSuccess,
    error: updatePatientError,
    isError: isUpdatedPatientError,
    isPending: isUpdatePatientPending,
  } = useMutation({
    mutationFn: (data: PatientClinic) => {
      return PatientClinicControllerService.putApiMasterPatientClinic({
        requestBody: data,
      });
    },
    onSuccess: () => {
      setSubmitError(null);
      if (pathname.includes('edit-profile')) {
        navigate('/provider/patients/patient-profile/profile-details');
      } else {
        navigate('/provider/patients');
      }
    },
    onError: () => {
      setSubmitError('Failed to update patient. Please try again.');
    },
  });

  const handleBackToPatients = () => {
    if (pathname.includes('profile-details')) {
      navigate('/provider/patients/patient-profile/profile-details');
    } else {
      navigate('/provider/patients');
    }
  };

  const extractBase64 = (dataUrl: string) => {
    if (!dataUrl) return '';
    return dataUrl.split(',')[1] || '';
  };

  const handleInsuranceToggle = (value: boolean) => {
    setInsurance(value);

    if (!value) {
      setValue('patientInsurances.0', getDefaultInsuranceValues('PRIMARY'));
      setValue('patientInsurances.1', getDefaultInsuranceValues('SECONDARY'));
      clearErrors('patientInsurances.0');
      clearErrors('patientInsurances.1');
      setShowSecondaryInsurance(false);
    } else {
      if (!showSecondaryInsurance) {
        setValue('patientInsurances.1', getDefaultInsuranceValues('SECONDARY'));
        clearErrors('patientInsurances.1');
      }
    }
  };

  const handleSecondaryInsurance = (value: boolean) => {
    setShowSecondaryInsurance(value);
    if (!value) {
      setValue('patientInsurances.1', getDefaultInsuranceValues('SECONDARY'));
      clearErrors('patientInsurances.1');
    } else {
      setValue('patientInsurances.1', getDefaultInsuranceValues('SECONDARY'));
      clearErrors('patientInsurances.1');
      setSecondaryInsuranceKey(prev => prev + 1);
    }
  };

  useApiFeedback(
    isCreatePatientError,
    createPatientError,
    isCreatedPatientSuccess,
    (createPatientData?.message || APIFeedbackMessages.PATIENT_CREATED_SUCCESSFULLY) as string
  );

  useApiFeedback(
    isUpdatedPatientError,
    updatePatientError,
    isUpdatedPatientSuccess,
    (updatePatientData?.message || APIFeedbackMessages.PATIENT_UPDATED_SUCCESSFULLY) as string
  );
  useEffect(() => {
    if (providers?.data?.content) {
      setProvidersList(providers?.data?.content as any);
    }
  }, [providers]);

  useEffect(() => {
    if (isGetPatientClinicPending || isCreatePatientPending || isUpdatePatientPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isGetPatientClinicPending, isCreatePatientPending, isUpdatePatientPending]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedClinicUuid') {
        getPatientClinic();
        refetchProviders();
      }
    };

    const handleClinicChanged = () => {
      getPatientClinic();
      refetchProviders();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinicChanged', handleClinicChanged as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinicChanged', handleClinicChanged as EventListener);
    };
  }, [refetchProviders]);

  const handleDeleteImage = () => {
    setValue('patient.avatar', null as any);
    setInitialAvatar('');
  };

  const onSubmit = (data: PatientClinic) => {
    const processImageData = (image: string | undefined): string => {
      if (!image) return '';
      if (typeof image === 'string' && !image.startsWith('data:')) {
        return image;
      }
      return extractBase64(image);
    };

    const patientData: PatientClinic = {
      ...data,
      uuid: uuid,
      active: data.active,
      patient: {
        ...data.patient,
        active: data?.active,
        archive: data?.archived,
        uuid: data.patient?.uuid,
        iamId: data.patient?.iamId,
        email: data.patient?.email?.toLowerCase(),
        avatar: data.patient?.avatar ? processImageData(data.patient.avatar) : (null as any),
      },
      clinic: {
        [clinic?.data?.uuid as string]: clinic?.data?.name as string,
      },
      intakeFormTemplateData: {
        healthHistory: {},
        familyHistory: {},
        healthHabit: {},
        menOnly: {},
        womenOnly: {},
      },
      consentFormTemplateData: {
        consentData: {},
      },
    };

    if (insurance) {
      const insurances = data.patientInsurances || [];
      let validInsurances;

      if (isEdit) {
        validInsurances = insurances.filter(ins => {
          return ins.insurancePayer?.payerId && ins.memberId;
        });
      } else {
        validInsurances = insurances.filter((ins, index) => {
          if (index === 0) {
            return ins.insurancePayer?.payerId && ins.memberId;
          }
          if (index === 1) {
            return showSecondaryInsurance && ins.insurancePayer?.payerId && ins.memberId;
          }
          return false;
        });
      }

      if (validInsurances.length > 0) {
        const insuranceOrder: Record<string, number> = { PRIMARY: 1, SECONDARY: 2 };
        const sortedInsurances = [...validInsurances].sort((a, b) => {
          const orderA = insuranceOrder[a.insuranceType as string] ?? 3;
          const orderB = insuranceOrder[b.insuranceType as string] ?? 3;
          return orderA - orderB;
        });
        const transformedInsurances: PatientInsurance[] = sortedInsurances.map(ins => ({
          uuid: ins.uuid || '',
          planName: ins.planName || '',
          planType: ins.planType || 'PPO',
          groupId: ins.groupId || '',
          memberId: ins.memberId || '',
          groupName: ins.groupName || '',
          frontPhoto: processImageData(ins.frontPhoto),
          backPhoto: processImageData(ins.backPhoto),
          subscriberFirstName: ins.subscriberFirstName || '',
          subscriberLastName: ins.subscriberLastName || '',
          subscriberBirthDate: formatDateToISO(ins.subscriberBirthDate || ''),
          insuredRelationshipWithPatient: ins.insuredRelationshipWithPatient || 'SELF',
          insuranceType: ins.insuranceType || 'OTHER',
          insurancePayer: ins.insurancePayer
            ? {
                payerId: ins.insurancePayer.payerId || '',
                payerName: ins.insurancePayer.payerName || '',
              }
            : undefined,
          effectiveStartDate: formatDateToISO(ins.effectiveStartDate || ''),
          effectiveEndDate: formatDateToISO(ins.effectiveEndDate || ''),
          active: ins.active,
          archive: ins.archive,
        }));

        patientData.patientInsurances = transformedInsurances;
      } else {
        patientData.patientInsurances = undefined;
      }
    } else {
      patientData.patientInsurances = undefined;
    }

    if (isEdit) {
      updatePatient(patientData);
    } else {
      createPatient(patientData);
    }
  };

  return (
    <Grid
      size={12}
      sx={{
        spacing: 4,
        direction: 'column',
      }}
    >
      <Grid display="flex" flexDirection="row" alignItems="center" gap={1} size={12} pb={0.5}>
        <Box onClick={handleBackToPatients} sx={{ cursor: 'pointer' }}>
          <BackArrowIcon color="Primary.main" />
        </Box>
        <Typography variant="titleMedium1">
          {isEdit ? addPatientConstants.EDIT_PATIENT : addPatientConstants.ADD_PATIENT}
        </Typography>
      </Grid>
      <Grid
        flex={1}
        sx={{
          overflowY: 'auto',
          height: 'calc(100vh - 90px)',
          scrollbarWidth: 'none',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Grid container spacing={1}>
              <Grid container size={12} bgcolor="Base.white" p={1.5} gap={2}>
                <Grid size={1.45} paddingLeft={3} paddingTop={4}>
                  <Controller
                    name="patient.avatar"
                    control={control}
                    render={({ field }) => (
                      <AvatarUpload
                        {...field}
                        initialImage={field.value || ''}
                        size={150}
                        onDeleteImage={handleDeleteImage}
                      />
                    )}
                  />
                </Grid>
                <Grid size={10.45}>
                  <Grid size={12} display="flex" flexDirection="row" gap={2}>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.FIRST_NAME} isRequired />
                      <Controller
                        name="patient.firstName"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_FIRST_NAME}
                            bgWhite
                            {...field}
                            hasError={!!errors?.patient?.firstName}
                            errorMessage={errors?.patient?.firstName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.LAST_NAME} isRequired />
                      <Controller
                        name="patient.lastName"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_LAST_NAME}
                            bgWhite
                            {...field}
                            hasError={!!errors?.patient?.lastName}
                            errorMessage={errors?.patient?.lastName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.EMAIL} isRequired />
                      <Controller
                        name="patient.email"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_EMAIL}
                            bgWhite
                            {...field}
                            disableField={isEdit ? true : false}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.email}
                            errorMessage={errors?.patient?.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.DATE_OF_BIRTH} isRequired />
                      <Controller
                        name="patient.dob"
                        control={control}
                        render={({ field }) => (
                          <CustomDatePicker
                            value={field.value || ''}
                            handleDateChange={(date: string) => field.onChange(date)}
                            disableFuture
                            hasError={(isSubmitted && !field.value) || !!errors?.patient?.dob}
                            errorMessage={
                              errors?.patient?.dob?.message ||
                              (isSubmitted && !field.value ? addPatientConstants.DATE_OF_BIRTH : '')
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.PHONE_NUMBER} isRequired />
                      <Controller
                        name="patient.phone"
                        control={control}
                        render={({ field }) => (
                          <CustomContactInput
                            placeholder={addPatientConstants.ENTER_PHONE}
                            {...field}
                            hasError={!!errors?.patient?.phone}
                            errorMessage={errors?.patient?.phone?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CustomLabel label={addPatientConstants.GENDER} isRequired />
                      <Controller
                        name="patient.gender"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.SELECT_GENDER}
                            items={genderList}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.gender}
                            errorMessage={errors?.patient?.gender?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.ADDRESS_LINE_1} isRequired />
                      <Controller
                        name="address.line1"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_ADDRESS_LINE_1}
                            bgWhite
                            {...field}
                            hasError={!!errors?.address?.line1}
                            errorMessage={errors?.address?.line1?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.ADDRESS_LINE_2} />
                      <Controller
                        name="address.line2"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_ADDRESS_LINE_2}
                            bgWhite
                            {...field}
                            hasError={!!errors?.address?.line2}
                            errorMessage={errors?.address?.line2?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.CITY} isRequired />
                      <Controller
                        name="address.city"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_CITY}
                            bgWhite
                            {...field}
                            hasError={!!errors?.address?.city}
                            errorMessage={errors?.address?.city?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.STATE} isRequired />
                      <Controller
                        name="address.state"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.SELECT_STATE}
                            items={states.map((item: any) => ({
                              label: item.name,
                              value: item.code,
                            }))}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.address?.state}
                            errorMessage={errors?.address?.state?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.ZIP_CODE} isRequired />
                      <Controller
                        name="address.zipcode"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_ZIP_CODE}
                            bgWhite
                            {...field}
                            hasError={!!errors?.address?.zipcode}
                            errorMessage={errors?.address?.zipcode?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.TIME_ZONE} />
                      <Controller
                        name="timezone"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.SELECT_TIMEZONE}
                            items={timeZoneType.map(item => ({
                              label: item.value,
                              value: item.key,
                            }))}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.timezone}
                            errorMessage={errors?.timezone?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.MARITAL_STATUS} />
                      <Controller
                        name="patient.maritalStatus"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.SELECT_MARITAL_STATUS}
                            items={maritalStatusList}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.maritalStatus}
                            errorMessage={errors?.patient?.maritalStatus?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.SSN} />
                      <Controller
                        name="patient.ssn"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            placeholder={addPatientConstants.ENTER_SSN}
                            bgWhite
                            isNumeric
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.ssn}
                            errorMessage={errors?.patient?.ssn?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.RACE} />
                      <Controller
                        name="patient.race"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.ENTER_RACE}
                            items={Object.entries(PatientRaceOptions).map(([value, label]) => ({
                              value: value,
                              label,
                            }))}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.race}
                            errorMessage={errors?.patient?.race?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.ETHNICITY} />
                      <Controller
                        name="patient.ethnicity"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.ENTER_ETHNICITY}
                            items={Object.entries(PatientEthnicityOptions).map(
                              ([value, label]) => ({
                                value: value,
                                label,
                              })
                            )}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.ethnicity}
                            errorMessage={errors?.patient?.ethnicity?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={1.95}>
                      <CustomLabel label={addPatientConstants.LANGUAGE} />
                      <Controller
                        name="patient.language"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={addPatientConstants.SELECT_LANGUAGE}
                            items={languageOptions}
                            {...field}
                            value={field.value || ''}
                            hasError={!!errors?.patient?.language}
                            errorMessage={errors?.patient?.language?.message}
                          />
                        )}
                      />
                    </Grid>
                    {isEdit && (
                      <Grid size={1.95}>
                        <CustomLabel label={addPatientConstants.STATUS} />
                        <Controller
                          name="active"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={addPatientConstants.SELECT_STATUS}
                              items={activeStatusOptions}
                              {...field}
                              value={field.value === true ? 'true' : 'false'}
                              hasError={!!errors?.active}
                              errorMessage={errors?.active?.message}
                              onChange={e => {
                                field.onChange(e.target.value === 'true');
                              }}
                            />
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3} pt={1} size={12}>
              <Grid size={6.72}>
                <Grid container spacing={1} direction={'column'}>
                  <Grid>
                    <Typography variant="titleMedium4">
                      {addPatientConstants.EMERGENCY_CONTACT_INFORMATION}
                    </Typography>
                  </Grid>

                  <Grid container size={12} bgcolor="Base.white" p={1} gap={2}>
                    <Grid container size={12} gap={2}>
                      <Grid size={3.93}>
                        <CustomLabel label={addPatientConstants.NAME} />
                        <Controller
                          name="emergencyContacts.0.name"
                          control={control}
                          render={({ field }) => (
                            <CustomInput
                              placeholder={addPatientConstants.ENTER_NAME}
                              bgWhite
                              {...field}
                              value={field.value || ''}
                              hasError={!!errors?.emergencyContacts?.[0]?.name}
                              errorMessage={errors?.emergencyContacts?.[0]?.name?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={3.93}>
                        <CustomLabel label={addPatientConstants.PHONE_NUMBER} />
                        <Controller
                          name="emergencyContacts.0.mobile"
                          control={control}
                          render={({ field }) => (
                            <CustomContactInput
                              placeholder={addPatientConstants.ENTER_PHONE}
                              {...field}
                              hasError={!!errors?.emergencyContacts?.[0]?.mobile}
                              errorMessage={errors?.emergencyContacts?.[0]?.mobile?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={3.93}>
                        <CustomLabel label={addPatientConstants.RELATIONSHIP_WITH_PATIENT} />
                        <Controller
                          name="emergencyContacts.0.relationshipWithPatient"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={addPatientConstants.SELECT_RELATIONSHIP}
                              items={RelationshipList}
                              {...field}
                              value={field.value || ''}
                              hasError={!!errors?.emergencyContacts?.[0]?.relationshipWithPatient}
                              errorMessage={
                                errors?.emergencyContacts?.[0]?.relationshipWithPatient?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={5.27}>
                <Grid container spacing={1} direction={'column'}>
                  <Grid>
                    <Typography variant="titleMedium4">
                      {addPatientConstants.CLINICIAN_INFORMATION}
                    </Typography>
                  </Grid>

                  <Grid container size={12} bgcolor="Base.white" p={1} gap={1}>
                    <Grid container size={12} gap={2}>
                      <Grid size={5.9}>
                        <CustomLabel label={addPatientConstants.PRIMARY_CLINICIAN} />
                        <Controller
                          name="primaryProvider"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={addPatientConstants.SELECT_PRIMARY_CLINICIAN}
                              items={providersList.map((option: any) => ({
                                label: `${option.firstName} ${option.lastName}`,
                                value: option.uuid,
                              }))}
                              {...field}
                              onChange={e => {
                                const selectedValue = e.target.value;
                                if (!selectedValue) {
                                  field.onChange(null);
                                } else {
                                  const selectedProvider = providersList.find(
                                    p => p.uuid === selectedValue
                                  );
                                  field.onChange({
                                    [selectedValue]: `${selectedProvider?.firstName} ${selectedProvider?.lastName}`,
                                  });
                                }
                              }}
                              value={
                                field.value && typeof field.value === 'object'
                                  ? Object.keys(field.value)[0] || ''
                                  : ''
                              }
                              hasError={!!errors.primaryProvider}
                              errorMessage={String(errors?.primaryProvider?.message || '')}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={5.9}>
                        <CustomLabel label={addPatientConstants.REFERRING_CLINICIAN} />
                        <Controller
                          name="referringProvider"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={addPatientConstants.SELECT_REFERRING_CLINICIAN}
                              isDisabled
                              items={providersList.map((option: any) => ({
                                label: `${option.firstName} ${option.lastName}`,
                                value: option.uuid,
                              }))}
                              {...field}
                              onChange={e => {
                                const selectedValue = e.target.value;
                                if (!selectedValue) {
                                  field.onChange(null);
                                } else {
                                  const selectedProvider = providersList.find(
                                    p => p.uuid === selectedValue
                                  );
                                  field.onChange({
                                    [selectedValue]: `${selectedProvider?.firstName} ${selectedProvider?.lastName}`,
                                  });
                                }
                              }}
                              value={
                                field.value && typeof field.value === 'object'
                                  ? Object.keys(field.value)[0] || ''
                                  : ''
                              }
                              hasError={!!errors.referringProvider}
                              errorMessage={errors.referringProvider?.message as unknown as string}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container mt={0.2} size={12} display={'flex'} flexDirection={'row'}>
              <Grid size={12} display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                <Typography variant="titleMedium4">
                  {addPatientConstants.INSURANCE_DETAILS}
                </Typography>
                <Grid display="flex" flexDirection="row">
                  <FormControl>
                    <RadioGroup
                      row
                      value={insurance ? 'true' : 'false'}
                      onChange={e => handleInsuranceToggle(e.target.value === 'true')}
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio size="small" />}
                        label={addPatientConstants.SELF_PAY}
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio size="small" />}
                        label={addPatientConstants.INSURANCE}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid size={12}>
                {insurance === true && (
                  <Grid bgcolor="Base.white" px={1.5} display={'flex'} flexDirection={'row'}>
                    <Grid size={5.7}>
                      <Box
                        sx={{
                          color: 'Primary.main',
                          my: 1,
                        }}
                      >
                        <Typography variant="bodyMedium4" sx={{ color: 'Primary.main' }}>
                          {addPatientConstants.PRIMARY_INSURANCE}
                        </Typography>
                      </Box>
                      <Insurance
                        insuranceType={'PRIMARY'}
                        patientInsurances={getValues('patientInsurances') || []}
                        control={control}
                        errors={errors}
                        isSubmitted={isSubmitted}
                        insuranceIndex={0}
                        watch={' '}
                        setValue={setValue}
                      />
                    </Grid>
                    <Grid
                      size={0.6}
                      display="flex"
                      alignItems="center"
                      py={2}
                      justifyContent="center"
                    >
                      <Box
                        borderLeft={1}
                        alignItems="center"
                        py={2}
                        justifyContent="center"
                        borderColor="Neutral.40"
                        height="100%"
                      ></Box>
                    </Grid>

                    <Grid size={5.7}>
                      <Box
                        sx={{
                          color: 'Primary.main',
                          textDecoration: 'underline',
                          my: 1,
                        }}
                      >
                        <Typography
                          variant="bodyMedium4"
                          sx={{ cursor: 'pointer', color: 'Primary.main' }}
                          onClick={() => handleSecondaryInsurance(!showSecondaryInsurance)}
                        >
                          {showSecondaryInsurance
                            ? addPatientConstants.REMOVE_SECONDARY_INSURANCE
                            : addPatientConstants.ADD_SECONDARY_INSURANCE}
                        </Typography>
                      </Box>
                      {showSecondaryInsurance == true && (
                        <Insurance
                          key={`secondary-insurance-${secondaryInsuranceKey}`}
                          insuranceType={'SECONDARY'}
                          patientInsurances={getValues('patientInsurances') || []}
                          control={control}
                          errors={errors}
                          isSubmitted={isSubmitted}
                          insuranceIndex={1}
                          setValue={setValue}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" flexDirection="row" mb={2} justifyContent="flex-end" gap={2} py={2}>
            <Grid>
              <CustomButton
                variant="outlined"
                label={formsConstants.CANCEL}
                onClick={handleBackToPatients}
              />
            </Grid>
            <Grid>
              <CustomButton variant="filled" type="submit" label={formsConstants.SAVE} />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddPatient;
