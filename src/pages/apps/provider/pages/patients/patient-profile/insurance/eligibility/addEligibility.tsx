import {
  Grid,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from '@mui/material';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Controller, useForm } from 'react-hook-form';
import { formsConstants } from 'src/constants/patients-constants';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { EligibilityLables } from 'src/constants/setting-constants';

const Insurance = ({ data }: any) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '0px 1px 4px rgba(0,0,0,0.15)',
        p: 1.5,
      }}
    >
      <CardContent sx={{ pt: 1, pb: '8px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="bodyMedium4" sx={{ fontWeight: 600 }}>
            {data.insuranceType}
          </Typography>
        </Box>

        <Grid container sx={{ mb: 1 }}>
          <Grid size={5}>
            <Typography variant="bodyRegular5">{EligibilityLables.ELIGIBILITY}</Typography>
          </Grid>
          <Grid size={7} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningAmberIcon sx={{ width: 18, height: 18, color: '#F2B100' }} />
            <Typography variant="bodyMedium5">Not Available</Typography>
          </Grid>
        </Grid>

        {[
          { label: 'Payer Name', value: data?.payerName },
          { label: 'Insurance Number', value: data?.insuranceNumber },
          { label: 'Member ID', value: data?.memberId },
          { label: 'Group ID', value: data?.groupId },
          { label: 'Effective Date', value: data?.effectiveDate },
        ].map(({ label, value }) => (
          <Grid container key={label} sx={{ mb: 0.8 }}>
            <Grid size={5}>
              <Typography variant="bodyRegular5">{label}</Typography>
            </Grid>
            <Grid size={7}>
              <Typography variant="bodyMedium5">{value || '-'}</Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

const AddEligibility = () => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    console.log('data', data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid container size={12} spacing={2}>
            <Grid size={12}>
              <Grid bgcolor={'Neutral.30'} width={'fix-text'} p={1}>
                <Typography>{EligibilityLables.ELIGIBILTY_LAST_CHECKED}</Typography>
                <Typography>Not Available</Typography>
              </Grid>
            </Grid>
            <Grid size={6}>
              <CustomLabel label={EligibilityLables.SELECT_INSURANCE_TYPE} isRequired />
              <Controller
                control={control}
                name="documentDate"
                render={({ field }) => (
                  <FormControl sx={{ p: 0, m: 0, mt: -1.5 }}>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="primary"
                        control={<Radio size="small" />}
                        label="Primary"
                      />
                      <FormControlLabel
                        value="secondary"
                        control={<Radio size="small" />}
                        label="Secondary"
                      />
                      
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Grid size={6}>
            <CustomLabel label={EligibilityLables.SELECT_PROVIDER} isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder={EligibilityLables.SELECT_PROVIDER}
                  bgWhite
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  hasError={!!errors.name}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <CustomLabel label={EligibilityLables.SELECT_SERVICE} isRequired />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder={EligibilityLables.SELECT_PROVIDER}
                  bgWhite
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  hasError={!!errors.name}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Insurance
              data={{
                insuranceType: 'Primary Insurance',
                payerName: 'Aetna US Healthcare',
                insuranceNumber: '125-5478-65325',
                memberId: '569-822-4144',
                groupId: '876543-456-000078',
                copayAmount: '$20',
                effectiveDate: '01 Jan 2022 - 31 Dec 2022',
              }}
            />
          </Grid>
          <Grid size={6}>
            <Insurance
              data={{
                insuranceType: 'Secondary Insurance',
                payerName: 'Aetna US Healthcare',
                insuranceNumber: '125-5478-65325',
                memberId: '569-822-4144',
                groupId: '876543-456-000078',
                copayAmount: '$20',
                effectiveDate: '01 Jan 2022 - 31 Dec 2022',
              }}
            />
          </Grid>
          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <CustomButton
              label={formsConstants.CHECK_ELIGIBILITY}
              variant="outlined"
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEligibility;
