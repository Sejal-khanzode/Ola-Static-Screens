import {
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { diagocode, proceCode } from 'src/components/core/reusable/headers/all-headers';
import { getCurrentDate } from 'src/constants/date-format';
import { LocationControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

const mockdata = [
  {
    srn: 1,
    icd: 'F90.0 ADHD, predominantly inattentive type.',
    action: [{ label: 'Delete', route: 'delete' }],
  },
  { srn: 2, icd: 'F40.1 Social phobia', action: [{ label: 'Delete', route: 'delete' }] },
];

const mockdataproce = [
  {
    srn: 1,
    procedure: '90837 Psychotherapy',
    modifiers: (
      <Grid size={4} display={'flex'} gap={1}>
        <CustomInput />
        <CustomInput />
        <CustomInput />
        <CustomInput />
      </Grid>
    ),
    units: <CustomInput />,
    amount: <CustomInput />,
    subtotal: <CustomInput />,
    action: [{ label: 'Delete', route: 'delete' }],
  },
  {
    srn: 2,
    procedure: 'F90791 Psychiatric diagnostic evaluation',
    modifiers: (
      <Grid size={4} display={'flex'} gap={1}>
        <CustomInput />
        <CustomInput />
        <CustomInput />
        <CustomInput />
      </Grid>
    ),
    units: <CustomInput />,
    amount: <CustomInput />,
    subtotal: <CustomInput />,
    action: [{ label: 'Delete', route: 'delete' }],
  },
];

const CreateSuperbill = () => {
  const navigate = useNavigate();
  const clinicId = getDataFromLocalStorage('selectedClinicUuid');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const { data: locationData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () =>
      LocationControllerService.getApiMasterLocation({
        clinicId: clinicId as string,
      }),
  });

  const locations = (locationData?.data?.content ?? []) as any[];

  console.log('locationData>>', locationData?.data?.content);
  const handleBackToBilling = () => {
    navigate('/provider/billing/superbill');
  };
  return (
    <Grid container size={12} spacing={2}>
      <Grid size={12}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ cursor: 'pointer' }}
          onClick={handleBackToBilling}
        >
          <BackArrowIcon color="Primary.main" />
          <Typography variant="bodyRegular3">Create Super Bill</Typography>
        </Box>
      </Grid>

      <Grid size={12}>
        <Grid size={9}>
          <Box bgcolor="white" p={2} borderRadius={1}>
            <Grid size={12} display={'flex'}>
              <Grid size={1.5} display="flex" flexDirection="column">
                <Typography variant="bodyMedium4">Billing Provider</Typography>
                <Typography variant="bodyMedium4">Rendering Provider</Typography>
              </Grid>
              <Grid size={11} display="flex" flexDirection="column">
                <Typography variant="bodyMedium4" color="Neutral.70">
                  : John Due
                </Typography>
                <Typography variant="bodyMedium4" color="Neutral.70">
                  : Cameron James
                </Typography>
              </Grid>
            </Grid>
            <Grid size={12} mt={1}>
              <Typography variant="bodyMedium4">Service Details</Typography>
            </Grid>
            <Grid size={12} display={'flex'} gap={2}>
              <Grid size={2}>
                <CustomLabel label="Service Location" />
                <CustomSelect
                  placeholder="Select Location"
                  items={(locations ?? []).map((loc: any) => ({
                    value: loc.uuid,
                    label: loc.name,
                  }))}
                  value={selectedLocation}
                />
              </Grid>
              <Grid size={2}>
                <Grid>
                  <CustomLabel label="Date of Service" />
                  <CustomDatePicker value={getCurrentDate()} />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12} mt={1.5}>
              <Grid size={12} justifyContent={'space-between'} display={'flex'} mb={1}>
                <Grid size={3}>
                  <Typography variant="bodyMedium4">Diagnosis Code</Typography>
                </Grid>
                <Grid size={2}>
                  <CustomInput placeholder="Search Diagnosis Code" showIcon={<SearchIcon />} />
                </Grid>
              </Grid>
              <Grid size={12}>
                <CustomisedTable headCells={diagocode} tableData={mockdata} />
              </Grid>
            </Grid>
            <Grid size={12} alignItems="center" spacing={2} mt={1.5} display={'flex'} gap={2}>
              <Grid size={1}>
                <Typography variant="bodyMedium4">Patient Payment</Typography>
              </Grid>

              <Grid size={6}>
                <FormControl>
                  <RadioGroup row>
                    <FormControlLabel
                      value="false"
                      control={<Radio size="small" />}
                      label="Self Pay"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio size="small" />}
                      label="Insurance"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid size={12} mt={1.5}>
              <Grid size={12} justifyContent={'space-between'} display={'flex'} mb={1}>
                <Grid size={3}>
                  <Typography variant="bodyMedium4">Procedure Code</Typography>
                </Grid>
                <Grid size={2}>
                  <CustomInput placeholder="Search Procedure Code" showIcon={<SearchIcon />} />
                </Grid>
              </Grid>
              <Grid size={12}>
                <CustomisedTable headCells={proceCode} tableData={mockdataproce} />
              </Grid>
              <Grid size={12} justifyItems={'end'} mt={1}>
                <Box sx={{ display: 'flex', bgcolor: 'Primary.0', p: 1, borderRadius: 1 }}>
                  <Typography mt={0.7}>Total :</Typography>
                  <Box p={1} ml={3} bgcolor={'Base.white'}>
                    $800
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Grid size={12}>
                <Typography variant="bodyMedium4">Billing Node</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateSuperbill;
