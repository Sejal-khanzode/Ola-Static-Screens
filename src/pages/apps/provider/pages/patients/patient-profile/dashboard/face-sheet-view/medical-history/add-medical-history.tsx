import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import {
  PatientClinicControllerService,
  PatientMedicalHistory,
  PatientMedicalHistoryControllerService,
} from 'src/sdk/requests';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { historyConstants } from 'src/constants/patients-constants';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddMedicalHistorySchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages } from 'src/constants/formConst'

type MedicalHistoryProps = {
  isEdit: boolean;
  selectedData: any;
  onClose: () => void;
  refetchMedicalHistoryData: () => void;
};

const AddMedicalHistory = (props: MedicalHistoryProps) => {
  const { isEdit, selectedData, onClose, refetchMedicalHistoryData } = props;
  const patientUUID = getDataFromLocalStorage('patientUUID') as any;

  const { data: patientClinic } = useQuery({
    queryKey: ['patientClinic', patientUUID],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PatientMedicalHistory>({
    defaultValues: {
      conditionName: '',
      medicalHistoryDate: '',
      note: '',
      uuid: '',
    },
    resolver: yupResolver(AddMedicalHistorySchema) as any,
  });

    useEffect(() => {
    if (isEdit && selectedData) {
      setValue('conditionName', selectedData.conditionName || '');
      setValue('medicalHistoryDate', selectedData.medicalHistoryDate || '');
      setValue('note', selectedData.note || '');
    }
    if (!isEdit && !selectedData) {
      reset({
        conditionName: '',
        medicalHistoryDate: '',
        note: '',
        uuid: '',
      });
    }
  }, [isEdit, selectedData, setValue, reset]);


  const { mutate: createMedicalHistory, isSuccess: isSuccessCreateMedicalHistory, isError: isErrorCreateMedicalHistory, error: errorMedicalHistory, data: createMedicalHistoryData } = useMutation({
    mutationFn: (data: PatientMedicalHistory) =>
      PatientMedicalHistoryControllerService.postApiMasterPatientMedicalHistory({
        requestBody: data,
      }),
  });

  const { mutate: updateMedicalHistory , isSuccess: isSuccessUpdateMedicalHistory, isError: isErrorUpdateMedicalHistory, error: errorUpdateMedicalHistory, data: updateMedicalHistoryData } = useMutation({
    mutationFn: (data: PatientMedicalHistory) =>
      PatientMedicalHistoryControllerService.putApiMasterPatientMedicalHistory({
        requestBody: data,
      }),
  });

  useEffect(() => {
    if (selectedData) {
      reset({
        conditionName: selectedData.conditionName,
        medicalHistoryDate: selectedData.medicalHistoryDate,    
        note: selectedData.note,
      });
    }
  }, [selectedData]);

  useEffect(() => {
    if (isSuccessCreateMedicalHistory || isSuccessUpdateMedicalHistory) {
      onClose();
      refetchMedicalHistoryData();
    }
  }, [isSuccessCreateMedicalHistory, isSuccessUpdateMedicalHistory, refetchMedicalHistoryData]);

  useApiFeedback(
    isErrorCreateMedicalHistory,
    errorMedicalHistory,
    isSuccessCreateMedicalHistory,
    (createMedicalHistoryData?.data?.message as string) ||
      APIFeedbackMessages.MEDICAL_HISTORY_CREATED_SUCCESSFULLY
  );
  useApiFeedback(
    isErrorUpdateMedicalHistory,
    errorUpdateMedicalHistory,
    isSuccessUpdateMedicalHistory,
    (updateMedicalHistoryData?.data?.message as string) ||
      APIFeedbackMessages.MEDICAL_HISTORY_UPDATED_SUCCESSFULLY
  );
  const onSubmit = (data: PatientMedicalHistory) => {
    const payload = {
      ...data,
      patientClinic: {
        [patientClinic?.data?.uuid as string]:
          (patientClinic?.data?.patient as any)?.firstName +
            ' ' +
            (patientClinic?.data?.patient as any)?.lastName || '',
      },
      recordedDate: new Date().toISOString(),
      active: true,
      medicalHistoryDate: data.medicalHistoryDate,
      note: data.note,
      archive: false,
    };

    const updatePayload = {
      ...payload,
      uuid: selectedData?.uuid || '',
    };

    if (isEdit) {
      updateMedicalHistory(updatePayload);
    } else {
      createMedicalHistory(payload);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label={historyConstants.CONDITION_NAME} isRequired />
          <Controller
            name="conditionName"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={historyConstants.ENTER_CONDITION_NAME}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.conditionName}
                errorMessage={errors.conditionName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.ONSET_DATE} isRequired />
          <Controller
            name="medicalHistoryDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                disableFuture
                value={field.value || ''}
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={!!errors.medicalHistoryDate}
                errorMessage={errors.medicalHistoryDate?.message}
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
                errorMessage={errors.note?.message}
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

export default AddMedicalHistory;
