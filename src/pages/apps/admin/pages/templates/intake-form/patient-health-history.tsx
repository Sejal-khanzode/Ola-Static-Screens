import { Grid, Typography, Box, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AddIcon } from 'src/assets/icons/addIcon';
import { DeleteIcon } from 'src/assets/icons/deleteIcon';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomTextField from 'src/components/core/reusable/custom-text-area/custom-textarea';
import CustomIcon from 'src/components/core/reusable/CustomIcon';
import { useDebouncedCallback } from 'use-debounce';

interface HealthHistoryFormProps {
  onChangeData?: (data: HealthHistoryFormData) => void;
  data?: HealthHistoryFormData | null;
  patientApptIntake?: string;
}

export interface HealthHistoryFormData {
  childhoodIllnesses: {
    [key: string]: boolean;
  };
  immunizations: {
    [key: string]: boolean;
  };
  immunizationDates: {
    [key: string]: string;
  };
  medicalProblems: string[];
  surgeries: {
    year: string;
    reason: string;
    hospital: string;
  }[];
  allergies: string[];
  prescribedDrugs: {
    name: string;
    strength: string;
    frequency: string;
  }[];
  significantSymptoms: {
    [key: string]: boolean;
  };
  recentChanges: {
    [key: string]: boolean;
  };
  recentChangesExplaination: string;
}

