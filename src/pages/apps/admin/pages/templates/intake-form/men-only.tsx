import { Grid, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { useDebouncedCallback } from 'use-debounce';

export interface MenHealthData {
  urinateAtNight: 'yes' | 'no';
  nightUrinationFrequency: string;
  burningDischarge: 'yes' | 'no';
  urinationForce: 'yes' | 'no';
  prostateInfections: 'yes' | 'no';
  ejaculationErection: 'yes' | 'no';
  testiclePain: 'yes' | 'no';
  lastProstateExam: string;
}

interface MenOnlyProps {
  onChangeData?: (data: MenHealthData) => void;
  data?: MenHealthData | null;
  patientApptIntake?: string;
}

const MenOnly: React.FC<MenOnlyProps> = ({ onChangeData, data, patientApptIntake }) => {
  const [, setIsDataLoaded] = useState(false);
  const { control, setValue } = useForm<MenHealthData>({
    defaultValues: {
      urinateAtNight: 'no',
      nightUrinationFrequency: '',
      burningDischarge: 'no',
      urinationForce: 'no',
      prostateInfections: 'no',
      ejaculationErection: 'no',
      testiclePain: 'no',
      lastProstateExam: '',
    },
  });

  useEffect(() => {
    if (data) {
      if (data.urinateAtNight) setValue('urinateAtNight', data.urinateAtNight);
      if (data.nightUrinationFrequency)
        setValue('nightUrinationFrequency', data.nightUrinationFrequency);
      if (data.burningDischarge) setValue('burningDischarge', data.burningDischarge);
      if (data.urinationForce) setValue('urinationForce', data.urinationForce);
      if (data.prostateInfections) setValue('prostateInfections', data.prostateInfections);
      if (data.ejaculationErection) setValue('ejaculationErection', data.ejaculationErection);
      if (data.testiclePain) setValue('testiclePain', data.testiclePain);
      if (data.lastProstateExam) setValue('lastProstateExam', data.lastProstateExam);
      setIsDataLoaded(true);
    }
  }, [data, setValue]);

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: MenHealthData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    debouncedChange(formValues as any);
  }, [formValues]);
  return (
    <Grid container sx={{ width: '100%', overflowY: 'auto' }}>
      <Grid size={12} sx={{ padding: 2 }}>
        <Grid size={12}>
          <Grid container spacing={2} size={12}>
            <Grid size={3}>
              <CustomLabel label="Do you usually get up to urinate during the night?" />
              <Controller
                name="urinateAtNight"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
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
              <CustomLabel label="Do you feel burning or notice discharge from penis?" />
              <Controller
                name="burningDischarge"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
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
              <CustomLabel label="Have you had any prostate infections in the last year?" />
              <Controller
                name="prostateInfections"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
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

            {/* Testicle pain */}
            <Grid size={3}>
              <CustomLabel label="Any testicle pain/swelling?" />
              <Controller
                name="testiclePain"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
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
              <CustomLabel label="If yes, how many times?" />
              <Grid size={8}>
                <Controller
                  name="nightUrinationFrequency"
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
            </Grid>

            {/* Urination force */}
            <Grid size={3}>
              <CustomLabel label="Has the force of your urination decreased?" />
              <Controller
                name="urinationForce"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio size="small" />}
                        label="Yes"
                        disabled={!!patientApptIntake}
                      />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={3}>
              <CustomLabel label="Any difficulty with ejaculation or erections?" />
              <Controller
                name="ejaculationErection"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
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

            <Grid size={2}>
              <CustomLabel label="Date of last prostate and rectal exam:" />
              <Controller
                name="lastProstateExam"
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MenOnly;
