import { FormControlLabel, Grid, Radio, RadioGroup, Typography, Box } from '@mui/material';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AllergyControllerService,
  PatientAllergy,
  PatientAllergyControllerService,
  PatientClinicControllerService,
} from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useEffect } from 'react';
import { APIFeedbackMessages, ReactionOptions, SeverityOptions } from 'src/constants/formConst';
import { addAllergyConstants, formsConstants } from 'src/constants/patients-constants';
import { AddAllergySchema } from 'src/schema/clinician-dashboard-schema/clinician-dashboard-schema';
import { formatymd } from 'src/constants/date-format';

interface AddAllergyProps {
  onClose: () => void;
  isEdit: boolean;
  selectedData: PatientAllergy | null;
  refetchAllergyData: () => void;
}

export default function AddAllergy(props: AddAllergyProps) {
  const { onClose, isEdit, selectedData, refetchAllergyData } = props;

  const patientClinicUuid = getDataFromLocalStorage('patientUUID');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<PatientAllergy>({
    defaultValues: {
      allergyType: null as unknown as 'DRUG' | 'FOOD' | 'ENVIRONMENT' | 'OTHER',
      allergy: {
        uuid: '',
        name: '',
      },
      reaction: null as unknown as
        | 'PAIN'
        | 'RUNNY_NOSE'
        | 'SWELLING'
        | 'BLOATING'
        | 'VOMITING'
        | 'RASHES'
        | 'ITCHY_NOSE'
        | 'THROAT_CLOSING'
        | 'COUGH'
        | 'REDNESS',
      severity: null as unknown as 'MILD' | 'HIGH' | 'MODERATE',
      onSetDate: '',
      note: '',
      uuid: '',
    },
    resolver: yupResolver(AddAllergySchema) as any,
  });

  const watchedAllergyType = watch('allergyType');

  useEffect(() => {
    if (isEdit && selectedData) {
      reset({
        allergyType:
          (selectedData.allergyType?.toUpperCase() as 'DRUG' | 'FOOD' | 'ENVIRONMENT' | 'OTHER') ||
          '',
        allergy: selectedData.allergy || {
          uuid: '',
          name: '',
        },

        reaction: (selectedData.reaction
          ? selectedData.reaction.toUpperCase().replace(/ /g, '_')
          : '') as
          | 'PAIN'
          | 'RUNNY_NOSE'
          | 'SWELLING'
          | 'BLOATING'
          | 'VOMITING'
          | 'RASHES'
          | 'ITCHY_NOSE'
          | 'THROAT_CLOSING'
          | 'COUGH'
          | 'REDNESS',
        severity: (selectedData.severity?.toUpperCase() as 'MILD' | 'HIGH' | 'MODERATE') || '',
        onSetDate: selectedData.onSetDate as string,
        note: selectedData.note || '',
        uuid: selectedData.uuid || '',
      });
    } else if (!isEdit && !selectedData) {
      reset({
        allergyType: null as unknown as 'DRUG' | 'FOOD' | 'ENVIRONMENT' | 'OTHER',
        allergy: {
          uuid: '',
          name: '',
        },
        reaction: null as unknown as
          | 'PAIN'
          | 'RUNNY_NOSE'
          | 'SWELLING'
          | 'BLOATING'
          | 'VOMITING'
          | 'RASHES'
          | 'ITCHY_NOSE'
          | 'THROAT_CLOSING'
          | 'COUGH'
          | 'REDNESS',
        severity: null as unknown as 'MILD' | 'HIGH' | 'MODERATE',
        onSetDate: '',
        note: '',
        uuid: '',
      });
    }
  }, [isEdit, selectedData, reset]);

  const { data: allergyOptions } = useQuery({
    queryKey: ['allergyOptions'],
    queryFn: () => {
      return AllergyControllerService.getApiMasterAllergy();
    },
  });

  const { data: patientClinic } = useQuery({
    queryKey: ['patientClinic', patientClinicUuid],
    queryFn: () => {
      return PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientClinicUuid || '',
      });
    },
  });

  const allergyOptionsData = allergyOptions?.data?.content || [];
  const {
    mutate: addAllergy,
    data: allergyData,
    isPending: isAddingAllergy,
    isSuccess: isAllergySuccess,
    isError: isAllergyError,
    error: allergyError,
  } = useMutation({
    mutationFn: (data: PatientAllergy) => {
      return PatientAllergyControllerService.postApiMasterPatientAllergy({
        requestBody: data,
      });
    },
  });

  const {
    mutate: updateAllergy,
    data: updateAllergyData,
    isPending: isUpdatingAllergy,
    isSuccess: isAllergyUpdateSuccess,
    isError: isAllergyUpdateError,
    error: updateAllergyError,
  } = useMutation({
    mutationFn: (data: PatientAllergy) => {
      return PatientAllergyControllerService.putApiMasterPatientAllergy({
        requestBody: data,
      });
    },
  });

  useApiFeedback(
    isAllergyError,
    allergyError,
    isAllergySuccess,
    (allergyData?.data?.message, APIFeedbackMessages.ALLERGY_ADDED_SUCCESSFULLY)
  );

  useApiFeedback(
    isAllergyUpdateError,
    updateAllergyError,
    isAllergyUpdateSuccess,
    (updateAllergyData?.data?.message, APIFeedbackMessages.ALLERGY_UPDATED_SUCCESSFULLY)
  );

  const handleAllergyChange = (selectedUuid: string) => {
    const selectedAllergy = (allergyOptionsData as any[])?.find(
      (option: any) => option.uuid === selectedUuid
    );

    if (selectedAllergy) {
      setValue(
        'allergy',
        {
          uuid: selectedAllergy.uuid,
          name: selectedAllergy.name,
        },
        { shouldValidate: true }
      );
    }
  };

  useEffect(() => {
    if (isAllergySuccess || isAllergyUpdateSuccess) {
      refetchAllergyData();
      reset();
      onClose();
    }
  }, [isAllergySuccess, isAllergyUpdateSuccess, refetchAllergyData]);

  const onSubmit = (data: PatientAllergy) => {
    const payload = {
      ...data,
      patientClinic: {
        [patientClinic?.data?.uuid as string]:
          (patientClinic?.data?.patient as any)?.firstName +
            ' ' +
            (patientClinic?.data?.patient as any)?.lastName || '',
      },
      onSetDate: formatymd(data.onSetDate as string) || '',
      recordedDate: new Date().toISOString(),
    };

    const updatePayload = {
      ...payload,
      uuid: data.uuid || '',
    };

    if (isEdit) {
      updateAllergy(updatePayload as any);
      reset();
    } else {
      addAllergy(payload as any);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label={addAllergyConstants.ALLERGY_TYPE} isRequired />
          <Controller
            name="allergyType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row value={field.value || ''}>
                <FormControlLabel
                  checked={watchedAllergyType === 'DRUG'}
                  value="DRUG"
                  control={<Radio />}
                  label="Drug"
                />
                <FormControlLabel
                  checked={watchedAllergyType === 'FOOD'}
                  value="FOOD"
                  control={<Radio />}
                  label="Food"
                />
                <FormControlLabel
                  checked={watchedAllergyType === 'ENVIRONMENT'}
                  value="ENVIRONMENT"
                  control={<Radio />}
                  label="Environment"
                />
                <FormControlLabel
                  checked={watchedAllergyType === 'OTHER'}
                  value="OTHER"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          {errors.allergyType && (
            <Typography color="error" variant="caption">
              {errors.allergyType.message}
            </Typography>
          )}
        </Grid>

        <Grid size={12}>
          <CustomLabel label={addAllergyConstants.ALLERGY_NAME} isRequired />
          <Controller
            name="allergy"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value?.uuid || ''}
                onChange={e => handleAllergyChange(e.target.value)}
                placeholder="Select Allergy"
                items={
                  (allergyOptionsData as any[])?.map((option: any) => ({
                    value: option.uuid,
                    label: option.name,
                  })) || []
                }
                hasError={!!errors.allergy}
                errorMessage={errors.allergy?.message}
              />
            )}
          />
        </Grid>

        <Grid container size={12} spacing={2}>
          <Grid size={6}>
            <CustomLabel label={addAllergyConstants.REACTION} isRequired />
            <Controller
              name="reaction"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value || ''}
                  placeholder={addAllergyConstants.SELECT_REACTION}
                  items={ReactionOptions}
                  hasError={!!errors.reaction}
                  errorMessage={errors.reaction?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <CustomLabel label={addAllergyConstants.SEVERITY} isRequired />
            <Controller
              name="severity"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value || ''}
                  placeholder={addAllergyConstants.SELECT_SEVERITY}
                  items={SeverityOptions.map(option => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  hasError={!!errors.severity}
                  errorMessage={errors.severity?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid size={12}>
          <CustomLabel label={addAllergyConstants.ONSET_DATE} isRequired />
          <Controller
            name="onSetDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                value={field.value || ''}
                disableFuture
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={!!errors.onSetDate}
                errorMessage={errors.onSetDate?.message}
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
                placeholder={addAllergyConstants.TYPE_HERE}
                value={field.value || ''}
                onChange={field.onChange}
                hasError={!!errors.note}
                errorMessage={errors.note?.message}
              />
            )}
          />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <CustomButton
            variant="filled"
            type="submit"
            label={formsConstants.SAVE}
            disabled={isAddingAllergy || isUpdatingAllergy}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
