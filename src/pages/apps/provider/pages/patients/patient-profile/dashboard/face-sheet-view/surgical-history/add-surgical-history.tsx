import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import {
  PatientClinicControllerService,
  PatientSurgicalHistory,
  PatientSurgicalHistoryControllerService,
} from 'src/sdk/requests';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { historyConstants } from 'src/constants/patients-constants';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddSurgicalHistorySchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages } from 'src/constants/formConst';

type SurgicalHistoryProps = {
  isEdit: boolean;
  selectedData: any;
  onClose: () => void;
  refetchSurgicalHistory: () => void;
};

const AddSurgicalHistory = (props: SurgicalHistoryProps) => {
  const { isEdit, selectedData, onClose, refetchSurgicalHistory } = props;
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
  } = useForm<PatientSurgicalHistory>({
    defaultValues: {
      surgeryName: '',
      surgeryDate: '',
      note: '',
      uuid: '',
    },
    resolver: yupResolver(AddSurgicalHistorySchema) as any,
  });

    useEffect(() => {
      if (isEdit && selectedData) {
        setValue('surgeryName', selectedData.surgeryName || '');
        setValue('surgeryDate', selectedData.surgeryDate || '');
        setValue('note', selectedData.note || '');
      }
      if (!isEdit && !selectedData) {
        reset({
          surgeryName: '',
          surgeryDate: '',
          note: '',
          uuid: '',
        });
      }
    }, [isEdit, selectedData, setValue, reset]);
  

  const {
    mutate: createMedicalHistory,
    isSuccess: isSuccessCreateMedicalHistory,
    isError: isErrorCreateMedicalHistory,
    error: errorMedicalHistory,
    data: createMedicalHistoryData,
  } = useMutation({
    mutationFn: (data: PatientSurgicalHistory) =>
      PatientSurgicalHistoryControllerService.postApiMasterPatientSurgicalHistory({
        requestBody: data,
      }),
  });

  const {
    mutate: updateMedicalHistory,
    isSuccess: isSuccessUpdateMedicalHistory,
    isError: isErrorUpdateMedicalHistory,
    error: errorUpdateMedicalHistory,
    data: updateMedicalHistoryData,
  } = useMutation({
    mutationFn: (data: PatientSurgicalHistory) =>
      PatientSurgicalHistoryControllerService.putApiMasterPatientSurgicalHistory({
        requestBody: data,
      }),
  });

  useEffect(() => {
    if (isEdit || selectedData) {
      reset({
        surgeryName: selectedData.surgeryName || '',
        surgeryDate: selectedData.surgeryDate ||'',
        note: selectedData.note || '',
      });
    }
  }, [selectedData, isEdit]);

  useEffect(() => {
    if (isSuccessCreateMedicalHistory || isSuccessUpdateMedicalHistory) {
      refetchSurgicalHistory();
      reset();
      onClose();
    }
  }, [isSuccessCreateMedicalHistory, isSuccessUpdateMedicalHistory, refetchSurgicalHistory]);

  useApiFeedback(
    isErrorCreateMedicalHistory,
    errorMedicalHistory,
    isSuccessCreateMedicalHistory,
    (createMedicalHistoryData?.data?.message as string) ||
      APIFeedbackMessages.SURGICAL_HISTORY_CREATED_SUCCESSFULLY
  );
  useApiFeedback(
    isErrorUpdateMedicalHistory,
    errorUpdateMedicalHistory,
    isSuccessUpdateMedicalHistory,
    (updateMedicalHistoryData?.data?.message as string) ||
      APIFeedbackMessages.SURGICAL_HISTORY_UPDATED_SUCCESSFULLY
  );
  const onSubmit = (data: PatientSurgicalHistory) => {
    const payload = {
      ...data,
      patientClinic: {
        [patientClinic?.data?.uuid as string]:
          (patientClinic?.data?.patient as any)?.firstName +
            ' ' +
            (patientClinic?.data?.patient as any)?.lastName || '',
      },
      active: true,
      surgeryName: data.surgeryName,
      surgeryDate: data.surgeryDate,
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
          <CustomLabel label={historyConstants.SURGERY_NAME} isRequired />
          <Controller
            name="surgeryName"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={historyConstants.ENTER_SURGERY_NAME}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.surgeryName}
                errorMessage={errors.surgeryName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.SURGERY_DATE} isRequired />
          <Controller
            name="surgeryDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                disableFuture
                value={field.value || ''}
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={!!errors.surgeryDate}
                errorMessage={errors.surgeryDate?.message}
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

export default AddSurgicalHistory;
