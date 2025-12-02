import {
  Grid,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export interface WomenHealthData {
  ageAtOnset: number;
  lastMenstruation: string;
  cycleFrequency: string;
  heavyPeriods: 'yes' | 'no';
  menstrualSymptoms: 'yes' | 'no';
  numberOfPregnancies: number;
  numberOfLiveBirths: number;
  currentlyPregnant: 'yes' | 'no';
  hysterectomy: 'yes' | 'no';
  hotFlashes: 'yes' | 'no';
  breastSymptoms: 'yes' | 'no';
  lastPapExam: string;
}

interface WomenFormProps {
  onChangeData?: (data: WomenHealthData) => void;
  data?: WomenHealthData | null;
  patientApptIntake?: string;
}

const WomenOnly: React.FC<WomenFormProps> = ({ onChangeData, data, patientApptIntake }) => {
  const [, setIsDataLoaded] = useState(false);
  const { control, handleSubmit, setValue } = useForm<WomenHealthData>({
    defaultValues: {
      ageAtOnset: 0,
      lastMenstruation: '',
      cycleFrequency: '',
      heavyPeriods: 'no',
      menstrualSymptoms: 'no',
      numberOfPregnancies: 0,
      numberOfLiveBirths: 0,
      currentlyPregnant: 'no',
      hysterectomy: 'no',
      hotFlashes: 'no',
      breastSymptoms: 'no',
      lastPapExam: '',
    },
  });

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof WomenHealthData, value);
      });
      setIsDataLoaded(true);
    }
  }, [data, setValue]);

  const onSubmit = (data: WomenHealthData) => {
    if (onChangeData) {
      onChangeData(data);
    }
  };
  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: WomenHealthData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    debouncedChange(formValues as any);
  }, [formValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ width: '100%', overflowY: 'auto', padding: 1 }}>
        <Grid size={12} sx={{ padding: 0.8 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="bodyMedium4" sx={{ mb: 4, fontWeight: 'bold' }}>
              Menstrual Health:
            </Typography>

            <Grid container spacing={4}>
              <Grid size={2.4}>
                <CustomLabel label="Age at onset of menstruation:" />
                <Controller
                  name="ageAtOnset"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Enter"
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Date of last menstruation:" />
                <Controller
                  name="lastMenstruation"
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

              <Grid size={2.4}>
                <CustomLabel label="How often do you get your menstrual cycle?" />
                <Controller
                  name="cycleFrequency"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="E.g Every 25 days"
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Heavy periods, irregularity, spotting, pain or discharge?" />
                <Grid size={8} mt={2.8}>
                  <Controller
                    name="heavyPeriods"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                        <RadioGroup
                          row
                          value={field.value}
                          onChange={e => field.onChange(e.target.value)}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio size="small" />}
                            label="Yes"
                            disabled={!!patientApptIntake}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio size="small" />}
                            label="No"
                            disabled={!!patientApptIntake}
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Do you have bloating, irritability, pain, menstrual tension, or other symptoms?" />
                <Grid size={8}>
                  <Controller
                    name="menstrualSymptoms"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                        <RadioGroup
                          row
                          value={field.value}
                          onChange={e => field.onChange(e.target.value)}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio size="small" />}
                            label="Yes"
                            disabled={!!patientApptIntake}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio size="small" />}
                            label="No"
                            disabled={!!patientApptIntake}
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="bodyMedium4" sx={{ mb: 4, fontWeight: 'bold' }}>
              Reproductive Health:
            </Typography>

            <Grid container spacing={4}>
              <Grid size={2.4}>
                <CustomLabel label="Number of pregnancies:" />
                <Controller
                  name="numberOfPregnancies"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Enter"
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Number of live births:" />
                <Controller
                  name="numberOfLiveBirths"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Enter"
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Are you currently pregnant or breast feeding?" />
                <Controller
                  name="currentlyPregnant"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                          disabled={!!patientApptIntake}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                          disabled={!!patientApptIntake}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={3}>
                <CustomLabel label="Have you had a D&C, hysterectomy or cesarean?" />
                <Controller
                  name="hysterectomy"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                          disabled={!!patientApptIntake}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                          disabled={!!patientApptIntake}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="bodyMedium4" sx={{ mb: 2, fontWeight: 'bold' }}>
              Health Symptoms:
            </Typography>

            <Grid container spacing={4}>
              <Grid size={2.4}>
                <CustomLabel label="Any hot flashes or sweating at night?" />
                <Controller
                  name="hotFlashes"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                          disabled={!!patientApptIntake}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                          disabled={!!patientApptIntake}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Experienced any recent breast tenderness, lumps, or nipple discharge?" />
                <Controller
                  name="breastSymptoms"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="Yes"
                          disabled={!!patientApptIntake}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="No"
                          disabled={!!patientApptIntake}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={2.4}>
                <CustomLabel label="Date of last pap and rectal exam?" />
                <Controller
                  name="lastPapExam"
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default WomenOnly;
