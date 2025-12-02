import { Grid, Typography, Box } from '@mui/material';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  MedicalCodeControllerService,
  PatientClinicControllerService,
  PatientDiagnosis,
  PatientDiagnosisControllerService,
} from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatymd } from 'src/constants/date-format';
import { useEffect } from 'react';
import CustomAutocomplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { APIFeedbackMessages } from 'src/constants/formConst';
import { addAllergyConstants } from 'src/constants/patients-constants';
import { AddDiagnosisSchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import { formConstants } from 'src/constants/setting-constants';

export const typeOptions = [
  { value: 'CHRONIC', label: 'Chronic' },
  { value: 'ACUTE', label: 'Acute' },
];

type DiagnosisFormData = PatientDiagnosis & {
  active: boolean;
  type: string;
};

interface AddDiagnosisProps {
  onClose: () => void;
  isEdit: boolean;
  selectedData: PatientDiagnosis | null;
  refetchDiagnosesData: () => void;
}

export default function AddDiagnosis(props: AddDiagnosisProps) {
  const { onClose, isEdit, selectedData, refetchDiagnosesData } = props;
  const dispatch = useAppDispatch();
  const patientClinicUuid = getDataFromLocalStorage('patientUUID');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<DiagnosisFormData>({
    defaultValues: {
      medicalCode: { uuid: '', code: '', description: '', type: 'ICD' },
      active: true,
      type: null as unknown as 'CHRONIC' | 'ACUTE' | undefined,
      diagnosedDate: '',
      note: '',
      uuid: '',
    },
    resolver: yupResolver(AddDiagnosisSchema) as any,
  });

  useEffect(() => {
    if (isEdit && selectedData) {
      reset({
        medicalCode: selectedData.medicalCode || {
          uuid: '',
          code: '',
          description: '',
          type: 'ICD',
        },
        active: selectedData.active ?? true,
        type: (selectedData.type?.toUpperCase() as 'CHRONIC' | 'ACUTE') || 'ACUTE',
        diagnosedDate: (selectedData.diagnosedDate as string) || '',
        note: selectedData.note || '',
        uuid: selectedData.uuid || '',
      });
    } else if (!isEdit && !selectedData) {
      reset({
        medicalCode: { uuid: '', code: '', description: '', type: 'ICD' },
        active: true,
        type: 'ACUTE',
        diagnosedDate: '',
        note: '',
        uuid: '',
      });
    }
  }, [isEdit, selectedData, reset]);

  const { data: medicalCodeOptionsData } = useQuery({
    queryKey: ['medicalCodeOptions'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'ICD',
      }),
  });

  const { data: patientClinic } = useQuery({
    queryKey: ['patientClinic', patientClinicUuid],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientClinicUuid || '',
      }),
  });

  const medicalCodeOptions = (medicalCodeOptionsData?.data?.content as any[]) || [];
  const patientClinicData = patientClinic?.data;

  const {
    mutate: createDiagnosis,
    isPending: isAddingDiagnosis,
    isSuccess: isSuccessCreateDiagnosis,
    isError: isErrorCreateDiagnosis,
    error: errorCreateDiagnosis,
    data: createdData,
  } = useMutation({
    mutationFn: (data: PatientDiagnosis) =>
      PatientDiagnosisControllerService.postApiMasterPatientDiagnosis({
        requestBody: data,
      }),
  });

  const {
    mutate: updateDiagnosis,
    isPending: isUpdatingDiagnosis,
    isSuccess: isSuccessUpdateDiagnosis,
    isError: isErrorUpdateDiagnosis,
    error: errorUpdateDiagnosis,
    data: updatedData,
  } = useMutation({
    mutationFn: (data: PatientDiagnosis) =>
      PatientDiagnosisControllerService.putApiMasterPatientDiagnosis({
        requestBody: data,
      }),
  });

  useEffect(() => {
    if (isAddingDiagnosis || isUpdatingDiagnosis) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isAddingDiagnosis, isUpdatingDiagnosis]);

  useApiFeedback(
    isErrorCreateDiagnosis,
    errorCreateDiagnosis,
    isSuccessCreateDiagnosis,
    (createdData?.data?.message, APIFeedbackMessages.DIAGNOSIS_CREATED_SUCCESSFULLY)
  );

  useApiFeedback(
    isErrorUpdateDiagnosis,
    errorUpdateDiagnosis,
    isSuccessUpdateDiagnosis,
    (updatedData?.data?.message, APIFeedbackMessages.DIAGNOSIS_UPDATED_SUCCESSFULLY)
  );

  useEffect(() => {
    if (isSuccessCreateDiagnosis || isSuccessUpdateDiagnosis) {
      refetchDiagnosesData();
      reset();
      onClose();
    }
  }, [isSuccessCreateDiagnosis, isSuccessUpdateDiagnosis, refetchDiagnosesData]);

  const onSubmit = (data: PatientDiagnosis) => {
    const payload = {
      ...data,
      patientClinic: {
        [patientClinicData?.uuid as string]:
          (patientClinicData?.patient as any)?.firstName +
            ' ' +
            (patientClinicData?.patient as any)?.lastName || '',
      },
      diagnosedDate: formatymd(data.diagnosedDate as string),
      recordedDate: new Date().toISOString(),
      active: data.active,
      type: data.type,
    };

    const updatePayload = {
      ...payload,
      uuid: data.uuid || '',
    };

    if (isEdit) {
      updateDiagnosis(updatePayload);
    } else {
      createDiagnosis(payload);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label="Diagnosis Name" isRequired />
          <Controller
            name="medicalCode"
            control={control}
            render={({ field }) => (
              <CustomAutocomplete
                {...field}
                value={field.value?.uuid || ''}
                onChange={selectedKey => {
                  const selectedOption = medicalCodeOptions.find(
                    option => option.uuid === selectedKey
                  );

                  if (selectedOption) {
                    const medicalCodeData = {
                      uuid: selectedOption.uuid,
                      code: selectedOption.code,
                      description: selectedOption.description,
                      type: selectedOption.type || 'ICD',
                    };
                    setValue('medicalCode', medicalCodeData, { shouldValidate: true });
                  } else {
                    setValue(
                      'medicalCode',
                      { uuid: '', code: '', description: '', type: 'ICD' },
                      { shouldValidate: true }
                    );
                  }
                }}
                placeholder={addAllergyConstants.SELECT_DIAGNOSIS_NAME}
                autoname="medicalCode"
                options={medicalCodeOptions.map((option: any) => ({
                  key: option.uuid,
                  value: `${option.code} - ${option.description}`,
                  child: (
                    <Typography variant="bodyMedium4">
                      {option.code} - {option.description}
                    </Typography>
                  ),
                }))}
                bgWhite
                hasError={!!errors.medicalCode}
                errorMessage={errors.medicalCode?.message || errors.medicalCode?.uuid?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={addAllergyConstants.STATUS} isRequired />
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value ? 'true' : 'false'}
                onChange={e => field.onChange(e.target.value === 'true')}
                placeholder={addAllergyConstants.SELECT_STATUS}
                items={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                hasError={!!errors.active}
                errorMessage={errors.active?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={addAllergyConstants.TYPE} isRequired />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                placeholder={addAllergyConstants.SELECT_TYPE}
                items={typeOptions}
                hasError={!!errors.type}
                errorMessage={errors.type?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={addAllergyConstants.ONSET_DATE} isRequired />
          <Controller
            name="diagnosedDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                disableFuture
                value={field.value || ''}
                handleDateChange={date => field.onChange(date)}
                hasError={!!errors.diagnosedDate}
                errorMessage={errors.diagnosedDate?.message}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <CustomLabel label={addAllergyConstants.NOTE} />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder="Type here"
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.note}
                errorMessage={errors.note?.message}
              />
            )}
          />
        </Grid>

        <Grid size={12} display="flex" gap={2} justifyContent="flex-end">
          <CustomButton
            variant="filled"
            type="submit"
            label={formConstants.SAVE}
            disabled={isAddingDiagnosis || isUpdatingDiagnosis}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