const HealthHistoryForm: React.FC<HealthHistoryFormProps> = ({
  onChangeData,
  data,
  patientApptIntake,
}) => {
  const [loadedDataRef, setLoadedDataRef] = useState<any>(null);

  const { control, getValues, setValue, watch } = useForm<HealthHistoryFormData>({
    defaultValues: {
      childhoodIllnesses: {
        Measles: false,
        Mumps: false,
        Rubella: false,
        'Rheumatic Fever': false,
        Polio: false,
        'Chicken Pox': false,
      },
      immunizations: {
        Tetanus: false,
        Pneumonia: false,
        Hepatitis: false,
        'Chicken Pox': false,
        Influenza: false,
        MMR: false,
      },
      immunizationDates: {
        Tetanus: '',
        Pneumonia: '',
        Hepatitis: '',
        'Chicken Pox': '',
        Influenza: '',
        MMR: '',
      },
      medicalProblems: [''],
      surgeries: [{ year: '', reason: '', hospital: '' }],
      prescribedDrugs: [{ name: '', strength: '', frequency: '' }],
      allergies: [''],
      significantSymptoms: {
        Skin: false,
        'Chest/Heart': false,
        Ears: false,
        Throat: false,
        Lungs: false,
        Back: false,
        Nose: false,
        Bladder: false,
        Circulation: false,
        Intestinal: false,
        Other: false,
      },
      recentChanges: {
        Weight: false,
        Energy: false,
        Sleep: false,
        Other: false,
      },
      recentChangesExplaination: '',
    },
  });

  useEffect(() => {
    if (data && data !== loadedDataRef) {
      if (data.childhoodIllnesses !== undefined) {
        setValue('childhoodIllnesses', data.childhoodIllnesses, { shouldDirty: false });
      }
      if (data.immunizations !== undefined) {
        setValue('immunizations', data.immunizations, { shouldDirty: false });
      }
      if (data.immunizationDates !== undefined) {
        setValue('immunizationDates', data.immunizationDates, { shouldDirty: false });
      }
      if (data.medicalProblems !== undefined && data.medicalProblems.length > 0) {
        setValue('medicalProblems', data.medicalProblems, { shouldDirty: false });
      }
      if (data.surgeries !== undefined && data.surgeries.length > 0) {
        setValue('surgeries', data.surgeries, { shouldDirty: false });
      }
      if (data.prescribedDrugs !== undefined && data.prescribedDrugs.length > 0) {
        setValue('prescribedDrugs', data.prescribedDrugs, { shouldDirty: false });
      }
      if (data.allergies !== undefined && data.allergies.length > 0) {
        setValue('allergies', data.allergies, { shouldDirty: false });
      }
      if (data.significantSymptoms !== undefined) {
        setValue('significantSymptoms', data.significantSymptoms, { shouldDirty: false });
      }
      if (data.recentChanges !== undefined) {
        setValue('recentChanges', data.recentChanges, { shouldDirty: false });
      }
      if (data.recentChangesExplaination !== undefined) {
        setValue('recentChangesExplaination', data.recentChangesExplaination, {
          shouldDirty: false,
        });
      }

      setLoadedDataRef(data);
    }
  }, [data, setValue, loadedDataRef]);

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: HealthHistoryFormData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    debouncedChange(formValues as any);
  }, [formValues]);

  const surgeries = watch('surgeries') || [];
  const prescribedDrugs = watch('prescribedDrugs') || [];
  const allergies = watch('allergies') || [];

  const addSurgery = () => {
    const currentSurgeries = getValues('surgeries') || [];
    setValue('surgeries', [
      ...currentSurgeries,
      {
        year: '',
        reason: '',
        hospital: '',
      },
    ]);
  };

  const removeSurgery = (index: number) => {
    const currentSurgeries = getValues('surgeries') || [];
    const updatedSurgeries = currentSurgeries.filter((_, i) => i !== index);
    setValue('surgeries', updatedSurgeries);
  };

  const addPrescribedDrug = () => {
    const currentPrescribedDrugs = getValues('prescribedDrugs') || [];
    setValue('prescribedDrugs', [
      ...currentPrescribedDrugs,
      {
        name: '',
        strength: '',
        frequency: '',
      },
    ]);
  };
  const removePrescribedDrug = (index: number) => {
    const currentPrescribedDrugs = getValues('prescribedDrugs') || [];
    const updatedPrescribedDrugs = currentPrescribedDrugs.filter((_, i) => i !== index);
    setValue('prescribedDrugs', updatedPrescribedDrugs);
  };

  const addAllergy = () => {
    const currentAllergies = getValues('allergies') || [];
    setValue('allergies', [...currentAllergies, '']);
  };

  const removeAllergy = (index: number) => {
    const currentAllergies = getValues('allergies') || [];
    const updatedAllergies = currentAllergies.filter((_, i) => i !== index);
    setValue('allergies', updatedAllergies);
  };

  return (
    <Grid container sx={{ width: '100%', overflowY: 'auto', padding: 1 }}>
      <Grid size={12} sx={{ paddingLeft: 1, gap: 1 }}>
        <Grid size={12}>
          <Typography variant="bodyMedium4">Childhood Illness:</Typography>
          <Grid columnGap={3} direction="row" flexWrap="wrap" gap={5} sx={{ p: 0, m: 0, mt: -1 }}>
            {['Measles', 'Mumps', 'Rubella', 'Rheumatic Fever', 'Polio', 'Chicken Pox'].map(
              illness => (
                <Controller
                  key={illness}
                  name={`childhoodIllnesses.${illness}` as keyof HealthHistoryFormData}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as unknown as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label={illness}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
              )
            )}
          </Grid>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">Immunizations and Dates:</Typography>
          <Stack direction="row" gap={0.5} sx={{ p: 0, m: 0, mt: -1 }}>
            {['Tetanus', 'Pneumonia', 'Hepatitis', 'Chicken Pox', 'Influenza', 'MMR'].map(
              immunization => (
                <Controller
                  key={immunization}
                  name={`immunizations.${immunization}`}
                  control={control}
                  render={({ field }) => (
                    <Grid display={'flex'} flexDirection={'column'} sx={{ mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={field.value as boolean}
                            onChange={e => field.onChange(e.target.checked)}
                            disabled={!!patientApptIntake}
                          />
                        }
                        label={immunization}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                      />
                      <Grid size={2} sx={{ width: '90%', mt: -0.5 }}>
                        <Controller
                          name={`immunizationDates.${immunization}`}
                          control={control}
                          render={({ field: dateField }) => (
                            <CustomDatePicker
                              {...dateField}
                              value={dateField.value as unknown as string}
                              handleDateChange={(date: any) => dateField.onChange(date)}
                              disabled={!field.value || !!patientApptIntake}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}
                />
              )
            )}
          </Stack>
        </Grid>

        <Grid size={12} mt={0.2}>
          <Typography variant="bodyMedium4">
            List any medical problems that other doctors have diagnosed:
          </Typography>
          <Stack spacing={1}>
            <Controller
              name="medicalProblems.0"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  minRow={2}
                  value={field.value || ''}
                  placeholder="Enter medical problem"
                  isDisabled={!!patientApptIntake}
                />
              )}
            />
          </Stack>
        </Grid>

        <Grid size={12} mt={0.2}>
          <Typography variant="bodyMedium4">Past Surgeries and Major Hospitalizations:</Typography>
          <Stack spacing={1}>
            {surgeries.map((_, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid>
                  <Typography variant="bodyMedium4" sx={{ ml: 1 }}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid size={1.7}>
                  <Controller
                    name={`surgeries.${index}.year` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        {...field}
                        value={field.value as unknown as string}
                        handleDateChange={(date: any) => field.onChange(date)}
                        disabled={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                <Grid size={5.4}>
                  <Controller
                    name={`surgeries.${index}.reason` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        placeholder="Reason"
                        disableField={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                <Grid size={3.9}>
                  <Controller
                    name={`surgeries.${index}.hospital` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        placeholder="Hospital"
                        disableField={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                {surgeries.length > 1 ? (
                  <Grid size={0.25}>
                    <CustomIcon
                      iconColor="Negative.40"
                      size="medium"
                      icon={<DeleteIcon style={{ cursor: 'pointer' }} />}
                      onClick={() => removeSurgery(index)}
                    />
                  </Grid>
                ) : (
                  <Grid size={0.25}>
                    <CustomIcon
                      iconColor="Negative.40"
                      size="medium"
                      icon={<DeleteIcon style={{ cursor: 'pointer' }} />}
                      disabled={true}
                      onClick={() => removeSurgery(index)}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
          </Stack>

          <Box>
            <Typography
              variant="bodyMedium4"
              onClick={!!patientApptIntake ? undefined : addSurgery}
              sx={{
                width: 'fit-content',
                display: 'flex',
                py: 0.5,
                alignItems: 'center',
                cursor: !!patientApptIntake ? 'not-allowed' : 'pointer',
                gap: 1,
                opacity: !!patientApptIntake ? 0.6 : 1,
                color: !!patientApptIntake ? 'text.disabled' : 'Primary.main',
              }}
            >
              <AddIcon /> Add New
            </Typography>
          </Box>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            List your prescribed drugs and over-the-counter drugs, such as vitamins and inhalers:
          </Typography>
          <Stack spacing={1}>
            {prescribedDrugs.map((_, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid>
                  <Typography variant="bodyMedium4" sx={{ ml: 1 }}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid size={3}>
                  <Controller
                    name={`prescribedDrugs.${index}.name` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value as unknown as string}
                        placeholder="Name"
                        disableField={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                <Grid size={2}>
                  <Controller
                    name={`prescribedDrugs.${index}.strength` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        placeholder="Strength"
                        disableField={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                <Grid size={2}>
                  <Controller
                    name={`prescribedDrugs.${index}.frequency` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        placeholder="Frequency"
                        disableField={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>
                {prescribedDrugs.length > 1 ? (
                  <Grid size={0.25}>
                    <CustomIcon
                      iconColor="Negative.40"
                      size="medium"
                      icon={<DeleteIcon style={{ cursor: 'pointer' }} />}
                      onClick={() => removePrescribedDrug(index)}
                    />
                  </Grid>
                ) : (
                  <Grid size={0.25}>
                    <CustomIcon
                      icon={<DeleteIcon color="Negative.40" />}
                      disabled={true}
                      onClick={() => removePrescribedDrug(index)}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
          </Stack>

          <Box>
            <Typography
              variant="bodyMedium4"
              onClick={!!patientApptIntake ? undefined : addPrescribedDrug}
              sx={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                py: 0.5,
                cursor: !!patientApptIntake ? 'not-allowed' : 'pointer',
                gap: 1,
                opacity: !!patientApptIntake ? 0.6 : 1,
                color: !!patientApptIntake ? 'text.disabled' : 'Primary.main',
              }}
            >
              <AddIcon /> Add New
            </Typography>
          </Box>
        </Grid>

        <Grid size={12} pb={0.5}>
          <Typography variant="bodyMedium4">
            List all allergies to medications/substances:
          </Typography>
          <Stack spacing={0.4}>
            {allergies.map((_, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid>
                  <Typography variant="bodyMedium4" sx={{ ml: 1 }}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid size={11}>
                  <Controller
                    name={`allergies.${index}` as any}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        minRow={1}
                        value={field.value || ''}
                        placeholder="Allergies"
                        isDisabled={!!patientApptIntake}
                      />
                    )}
                  />
                </Grid>

                {allergies.length > 1 ? (
                  <Grid size={0.25}>
                    <CustomIcon
                      iconColor="Negative.40"
                      size="medium"
                      icon={<DeleteIcon style={{ cursor: 'pointer' }} />}
                      onClick={() => removeAllergy(index)}
                    />
                  </Grid>
                ) : (
                  <Grid size={0.25}>
                    <CustomIcon
                      icon={<DeleteIcon color="Negative.40" />}
                      disabled={true}
                      onClick={() => removeAllergy(index)}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
          </Stack>

          <Box onClick={!!patientApptIntake ? undefined : addAllergy}>
            <Typography
              variant="bodyMedium4"
              sx={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                cursor: !!patientApptIntake ? 'not-allowed' : 'pointer',
                gap: 1,
                opacity: !!patientApptIntake ? 0.6 : 1,
                color: !!patientApptIntake ? 'text.disabled' : 'Primary.main',
              }}
            >
              <AddIcon /> Add New
            </Typography>
          </Box>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            Check if you have, or have had any Significant Symptoms in the following areas:
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ p: 0, m: 0, mt: -1 }}>
            {[
              'Skin',
              'Ears',
              'Throat',
              'Lungs',
              'Back',
              'Chest/Heart',
              'Bladder',
              'Circulation',
              'Intestinal',
              'Nose',
              'Other',
            ].map(symptom => (
              <Controller
                key={symptom}
                name={`significantSymptoms.${symptom}` as keyof HealthHistoryFormData}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={field.value as unknown as boolean}
                        onChange={e => field.onChange(e.target.checked)}
                        disabled={!!patientApptIntake}
                      />
                    }
                    label={symptom}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            ))}
          </Stack>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">Recent Changes In:</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ p: 0, m: 0, mt: -1 }}>
            {['Weight', 'Energy', 'Sleep', 'Other'].map(symptom => (
              <Controller
                key={symptom}
                name={`recentChanges.${symptom}` as keyof HealthHistoryFormData}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={field.value as unknown as boolean}
                        onChange={e => field.onChange(e.target.checked)}
                        disabled={!!patientApptIntake}
                      />
                    }
                    label={symptom}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            ))}
          </Stack>
          <Stack>
            <Typography variant="bodyMedium4">Briefly Explain</Typography>
            <Controller
              name="recentChangesExplaination"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Explaination"
                  minRow={2}
                  value={field.value || ''}
                  isDisabled={!!patientApptIntake}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HealthHistoryForm;
