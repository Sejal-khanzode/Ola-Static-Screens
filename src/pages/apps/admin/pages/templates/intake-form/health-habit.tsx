import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { useDebouncedCallback } from 'use-debounce';

export interface HealthHabitData {
  tobaccoUse: string;
  recreationalDrugs: string;
  alcoholConsumption: string;
  needleDrugs: string;
  tobaccoUsage: {
    cigarettes: boolean;
    cigarettesQuantity: string;
    chew: boolean;
    chewQuantity: string;
    pipe: boolean;
    pipeQuantity: string;
    cigars: boolean;
    cigarsQuantity: string;
    formerSmoker: boolean;
    yearsSmoked: string;
    quitDate: string;
  };
  alcoholUsage: {
    drinksPerDay: boolean;
    drinksPerDayQuantity: string;
    drinksPerWeek: boolean;
    drinksPerWeekQuantity: string;
    drinksPerMonth: boolean;
    drinksPerMonthQuantity: string;
    rareOrNA: boolean;
    rareOrNAQuantity: string;
  };
  sexualHistory: {
    sexuallyActive: string;
    tryingForPregnancy: string;
    contraceptiveMethods: string;
    hivRiskDiscussion: string;
    barrierMethodUsed: string;
    anyDiscomfortWithIntercourse: string;
  };
  personalSafety: {
    liveAlone: string;
    frequentFalls: string;
    hearingVisionLoss: string;
    abuseDiscussion: string;
  };
  urinaryHealth: {
    urinaryTractInfections: string;
    bloodInUrine: string;
    urinationControl: string;
  };
}

interface HealthHabitFormProps {
  onChangeData?: (data: HealthHabitData) => void;
  data?: HealthHabitData | null;
  patientApptIntake?: string;
}

