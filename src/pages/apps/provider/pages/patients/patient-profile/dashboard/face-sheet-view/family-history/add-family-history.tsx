import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { APIFeedbackMessages, RelationshipList } from 'src/constants/formConst';
import { historyConstants } from 'src/constants/patients-constants';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { AddFamilyHistorySchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import { usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryId } from 'src/sdk/queries';
import {
  PatientClinicControllerService,
  PatientFamilyHistory,
  PatientFamilyHistoryControllerService,
} from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

interface AddFamilyHistoryProps {
  isEdit: boolean;
  selectedData: any;
  onClose: () => void;
  refetchFamilyHistoryData: () => void;
}

const AddFamilyHistory = (props: AddFamilyHistoryProps) => {
  const { isEdit, selectedData, onClose, refetchFamilyHistoryData } = props;
  const patientUUID = getDataFromLocalStorage('patientUUID') as any;
  const famHistoryId = selectedData?.uuid;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      problems: '',
      relative: '',
      onSetAge: '',
      died: false,
      note: '',
      uuid: '',
    },
    resolver: yupResolver(AddFamilyHistorySchema) as any,
  });

  const { data: famHistoryData } =
    usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryId(
      {
        patientFamilyHistoryId: famHistoryId,
      }
    );

  const { data: patientClinic } = useQuery({
    queryKey: ['patientClinic', patientUUID],
    queryFn: () => {
      return PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUUID || '',
      });
    },
    enabled: !isEdit || !!patientUUID,
  });

  const {
    mutate: createFamilyHistory,
    isPending: isCreatingFamilyHistory,
    isSuccess: isSuccessCreateFamilyHistory,
    isError: isErrorCreateFamilyHistory,
    error: createFamilyHistoryError,
    data: createFamilyHistoryData,
  } = useMutation({
    mutationFn: (data: PatientFamilyHistory) => {
      return PatientFamilyHistoryControllerService.postApiMasterPatientFamilyHistory({
        requestBody: data,
      });
    },
  });

  const {
    mutate: updateFamilyHistory,
    isPending: isUpdatingFamilyHistory,
    isSuccess: isSuccessUpdateFamilyHistory,
    isError: isErrorUpdateFamilyHistory,
    error: updateFamilyHistoryError,
    data: updateFamilyHistoryData,
  } = useMutation({
    mutationFn: (data: PatientFamilyHistory) => {
      return PatientFamilyHistoryControllerService.putApiMasterPatientFamilyHistory({
        requestBody: data,
      });
    },
  });

    useEffect(() => {
    if (isEdit && famHistoryData?.data) {
      const familyData = famHistoryData.data;
      reset({
        problems: (familyData?.problems as string) || '',
        relative: (familyData.relative as string) || '',
        onSetAge: (familyData.onSetAge as string) || '',
        died: (familyData.died as boolean) || false,
        note: (familyData.note as string) || '',
      });
    } else if (!isEdit) {
      reset({
        problems: '',
        relative: '',
        onSetAge: '',
        died: false,
        note: '',
        uuid: '',
      });
    }
  }, [isEdit, famHistoryData, reset]);

  useEffect(() => {
    if (isSuccessCreateFamilyHistory || isSuccessUpdateFamilyHistory) {
      refetchFamilyHistoryData();
      reset();
      onClose();
    }
  }, [
    isSuccessCreateFamilyHistory,
    isSuccessUpdateFamilyHistory,
    refetchFamilyHistoryData,
    reset,
    onClose,
  ]);

  useApiFeedback(
    isErrorCreateFamilyHistory,
    createFamilyHistoryError,
    isSuccessCreateFamilyHistory,
    (createFamilyHistoryData?.data?.message as string) ||
      APIFeedbackMessages.FAMILY_HISTORY_CREATED_SUCCESSFULLY
  );
  useApiFeedback(
    isErrorUpdateFamilyHistory,
    updateFamilyHistoryError,
    isSuccessUpdateFamilyHistory,
    (updateFamilyHistoryData?.data?.message as string) ||
      APIFeedbackMessages.FAMILY_HISTORY_UPDATED_SUCCESSFULLY
  );

  const onSubmit = (data: PatientFamilyHistory) => {
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
      died: data.died,
      note: data.note,
      onSetAge: data.onSetAge,
      relative: data.relative,
      problems: data.problems,
      archive: false,
    };

    const updatePayload = {
      ...payload,
      uuid: isEdit ? famHistoryId : '',
    };

    if (isEdit) {
      updateFamilyHistory(updatePayload);
    } else {
      createFamilyHistory(payload);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label={historyConstants.PROBLEM_NAME} isRequired />
          <Controller
            name="problems"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={historyConstants.ENTER_PROBLEM_NAME}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.problems}
                errorMessage={errors.problems?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.RELATIVE} isRequired />
          <Controller
            name="relative"
            control={control}
            render={({ field }) => (
              <CustomSelect
                placeholder={historyConstants.SELECT_RELATIVE}
                items={RelationshipList}
                {...field}
                value={field.value || ''}
                hasError={!!errors?.relative}
                errorMessage={errors?.relative?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={historyConstants.ONSET_AGE} isRequired />
          <Controller
            name="onSetAge"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ''}
                placeholder={historyConstants.ENTER_ONSET_AGE}
                hasError={!!errors.onSetAge}
                errorMessage={errors.onSetAge?.message}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <CustomLabel label={`${historyConstants.DIED} ?`} />
          <Controller
            name="died"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value === true ? 'true' : 'false'}
                onChange={e => field.onChange(e.target.value === 'true')}
                placeholder=""
                items={[
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' },
                ]}
                hasError={!!errors.died}
                errorMessage={errors.died?.message}
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
            label={'Save'}
            disabled={isCreatingFamilyHistory || isUpdatingFamilyHistory}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddFamilyHistory;
