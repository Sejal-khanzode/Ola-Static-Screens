import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AvatarUpload from 'src/components/core/reusable/image-upload/avatar-upload';
import { editPatientProfileSchema } from 'src/schema/patient-schema/patient-schema';
import { Address, Patient, PatientClinic } from 'src/sdk/requests';
import { yupResolver } from '@hookform/resolvers/yup';
import { addPatientConstants, formsConstants } from 'src/constants/patients-constants';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import {
  genderList,
  maritalStatusList,
  PatientEthnicityOptions,
  PatientRaceOptions,
  APIFeedbackMessages,
  RelationshipList,
} from 'src/constants/formConst';
import states from 'src/assets/states/states.json';
import { useMutation } from '@tanstack/react-query';
import { PatientClinicControllerService } from 'src/sdk/requests';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { languageOptions } from 'src/constants/formConst';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';

interface EditProfileProps {
  patientDetails?: any;
  isEdit?: boolean;
  onClose?: (shouldRefetch?: boolean) => void;
  refetch: () => void;
}

const EditProfile = (props: EditProfileProps) => {
  const { patientDetails, isEdit = true, onClose } = props;
  const [, setSubmitError] = useState<string | null>(null);
  const [initialAvatar, setInitialAvatar] = useState<string>('');

  const dispatch = useAppDispatch();

  const initialValues = {
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
  };
  const {
    control,
    setValue,
    reset,
    handleSubmit,

    formState: { errors, isSubmitted },
  } = useForm<PatientClinic>({
    defaultValues: initialValues,
    resolver: yupResolver(editPatientProfileSchema) as any,
  });

  const {
    mutate: updatePatient,
    data: updatePatientData,
    isPending: isUpdatePatientPending,
    isError: isUpdatedPatientError,
    error: updatePatientError,
    isSuccess: isUpdatedPatientSuccess,
  } = useMutation({
    mutationFn: (data: PatientClinic) => {
      return PatientClinicControllerService.putApiMasterPatientClinic({
        requestBody: data,
      });
    },
    onSuccess: () => {
      setSubmitError(null);
      onClose?.(true);
      reset();
    },
    onError: () => {
      setSubmitError('Failed to update patient. Please try again.');
    },
  });

  useEffect(() => {
    if (isEdit && patientDetails) {
      (setValue('active', patientDetails?.active),
        setValue('archived', patientDetails?.archive),
        setValue('patient', {
          uuid: patientDetails?.patient?.uuid || '',
          iamId: patientDetails?.patient?.iamId || '',
          avatar: patientDetails?.patient?.avatar || (null as any),
          firstName: patientDetails?.patient?.firstName || '',
          lastName: patientDetails?.patient?.lastName || '',
          dob: patientDetails?.patient?.dob || '',
          gender: patientDetails?.patient?.gender || undefined,
          email: patientDetails?.patient?.email || '',
          phone: patientDetails?.patient?.phone || '',
          ethnicity: patientDetails?.patient?.ethnicity || (null as any),
          race: patientDetails?.patient?.race || (null as any),
          language: patientDetails?.patient?.language || (null as any),
          maritalStatus: patientDetails?.patient?.maritalStatus || (null as any),
          ssn: patientDetails?.patient?.ssn || '',
          active: patientDetails?.active || true,
        }),
        setValue('address', {
          line1: patientDetails?.address?.line1 || '',
          line2: patientDetails?.address?.line2 || '',
          city: patientDetails?.address?.city || '',
          state: patientDetails?.address?.state || '',
          country: patientDetails?.address?.country || '',
          zipcode: patientDetails?.address?.zipcode || '',
        }),
        setValue('mrn', patientDetails?.mrn || ''));
      if (patientDetails?.emergencyContacts?.[0]) {
        setValue('emergencyContacts.0', patientDetails.emergencyContacts[0]);
      }
    }
  }, [isEdit, patientDetails, setValue]);

  const extractBase64 = (dataUrl: string) => {
    if (!dataUrl) return '';
    return dataUrl.split(',')[1] || '';
  };

  const handelChangeImage = (data: any) => {
    setValue('patient.avatar', data);
    setInitialAvatar(data);
  };

  const handleDeleteImage = () => {
    setValue('patient.avatar', null as any);
    setInitialAvatar(null as any);
  };
  const processImageData = (image: string | null | undefined): string | null => {
    if (!image) return null;

    if (typeof image === 'string' && image.startsWith('data:')) {
      return extractBase64(image);
    }
    return image;
  };

  const onSubmit = (data: PatientClinic) => {
    const patientData: PatientClinic = {
      ...data,
      uuid: patientDetails.uuid,
      active: patientDetails.active,
      archived: patientDetails.archived,
      patient: {
        ...data.patient,
        active: data.patient?.active,
        uuid: data.patient?.uuid,
        iamId: data.patient?.iamId,
        avatar: initialAvatar
          ? processImageData(data.patient?.avatar)
          : (data?.patient?.avatar as any),
      },
      patientInsurances: patientDetails?.patientInsurances,
      clinic: patientDetails?.clinic,
      address: patientDetails?.address,
      primaryProvider: patientDetails?.primaryProvider,
      intakeFormTemplateStatus: patientDetails?.intakeFormTemplateStatus,
      consentFormTemplateStatus: patientDetails?.consentFormTemplateStatus,
    };
    updatePatient(patientData);
  };

  useEffect(() => {
    if (isUpdatePatientPending) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isUpdatePatientPending]);

  useApiFeedback(
    isUpdatedPatientError,
    updatePatientError,
    isUpdatedPatientSuccess,
    (updatePatientData?.message || APIFeedbackMessages.PATIENT_UPDATED_SUCCESSFULLY) as string
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid size={12}>
          <Grid size={12} display={'flex'}>
            <Grid size={3} mt={3} ml={3}>
              <Controller
                name="patient.avatar"
                control={control}
                render={({ field }) => (
                  <AvatarUpload
                    {...field}
                    initialImage={field.value || (null as any)}
                    size={150}
                    onDeleteImage={handleDeleteImage}
                    onChange={handelChangeImage}
                  />
                )}
              />
            </Grid>
            <Grid size={9} gap={2}>
              <Grid size={12} display={'flex'} gap={2}>
                <Grid size={6}>
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
                <Grid size={6}>
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
              </Grid>

              <Grid size={12} display={'flex'} gap={2} mt={2}>
                <Grid size={6}>
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
                <Grid size={6}>
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
              </Grid>

              <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
                <Grid size={6}>
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
                <Grid size={6}>
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
            </Grid>
          </Grid>
          <Grid size={12} gap={2} display="flex" mt={2}>
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
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
          </Grid>

          <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
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
          </Grid>
          <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
              <CustomLabel label={addPatientConstants.ETHNICITY} />
              <Controller
                name="patient.ethnicity"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    placeholder={addPatientConstants.ENTER_ETHNICITY}
                    items={Object.entries(PatientEthnicityOptions).map(([value, label]) => ({
                      value: value,
                      label,
                    }))}
                    {...field}
                    value={field.value || ''}
                    hasError={!!errors?.patient?.ethnicity}
                    errorMessage={errors?.patient?.ethnicity?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid size={12} display="flex" flexDirection="row" gap={2} mt={2}>
            <Grid size={3.8}>
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
          </Grid>

          <Grid container mt={3} gap={2}>
            <Grid size={12}>
              <Typography variant="titleMedium4">
                {addPatientConstants.EMERGENCY_CONTACT_INFORMATION}
              </Typography>
            </Grid>

            <Grid container size={12} bgcolor="Base.white" gap={2}>
              <Grid size={12}>
                <Grid size={12} display="flex" flexDirection="row" gap={2}>
                  <Grid size={4}>
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

                  <Grid size={4}>
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
                  <Grid size={4}>
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
        </Grid>
      </Grid>

      <Grid display="flex" flexDirection="row" mb={2} justifyContent="flex-end" gap={2} py={2}>
        <Grid>
          <CustomButton variant="filled" type="submit" label={formsConstants.SAVE} />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfile;