const HealthHabit: React.FC<HealthHabitFormProps> = ({ onChangeData, data, patientApptIntake }) => {
  const [, setIsDataLoaded] = useState(false);

  const { control, watch, setValue } = useForm<HealthHabitData>({
    defaultValues: {
      tobaccoUse: '',
      recreationalDrugs: '',
      alcoholConsumption: '',
      needleDrugs: '',
      tobaccoUsage: {
        cigarettes: false,
        cigarettesQuantity: '',
        chew: false,
        chewQuantity: '',
        pipe: false,
        pipeQuantity: '',
        cigars: false,
        cigarsQuantity: '',
        formerSmoker: false,
        yearsSmoked: '',
        quitDate: '',
      },
      alcoholUsage: {
        drinksPerDay: false,
        drinksPerDayQuantity: '',
        drinksPerWeek: false,
        drinksPerWeekQuantity: '',
        drinksPerMonth: false,
        drinksPerMonthQuantity: '',
        rareOrNA: false,
        rareOrNAQuantity: '',
      },
      sexualHistory: {
        sexuallyActive: '',
        tryingForPregnancy: '',
        barrierMethodUsed: '',
        anyDiscomfortWithIntercourse: '',
        contraceptiveMethods: '',
        hivRiskDiscussion: '',
      },
      personalSafety: {
        liveAlone: '',
        frequentFalls: '',
        hearingVisionLoss: '',
        abuseDiscussion: '',
      },
      urinaryHealth: {
        urinaryTractInfections: '',
        bloodInUrine: '',
        urinationControl: '',
      },
    },
  });

  useEffect(() => {
    if (!data) return;

    setValue('tobaccoUse', data.tobaccoUse || '');
    setValue('recreationalDrugs', data.recreationalDrugs || '');
    setValue('alcoholConsumption', data.alcoholConsumption || '');
    setValue('needleDrugs', data.needleDrugs || '');
    setValue('tobaccoUsage', data.tobaccoUsage || {});
    setValue('alcoholUsage', data.alcoholUsage || {});
    setValue('sexualHistory', data.sexualHistory || {});
    setValue('personalSafety', data.personalSafety || {});
    setValue('urinaryHealth', data.urinaryHealth || {});

    setIsDataLoaded(true);
  }, [data, setValue]);

  const tobaccoUsage = watch('tobaccoUsage');

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: HealthHabitData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    debouncedChange(formValues as any);
  }, [formValues]);

  return (
    <Grid container sx={{ width: '100%', overflowY: 'auto' }}>
      <Grid size={12} sx={{ padding: 1, paddingLeft: 2 }}>
        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 2 }}>
            Drugs, Tobacco, Alcohol usage:
          </Typography>

          <Grid container spacing={2}>
            <Grid size={3}>
              <CustomLabel label="Do you use tobacco?" />
              <Controller
                name="tobaccoUse"
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
              <CustomLabel label="Do you use recreational/street drugs?" />
              <Controller
                name="recreationalDrugs"
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
              <CustomLabel label="Do you consume alcohol?" />
              <Controller
                name="alcoholConsumption"
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
              <CustomLabel label="Have you ever given yourself street drugs with a needle?" />
              <Controller
                name="needleDrugs"
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

        <Grid size={12}>
          <Grid size={12}>
            <Typography variant="bodyMedium4" sx={{ fontWeight: 'bold' }}>
              Tobacco usage:
            </Typography>

            <Grid container gap={1.5} sx={{ p: 0, m: 0 }}>
              <Grid size={1.8}>
                <Controller
                  name="tobaccoUsage.cigarettes"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Cigarettes (#Packs/Day)"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {tobaccoUsage.cigarettes && (
                  <Grid size={10} sx={{ p: 0, m: 0 }}>
                    <Controller
                      name="tobaccoUsage.cigarettesQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="E.g (2 Pack/Day)"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.8}>
                <Controller
                  name="tobaccoUsage.chew"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Chew (#Packs/Day)"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {tobaccoUsage.chew && (
                  <Grid size={10} sx={{ p: 0, m: 0 }}>
                    <Controller
                      name="tobaccoUsage.chewQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="E.g (2 Pack/Day)"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.8}>
                <Controller
                  name="tobaccoUsage.pipe"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Pipe (#Packs/Day)"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {tobaccoUsage.pipe && (
                  <Grid size={10} sx={{ p: 0, m: 0 }}>
                    <Controller
                      name="tobaccoUsage.pipeQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="E.g (2 Pack/Day)"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.8}>
                <Controller
                  name="tobaccoUsage.cigars"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Cigars (#Packs/Day)"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {tobaccoUsage.cigars && (
                  <Grid size={10} sx={{ p: 0, m: 0 }}>
                    <Controller
                      name="tobaccoUsage.cigarsQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="E.g (2 Pack/Day)"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={4}>
                <Controller
                  name="tobaccoUsage.formerSmoker"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Former Smoker"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {tobaccoUsage.formerSmoker && (
                  <Grid container spacing={1} sx={{ p: 0, m: 0 }}>
                    <Grid size={5.5}>
                      <Controller
                        name="tobaccoUsage.yearsSmoked"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            isNumeric
                            placeholder="Enter Number of years"
                            value={field.value || ''}
                            disableField={!!patientApptIntake}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Controller
                        name="tobaccoUsage.quitDate"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            isNumeric
                            placeholder="Enter Approximate date/year quit"
                            value={field.value || ''}
                            disableField={!!patientApptIntake}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12} mt={1}>
            <Typography variant="bodyMedium4" sx={{ mb: 2 }}>
              Alcohol usage:
            </Typography>

            <Grid container spacing={1.5} sx={{ p: 0, m: 0 }}>
              <Grid size={1.85}>
                <Controller
                  name="alcoholUsage.drinksPerDay"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Drinks/day"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {watch('alcoholUsage.drinksPerDay') && (
                  <Grid size={10} sx={{ p: 0, m: 0, mt: -0.5 }}>
                    <Controller
                      name="alcoholUsage.drinksPerDayQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="Enter"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.87}>
                <Controller
                  name="alcoholUsage.drinksPerWeek"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Drinks/Week"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {watch('alcoholUsage.drinksPerWeek') && (
                  <Grid size={10} sx={{ p: 0, m: 0, mt: -0.5 }}>
                    <Controller
                      name="alcoholUsage.drinksPerWeekQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="Enter"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.9}>
                <Controller
                  name="alcoholUsage.drinksPerMonth"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Drinks/Month"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {watch('alcoholUsage.drinksPerMonth') && (
                  <Grid size={10} sx={{ p: 0, m: 0, mt: -0.5 }}>
                    <Controller
                      name="alcoholUsage.drinksPerMonthQuantity"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          isNumeric
                          placeholder="Enter"
                          value={field.value || ''}
                          disableField={!!patientApptIntake}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid size={1.9}>
                <Controller
                  name="alcoholUsage.rareOrNA"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value as boolean}
                          onChange={e => field.onChange(e.target.checked)}
                          disabled={!!patientApptIntake}
                        />
                      }
                      label="Rare/N/A"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    />
                  )}
                />
                {watch('alcoholUsage.rareOrNA') && (
                  <Grid size={10} sx={{ p: 0, m: 0, mt: -0.5 }}>
                    <Controller
                      name="alcoholUsage.rareOrNAQuantity"
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
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} mt={1}>
          <Grid size={12} display={'flex'} flexDirection={'row'}>
            <Grid size={6}>
              <Typography variant="bodyMedium4" sx={{ fontWeight: 'bold' }}>
                Sexual History:
              </Typography>

              <Grid container spacing={2}>
                {/* Sexually Active */}
                <Grid size={{ xs: 9, md: 8 }} display={'flex'} flexDirection={'column'} gap={0.7}>
                  <CustomLabel label="Are you sexually active?" />
                  <CustomLabel label="If yes, are you trying for pregnancy?" />
                  <CustomLabel label="If not trying for pregnancy list contraceptive or barrier method used:" />
                  <CustomLabel label="Any discomfort with intercourse?" />
                </Grid>

                <Grid size={{ xs: 3, md: 4 }} display={'flex'} flexDirection={'column'} gap={0.1}>
                  <Controller
                    name="sexualHistory.sexuallyActive"
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
                  <Controller
                    name="sexualHistory.tryingForPregnancy"
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
                  <Controller
                    name="sexualHistory.barrierMethodUsed"
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
                  <Controller
                    name="sexualHistory.anyDiscomfortWithIntercourse"
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

            <Grid size={6} display={'flex'} flexDirection={'column'} gap={1}>
              <Typography variant="bodyMedium4" sx={{ mb: 1 }}>
                Illness related to the human immunodeficiency virus (HIV), such as AIDS, has become
                a major public health problem. Risk factors for this illness include intravenous
                drug use and unprotected sexual intercourse. Would you like to speak with your
                provider about your risk of illness?
              </Typography>
              <Controller
                name="sexualHistory.hivRiskDiscussion"
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
        <Grid size={12} sx={{ mt: 1, display: 'flex', flexDirection: 'row' }}>
          <Grid size={6}>
            <Typography variant="bodyMedium4" sx={{ mb: 2, fontWeight: 'bold' }}>
              Personal Safety:
            </Typography>

            <Grid container spacing={2}>
              {/* Live Alone */}
              <Grid size={{ xs: 9, md: 8 }} display={'flex'} flexDirection={'column'} gap={0.5}>
                <CustomLabel label="Do you live alone?" />
                <CustomLabel label="Do you have frequent falls?" />

                <CustomLabel label="Do you have hearing or vision loss?" />

                <CustomLabel label="Physical and/or mental abuse have also become a major public health issue in this country. This often takes the form of domestic violence, elder abuse, or other forms of interpersonal violence. Would you like to discuss this with your provider?" />
              </Grid>

              {/* Frequent Falls */}
              <Grid size={{ xs: 3, md: 4 }}>
                <Controller
                  name="personalSafety.liveAlone"
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
                <Controller
                  name="personalSafety.frequentFalls"
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
                <Controller
                  name="personalSafety.hearingVisionLoss"
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
                <Controller
                  name="personalSafety.abuseDiscussion"
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

          <Grid size={6} sx={{ mb: 1.5 }}>
            <Typography variant="bodyMedium4">Urinary Health:</Typography>

            <Grid container spacing={2}>
              {/* Urinary Tract Infections */}
              <Grid size={{ xs: 9, md: 8 }} display={'flex'} flexDirection={'column'} gap={0.7}>
                <CustomLabel label="Any urinary tract, kidney, or bladder infections in the last year?" />
                <CustomLabel label="Any blood in your urine?" />
                <CustomLabel label="Any problems with control of urination?" />
              </Grid>

              {/* Blood in Urine */}
              <Grid size={{ xs: 3, md: 4 }}>
                <Controller
                  name="urinaryHealth.urinaryTractInfections"
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
                <Controller
                  name="urinaryHealth.bloodInUrine"
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

                <Controller
                  name="urinaryHealth.urinationControl"
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HealthHabit;
